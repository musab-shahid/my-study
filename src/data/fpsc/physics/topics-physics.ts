// topics-physics.ts — FPSC Basics of Physics upgraded study bank
// Scope: full competitive-exam treatment of core mechanics, energy, fluids, heat,
// waves, optics, electricity, magnetism and modern physics.
//
// Cross-subject boundary: Physics keeps the general laws; Meteorology keeps the
// atmospheric application. Earth science keeps geophysical/geological uses.

import type { Topic } from '@/types';

export const topics: Topic[] = [

// ============================= SECTION PHY-01: Motion & Forces =============================

{
  id: "phy-kinematics",
  sectionId: "PHY-01",
  order: 1,
  title: "Kinematics: Distance, Displacement, Speed, Velocity & Acceleration",
  definition: "Kinematics describes how objects move — position, speed, velocity and acceleration — without asking what forces cause the motion. Master four ideas in order: (1) path length vs net position change, (2) scalar rates vs directed rates, (3) how velocity changes with time, and (4) the constant-acceleration equations and motion graphs used in every FPSC calculation item.",
  keyFacts: [
    "Distance = total path length (scalar, m). Displacement = straight-line change in position from start to finish, with direction (vector, m).",
    "Speed = distance / time (scalar, m/s). Velocity = displacement / time (vector, m/s).",
    "Average speed for a whole trip = total distance / total time — never the average of the leg speeds unless times are equal.",
    "Acceleration a = (v − u) / t (vector, m/s²). It can come from changing speed or changing direction (e.g. uniform circular motion).",
    "Constant-acceleration equations (one dimension): v = u + at; s = ut + ½at²; v² = u² + 2as; s = ((u + v)/2) × t.",
    "Free fall (no air resistance): use the same equations with a = g ≈ 10 m/s² downward; from rest, v = gt and s = ½gt².",
    "Distance–time graph: slope = speed. Velocity–time graph: slope = acceleration; area under the curve = displacement. Acceleration–time graph: area = change in velocity.",
    "Distance ≥ |displacement|; equality only for straight motion with no reversal."
  ],
  explanationSections: [
    {
      heading: "1. Position language: distance vs displacement",
      body: "Imagine a path from A to B. Distance is every metre of path you actually walked. Displacement is the single arrow from where you started to where you stopped. A full lap of a 400 m track: distance = 400 m, displacement = 0 because start and finish coincide. If you walk 3 km east and 4 km north, distance = 7 km, but displacement is 5 km north-east (the hypotenuse). Always ask: is the question asking for path length or net change in position?"
    },
    {
      heading: "2. Speed vs velocity; average for multi-leg trips",
      body: "Speed ignores direction; velocity includes it. Two cars at 60 km/h in opposite directions have equal speeds and opposite velocities. Average speed for an entire trip is total distance divided by total time. Example used in the bank: 60 km in 1 h then 90 km in 2 h → total distance 150 km, total time 3 h → average speed = 50 km/h. Averaging the two leg speeds (60 and 45) gives 52.5 km/h and is wrong unless each leg lasts the same time. Average velocity uses total displacement over total time and can be much smaller than average speed if the path folds back."
    },
    {
      heading: "3. Acceleration and sign",
      body: "Acceleration is how quickly velocity changes. Choose a positive direction at the start of the problem and keep it. If velocity increases in the positive direction, a is positive; if it decreases, a is negative (often called deceleration, but the signed value is what equations need). A ball thrown upward has acceleration g downward for the whole flight — including the instant at the top when velocity is zero. Changing direction at constant speed (circular path) is still acceleration because velocity is a vector."
    },
    {
      heading: "4. Equations of motion (constant acceleration)",
      body: "When acceleration is constant in one dimension, four linked equations cover almost every MCQ. Symbols: u = initial velocity, v = final velocity, a = acceleration, t = time, s = displacement (often written x or Δx).\n\n• v = u + at — use when you know u, a, t and need v (or rearrange for any one unknown).\n• s = ut + ½at² — use when you need displacement and do not know v.\n• v² = u² + 2as — use when time is not given.\n• s = ((u + v)/2) × t — average velocity times time when a is constant.\n\nFrom rest (u = 0): v = at, s = ½at², v² = 2as. Dropped object: same with a = g. Always write knowns, choose the equation that omits the unknown you do not have, and keep units consistent (m, s, m/s, m/s²)."
    },
    {
      heading: "5. Reading motion graphs end-to-end",
      body: "Distance–time (s–t or d–t): slope at any interval = speed for that interval. Steeper → faster. Horizontal → stationary. Curved upward → speeding up. You cannot read acceleration directly from slope of s–t without care; constant slope means constant speed.\n\nVelocity–time (v–t): slope = acceleration. Horizontal line → constant velocity (a = 0). Straight line through rising values → constant positive a. Area between the v–t graph and the time axis = displacement (signed: below the axis subtracts). Distance travelled is the total of absolute areas if the graph crosses the axis.\n\nAcceleration–time (a–t): area under the graph over an interval = change in velocity Δv for that interval. Slope of a–t is not needed at FPSC level.\n\nExam traps: area under v–t is not acceleration; slope of s–t is not acceleration; a horizontal v–t line is not 'no motion' — it is steady motion."
    },
    {
      heading: "6. How FPSC-style items twist the ideas",
      body: "Typical traps: (1) calling path length 'displacement' after a closed loop; (2) averaging speeds instead of total distance/total time; (3) using v = u + at when a is not constant; (4) forgetting the ½ in s = ut + ½at²; (5) dropping the sign in v² = u² + 2as when the object slows; (6) saying free-fall acceleration is zero at the top of the throw. Read every stem for 'from rest', 'uniformly', 'returns to start', and which quantity is asked."
    }
  ],
  formula: [
    {
      name: "Average speed",
      expression: "\\text{average speed} = \\frac{\\text{total distance}}{\\text{total time}}",
      variables: [
        { symbol: "\\text{distance}", meaning: "total path length (m or km)" },
        { symbol: "\\text{time}", meaning: "total elapsed time (s or h)" }
      ]
    },
    {
      name: "Average velocity",
      expression: "v_{avg} = \\frac{\\Delta s}{\\Delta t}",
      variables: [
        { symbol: "\\Delta s", meaning: "displacement (m)" },
        { symbol: "\\Delta t", meaning: "time interval (s)" }
      ]
    },
    {
      name: "Acceleration",
      expression: "a = \\frac{v - u}{t}",
      variables: [
        { symbol: "u", meaning: "initial velocity (m/s)" },
        { symbol: "v", meaning: "final velocity (m/s)" },
        { symbol: "t", meaning: "time (s)" },
        { symbol: "a", meaning: "acceleration (m/s²)" }
      ]
    },
    {
      name: "Constant acceleration — velocity",
      expression: "v = u + at",
      variables: [
        { symbol: "u", meaning: "initial velocity (m/s)" },
        { symbol: "v", meaning: "final velocity (m/s)" },
        { symbol: "a", meaning: "constant acceleration (m/s²)" },
        { symbol: "t", meaning: "time (s)" }
      ]
    },
    {
      name: "Constant acceleration — displacement",
      expression: "s = ut + \\tfrac{1}{2}at^{2}",
      variables: [
        { symbol: "s", meaning: "displacement (m)" },
        { symbol: "u", meaning: "initial velocity (m/s)" },
        { symbol: "a", meaning: "constant acceleration (m/s²)" },
        { symbol: "t", meaning: "time (s)" }
      ]
    },
    {
      name: "Constant acceleration — no time",
      expression: "v^{2} = u^{2} + 2as",
      variables: [
        { symbol: "u, v", meaning: "initial and final velocity (m/s)" },
        { symbol: "a", meaning: "constant acceleration (m/s²)" },
        { symbol: "s", meaning: "displacement (m)" }
      ]
    },
    {
      name: "Constant acceleration — average velocity form",
      expression: "s = \\frac{u + v}{2} \\, t",
      variables: [
        { symbol: "s", meaning: "displacement (m)" },
        { symbol: "u, v", meaning: "initial and final velocity (m/s)" },
        { symbol: "t", meaning: "time (s)" }
      ]
    }
  ],
  workedExample: [
    {
      problem: "A car travels 60 km in 1 hour, then 90 km in 2 hours. What is the average speed for the whole trip?",
      solution: "Total distance = 60 + 90 = 150 km. Total time = 1 + 2 = 3 h. Average speed = 150 / 3 = 50 km/h. Do not average 60 km/h and 45 km/h.",
      answer: "50 km/h"
    },
    {
      problem: "A car travels 120 km north in 2.0 h, then 80 km south in 1.5 h. Find distance, displacement, average speed and average velocity.",
      solution: "Take north as positive. Distance = 120 + 80 = 200 km. Displacement = +120 − 80 = +40 km (north). Time = 3.5 h. Average speed = 200 / 3.5 ≈ 57.1 km/h. Average velocity = 40 / 3.5 ≈ 11.4 km/h north.",
      answer: "200 km; 40 km north; ≈57.1 km/h; ≈11.4 km/h north"
    },
    {
      problem: "A train slows from 30 m/s to 10 m/s in 5.0 s. Find average acceleration.",
      solution: "a = (v − u)/t = (10 − 30)/5 = −20/5 = −4.0 m/s². Negative means opposite the original direction of motion.",
      answer: "−4.0 m/s²"
    },
    {
      problem: "A ball is dropped from rest. After 2 s, find its velocity (g = 10 m/s², no air resistance).",
      solution: "u = 0, a = g = 10 m/s², t = 2 s. v = u + at = 0 + 10×2 = 20 m/s downward.",
      answer: "20 m/s downward"
    },
    {
      problem: "An object accelerates uniformly from rest at 4 m/s². How far does it travel in 5 s?",
      solution: "u = 0, a = 4 m/s², t = 5 s. s = ut + ½at² = 0 + ½(4)(25) = 50 m.",
      answer: "50 m"
    },
    {
      problem: "A car decelerates uniformly from 20 m/s to 10 m/s over 50 m. Find acceleration.",
      solution: "u = 20 m/s, v = 10 m/s, s = 50 m. v² = u² + 2as → 100 = 400 + 100a → 100a = −300 → a = −3 m/s².",
      answer: "−3 m/s²"
    }
  ],
  commonMistakes: [
    "Treating distance and displacement as the same — closed loops have distance > 0 but displacement 0.",
    "Averaging leg speeds instead of total distance / total time.",
    "Using average speed when the question asks for average velocity (or the reverse).",
    "Forgetting that constant-speed circular motion still has acceleration (direction changes).",
    "Dropping the factor ½ in s = ut + ½at².",
    "Ignoring the sign of a when the object slows down.",
    "Saying acceleration is zero at the top of a vertical throw because velocity is zero.",
    "Claiming area under a v–t graph is acceleration (it is displacement)."
  ],
  examPoints: [
    "Average speed = total distance / total time for the whole journey.",
    "Displacement after a closed path is zero; distance is not.",
    "v = u + at, s = ut + ½at², v² = u² + 2as — pick the equation that avoids the unknown you were not given.",
    "From rest: s = ½at² and v = at.",
    "s–t slope → speed; v–t slope → acceleration; v–t area → displacement; a–t area → Δv.",
    "SI units: distance/displacement m; speed/velocity m/s; acceleration m/s²."
  ],
  comparisonTable: {
    headers: ["Quantity", "Type", "Definition", "SI unit", "Direction?"],
    rows: [
      ["Distance", "Scalar", "Total path length", "m", "No"],
      ["Displacement", "Vector", "Change in position (start → finish)", "m", "Yes"],
      ["Speed", "Scalar", "Distance / time", "m/s", "No"],
      ["Velocity", "Vector", "Displacement / time", "m/s", "Yes"],
      ["Acceleration", "Vector", "Change in velocity / time", "m/s²", "Yes"]
    ]
  },
  methodChooser: {
    title: "Which equation or graph skill?",
    intro: "Match the knowns to the tool. Assume constant acceleration unless the stem says otherwise.",
    steps: [
      { condition: "Trip average speed over several legs", recommendation: "total distance / total time", notes: "Do not average the leg speeds." },
      { condition: "Net change in position", recommendation: "displacement (with signs)", notes: "Closed path → 0 displacement." },
      { condition: "Know u, a, t; need v", recommendation: "v = u + at", notes: "From rest: v = at." },
      { condition: "Know u, a, t; need s (not v)", recommendation: "s = ut + ½at²", notes: "From rest: s = ½at²." },
      { condition: "Know u, v, s; no time", recommendation: "v² = u² + 2as", notes: "Solve for a or s." },
      { condition: "Graph given", recommendation: "slope and area rules", notes: "s–t slope = speed; v–t slope = a; v–t area = displacement; a–t area = Δv." }
    ]
  },
  limitCases: [
    { condition: "a = 0", result: "v constant; s = ut", physicalMeaning: "Uniform velocity; no speeding up or slowing down." },
    { condition: "u = 0 (from rest)", result: "v = at; s = ½at²; v² = 2as", physicalMeaning: "Simplifies free-fall and many launch problems." },
    { condition: "Closed path", result: "displacement = 0; average velocity = 0", physicalMeaning: "Distance still equals the full path length." },
    { condition: "Top of vertical throw", result: "v = 0 but a = g downward", physicalMeaning: "Zero velocity does not mean zero acceleration." }
  ],
  misconceptionRemediation: [
    {
      misconception: "Average speed is the average of the speeds on each leg.",
      whyStudentsThinkIt: "Arithmetic mean feels natural.",
      correctModel: "Weight by time: total distance / total time. Equal times are the only case where averaging leg speeds works."
    },
    {
      misconception: "If speed is constant there is no acceleration.",
      whyStudentsThinkIt: "Everyday language ties acceleration only to 'going faster'.",
      correctModel: "Acceleration is change of velocity. Direction change at constant speed (circle) is acceleration."
    },
    {
      misconception: "At the highest point a thrown ball has zero acceleration.",
      whyStudentsThinkIt: "Velocity is zero for an instant.",
      correctModel: "Gravity still acts; a = g downward the whole time."
    }
  ],
  relatedTopics: ["phy-newtons-laws", "phy-momentum-impulse", "phy-scalars-vectors"],
  subtopics: [
    {
      id: "phy-kinematics-scalar-vs-vector-quantities",
      title: "Distance, displacement, speed and velocity",
      summary: "Scalars vs vectors; trip averages.",
      explanation: "Distance and speed are scalars. Displacement and velocity are vectors — they need a direction (or a sign in 1D). Average speed uses total path length; average velocity uses net displacement. A runner's lap and multi-leg car trips are the standard checks.",
      examples: [
        {
          problem: "A runner completes one 400 m lap and stops at the start. Distance and displacement?",
          solution: "Distance = 400 m. Displacement = 0.",
          answer: "400 m; 0"
        },
        {
          problem: "60 km in 1 h then 90 km in 2 h. Average speed?",
          solution: "150 km / 3 h = 50 km/h.",
          answer: "50 km/h"
        }
      ],
      shortcuts: ["Closed loop → displacement 0", "Trip average speed = Σs / Σt"],
      traps: ["Averaging leg speeds", "Calling path length 'displacement'"]
    },
    {
      id: "phy-kinematics-equations-of-motion",
      title: "Constant-acceleration equations",
      summary: "v = u+at, s = ut+½at², v² = u²+2as, and free fall.",
      explanation: "Use these only when acceleration is constant. List u, v, a, t, s; pick the equation that leaves out the quantity you do not know. From rest set u = 0. Free fall set a = g (often 10 m/s² in MCQs) downward.",
      examples: [
        {
          problem: "From rest, a = 4 m/s², t = 5 s. Find s.",
          solution: "s = ½at² = ½×4×25 = 50 m.",
          answer: "50 m"
        },
        {
          problem: "u = 20 m/s, v = 10 m/s, s = 50 m. Find a.",
          solution: "v² = u² + 2as → 100 = 400 + 100a → a = −3 m/s².",
          answer: "−3 m/s²"
        },
        {
          problem: "Dropped from rest, t = 2 s, g = 10 m/s². Find v.",
          solution: "v = gt = 20 m/s downward.",
          answer: "20 m/s down"
        }
      ],
      shortcuts: ["Missing v → s = ut+½at²", "Missing t → v² = u²+2as", "From rest → u = 0"],
      traps: ["Forgetting ½", "Using g = 0 at the top of a throw"]
    },
    {
      id: "phy-kinematics-reading-motion-graphs",
      title: "Motion graphs (s–t, v–t, a–t)",
      summary: "Slope and area rules for every standard graph.",
      explanation: "s–t: slope = speed; horizontal = rest. v–t: slope = acceleration; area = displacement (signed). a–t: area = Δv. Horizontal v–t means constant velocity, not zero motion. Area under v–t is never acceleration.",
      examples: [
        {
          problem: "Which readings are correct? v–t slope; s–t slope; a–t area; v–t area claimed as acceleration.",
          solution: "v–t slope = a; s–t slope = speed; a–t area = Δv; v–t area = displacement — not acceleration.",
          answer: "First three true; last false"
        }
      ],
      shortcuts: ["Slope of v–t → a", "Area of v–t → displacement", "Area of a–t → Δv"],
      traps: ["Area of v–t = acceleration", "Horizontal v–t means stopped"]
    },
    {
      id: "phy-kinematics-sign-conventions-for-acceleration",
      title: "Signs, free fall and circular motion",
      summary: "Positive direction, g, and acceleration at constant speed.",
      explanation: "Pick a positive axis once. Slowing in the positive direction gives negative a. In free fall, a = g downward whether the object is going up, down, or is momentarily at rest. Uniform circular motion has constant speed but nonzero acceleration because direction changes continuously.",
      examples: [
        {
          problem: "True or false: constant speed on a circle means zero acceleration.",
          solution: "False — velocity direction changes, so the object accelerates.",
          answer: "False"
        }
      ],
      shortcuts: ["Top of throw: v = 0, a = g down", "Circle: speed constant ≠ a = 0"],
      traps: ["Zero velocity ⇒ zero acceleration"]
    },
    {
      id: "phy-kinematics-how-fpsc-tests-this",
      title: "Exam checklist",
      summary: "What to verify before committing an answer.",
      explanation: "Check: path vs net position; total distance/total time vs mean of speeds; whether a is constant; whether u is zero; graph slope vs area; units. If the stem says 'returns to starting point', displacement and average velocity are zero even though distance and average speed are not.",
      examples: [
        {
          problem: "Name two quantities that become zero after a closed path.",
          solution: "Displacement and average velocity.",
          answer: "Displacement; average velocity"
        }
      ],
      shortcuts: ["Underline what is asked: distance or displacement", "List knowns before picking a formula"],
      traps: ["Swapping u and v", "Mixing average speed with average velocity"]
    }
  ],

  content: true,
  buildsOn: ["math-8-3", "math-5-4", "phy-units-measurement", "phy-scalars-vectors"],
  leadsTo: ["phy-newtons-laws", "phy-momentum-impulse"],
  usedIn: ["phy-work-energy", "meteo-static-stability", "meteo-forces-governing-wind", "meteo-scales-of-motion"]
},

{
  id: "phy-newtons-laws",
  sectionId: "PHY-01",
  order: 2,
  title: "Newton's Three Laws of Motion",
  definition: "Newton's three laws relate the forces acting on an object to its motion: the first law defines inertia, the second links net force to acceleration, and the third states that forces always occur in equal and opposite pairs on different bodies.",
  keyFacts: [
    "First Law (Inertia): an object remains at rest or moves with constant velocity unless a net external force acts on it.",
    "Second Law: net force F = m a; acceleration is in the direction of the net force.",
    "Third Law: if body A exerts a force on body B, body B exerts an equal and opposite force on body A, acting on a different body.",
    "Mass is a measure of inertia and is constant everywhere; weight is the gravitational force on that mass and varies with location.",
    "Net force is the vector sum of all forces on one object; zero net force means equilibrium.",
    "Action-reaction pairs never act on the same object, so they do not cancel each other."
  ],
  explanationSections: [
    { heading: "Inertia and the First Law", body: "Inertia is the resistance of an object to changes in its state of motion. A book on a table stays at rest because the net force on it is zero, not because no forces act. A passenger lurches forward when a braking bus slows because the passenger's body tends to keep moving." },
    { heading: "F = ma as the working equation", body: "The Second Law is the quantitative heart of mechanics. For a fixed mass, doubling the net force doubles the acceleration. For a fixed force, doubling the mass halves the acceleration. Always use net force — the vector sum of all forces acting on the object — not just one applied force." },
    { heading: "Why action-reaction does not cancel", body: "Action and reaction forces act on different objects. A book on a table pushes down on the table; the table pushes up on the book. These two forces are equal and opposite but cannot cancel because they act on different bodies. The book remains still because the upward normal force from the table balances the book's weight, both acting on the book." },
    { heading: "Mass vs weight", body: "Mass is an intrinsic property measured in kilograms; weight is a force measured in newtons. A 60 kg person has the same mass on Earth and the Moon, but weighs about 588 N on Earth and only 96 N on the Moon because the Moon's gravitational field is weaker." }
  ],
  formula: {
    name: "Newton's Second Law",
    expression: "F_{net} = m a",
    variables: [
      { symbol: "F_{net}", meaning: "net force (N)" },
      { symbol: "m", meaning: "mass (kg)" },
      { symbol: "a", meaning: "acceleration (m/s²)" }
    ]
  },
  workedExample: [
    {
      problem: "A 5.0 kg block is pulled horizontally by a 20 N force. A friction force of 5.0 N opposes the motion. Find the acceleration.",
      solution: "Net force = 20 N − 5.0 N = 15 N. Using F = ma, a = F/m = 15 N / 5.0 kg = 3.0 m/s².",
      answer: "3.0 m/s² in the direction of the pull."
    },
    {
      problem: "A 1 200 kg car accelerates from rest to 24 m/s in 8.0 s. What average net force acts on it?",
      solution: "First find acceleration: a = (v − u)/t = (24 m/s − 0)/8.0 s = 3.0 m/s². Then F = ma = 1 200 kg × 3.0 m/s² = 3 600 N.",
      answer: "3 600 N (or 3.6 kN)."
    }
  ],
  commonMistakes: [
    "Thinking that action-reaction forces cancel; they act on different objects.",
    "Using an individual force instead of the net force in F = ma.",
    "Confusing mass (kg, constant) with weight (N, location-dependent).",
    "Believing that a moving object must have a net force on it; constant velocity means zero net force.",
    "Forgetting that F and a are vectors and must have the same direction."
  ],
  examPoints: [
    "Third-Law pairs are always the same type of force, equal in magnitude, opposite in direction, and on different bodies.",
    "If an object moves at constant velocity, the net force is zero even though individual forces may be large.",
    "Weight = mg; on Earth use g ≈ 9.8 m/s² unless the question states 10 m/s².",
    "FPSC often tests conceptual Third-Law questions with people, boats, rockets or books on tables."
  ],
  limitCases: [
    { condition: "F_{net} = 0", result: "a = 0", physicalMeaning: "The object is in equilibrium: at rest or moving with constant velocity." },
    { condition: "Constant mass, F doubled", result: "a doubles", physicalMeaning: "Acceleration is directly proportional to net force." },
    { condition: "Constant F, m doubled", result: "a halves", physicalMeaning: "Acceleration is inversely proportional to mass." }
  ],
  misconceptionRemediation: [
    {
      misconception: "The upward normal force on a book and the downward gravitational force on the book are an action-reaction pair.",
      whyStudentsThinkIt: "They are equal and opposite, and the book is not moving, so they look like a pair.",
      correctModel: "Action-reaction pairs act on different objects. The reaction to the table's upward normal force on the book is the book's downward normal force on the table. The forces that balance on the book are both acting on the book."
    }
  ],
  relatedTopics: ["phy-kinematics", "phy-gravity-weight-friction", "phy-momentum-impulse"],
    subtopics: [
      {
        id: "phy-newtons-laws-inertia-and-the-first-law",
        title: "Inertia and the First Law",
        summary: "Inertia is the resistance of an object to changes in its state of motion. A book on a table stays at rest because the net force on it is…",
        explanation: "Inertia is the resistance of an object to changes in its state of motion. A book on a table stays at rest because the net force on it is zero, not because no forces act. A passenger lurches forward when a braking bus slows because the passenger's body tends to keep moving.",
                examples: [
          {
            problem: "A 5 kg box accelerates at 3 m/s² on a frictionless surface. What net force acts on it?",
            solution: "Newton’s second law: F = ma = 5 kg × 3 m/s² = 15 N in the direction of acceleration.",
            answer: "15 N",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-newtons-laws-f-ma-as-the-working-equation",
        title: "F = ma as the working equation",
        summary: "The Second Law is the quantitative heart of mechanics. For a fixed mass, doubling the net force doubles the acceleration. For a fixed…",
        explanation: "The Second Law is the quantitative heart of mechanics. For a fixed mass, doubling the net force doubles the acceleration. For a fixed force, doubling the mass halves the acceleration. Always use net force — the vector sum of all forces acting on the object — not just one applied force.",
                examples: [
          {
            problem: "A 5 kg box accelerates at 3 m/s² on a frictionless surface. What net force acts on it?",
            solution: "Newton’s second law: F = ma = 5 kg × 3 m/s² = 15 N in the direction of acceleration.",
            answer: "15 N",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-newtons-laws-why-action-reaction-does-not-cancel",
        title: "Why action-reaction does not cancel",
        summary: "Action and reaction forces act on different objects. A book on a table pushes down on the table; the table pushes up on the book. These two…",
        explanation: "Action and reaction forces act on different objects. A book on a table pushes down on the table; the table pushes up on the book. These two forces are equal and opposite but cannot cancel because they act on different bodies. The book remains still because the upward normal force from the table balances the book's weight, both acting on the book.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Why action-reaction does not cancel” requires you to distinguish or calculate.",
            solution: "Use the core idea: Action and reaction forces act on different objects. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Why action-reaction does not cancel",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-newtons-laws-mass-vs-weight",
        title: "Mass vs weight",
        summary: "Mass is an intrinsic property measured in kilograms; weight is a force measured in newtons. A 60 kg person has the same mass on Earth and…",
        explanation: "Mass is an intrinsic property measured in kilograms; weight is a force measured in newtons. A 60 kg person has the same mass on Earth and the Moon, but weighs about 588 N on Earth and only 96 N on the Moon because the Moon's gravitational field is weaker.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Mass vs weight” requires you to distinguish or calculate.",
            solution: "Use the core idea: Mass is an intrinsic property measured in kilograms; weight is a force measured in newtons. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Mass vs weight",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],

  content: true,
  buildsOn: ["phy-kinematics", "phy-scalars-vectors"],
  leadsTo: ["phy-gravity-weight-friction", "phy-momentum-impulse", "phy-work-energy"],
  usedIn: ["phy-vector-applications", "meteo-coriolis-effect", "meteo-forces-governing-wind", "earth-f1", "earth-h1"]
},

{
  id: "phy-gravity-weight-friction",
  sectionId: "PHY-01",
  order: 3,
  title: "Gravity, Weight & Friction",
  definition: "Gravity is the attractive force between any two masses; weight is the gravitational force exerted on an object by a planet or moon; friction is a contact force that opposes relative motion or attempted motion between surfaces.",
  keyFacts: [
    "Weight W = m g, where g is the gravitational field strength (≈ 9.8 N/kg on Earth).",
    "Mass is constant everywhere; weight depends on the local value of g.",
    "Friction always opposes relative motion or the tendency of relative motion.",
    "Static friction acts on objects at rest and adjusts up to a maximum value; kinetic friction acts on sliding objects.",
    "The maximum static friction is usually slightly larger than kinetic friction for the same surfaces.",
    "Friction depends on the nature of the surfaces and the normal force, not on the apparent contact area."
  ],
  explanationSections: [
    { heading: "Weight as a gravitational force", body: "Weight is not a fixed property of an object. A 10 kg object weighs 98 N on Earth but about 16 N on the Moon and about 370 N on Jupiter's surface. Its mass remains 10 kg everywhere. In free fall, an object is weightless because there is no supporting force, but its mass and the gravitational pull on it are unchanged." },
    { heading: "Static and kinetic friction", body: "If you push a heavy box gently, static friction matches your push and the box does not move. As you push harder, static friction increases only up to a limit. Once motion starts, kinetic friction takes over and is usually slightly smaller, so the box may suddenly feel easier to push." },
    { heading: "What friction depends on", body: "For dry solid surfaces, friction depends mainly on the materials in contact and the normal force pressing them together. Polishing, lubrication or rolling reduce friction. Contrary to intuition, widening the contact area does not normally increase friction because the pressure decreases proportionally." },
    { heading: "Friction in FPSC problems", body: "Many problems ask for the net force when friction opposes motion. Subtract the friction force from the applied force before using F = ma. On an incline, resolve the weight into components parallel and perpendicular to the surface; the normal force equals the perpendicular component." }
  ],
  formula: {
    name: "Weight and friction",
    expression: "W = m g \\quad f_{s,max} = \\mu_s N \\quad f_k = \\mu_k N",
    variables: [
      { symbol: "W", meaning: "weight (N)" },
      { symbol: "m", meaning: "mass (kg)" },
      { symbol: "g", meaning: "gravitational field strength (N/kg or m/s²)" },
      { symbol: "\\mu_s", meaning: "coefficient of static friction" },
      { symbol: "\\mu_k", meaning: "coefficient of kinetic friction" },
      { symbol: "N", meaning: "normal force (N)" }
    ]
  },
  workedExample: [
    {
      problem: "An astronaut has a mass of 70 kg. Calculate her weight (a) on Earth where g = 9.8 N/kg, and (b) on the Moon where g = 1.6 N/kg.",
      solution: "(a) W = m g = 70 kg × 9.8 N/kg = 686 N. (b) W = 70 kg × 1.6 N/kg = 112 N.",
      answer: "686 N on Earth; 112 N on the Moon."
    },
    {
      problem: "A 10 kg box rests on a horizontal floor. The coefficient of static friction is 0.50 and kinetic friction is 0.30. What horizontal force is needed to start the box moving? What force keeps it moving at constant velocity once started?",
      solution: "Normal force N = weight = m g = 10 kg × 9.8 N/kg = 98 N. Maximum static friction = μs N = 0.50 × 98 N = 49 N, so at least 49 N is needed to start motion. Kinetic friction = μk N = 0.30 × 98 N = 29.4 N; a 29.4 N horizontal force balances friction and keeps velocity constant.",
      answer: "49 N to start motion; 29.4 N to keep it moving at constant velocity."
    }
  ],
  commonMistakes: [
    "Saying weight is measured in kilograms; weight is a force, so its unit is the newton.",
    "Treating friction as a fixed number instead of a force proportional to the normal force.",
    "Confusing static friction with kinetic friction: static friction can vary, kinetic friction is roughly constant.",
    "Assuming friction always equals μmg; on an incline the normal force is mg cos θ, not mg.",
    "Forgetting that friction opposes relative motion, not necessarily the direction of travel (e.g. friction on a car's driven wheels points forward)."
  ],
  examPoints: [
    "Use g = 9.8 m/s² unless the question explicitly uses 10 m/s²; state the value you use.",
    "On an incline, the component of weight down the slope is mg sin θ and the normal force is mg cos θ.",
    "Static friction is a maximum value; actual static friction can be anything from zero up to f_s,max.",
    "Weightlessness in orbit is not absence of gravity; it is absence of a supporting normal force during free fall."
  ],
  comparisonTable: {
    headers: ["Property", "Mass", "Weight"],
    rows: [
      ["Definition", "Amount of matter / inertia", "Gravitational force on mass"],
      ["SI unit", "kg", "N"],
      ["Changes with location?", "No", "Yes (depends on g)"],
      ["Measuring instrument", "Balance", "Spring scale / Newton meter"],
      ["Type", "Scalar", "Vector (downward)"]
    ]
  },
  relatedTopics: ["phy-newtons-laws", "phy-universal-gravitation", "phy-momentum-impulse", "phy-archimedes-principle"],
    subtopics: [
      {
        id: "phy-gravity-weight-friction-weight-as-a-gravitational-force",
        title: "Weight as a gravitational force",
        summary: "Weight is not a fixed property of an object. A 10 kg object weighs 98 N on Earth but about 16 N on the Moon and about 370 N on Jupiter's…",
        explanation: "Weight is not a fixed property of an object. A 10 kg object weighs 98 N on Earth but about 16 N on the Moon and about 370 N on Jupiter's surface. Its mass remains 10 kg everywhere. In free fall, an object is weightless because there is no supporting force, but its mass and the gravitational pull on it are unchanged.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Weight as a gravitational force” requires you to distinguish or calculate.",
            solution: "Use the core idea: Weight is not a fixed property of an object. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Weight as a gravitational force",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-gravity-weight-friction-static-and-kinetic-friction",
        title: "Static and kinetic friction",
        summary: "If you push a heavy box gently, static friction matches your push and the box does not move. As you push harder, static friction increases…",
        explanation: "If you push a heavy box gently, static friction matches your push and the box does not move. As you push harder, static friction increases only up to a limit. Once motion starts, kinetic friction takes over and is usually slightly smaller, so the box may suddenly feel easier to push.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-gravity-weight-friction-what-friction-depends-on",
        title: "What friction depends on",
        summary: "For dry solid surfaces, friction depends mainly on the materials in contact and the normal force pressing them together. Polishing,…",
        explanation: "For dry solid surfaces, friction depends mainly on the materials in contact and the normal force pressing them together. Polishing, lubrication or rolling reduce friction. Contrary to intuition, widening the contact area does not normally increase friction because the pressure decreases proportionally.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-gravity-weight-friction-friction-in-fpsc-problems",
        title: "Friction in FPSC problems",
        summary: "Many problems ask for the net force when friction opposes motion. Subtract the friction force from the applied force before using F = ma.…",
        explanation: "Many problems ask for the net force when friction opposes motion. Subtract the friction force from the applied force before using F = ma. On an incline, resolve the weight into components parallel and perpendicular to the surface; the normal force equals the perpendicular component.",
                examples: [
          {
            problem: "A 5 kg box accelerates at 3 m/s² on a frictionless surface. What net force acts on it?",
            solution: "Newton’s second law: F = ma = 5 kg × 3 m/s² = 15 N in the direction of acceleration.",
            answer: "15 N",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],

  content: true,
  buildsOn: ["phy-newtons-laws"],
  leadsTo: ["phy-universal-gravitation", "phy-momentum-impulse"],
  usedIn: ["phy-archimedes-principle", "meteo-hydrostatic-equation", "earth-a5"]
},

{
  id: "phy-momentum-impulse",
  sectionId: "PHY-01",
  order: 4,
  title: "Momentum, Impulse & Conservation of Momentum",
  definition: "Momentum is the product of an object's mass and velocity. Impulse is the product of a force and the time it acts, equal to the change in momentum. In an isolated system, total momentum is conserved during collisions and explosions.",
  keyFacts: [
    "Linear momentum p = m v; it is a vector with SI unit kg·m/s.",
    "Impulse J = F t = Δp = m(v − u); impulse is also a vector.",
    "For a constant force, impulse equals force multiplied by the time interval.",
    "The law of conservation of momentum: total momentum before = total momentum after, provided no external net force acts.",
    "In an elastic collision both momentum and kinetic energy are conserved; in an inelastic collision only momentum is conserved.",
    "In a perfectly inelastic collision, objects stick together and move with a common velocity after impact."
  ],
  explanationSections: [
    { heading: "Momentum as a measure of motion", body: "A heavy truck moving slowly and a light bullet moving fast can have similar momenta. Because momentum is a vector, two objects moving in opposite directions have opposite momenta. A system with equal and opposite momenta has zero total momentum." },
    { heading: "Impulse and change in momentum", body: "The same change in momentum can be produced by a large force acting briefly or a small force acting for a long time. Airbags, crumple zones and cushioned floors increase stopping time, reducing peak force while producing the same impulse (change in momentum)." },
    { heading: "Conservation of momentum", body: "Momentum is conserved because Newton's Third Law makes internal forces in a system cancel in pairs. For collisions, set total momentum before impact equal to total momentum after impact. Include direction with signs. This works for explosions too, where the total initial momentum is zero and the fragments move in opposite directions." },
    { heading: "Elastic vs inelastic collisions", body: "Most everyday collisions are inelastic because some kinetic energy becomes sound, heat or deformation. Momentum is conserved in both types. Do not assume kinetic energy is conserved unless the question states an elastic collision." }
  ],
  formula: [
    {
      name: "Momentum and impulse",
      expression: "p = m v \\quad J = F t = \\Delta p = m(v - u)",
      variables: [
        { symbol: "p", meaning: "momentum (kg·m/s)" },
        { symbol: "m", meaning: "mass (kg)" },
        { symbol: "v", meaning: "velocity (m/s)" },
        { symbol: "J", meaning: "impulse (N·s or kg·m/s)" },
        { symbol: "F", meaning: "average net force (N)" },
        { symbol: "t", meaning: "time (s)" },
        { symbol: "u", meaning: "initial velocity (m/s)" }
      ]
    },
    {
      name: "Conservation of momentum",
      expression: "m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2",
      variables: [
        { symbol: "m_1, m_2", meaning: "masses of the two bodies (kg)" },
        { symbol: "u_1, u_2", meaning: "velocities before collision (m/s)" },
        { symbol: "v_1, v_2", meaning: "velocities after collision (m/s)" }
      ]
    }
  ],
  workedExample: [
    {
      problem: "A 0.050 kg bullet moving at 200 m/s strikes a stationary 2.0 kg block and becomes embedded in it. Find the speed of the block and bullet just after impact.",
      solution: "Momentum before = 0.050 kg × 200 m/s + 2.0 kg × 0 = 10 kg·m/s. After impact total mass = 2.05 kg. Using conservation of momentum: 10 kg·m/s = 2.05 kg × v, so v ≈ 4.88 m/s.",
      answer: "≈ 4.9 m/s in the original direction of the bullet."
    },
    {
      problem: "A 60 kg sprinter increases her speed from 4.0 m/s to 7.0 m/s in 0.50 s. What average force acts on her?",
      solution: "Change in momentum = m(v − u) = 60 kg × (7.0 − 4.0) m/s = 180 kg·m/s. Impulse = F t, so F = 180 kg·m/s / 0.50 s = 360 N.",
      answer: "360 N."
    }
  ],
  commonMistakes: [
    "Forgetting that momentum is a vector and not assigning opposite signs to opposite directions.",
    "Using conservation of momentum when an external force such as friction is significant.",
    "Confusing elastic and inelastic collisions: kinetic energy is not conserved in inelastic collisions.",
    "Adding masses when objects bounce apart instead of applying conservation of momentum separately.",
    "Using impulse = force alone; it is force × time."
  ],
  examPoints: [
    "Units of momentum and impulse are equivalent: kg·m/s = N·s.",
    "In collision problems, write momentum for each body before and after, then equate totals.",
    "For explosions, total initial momentum is usually zero, so the fragments have equal and opposite momenta.",
    "FPSC often asks for recoil velocity after a gun is fired or for common velocity after a perfectly inelastic collision."
  ],
  limitCases: [
    { condition: "One object is much more massive than the other", result: "The massive object's velocity changes very little", physicalMeaning: "A truck hit by a cricket ball hardly moves; the ball rebounds with nearly reversed velocity." },
    { condition: "Perfectly inelastic collision (objects stick)", result: "Maximum kinetic energy is lost while momentum is conserved", physicalMeaning: "Objects share a common final velocity." }
  ],
  relatedTopics: ["phy-newtons-laws", "phy-work-energy", "phy-gravity-weight-friction"],
    subtopics: [
      {
        id: "phy-momentum-impulse-momentum-as-a-measure-of-motion",
        title: "Momentum as a measure of motion",
        summary: "A heavy truck moving slowly and a light bullet moving fast can have similar momenta. Because momentum is a vector, two objects moving in…",
        explanation: "A heavy truck moving slowly and a light bullet moving fast can have similar momenta. Because momentum is a vector, two objects moving in opposite directions have opposite momenta. A system with equal and opposite momenta has zero total momentum.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Momentum as a measure of motion” requires you to distinguish or calculate.",
            solution: "Use the core idea: A heavy truck moving slowly and a light bullet moving fast can have similar momenta. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Momentum as a measure of motion",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-momentum-impulse-impulse-and-change-in-momentum",
        title: "Impulse and change in momentum",
        summary: "The same change in momentum can be produced by a large force acting briefly or a small force acting for a long time. Airbags, crumple zones…",
        explanation: "The same change in momentum can be produced by a large force acting briefly or a small force acting for a long time. Airbags, crumple zones and cushioned floors increase stopping time, reducing peak force while producing the same impulse (change in momentum).",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Impulse and change in momentum” requires you to distinguish or calculate.",
            solution: "Use the core idea: The same change in momentum can be produced by a large force acting briefly or a small force acting for a long time. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Impulse and change in momentum",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-momentum-impulse-conservation-of-momentum",
        title: "Conservation of momentum",
        summary: "Momentum is conserved because Newton's Third Law makes internal forces in a system cancel in pairs. For collisions, set total momentum…",
        explanation: "Momentum is conserved because Newton's Third Law makes internal forces in a system cancel in pairs. For collisions, set total momentum before impact equal to total momentum after impact. Include direction with signs. This works for explosions too, where the total initial momentum is zero and the fragments move in opposite directions.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Conservation of momentum” requires you to distinguish or calculate.",
            solution: "Use the core idea: Momentum is conserved because Newton's Third Law makes internal forces in a system cancel in pairs. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Conservation of momentum",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-momentum-impulse-elastic-vs-inelastic-collisions",
        title: "Elastic vs inelastic collisions",
        summary: "Most everyday collisions are inelastic because some kinetic energy becomes sound, heat or deformation. Momentum is conserved in both types.…",
        explanation: "Most everyday collisions are inelastic because some kinetic energy becomes sound, heat or deformation. Momentum is conserved in both types. Do not assume kinetic energy is conserved unless the question states an elastic collision.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],

  content: true,
  buildsOn: ["phy-newtons-laws", "phy-kinematics"],
  leadsTo: ["phy-work-energy"],
  usedIn: ["phy-fluid-dynamics"]
},

// ============================= SECTION PHY-02: Work & Energy =============================
  {
    id: "phy-work-energy",
    sectionId: "PHY-02",
    order: 1,
    title: "Work, Energy & Conservation of Energy",
    definition: "Work is done when a force causes a displacement in the direction of the force. Energy is the capacity to do work. The work-energy theorem states that net work done equals the change in kinetic energy; in a closed system total mechanical energy is conserved when only conservative forces act.",
    keyFacts: [
      "Work W = F s cos θ, where θ is the angle between the force and displacement; SI unit is the joule (J).",
      "No work is done by a force perpendicular to displacement (θ = 90°, cos θ = 0).",
      "Kinetic energy KE = ½ m v²; it depends on speed squared.",
      "Gravitational potential energy near Earth PE = m g h, measured relative to a chosen zero level.",
      "Work-energy theorem: net work = change in kinetic energy = ΔKE.",
      "Mechanical energy is conserved if only gravity and elastic forces do work; friction converts mechanical energy to heat."
    ],
    explanationSections: [
      { heading: "When is work done?", body: "A force must produce a displacement in its own direction. Pushing a wall until you are tired does no work on the wall if the wall does not move. Carrying a suitcase horizontally does no work against gravity because the upward force is perpendicular to the horizontal displacement." },
      { heading: "Kinetic and potential energy", body: "Kinetic energy is energy of motion and is always positive. Gravitational potential energy depends on vertical height relative to a reference point. A book on a shelf has PE relative to the floor; if the floor reference changes, the PE value changes, but changes in PE are physically meaningful." },
      { heading: "Conservation of mechanical energy", body: "For a falling object or a swinging pendulum with negligible air resistance, KE + PE stays constant. At the highest point PE is maximum and KE is minimum; at the lowest point the reverse is true. Friction or air resistance means mechanical energy is not conserved; the lost energy appears as internal energy (heat) in the object and surroundings." },
      { heading: "How FPSC tests energy", body: "Common traps include asking for work done by a single force when friction is present, or assuming energy is conserved on rough surfaces. Always identify whether non-conservative forces such as friction do work." }
    ],
    formula: [
      {
        name: "Work",
        expression: "W = F s \\cos \\theta",
        variables: [
          { symbol: "W", meaning: "work (J)" },
          { symbol: "F", meaning: "force (N)" },
          { symbol: "s", meaning: "displacement (m)" },
          { symbol: "\\theta", meaning: "angle between force and displacement" }
        ]
      },
      {
        name: "Kinetic and gravitational potential energy",
        expression: "KE = \\frac{1}{2} m v^2 \\quad PE = m g h",
        variables: [
          { symbol: "KE", meaning: "kinetic energy (J)" },
          { symbol: "PE", meaning: "gravitational potential energy (J)" },
          { symbol: "m", meaning: "mass (kg)" },
          { symbol: "v", meaning: "speed (m/s)" },
          { symbol: "g", meaning: "gravitational field strength (N/kg)" },
          { symbol: "h", meaning: "vertical height (m)" }
        ]
      },
      {
        name: "Work-energy theorem",
        expression: "W_{net} = \\Delta KE = \\frac{1}{2} m v^2 - \\frac{1}{2} m u^2",
        variables: [
          { symbol: "W_{net}", meaning: "net work (J)" },
          { symbol: "u", meaning: "initial speed (m/s)" },
          { symbol: "v", meaning: "final speed (m/s)" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "A 2.0 kg box is pushed 5.0 m across a floor by a horizontal force of 12 N. A friction force of 4.0 N opposes the motion. Find (a) work done by the applied force, (b) work done by friction, (c) net work, and (d) the final speed if the box started from rest.",
        solution: "(a) W_applied = 12 N × 5.0 m = 60 J. (b) W_friction = −4.0 N × 5.0 m = −20 J (negative because friction opposes motion). (c) W_net = 60 J − 20 J = 40 J. (d) Using W_net = ΔKE = ½mv², 40 J = ½ × 2.0 kg × v², so v² = 40 and v = 6.3 m/s.",
        answer: "W_applied = 60 J; W_friction = −20 J; W_net = 40 J; final speed = 6.3 m/s."
      },
      {
        problem: "A 0.50 kg stone is thrown upward from ground level at 10 m/s. Neglecting air resistance, what is its maximum height?",
        solution: "At maximum height, kinetic energy is zero. Initial KE = ½ × 0.50 kg × (10 m/s)² = 25 J. This converts entirely to PE = m g h. So 25 J = 0.50 kg × 9.8 N/kg × h, giving h = 25 / 4.9 ≈ 5.1 m.",
        answer: "≈ 5.1 m."
      }
    ],
    commonMistakes: [
      "Using the full applied force in the work-energy theorem; use net work.",
      "Forgetting the cos θ factor when force and displacement are not parallel.",
      "Assuming mechanical energy is conserved when friction or air resistance is present.",
      "Using displacement along a slope as h in PE = mgh; h must be the vertical height.",
      "Confusing work done by gravity with work done by an external agent lifting an object; they have opposite signs."
    ],
    examPoints: [
      "1 J = 1 N·m = 1 kg·m²/s².",
      "Work is zero when force is perpendicular to displacement.",
      "On a frictionless incline, speed at the bottom depends only on vertical drop, not on slope angle.",
      "When friction acts, the work done against friction equals the loss of mechanical energy."
    ],
    limitCases: [
      { condition: "θ = 90°", result: "W = 0", physicalMeaning: "A vertical force does no work during horizontal motion." },
      { condition: "v = 0", result: "KE = 0", physicalMeaning: "A stationary object has no kinetic energy." },
      { condition: "Only gravity does work", result: "KE + PE = constant", physicalMeaning: "Mechanical energy is conserved." }
    ],

    subtopics: [
      {
        id: "phy-work-energy-when-is-work-done",
        title: "When is work done?",
        summary: "A force must produce a displacement in its own direction. Pushing a wall until you are tired does no work on the wall if the wall does not…",
        explanation: "A force must produce a displacement in its own direction. Pushing a wall until you are tired does no work on the wall if the wall does not move. Carrying a suitcase horizontally does no work against gravity because the upward force is perpendicular to the horizontal displacement.",
                examples: [
          {
            problem: "A runner completes one full 400 m circular track and stops at the start. What are the distance and displacement?",
            solution: "Distance is the path length = 400 m. Displacement is the change in position = 0 because start and finish coincide.",
            answer: "Distance 400 m; displacement 0",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-work-energy-kinetic-and-potential-energy",
        title: "Kinetic and potential energy",
        summary: "Kinetic energy is energy of motion and is always positive. Gravitational potential energy depends on vertical height relative to a…",
        explanation: "Kinetic energy is energy of motion and is always positive. Gravitational potential energy depends on vertical height relative to a reference point. A book on a shelf has PE relative to the floor; if the floor reference changes, the PE value changes, but changes in PE are physically meaningful.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-work-energy-conservation-of-mechanical-energy",
        title: "Conservation of mechanical energy",
        summary: "For a falling object or a swinging pendulum with negligible air resistance, KE + PE stays constant. At the highest point PE is maximum and…",
        explanation: "For a falling object or a swinging pendulum with negligible air resistance, KE + PE stays constant. At the highest point PE is maximum and KE is minimum; at the lowest point the reverse is true. Friction or air resistance means mechanical energy is not conserved; the lost energy appears as internal energy (heat) in the object and surroundings.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-work-energy-how-fpsc-tests-energy",
        title: "How FPSC tests energy",
        summary: "Common traps include asking for work done by a single force when friction is present, or assuming energy is conserved on rough surfaces.…",
        explanation: "Common traps include asking for work done by a single force when friction is present, or assuming energy is conserved on rough surfaces. Always identify whether non-conservative forces such as friction do work.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-power-efficiency", "phy-momentum-impulse", "phy-thermodynamics-laws"],
    content: true,
    buildsOn: ["phy-newtons-laws", "phy-kinematics", "math-2-3"],
    leadsTo: ["phy-power-efficiency", "phy-thermodynamics-laws"],
    usedIn: ["phy-heat-transfer-equilibrium", "meteo-heat-transfer", "meteo-adiabatic-cloud-formation", "env-ecosystem-structure-and-energy-flow", "env-energy-sources"]
  },

  {
    id: "phy-power-efficiency",
    sectionId: "PHY-02",
    order: 2,
    title: "Power & Efficiency",
    definition: "Power is the rate at which work is done or energy is transferred. Efficiency is the fraction of useful energy output compared with total energy input, usually expressed as a percentage.",
    keyFacts: [
      "Power P = work / time = energy transferred / time; SI unit is the watt (W), where 1 W = 1 J/s.",
      "A larger power means a given amount of work is done in a shorter time.",
      "Power can also be written as P = F v when a constant force F moves an object at speed v in the force's direction.",
      "Efficiency = (useful energy output / total energy input) × 100%.",
      "No real machine is 100% efficient because some energy is always wasted as heat, sound or friction.",
      "Energy is conserved overall; efficiency only measures how much input energy is converted to the desired form."
    ],
    explanationSections: [
      { heading: "Power as a rate", body: "Two cranes may lift the same load to the same height, doing the same work, but the more powerful crane finishes faster. Power tells you how quickly energy is transferred, not how much energy is transferred." },
      { heading: "Useful vs wasted energy", body: "In a car engine, only part of the chemical energy in fuel becomes kinetic energy of the car; the rest heats the engine, exhaust and surroundings. Efficiency is always less than 100% because of these unavoidable losses." },
      { heading: "The P = F v form", body: "When a vehicle climbs a hill at steady speed, the engine force balances gravity and resistance. A more powerful engine can maintain a higher speed for the same force. This form is useful when time is not directly given." },
      { heading: "Efficiency calculations", body: "Efficiency compares useful output with total input. If a motor consumes 1 000 J of electrical energy and delivers 750 J of mechanical work, its efficiency is 75%. The wasted 250 J is not destroyed; it becomes heat and sound." }
    ],
    formula: [
      {
        name: "Power",
        expression: "P = \\frac{W}{t} = \\frac{E}{t} = F v",
        variables: [
          { symbol: "P", meaning: "power (W)" },
          { symbol: "W", meaning: "work (J)" },
          { symbol: "E", meaning: "energy transferred (J)" },
          { symbol: "t", meaning: "time (s)" },
          { symbol: "F", meaning: "force (N)" },
          { symbol: "v", meaning: "speed in the force's direction (m/s)" }
        ]
      },
      {
        name: "Efficiency",
        expression: "\\eta = \\frac{E_{out}}{E_{in}} \\times 100\\% = \\frac{P_{out}}{P_{in}} \\times 100\\%",
        variables: [
          { symbol: "\\eta", meaning: "efficiency (%)" },
          { symbol: "E_{out}", meaning: "useful energy output (J)" },
          { symbol: "E_{in}", meaning: "total energy input (J)" },
          { symbol: "P_{out}", meaning: "useful power output (W)" },
          { symbol: "P_{in}", meaning: "total power input (W)" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "A 50 kg student runs up a flight of stairs 4.0 m high in 5.0 s. Calculate his average power output.",
        solution: "Work done against gravity = m g h = 50 kg × 9.8 N/kg × 4.0 m = 1 960 J. Power = work/time = 1 960 J / 5.0 s = 392 W.",
        answer: "392 W (about 0.39 kW)."
      },
      {
        problem: "An electric motor uses 2.0 kW of electrical power and delivers 1.5 kW of mechanical power. Calculate its efficiency and the power wasted as heat.",
        solution: "Efficiency = (1.5 kW / 2.0 kW) × 100% = 75%. Wasted power = 2.0 kW − 1.5 kW = 0.50 kW = 500 W.",
        answer: "75% efficient; 500 W wasted."
      }
    ],
    commonMistakes: [
      "Confusing power with energy: power is the rate of energy transfer, not the amount.",
      "Forgetting that efficiency is always less than 100% for real machines.",
      "Using input power as output power in efficiency calculations.",
      "Ignoring the cos θ factor when using P = F v if force and velocity are not parallel.",
      "Writing efficiency as a decimal and then not multiplying by 100% when the question asks for a percentage."
    ],
    examPoints: [
      "1 kW = 1 000 W; 1 MW = 1 000 000 W.",
      "Efficiency can be calculated using energy or power because both are rates/amounts over the same time interval.",
      "The wasted energy is E_in − E_out, not destroyed; it becomes heat/sound.",
      "Human power output during strenuous exercise is typically a few hundred watts."
    ],
    comparisonTable: {
      headers: ["Quantity", "Definition", "SI unit", "Notes"],
      rows: [
        ["Work / Energy", "Force × displacement or capacity to do work", "J", "Scalar"],
        ["Power", "Work done per unit time", "W (J/s)", "Rate of energy transfer"],
        ["Efficiency", "Useful output / total input × 100%", "%", "Always ≤ 100%"]
      ]
    },

    subtopics: [
      {
        id: "phy-power-efficiency-power-as-a-rate",
        title: "Power as a rate",
        summary: "Two cranes may lift the same load to the same height, doing the same work, but the more powerful crane finishes faster. Power tells you how…",
        explanation: "Two cranes may lift the same load to the same height, doing the same work, but the more powerful crane finishes faster. Power tells you how quickly energy is transferred, not how much energy is transferred.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Power as a rate” requires you to distinguish or calculate.",
            solution: "Use the core idea: Two cranes may lift the same load to the same height, doing the same work, but the more powerful crane finishes faster. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Power as a rate",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-power-efficiency-useful-vs-wasted-energy",
        title: "Useful vs wasted energy",
        summary: "In a car engine, only part of the chemical energy in fuel becomes kinetic energy of the car; the rest heats the engine, exhaust and…",
        explanation: "In a car engine, only part of the chemical energy in fuel becomes kinetic energy of the car; the rest heats the engine, exhaust and surroundings. Efficiency is always less than 100% because of these unavoidable losses.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-power-efficiency-the-p-f-v-form",
        title: "The P = F v form",
        summary: "When a vehicle climbs a hill at steady speed, the engine force balances gravity and resistance. A more powerful engine can maintain a…",
        explanation: "When a vehicle climbs a hill at steady speed, the engine force balances gravity and resistance. A more powerful engine can maintain a higher speed for the same force. This form is useful when time is not directly given.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “The P = F v form” requires you to distinguish or calculate.",
            solution: "Use the core idea: When a vehicle climbs a hill at steady speed, the engine force balances gravity and resistance. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "The P = F v form",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-power-efficiency-efficiency-calculations",
        title: "Efficiency calculations",
        summary: "Efficiency compares useful output with total input. If a motor consumes 1 000 J of electrical energy and delivers 750 J of mechanical work,…",
        explanation: "Efficiency compares useful output with total input. If a motor consumes 1 000 J of electrical energy and delivers 750 J of mechanical work, its efficiency is 75%. The wasted 250 J is not destroyed; it becomes heat and sound.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Efficiency calculations” requires you to distinguish or calculate.",
            solution: "Use the core idea: Efficiency compares useful output with total input. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Efficiency calculations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-work-energy", "phy-circuits-power-energy"],
    content: true,
    buildsOn: ["phy-work-energy"],
    leadsTo: [],
    usedIn: ["env-energy-sources", "phy-circuits-power-energy"]
  },

// ============================= SECTION PHY-03: Fluids =============================

  {
    id: "phy-states-of-matter",
    sectionId: "PHY-03",
    order: 1,
    title: "States of Matter",
    definition: "Matter commonly exists as solid, liquid or gas. The state depends on how strongly the particles are held together by intermolecular forces and how much thermal energy they have.",
    keyFacts: [
      "Solids have fixed shape and volume; particles vibrate about fixed positions.",
      "Liquids have fixed volume but take the shape of their container; particles can slide past one another.",
      "Gases have neither fixed shape nor fixed volume; particles move freely and fill the available space.",
      "Plasma is an ionised gas found in stars, lightning and fluorescent tubes; it conducts electricity.",
      "Changes of state (melting, freezing, boiling, condensing, subliming) occur at constant temperature for a pure substance at a given pressure.",
      "During a change of state, the energy supplied or removed changes potential energy between particles, not their average kinetic energy."
    ],
    explanationSections: [
      { heading: "Why solids keep their shape", body: "In a solid, strong intermolecular forces hold particles in a regular lattice. The particles vibrate but do not move freely, so the solid retains a fixed shape and volume. Heating increases vibration until the solid melts." },
      { heading: "Liquids and gases compared", body: "A liquid can flow and take the shape of its container because its particles have enough energy to move past one another, but intermolecular attractions still keep them close. In a gas, particles are far apart and move rapidly in random motion; the gas expands to fill space." },
      { heading: "Change of state and latent heat", body: "When ice melts, the temperature stays at 0 °C until all the ice has turned to water. The supplied thermal energy weakens bonds rather than raising kinetic energy. This is why melting and boiling require latent heat." },
      { heading: "FPSC angle", body: "Questions often contrast the spacing and motion of particles in solids, liquids and gases, or ask which state has the highest internal energy at the same temperature. Remember that internal energy includes both kinetic and potential energy of particles." }
    ],
    commonMistakes: [
      "Thinking temperature rises during melting or boiling; for a pure substance it stays constant.",
      "Confusing evaporation (surface, any temperature) with boiling (throughout liquid, at boiling point).",
      "Assuming a gas has no mass; gases have mass and exert pressure.",
      "Forgetting that plasma is a distinct state of matter, not just hot gas."
    ],
    examPoints: [
      "Particle spacing: solid < liquid << gas.",
      "Boiling point depends on pressure; lower pressure means a lower boiling point.",
      "Sublimation is direct solid → gas (e.g. dry ice, iodine, naphthalene).",
      "Intermolecular forces are strongest in solids and weakest in gases."
    ],
    qualitativeScenarios: [
      {
        scenario: "What happens to the temperature of a mixture of ice and water left in a warm room?",
        answer: "It stays at 0 °C until all the ice melts.",
        why: "The incoming thermal energy is used as latent heat of fusion to break intermolecular bonds, not to raise kinetic energy (temperature)."
      }
    ],

    subtopics: [
      {
        id: "phy-states-of-matter-why-solids-keep-their-shape",
        title: "Why solids keep their shape",
        summary: "In a solid, strong intermolecular forces hold particles in a regular lattice. The particles vibrate but do not move freely, so the solid…",
        explanation: "In a solid, strong intermolecular forces hold particles in a regular lattice. The particles vibrate but do not move freely, so the solid retains a fixed shape and volume. Heating increases vibration until the solid melts.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Why solids keep their shape” requires you to distinguish or calculate.",
            solution: "Use the core idea: In a solid, strong intermolecular forces hold particles in a regular lattice. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Why solids keep their shape",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-states-of-matter-liquids-and-gases-compared",
        title: "Liquids and gases compared",
        summary: "A liquid can flow and take the shape of its container because its particles have enough energy to move past one another, but intermolecular…",
        explanation: "A liquid can flow and take the shape of its container because its particles have enough energy to move past one another, but intermolecular attractions still keep them close. In a gas, particles are far apart and move rapidly in random motion; the gas expands to fill space.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Liquids and gases compared” requires you to distinguish or calculate.",
            solution: "Use the core idea: A liquid can flow and take the shape of its container because its particles have enough energy to move past one another, but intermolecular attractions still keep them close. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Liquids and gases compared",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-states-of-matter-change-of-state-and-latent-heat",
        title: "Change of state and latent heat",
        summary: "When ice melts, the temperature stays at 0 °C until all the ice has turned to water. The supplied thermal energy weakens bonds rather than…",
        explanation: "When ice melts, the temperature stays at 0 °C until all the ice has turned to water. The supplied thermal energy weakens bonds rather than raising kinetic energy. This is why melting and boiling require latent heat.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-states-of-matter-fpsc-angle",
        title: "FPSC angle",
        summary: "Questions often contrast the spacing and motion of particles in solids, liquids and gases, or ask which state has the highest internal…",
        explanation: "Questions often contrast the spacing and motion of particles in solids, liquids and gases, or ask which state has the highest internal energy at the same temperature. Remember that internal energy includes both kinetic and potential energy of particles.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-density", "phy-temperature-heat", "phy-kinetic-theory"],
    content: true,
    buildsOn: ["phy-units-measurement"],
    leadsTo: ["phy-density", "phy-temperature-heat", "phy-kinetic-theory"],
    usedIn: ["phy-thermodynamics-laws", "meteo-moisture-metrics", "meteo-droplet-microphysics"]
  },

  {
    id: "phy-density",
    sectionId: "PHY-03",
    order: 2,
    title: "Density",
    definition: "Density is mass per unit volume. It is an intensive property that helps identify substances and explains whether objects float or sink in fluids.",
    keyFacts: [
      "Density ρ = mass / volume; SI unit is kg/m³.",
      "1 g/cm³ = 1 000 kg/m³.",
      "Density is characteristic of a material, not its total amount.",
      "An object floats in a fluid if its average density is less than the fluid's density.",
      "Density decreases when most substances are heated because volume expands while mass stays constant.",
      "Water is unusual: its density increases slightly as it is cooled from 4 °C to 0 °C, then decreases on freezing."
    ],
    explanationSections: [
      { heading: "Density as a material property", body: "A small iron nail and a large iron anvil have the same density. Density depends on how tightly mass is packed, not on how much material there is. To find density, measure mass and volume, then divide." },
      { heading: "Floating and sinking", body: "A solid iron block sinks in water because iron is denser than water. A ship made of steel floats because its overall volume contains a lot of air, so its average density is less than water. Ice floats because it is less dense than liquid water." },
      { heading: "Thermal expansion and density", body: "Heating usually makes a substance expand. Since mass is unchanged, the same mass occupies more volume, so density falls. This is why hot air rises and why warm surface water can sit above cooler water." },
      { heading: "Exam technique", body: "When a question mixes units (e.g. g and cm³), convert to kg and m³ before using SI formulas, or convert the answer correctly. Remember the factor 1 g/cm³ = 1 000 kg/m³." }
    ],
    formula: {
      name: "Density",
      expression: "\\rho = \\frac{m}{V}",
      variables: [
        { symbol: "\\rho", meaning: "density (kg/m³)" },
        { symbol: "m", meaning: "mass (kg)" },
        { symbol: "V", meaning: "volume (m³)" }
      ]
    },
    workedExample: [
      {
        problem: "A metal block has a mass of 270 g and a volume of 100 cm³. Calculate its density in kg/m³.",
        solution: "Mass = 270 g = 0.270 kg. Volume = 100 cm³ = 100 × 10⁻⁶ m³ = 1.0 × 10⁻⁴ m³. Density = 0.270 kg / 1.0 × 10⁻⁴ m³ = 2 700 kg/m³.",
        answer: "2 700 kg/m³ (aluminium)."
      }
    ],
    commonMistakes: [
      "Forgetting to convert g/cm³ to kg/m³ by multiplying by 1 000.",
      "Using total mass instead of mass per unit volume.",
      "Thinking density depends on size; it is an intensive property.",
      "Confusing density with weight."
    ],
    examPoints: [
      "Density of water is about 1 000 kg/m³ (or 1 g/cm³).",
      "Objects float when their average density is less than the surrounding fluid.",
      "When a solid dissolves, the total volume of the solution may not equal the sum of the separate volumes.",
      "Atmospheric density decreases rapidly with altitude."
    ],

    subtopics: [
      {
        id: "phy-density-density-as-a-material-property",
        title: "Density as a material property",
        summary: "A small iron nail and a large iron anvil have the same density. Density depends on how tightly mass is packed, not on how much material…",
        explanation: "A small iron nail and a large iron anvil have the same density. Density depends on how tightly mass is packed, not on how much material there is. To find density, measure mass and volume, then divide.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Density as a material property” requires you to distinguish or calculate.",
            solution: "Use the core idea: A small iron nail and a large iron anvil have the same density. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Density as a material property",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-density-floating-and-sinking",
        title: "Floating and sinking",
        summary: "A solid iron block sinks in water because iron is denser than water. A ship made of steel floats because its overall volume contains a lot…",
        explanation: "A solid iron block sinks in water because iron is denser than water. A ship made of steel floats because its overall volume contains a lot of air, so its average density is less than water. Ice floats because it is less dense than liquid water.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Floating and sinking” requires you to distinguish or calculate.",
            solution: "Use the core idea: A solid iron block sinks in water because iron is denser than water. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Floating and sinking",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-density-thermal-expansion-and-density",
        title: "Thermal expansion and density",
        summary: "Heating usually makes a substance expand. Since mass is unchanged, the same mass occupies more volume, so density falls. This is why hot…",
        explanation: "Heating usually makes a substance expand. Since mass is unchanged, the same mass occupies more volume, so density falls. This is why hot air rises and why warm surface water can sit above cooler water.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Thermal expansion and density” requires you to distinguish or calculate.",
            solution: "Use the core idea: Heating usually makes a substance expand. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Thermal expansion and density",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-density-exam-technique",
        title: "Exam technique",
        summary: "When a question mixes units (e.g. g and cm³), convert to kg and m³ before using SI formulas, or convert the answer correctly. Remember the…",
        explanation: "When a question mixes units (e.g. g and cm³), convert to kg and m³ before using SI formulas, or convert the answer correctly. Remember the factor 1 g/cm³ = 1 000 kg/m³.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Exam technique” requires you to distinguish or calculate.",
            solution: "Use the core idea: When a question mixes units (e.g. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Exam technique",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-states-of-matter", "phy-pressure-fluids", "phy-archimedes-principle"],
    content: true,
    buildsOn: ["phy-states-of-matter", "math-1-8", "math-2-2"],
    leadsTo: ["phy-pressure-fluids", "phy-archimedes-principle"],
    usedIn: ["phy-atmospheric-pressure-physics", "meteo-static-stability"]
  },

  {
    id: "phy-pressure-fluids",
    sectionId: "PHY-03",
    order: 3,
    title: "Pressure & Pressure in Fluids",
    definition: "Pressure is force per unit area acting perpendicular to a surface. In a fluid, pressure increases with depth and acts equally in all directions at a given point.",
    keyFacts: [
      "Pressure P = F / A; SI unit is the pascal (Pa), where 1 Pa = 1 N/m².",
      "Fluid pressure at depth h is P = ρ g h above the surface pressure.",
      "Pressure in a liquid depends on density, gravitational field and depth, not on the shape of the container.",
      "At a given depth, fluid pressure is the same in all directions (Pascal's principle).",
      "Atmospheric pressure at sea level is about 1.01 × 10⁵ Pa ≈ 101 kPa.",
      "Gauge pressure measures pressure above atmospheric; absolute pressure = gauge pressure + atmospheric pressure."
    ],
    explanationSections: [
      { heading: "Why pressure increases with depth", body: "The deeper you go in a fluid, the greater the weight of fluid above you. This extra weight produces extra pressure. The pressure depends on the vertical depth, not on the total amount of fluid or the container's shape." },
      { heading: "Pascal's principle", body: "Pressure applied to an enclosed fluid is transmitted undiminished to every portion of the fluid and to the walls of the container. This principle underlies hydraulic brakes, car jacks and hydraulic presses." },
      { heading: "Gauge vs absolute pressure", body: "A pressure gauge often reads zero at atmospheric pressure, so it shows gauge pressure. A flat tyre still has atmospheric air inside; its gauge pressure is zero but absolute pressure is about 101 kPa. Divers and engineers must be careful which one a problem asks for." },
      { heading: "Pressure and area", body: "A sharp knife cuts more easily than a blunt one because the same force is concentrated on a smaller area, giving a larger pressure. Conversely, snowshoes and camel feet spread weight over a large area to reduce pressure on soft ground." }
    ],
    formula: [
      {
        name: "Pressure",
        expression: "P = \\frac{F}{A}",
        variables: [
          { symbol: "P", meaning: "pressure (Pa)" },
          { symbol: "F", meaning: "force perpendicular to surface (N)" },
          { symbol: "A", meaning: "area (m²)" }
        ]
      },
      {
        name: "Pressure in a fluid at depth",
        expression: "P = \\rho g h",
        variables: [
          { symbol: "\\rho", meaning: "fluid density (kg/m³)" },
          { symbol: "g", meaning: "gravitational field strength (N/kg)" },
          { symbol: "h", meaning: "vertical depth (m)" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "A 60 kg woman stands on one high-heel shoe with a total contact area of 4.0 cm². Calculate the pressure she exerts on the floor.",
        solution: "Force = weight = m g = 60 kg × 9.8 N/kg = 588 N. Area = 4.0 cm² = 4.0 × 10⁻⁴ m². Pressure = 588 N / 4.0 × 10⁻⁴ m² = 1.47 × 10⁶ Pa.",
        answer: "1.47 × 10⁶ Pa (about 1.5 MPa)."
      },
      {
        problem: "Calculate the gauge pressure at a depth of 10 m in fresh water (ρ = 1 000 kg/m³). What is the absolute pressure at that depth if atmospheric pressure is 1.0 × 10⁵ Pa?",
        solution: "Gauge pressure = ρ g h = 1 000 kg/m³ × 9.8 N/kg × 10 m = 9.8 × 10⁴ Pa. Absolute pressure = 9.8 × 10⁴ Pa + 1.0 × 10⁵ Pa = 1.98 × 10⁵ Pa.",
        answer: "Gauge pressure = 9.8 × 10⁴ Pa; absolute pressure ≈ 2.0 × 10⁵ Pa."
      }
    ],
    commonMistakes: [
      "Confusing gauge pressure with absolute pressure.",
      "Using slant depth instead of vertical depth in P = ρgh.",
      "Forgetting that 1 cm² = 10⁻⁴ m² when converting area.",
      "Thinking pressure acts in a preferred direction; in a static fluid it acts equally in all directions.",
      "Adding pressures instead of finding the difference when asked for gauge pressure."
    ],
    examPoints: [
      "1 Pa = 1 N/m²; 1 kPa = 1 000 Pa; 1 MPa = 10⁶ Pa.",
      "Atmospheric pressure ≈ 1.01 × 10⁵ Pa at sea level.",
      "Hydraulic systems transmit pressure, not force; output force is multiplied by area ratio.",
      "Pressure at the same horizontal level in a connected static fluid is the same."
    ],
    limitCases: [
      { condition: "h = 0", result: "P = 0 gauge (or atmospheric absolute)", physicalMeaning: "At the free surface the only pressure is atmospheric." },
      { condition: "Area A very small", result: "Pressure very large for the same force", physicalMeaning: "Sharp points and stiletto heels produce high pressure." }
    ],

    subtopics: [
      {
        id: "phy-pressure-fluids-why-pressure-increases-with-depth",
        title: "Why pressure increases with depth",
        summary: "The deeper you go in a fluid, the greater the weight of fluid above you. This extra weight produces extra pressure. The pressure depends on…",
        explanation: "The deeper you go in a fluid, the greater the weight of fluid above you. This extra weight produces extra pressure. The pressure depends on the vertical depth, not on the total amount of fluid or the container's shape.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-pressure-fluids-pascal-s-principle",
        title: "Pascal's principle",
        summary: "Pressure applied to an enclosed fluid is transmitted undiminished to every portion of the fluid and to the walls of the container. This…",
        explanation: "Pressure applied to an enclosed fluid is transmitted undiminished to every portion of the fluid and to the walls of the container. This principle underlies hydraulic brakes, car jacks and hydraulic presses.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-pressure-fluids-gauge-vs-absolute-pressure",
        title: "Gauge vs absolute pressure",
        summary: "A pressure gauge often reads zero at atmospheric pressure, so it shows gauge pressure. A flat tyre still has atmospheric air inside; its…",
        explanation: "A pressure gauge often reads zero at atmospheric pressure, so it shows gauge pressure. A flat tyre still has atmospheric air inside; its gauge pressure is zero but absolute pressure is about 101 kPa. Divers and engineers must be careful which one a problem asks for.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-pressure-fluids-pressure-and-area",
        title: "Pressure and area",
        summary: "A sharp knife cuts more easily than a blunt one because the same force is concentrated on a smaller area, giving a larger pressure.…",
        explanation: "A sharp knife cuts more easily than a blunt one because the same force is concentrated on a smaller area, giving a larger pressure. Conversely, snowshoes and camel feet spread weight over a large area to reduce pressure on soft ground.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-density", "phy-atmospheric-pressure-physics", "phy-archimedes-principle"],
    content: true,
    buildsOn: ["phy-density", "phy-units-measurement"],
    leadsTo: ["phy-atmospheric-pressure-physics", "phy-archimedes-principle", "phy-fluid-dynamics"],
    usedIn: ["meteo-hydrostatic-equation", "meteo-pressure-instruments"]
  },

  {
    id: "phy-atmospheric-pressure-physics",
    sectionId: "PHY-03",
    order: 4,
    title: "Atmospheric Pressure as a Physics Concept",
    definition: "Atmospheric pressure is the pressure exerted by the weight of the air above a surface. It decreases with altitude because the column of air above becomes shorter and less dense.",
    keyFacts: [
      "Atmospheric pressure is caused by the weight of air molecules in Earth's gravitational field.",
      "Standard atmospheric pressure at sea level is 101 325 Pa, often approximated as 1.01 × 10⁵ Pa.",
      "Atmospheric pressure decreases with increasing altitude; it is roughly halved about every 5.5 km in the lower atmosphere.",
      "A barometer measures atmospheric pressure; mercury barometers express pressure in mmHg (760 mmHg ≈ 1 atm).",
      "An aneroid barometer uses a partially evacuated metal box that bends as pressure changes.",
      "Pressure differences in the atmosphere drive wind (meteorology treats this in detail)."
    ],
    explanationSections: [
      { heading: "Why the atmosphere exerts pressure", body: "Air has mass. Gravity pulls air molecules downward, so the air above any surface pushes on it. At sea level the weight of the entire air column produces about 101 kPa, equivalent to about 10 N pressing on every square centimetre." },
      { heading: "Altitude dependence", body: "As altitude increases, there is less air above, so atmospheric pressure falls. The rate of decrease is not uniform because air is compressible and density also decreases with height. This is why mountaintops have lower boiling points for water." },
      { heading: "Barometers", body: "A mercury barometer balances atmospheric pressure against the pressure due to a column of mercury. At sea level the mercury column is about 760 mm high. Aneroid barometers are more portable and are used in aircraft altimeters and weather stations." },
      { heading: "Physics vs meteorology", body: "Physics explains the origin of atmospheric pressure and the hydrostatic equation; meteorology applies these to weather systems, pressure gradients and wind. The boundary is clean: learn the general law here, the atmospheric application in Meteorology." }
    ],
    formula: {
      name: "Pressure-altitude relation (approximate)",
      expression: "\\Delta P \\approx \\rho g \\Delta h",
      variables: [
        { symbol: "\\Delta P", meaning: "pressure change (Pa)" },
        { symbol: "\\rho", meaning: "average air density (kg/m³)" },
        { symbol: "g", meaning: "gravitational field strength (N/kg)" },
        { symbol: "\\Delta h", meaning: "vertical height change (m)" }
      ]
    },
    workedExample: [
      {
        problem: "Atmospheric pressure at sea level is 1.01 × 10⁵ Pa. Taking the density of air as 1.2 kg/m³, estimate the pressure difference between sea level and the top of a 300 m hill.",
        solution: "ΔP = ρ g Δh = 1.2 kg/m³ × 9.8 N/kg × 300 m = 3 528 Pa ≈ 3.5 × 10³ Pa. Pressure at hilltop ≈ 1.01 × 10⁵ Pa − 3.5 × 10³ Pa = 9.75 × 10⁴ Pa.",
        answer: "≈ 9.75 × 10⁴ Pa (or about 97.5 kPa)."
      }
    ],
    commonMistakes: [
      "Thinking atmospheric pressure acts only downward; it acts in all directions.",
      "Confusing pressure units: 1 atm = 101 325 Pa = 760 mmHg.",
      "Assuming pressure decreases linearly with altitude over large height ranges.",
      "Forgetting that a barometer measures atmospheric pressure, not wind speed."
    ],
    examPoints: [
      "Atmospheric pressure is due to the weight of air, not because air is 'pushing down' in a special way.",
      "Standard atmospheric pressure supports a 760 mm mercury column.",
      "Lower atmospheric pressure at high altitude lowers the boiling point of water.",
      "Aneroid barometers are used in altimeters because pressure decreases with height."
    ],

    subtopics: [
      {
        id: "phy-atmospheric-pressure-physics-why-the-atmosphere-exerts-pressure",
        title: "Why the atmosphere exerts pressure",
        summary: "Air has mass. Gravity pulls air molecules downward, so the air above any surface pushes on it. At sea level the weight of the entire air…",
        explanation: "Air has mass. Gravity pulls air molecules downward, so the air above any surface pushes on it. At sea level the weight of the entire air column produces about 101 kPa, equivalent to about 10 N pressing on every square centimetre.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-atmospheric-pressure-physics-altitude-dependence",
        title: "Altitude dependence",
        summary: "As altitude increases, there is less air above, so atmospheric pressure falls. The rate of decrease is not uniform because air is…",
        explanation: "As altitude increases, there is less air above, so atmospheric pressure falls. The rate of decrease is not uniform because air is compressible and density also decreases with height. This is why mountaintops have lower boiling points for water.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-atmospheric-pressure-physics-barometers",
        title: "Barometers",
        summary: "A mercury barometer balances atmospheric pressure against the pressure due to a column of mercury. At sea level the mercury column is about…",
        explanation: "A mercury barometer balances atmospheric pressure against the pressure due to a column of mercury. At sea level the mercury column is about 760 mm high. Aneroid barometers are more portable and are used in aircraft altimeters and weather stations.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-atmospheric-pressure-physics-physics-vs-meteorology",
        title: "Physics vs meteorology",
        summary: "Physics explains the origin of atmospheric pressure and the hydrostatic equation; meteorology applies these to weather systems, pressure…",
        explanation: "Physics explains the origin of atmospheric pressure and the hydrostatic equation; meteorology applies these to weather systems, pressure gradients and wind. The boundary is clean: learn the general law here, the atmospheric application in Meteorology.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-pressure-fluids", "meteo-pressure-instruments"],
    content: true,
    buildsOn: ["phy-pressure-fluids", "phy-units-measurement"],
    leadsTo: ["meteo-hydrostatic-equation"],
    usedIn: ["meteo-hydrostatic-equation", "meteo-pressure-instruments", "env-air-pollution"]
  },

  {
    id: "phy-archimedes-principle",
    sectionId: "PHY-03",
    order: 5,
    title: "Archimedes' Principle & Buoyancy",
    definition: "Archimedes' principle states that the upward buoyant force on a body immersed in a fluid equals the weight of the fluid displaced by the body.",
    keyFacts: [
      "Buoyant force F_B = weight of displaced fluid = ρ_fluid V_displaced g.",
      "The buoyant force acts vertically upward through the centre of buoyancy.",
      "A body floats if its weight equals the weight of fluid it can displace when fully submerged.",
      "A floating object displaces a volume of fluid whose weight equals the object's own weight.",
      "An object sinks if its average density is greater than the fluid's density.",
      "The principle applies to all fluids, including liquids and gases."
    ],
    explanationSections: [
      { heading: "Why buoyancy occurs", body: "Pressure in a fluid increases with depth. The upward pressure on the bottom of a submerged object is greater than the downward pressure on its top, producing a net upward force. This force equals the weight of the fluid that would occupy the object's volume." },
      { heading: "Floating condition", body: "An object floats when the buoyant force equals its weight. A floating ship displaces enough water so that the weight of that water equals the ship's weight. If the ship is loaded, it sinks deeper and displaces more water." },
      { heading: "Apparent weight", body: "When an object is immersed, its apparent weight is its true weight minus the buoyant force. This is why objects feel lighter in water. A spring balance reads less when a mass is submerged." },
      { heading: "Application to gases", body: "A helium balloon rises because the buoyant force due to the displaced air is greater than the weight of the balloon and helium. Hot-air balloons rise because heated air inside is less dense than the cooler air outside." }
    ],
    formula: {
      name: "Archimedes' principle",
      expression: "F_B = \\rho_{fluid} \\times V_{displaced} \\times g",
      variables: [
        { symbol: "F_B", meaning: "buoyant force (N)" },
        { symbol: "\\rho_{fluid}", meaning: "density of fluid (kg/m³)" },
        { symbol: "V_{displaced}", meaning: "volume of displaced fluid (m³)" },
        { symbol: "g", meaning: "gravitational field strength (N/kg)" }
      ]
    },
    workedExample: [
      {
        problem: "A solid metal block of volume 2.0 × 10⁻⁴ m³ is fully immersed in water of density 1 000 kg/m³. Calculate the buoyant force.",
        solution: "F_B = ρ V g = 1 000 kg/m³ × 2.0 × 10⁻⁴ m³ × 9.8 N/kg = 1.96 N.",
        answer: "1.96 N upward."
      },
      {
        problem: "A wooden block of volume 5.0 × 10⁻⁴ m³ and density 600 kg/m³ floats in water. What fraction of its volume is submerged?",
        solution: "Mass of block = 600 kg/m³ × 5.0 × 10⁻⁴ m³ = 0.30 kg. Weight = 0.30 kg × 9.8 N/kg = 2.94 N. For floating, weight of displaced water = 2.94 N, so displaced volume = 2.94 N / (1 000 kg/m³ × 9.8 N/kg) = 3.0 × 10⁻⁴ m³. Fraction submerged = 3.0/5.0 = 0.60.",
        answer: "60% submerged."
      }
    ],
    commonMistakes: [
      "Using the density of the object instead of the density of the fluid in the buoyancy formula.",
      "Forgetting that only the submerged volume displaces fluid.",
      "Confusing buoyant force with the weight of the object.",
      "Assuming a floating object displaces its own volume of fluid; it displaces a volume whose weight equals its own weight."
    ],
    examPoints: [
      "Buoyant force depends on fluid density and displaced volume, not on the object's depth once fully submerged.",
      "Objects float, sink or remain suspended according to whether their average density is less than, greater than or equal to the fluid density.",
      "Ships float because their average density (steel + air) is less than water.",
      "Buoyancy explains why it is easier to lift an object underwater."
    ],
    qualitativeScenarios: [
      {
        scenario: "A block of ice is floating in a glass of water. What happens to the water level when the ice melts?",
        answer: "The water level stays the same.",
        why: "The floating ice displaces a volume of water whose weight equals the ice's weight. When it melts, it becomes exactly that volume of water."
      }
    ],

    subtopics: [
      {
        id: "phy-archimedes-principle-why-buoyancy-occurs",
        title: "Why buoyancy occurs",
        summary: "Pressure in a fluid increases with depth. The upward pressure on the bottom of a submerged object is greater than the downward pressure on…",
        explanation: "Pressure in a fluid increases with depth. The upward pressure on the bottom of a submerged object is greater than the downward pressure on its top, producing a net upward force. This force equals the weight of the fluid that would occupy the object's volume.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-archimedes-principle-floating-condition",
        title: "Floating condition",
        summary: "An object floats when the buoyant force equals its weight. A floating ship displaces enough water so that the weight of that water equals…",
        explanation: "An object floats when the buoyant force equals its weight. A floating ship displaces enough water so that the weight of that water equals the ship's weight. If the ship is loaded, it sinks deeper and displaces more water.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Floating condition” requires you to distinguish or calculate.",
            solution: "Use the core idea: An object floats when the buoyant force equals its weight. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Floating condition",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-archimedes-principle-apparent-weight",
        title: "Apparent weight",
        summary: "When an object is immersed, its apparent weight is its true weight minus the buoyant force. This is why objects feel lighter in water. A…",
        explanation: "When an object is immersed, its apparent weight is its true weight minus the buoyant force. This is why objects feel lighter in water. A spring balance reads less when a mass is submerged.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Apparent weight” requires you to distinguish or calculate.",
            solution: "Use the core idea: When an object is immersed, its apparent weight is its true weight minus the buoyant force. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Apparent weight",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-archimedes-principle-application-to-gases",
        title: "Application to gases",
        summary: "A helium balloon rises because the buoyant force due to the displaced air is greater than the weight of the balloon and helium. Hot-air…",
        explanation: "A helium balloon rises because the buoyant force due to the displaced air is greater than the weight of the balloon and helium. Hot-air balloons rise because heated air inside is less dense than the cooler air outside.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Application to gases” requires you to distinguish or calculate.",
            solution: "Use the core idea: A helium balloon rises because the buoyant force due to the displaced air is greater than the weight of the balloon and helium. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Application to gases",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-density", "phy-pressure-fluids", "phy-gravity-weight-friction"],
    content: true,
    buildsOn: ["phy-density", "phy-pressure-fluids", "phy-gravity-weight-friction"],
    leadsTo: ["phy-fluid-dynamics"],
    usedIn: ["meteo-static-stability", "meteo-adiabatic-cloud-formation"]
  },

  {
    id: "phy-fluid-dynamics",
    sectionId: "PHY-03",
    order: 6,
    title: "Bernoulli's Principle & Fluid Dynamics",
    definition: "Fluid dynamics studies moving fluids. Bernoulli's principle states that for a steady, incompressible, non-viscous flow, an increase in fluid speed occurs together with a decrease in pressure or potential energy per unit volume.",
    keyFacts: [
      "The equation of continuity: A₁ v₁ = A₂ v₂ for an incompressible fluid; speed increases when cross-sectional area decreases.",
      "Bernoulli's principle: where fluid speed is high, pressure is low, and vice versa.",
      "Bernoulli's equation: P + ½ρv² + ρgh = constant along a streamline.",
      "The principle applies best to steady, non-turbulent, low-viscosity flows.",
      "Lift on an aircraft wing is partly explained by lower pressure above the wing where air moves faster.",
      "A Venturi meter uses a constriction to measure flow speed from pressure difference."
    ],
    explanationSections: [
      { heading: "Continuity: narrowing speeds up flow", body: "For an incompressible fluid, the volume flow rate is constant. If a pipe narrows, the same volume must pass through a smaller area each second, so the fluid must speed up. This is why water shoots faster from a narrow nozzle." },
      { heading: "Bernoulli's principle qualitatively", body: "Faster-moving fluid has lower pressure sideways because some of the pressure energy has been converted to kinetic energy. This explains why a sheet of paper lifts when you blow over it, why shower curtains move inward and why aircraft wings generate lift." },
      { heading: "Limitations", body: "Bernoulli's principle ignores viscosity, turbulence and compressibility. It is a good approximation for water and for air at low speeds, but not for supersonic flight or very viscous fluids like honey." },
      { heading: "FPSC-style applications", body: "Expect qualitative questions: a ping-pong ball stays in an upward air jet because low pressure on the sides traps it; a fast-moving train creates low pressure that can pull objects toward the track. Numerical Bernoulli problems at FPSC level are usually simple." }
    ],
    formula: [
      {
        name: "Equation of continuity",
        expression: "A_1 v_1 = A_2 v_2",
        variables: [
          { symbol: "A", meaning: "cross-sectional area (m²)" },
          { symbol: "v", meaning: "fluid speed (m/s)" }
        ]
      },
      {
        name: "Bernoulli's equation",
        expression: "P + \\frac{1}{2} \\rho v^2 + \\rho g h = \\text{constant}",
        variables: [
          { symbol: "P", meaning: "pressure (Pa)" },
          { symbol: "\\rho", meaning: "fluid density (kg/m³)" },
          { symbol: "v", meaning: "speed (m/s)" },
          { symbol: "g", meaning: "gravitational field strength (N/kg)" },
          { symbol: "h", meaning: "height (m)" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "Water flows through a pipe of cross-sectional area 8.0 cm² at 2.0 m/s. The pipe narrows to 4.0 cm². What is the speed in the narrow section?",
        solution: "Using A₁v₁ = A₂v₂: 8.0 cm² × 2.0 m/s = 4.0 cm² × v₂, so v₂ = (8.0 × 2.0)/4.0 = 4.0 m/s.",
        answer: "4.0 m/s."
      }
    ],
    commonMistakes: [
      "Applying Bernoulli's principle to turbulent or viscous flows without caution.",
      "Thinking pressure always pushes a fluid; pressure gradients cause acceleration.",
      "Confusing speed with pressure: high speed means lower pressure, not higher.",
      "Forgetting that Bernoulli's equation applies along a streamline."
    ],
    examPoints: [
      "Equation of continuity is essentially conservation of volume for incompressible flow.",
      "Bernoulli's principle explains lift, spray atomisers, Venturi meters and fast-train suction.",
      "Pressure is lower where streamlines are closer together (higher speed).",
      "Real fluids have viscosity, which causes energy losses and is ignored in ideal Bernoulli flow."
    ],

    subtopics: [
      {
        id: "phy-fluid-dynamics-continuity-narrowing-speeds-up-flow",
        title: "Continuity: narrowing speeds up flow",
        summary: "For an incompressible fluid, the volume flow rate is constant. If a pipe narrows, the same volume must pass through a smaller area each…",
        explanation: "For an incompressible fluid, the volume flow rate is constant. If a pipe narrows, the same volume must pass through a smaller area each second, so the fluid must speed up. This is why water shoots faster from a narrow nozzle.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Continuity: narrowing speeds up flow” requires you to distinguish or calculate.",
            solution: "Use the core idea: For an incompressible fluid, the volume flow rate is constant. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Continuity: narrowing speeds up flow",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-fluid-dynamics-bernoulli-s-principle-qualitatively",
        title: "Bernoulli's principle qualitatively",
        summary: "Faster-moving fluid has lower pressure sideways because some of the pressure energy has been converted to kinetic energy. This explains why…",
        explanation: "Faster-moving fluid has lower pressure sideways because some of the pressure energy has been converted to kinetic energy. This explains why a sheet of paper lifts when you blow over it, why shower curtains move inward and why aircraft wings generate lift.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-fluid-dynamics-limitations",
        title: "Limitations",
        summary: "Bernoulli's principle ignores viscosity, turbulence and compressibility. It is a good approximation for water and for air at low speeds,…",
        explanation: "Bernoulli's principle ignores viscosity, turbulence and compressibility. It is a good approximation for water and for air at low speeds, but not for supersonic flight or very viscous fluids like honey.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Limitations” requires you to distinguish or calculate.",
            solution: "Use the core idea: Bernoulli's principle ignores viscosity, turbulence and compressibility. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Limitations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-fluid-dynamics-fpsc-style-applications",
        title: "FPSC-style applications",
        summary: "Expect qualitative questions: a ping-pong ball stays in an upward air jet because low pressure on the sides traps it; a fast-moving train…",
        explanation: "Expect qualitative questions: a ping-pong ball stays in an upward air jet because low pressure on the sides traps it; a fast-moving train creates low pressure that can pull objects toward the track. Numerical Bernoulli problems at FPSC level are usually simple.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-pressure-fluids", "phy-momentum-impulse", "phy-archimedes-principle"],
    content: true,
    buildsOn: ["phy-pressure-fluids", "phy-momentum-impulse"],
    leadsTo: [],
    usedIn: ["meteo-adiabatic-cloud-formation"]
  },

// ============================= SECTION PHY-04: Heat =============================

  {
    id: "phy-temperature-heat",
    sectionId: "PHY-04",
    order: 1,
    title: "Temperature, Heat & Specific Heat Capacity",
    definition: "Temperature is a measure of the average kinetic energy of the particles in a substance. Heat is energy transferred from a hotter body to a colder body because of the temperature difference. Specific heat capacity is the amount of heat needed to raise the temperature of 1 kg of a substance by 1 °C.",
    keyFacts: [
      "Temperature is measured in °C or K; it indicates hotness, not total energy content.",
      "Heat is energy in transit; SI unit is the joule (J).",
      "Specific heat capacity c: Q = m c ΔT; SI unit J/(kg·°C).",
      "Water has a very high specific heat capacity (~4 200 J/(kg·°C)), so it resists temperature changes.",
      "Heat flows spontaneously from higher temperature to lower temperature until thermal equilibrium is reached.",
      "The amount of heat needed to change temperature depends on mass, specific heat capacity and temperature change."
    ],
    explanationSections: [
      { heading: "Heat vs temperature", body: "A cup of coffee at 80 °C has a higher temperature than a swimming pool at 25 °C, but the pool contains far more internal energy because it has much more mass. Temperature measures the average kinetic energy per particle; heat is the energy transferred due to a temperature difference." },
      { heading: "Specific heat capacity", body: "Substances with high specific heat capacity need a lot of heat for a small temperature rise. Water's high value moderates coastal climates: the sea warms slowly by day and cools slowly by night. Metals heat and cool quickly because their specific heat capacities are low." },
      { heading: "Thermal equilibrium", body: "When two bodies are in contact, heat flows from the hotter to the colder until their temperatures become equal. At equilibrium, there is no net heat flow, although particles still exchange energy randomly." },
      { heading: "Method of mixtures", body: "In a calorimetry problem, heat lost by the hot body equals heat gained by the cold body and container, assuming no heat escapes. Write Q_lost = Q_gained, substitute Q = mcΔT for each part, and solve for the unknown temperature." }
    ],
    formula: {
      name: "Specific heat capacity",
      expression: "Q = m c \\Delta T",
      variables: [
        { symbol: "Q", meaning: "heat transferred (J)" },
        { symbol: "m", meaning: "mass (kg)" },
        { symbol: "c", meaning: "specific heat capacity (J/(kg·°C))" },
        { symbol: "\\Delta T", meaning: "temperature change (°C or K)" }
      ]
    },
    workedExample: [
      {
        problem: "How much heat is needed to raise the temperature of 0.50 kg of water from 20 °C to 80 °C? (c_water = 4 200 J/(kg·°C).)",
        solution: "ΔT = 80 °C − 20 °C = 60 °C. Q = m c ΔT = 0.50 kg × 4 200 J/(kg·°C) × 60 °C = 126 000 J.",
        answer: "126 kJ."
      },
      {
        problem: "A 0.20 kg metal block at 100 °C is dropped into 0.50 kg of water at 20 °C. The final temperature is 24 °C. Calculate the specific heat capacity of the metal, neglecting heat losses.",
        solution: "Heat lost by metal = m_m c_m (100 − 24). Heat gained by water = 0.50 × 4 200 × (24 − 20) = 8 400 J. So 0.20 × c_m × 76 = 8 400, giving c_m = 8 400 / 15.2 ≈ 553 J/(kg·°C).",
        answer: "≈ 550 J/(kg·°C)."
      }
    ],
    commonMistakes: [
      "Using heat and temperature as synonyms; heat is energy transfer, temperature is a property.",
      "Forgetting that ΔT is the same in °C and K, so no conversion is needed for differences.",
      "Using the wrong specific heat capacity (e.g. water value for a metal).",
      "Ignoring the mass of the container in calorimetry problems when it is given.",
      "Adding initial temperatures instead of finding the equilibrium temperature."
    ],
    examPoints: [
      "Water's specific heat capacity is about 4 200 J/(kg·°C); most metals are much lower.",
      "In an isolated mixture, heat lost = heat gained.",
      "Temperature differences have the same numerical value in °C and K.",
      "High specific heat capacity means the substance changes temperature slowly."
    ],
    comparisonTable: {
      headers: ["Concept", "Temperature", "Heat"],
      rows: [
        ["Meaning", "Average kinetic energy per particle", "Energy transferred due to ΔT"],
        ["SI unit", "°C or K", "J"],
        ["Type", "Intensive property", "Energy in transit"],
        ["Depends on mass?", "No", "Yes"],
        ["Measured by", "Thermometer", "Calorimetry"]
      ]
    },
    misconceptionRemediation: [
      {
        misconception: "A bucket of cold water and a cup of hot water mixed must give a temperature exactly halfway between the two.",
        whyStudentsThinkIt: "The halfway value is the simple average of the two temperatures.",
        correctModel: "The equilibrium temperature depends on the masses and specific heat capacities. Heat lost by hot water equals heat gained by cold water, and if masses differ, the final temperature is weighted toward the larger mass."
      }
    ],

    subtopics: [
      {
        id: "phy-temperature-heat-heat-vs-temperature",
        title: "Heat vs temperature",
        summary: "A cup of coffee at 80 °C has a higher temperature than a swimming pool at 25 °C, but the pool contains far more internal energy because it…",
        explanation: "A cup of coffee at 80 °C has a higher temperature than a swimming pool at 25 °C, but the pool contains far more internal energy because it has much more mass. Temperature measures the average kinetic energy per particle; heat is the energy transferred due to a temperature difference.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-temperature-heat-specific-heat-capacity",
        title: "Specific heat capacity",
        summary: "Substances with high specific heat capacity need a lot of heat for a small temperature rise. Water's high value moderates coastal climates:…",
        explanation: "Substances with high specific heat capacity need a lot of heat for a small temperature rise. Water's high value moderates coastal climates: the sea warms slowly by day and cools slowly by night. Metals heat and cool quickly because their specific heat capacities are low.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Specific heat capacity” requires you to distinguish or calculate.",
            solution: "Use the core idea: Substances with high specific heat capacity need a lot of heat for a small temperature rise. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Specific heat capacity",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-temperature-heat-thermal-equilibrium",
        title: "Thermal equilibrium",
        summary: "When two bodies are in contact, heat flows from the hotter to the colder until their temperatures become equal. At equilibrium, there is no…",
        explanation: "When two bodies are in contact, heat flows from the hotter to the colder until their temperatures become equal. At equilibrium, there is no net heat flow, although particles still exchange energy randomly.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Thermal equilibrium” requires you to distinguish or calculate.",
            solution: "Use the core idea: When two bodies are in contact, heat flows from the hotter to the colder until their temperatures become equal. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Thermal equilibrium",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-temperature-heat-method-of-mixtures",
        title: "Method of mixtures",
        summary: "In a calorimetry problem, heat lost by the hot body equals heat gained by the cold body and container, assuming no heat escapes. Write…",
        explanation: "In a calorimetry problem, heat lost by the hot body equals heat gained by the cold body and container, assuming no heat escapes. Write Q_lost = Q_gained, substitute Q = mcΔT for each part, and solve for the unknown temperature.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Method of mixtures” requires you to distinguish or calculate.",
            solution: "Use the core idea: In a calorimetry problem, heat lost by the hot body equals heat gained by the cold body and container, assuming no heat escapes. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Method of mixtures",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-states-of-matter", "phy-thermal-expansion", "phy-thermodynamics-laws"],
    content: true,
    buildsOn: ["phy-states-of-matter", "phy-units-measurement", "math-2-2"],
    leadsTo: ["phy-thermal-expansion", "phy-heat-transfer-equilibrium", "phy-thermodynamics-laws"],
    usedIn: ["phy-heat-transfer-mechanisms", "meteo-heat-transfer", "meteo-lapse-rates", "env-climate-change-response"]
  },

  {
    id: "phy-thermal-expansion",
    sectionId: "PHY-04",
    order: 2,
    title: "Thermal Expansion",
    definition: "Most substances expand when heated and contract when cooled. Thermal expansion is the increase in length, area or volume of a material due to a rise in temperature.",
    keyFacts: [
      "Linear expansion: ΔL = α L₀ ΔT, where α is the coefficient of linear expansion.",
      "Volume expansion: ΔV = β V₀ ΔT, where β ≈ 3α for isotropic solids.",
      "Gases expand much more than solids or liquids for the same temperature rise.",
      "Thermal expansion is used in bimetallic strips, thermometers and expansion joints.",
      "Water contracts as it cools from 4 °C to 0 °C, then expands on freezing; this is anomalous behaviour.",
      "Expansion must be allowed for in bridges, railway tracks and pipelines."
    ],
    explanationSections: [
      { heading: "Why expansion occurs", body: "When heated, particles vibrate with greater amplitude. On average, they take up slightly more space, making the material expand. In solids the expansion is small but significant over large structures." },
      { heading: "Linear, area and volume expansion", body: "For a rod, length increases proportionally to temperature change. For a sheet, area increases approximately as ΔA = 2α A₀ ΔT. For a solid block, volume increases as ΔV = 3α V₀ ΔT. Liquids expand in volume only." },
      { heading: "Anomalous expansion of water", body: "Water contracts as it cools from room temperature to 4 °C, reaching maximum density at 4 °C. Below 4 °C it expands as it approaches freezing. This is why ice floats and why deep lakes stay near 4 °C in winter." },
      { heading: "Practical applications", body: "Bimetallic strips bend when heated because the two metals expand by different amounts, making them useful in thermostats. Expansion gaps in railway tracks and bridges prevent buckling in hot weather." }
    ],
    formula: {
      name: "Linear and volume expansion",
      expression: "\\Delta L = \\alpha L_0 \\Delta T \\quad \\Delta V = \\beta V_0 \\Delta T",
      variables: [
        { symbol: "\\Delta L", meaning: "change in length (m)" },
        { symbol: "\\alpha", meaning: "coefficient of linear expansion (°C⁻¹ or K⁻¹)" },
        { symbol: "L_0", meaning: "original length (m)" },
        { symbol: "\\Delta T", meaning: "temperature change (°C or K)" },
        { symbol: "\\Delta V", meaning: "change in volume (m³)" },
        { symbol: "\\beta", meaning: "coefficient of volume expansion (≈ 3α for solids)" },
        { symbol: "V_0", meaning: "original volume (m³)" }
      ]
    },
    workedExample: [
      {
        problem: "A steel railway track is 20 m long at 10 °C. If the coefficient of linear expansion of steel is 1.2 × 10⁻⁵ °C⁻¹, how much longer is the track on a 40 °C day?",
        solution: "ΔL = α L₀ ΔT = 1.2 × 10⁻⁵ °C⁻¹ × 20 m × (40 − 10) °C = 7.2 × 10⁻³ m.",
        answer: "7.2 mm longer."
      }
    ],
    commonMistakes: [
      "Using Celsius temperature instead of temperature change in expansion formulas.",
      "Confusing linear expansion with volume expansion.",
      "Forgetting that β ≈ 3α for isotropic solids.",
      "Assuming all substances expand on heating; water below 4 °C contracts."
    ],
    examPoints: [
      "Expansion gaps prevent buckling of rails and bridges.",
      "A bimetallic strip bends toward the metal with the lower expansion coefficient when heated.",
      "Water has its maximum density at 4 °C.",
      "Gases have much larger expansion coefficients than solids and liquids."
    ],

    subtopics: [
      {
        id: "phy-thermal-expansion-why-expansion-occurs",
        title: "Why expansion occurs",
        summary: "When heated, particles vibrate with greater amplitude. On average, they take up slightly more space, making the material expand. In solids…",
        explanation: "When heated, particles vibrate with greater amplitude. On average, they take up slightly more space, making the material expand. In solids the expansion is small but significant over large structures.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Why expansion occurs” requires you to distinguish or calculate.",
            solution: "Use the core idea: When heated, particles vibrate with greater amplitude. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Why expansion occurs",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-thermal-expansion-linear-area-and-volume-expansion",
        title: "Linear, area and volume expansion",
        summary: "For a rod, length increases proportionally to temperature change. For a sheet, area increases approximately as ΔA = 2α A₀ ΔT. For a solid…",
        explanation: "For a rod, length increases proportionally to temperature change. For a sheet, area increases approximately as ΔA = 2α A₀ ΔT. For a solid block, volume increases as ΔV = 3α V₀ ΔT. Liquids expand in volume only.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Linear, area and volume expansion” requires you to distinguish or calculate.",
            solution: "Use the core idea: For a rod, length increases proportionally to temperature change. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Linear, area and volume expansion",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-thermal-expansion-anomalous-expansion-of-water",
        title: "Anomalous expansion of water",
        summary: "Water contracts as it cools from room temperature to 4 °C, reaching maximum density at 4 °C. Below 4 °C it expands as it approaches…",
        explanation: "Water contracts as it cools from room temperature to 4 °C, reaching maximum density at 4 °C. Below 4 °C it expands as it approaches freezing. This is why ice floats and why deep lakes stay near 4 °C in winter.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Anomalous expansion of water” requires you to distinguish or calculate.",
            solution: "Use the core idea: Water contracts as it cools from room temperature to 4 °C, reaching maximum density at 4 °C. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Anomalous expansion of water",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-thermal-expansion-practical-applications",
        title: "Practical applications",
        summary: "Bimetallic strips bend when heated because the two metals expand by different amounts, making them useful in thermostats. Expansion gaps in…",
        explanation: "Bimetallic strips bend when heated because the two metals expand by different amounts, making them useful in thermostats. Expansion gaps in railway tracks and bridges prevent buckling in hot weather.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Practical applications” requires you to distinguish or calculate.",
            solution: "Use the core idea: Bimetallic strips bend when heated because the two metals expand by different amounts, making them useful in thermostats. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Practical applications",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-temperature-heat", "phy-heat-transfer-equilibrium"],
    content: true,
    buildsOn: ["phy-temperature-heat"],
    leadsTo: [],
    usedIn: ["meteo-lapse-rates", "env-climate-change-response"]
  },

  {
    id: "phy-heat-transfer-equilibrium",
    sectionId: "PHY-04",
    order: 3,
    title: "Heat Transfer Mechanisms & Thermal Equilibrium",
    definition: "Heat can be transferred by conduction, convection and radiation. Thermal equilibrium is reached when two bodies in contact have the same temperature and there is no net heat flow between them.",
    keyFacts: [
      "Conduction transfers heat through particle collisions without bulk movement of the material.",
      "Convection transfers heat by the bulk movement of a fluid; hot fluid rises, cool fluid sinks.",
      "Radiation transfers heat as electromagnetic waves and can travel through a vacuum.",
      "Good conductors are usually metals; insulators trap heat by reducing conduction and convection.",
      "A body emits and absorbs radiation continuously; net heat transfer depends on temperature difference.",
      "Thermal equilibrium means equal temperature, not necessarily equal internal energy."
    ],
    explanationSections: [
      { heading: "Conduction", body: "In solids, vibrating particles pass kinetic energy to neighbours. Metals conduct well because free electrons carry energy rapidly. Wood, plastic and air are poor conductors. A metal spoon in hot soup heats up quickly at the handle; a wooden spoon does not." },
      { heading: "Convection", body: "When a fluid is heated, it usually expands, becomes less dense and rises. Cooler, denser fluid sinks to take its place, creating a convection current. This is how room heaters warm air, how sea breezes form and how magma moves in the mantle." },
      { heading: "Radiation", body: "All objects emit infrared radiation because of their temperature. The hotter the object, the more radiation it emits and the shorter the average wavelength. Radiation does not need a medium, so the Sun warms Earth across empty space." },
      { heading: "Reaching thermal equilibrium", body: "When a hot object is placed in contact with a cold one, heat flows until both reach the same temperature. At equilibrium, individual particles still exchange energy, but the average energy per particle is the same, so there is no net flow." }
    ],
    commonMistakes: [
      "Thinking cold objects 'give out cold'; cold objects absorb heat from warmer surroundings.",
      "Confusing conduction with convection; conduction needs no bulk motion.",
      "Believing radiation only comes from very hot objects; all objects emit radiation.",
      "Assuming thermal equilibrium means equal heat content; it means equal temperature."
    ],
    examPoints: [
      "Metals feel cold because they conduct heat away from your hand quickly.",
      "Vacuum flasks reduce all three heat transfer mechanisms: vacuum stops conduction/convection, silvering reduces radiation.",
      "The colour and texture of a surface affect radiation absorption/emission; dull black surfaces are good absorbers and emitters.",
      "Convection is the main heat transfer mechanism in the atmosphere and oceans."
    ],
    comparisonTable: {
      headers: ["Mechanism", "Medium needed?", "How it transfers", "Examples"],
      rows: [
        ["Conduction", "Yes (solids/liquids/gases)", "Particle collisions", "Metal spoon in hot soup"],
        ["Convection", "Yes (fluids)", "Bulk movement of fluid", "Sea breeze, boiling water"],
        ["Radiation", "No", "Electromagnetic waves", "Sun's heat, infrared heater"]
      ]
    },

    subtopics: [
      {
        id: "phy-heat-transfer-equilibrium-conduction",
        title: "Conduction",
        summary: "In solids, vibrating particles pass kinetic energy to neighbours. Metals conduct well because free electrons carry energy rapidly. Wood,…",
        explanation: "In solids, vibrating particles pass kinetic energy to neighbours. Metals conduct well because free electrons carry energy rapidly. Wood, plastic and air are poor conductors. A metal spoon in hot soup heats up quickly at the handle; a wooden spoon does not.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-heat-transfer-equilibrium-convection",
        title: "Convection",
        summary: "When a fluid is heated, it usually expands, becomes less dense and rises. Cooler, denser fluid sinks to take its place, creating a…",
        explanation: "When a fluid is heated, it usually expands, becomes less dense and rises. Cooler, denser fluid sinks to take its place, creating a convection current. This is how room heaters warm air, how sea breezes form and how magma moves in the mantle.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Convection” requires you to distinguish or calculate.",
            solution: "Use the core idea: When a fluid is heated, it usually expands, becomes less dense and rises. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Convection",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-heat-transfer-equilibrium-radiation",
        title: "Radiation",
        summary: "All objects emit infrared radiation because of their temperature. The hotter the object, the more radiation it emits and the shorter the…",
        explanation: "All objects emit infrared radiation because of their temperature. The hotter the object, the more radiation it emits and the shorter the average wavelength. Radiation does not need a medium, so the Sun warms Earth across empty space.",
                examples: [
          {
            problem: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.",
            solution: "v = fλ = 50 × 4 = 200 m/s.",
            answer: "200 m/s",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-heat-transfer-equilibrium-reaching-thermal-equilibrium",
        title: "Reaching thermal equilibrium",
        summary: "When a hot object is placed in contact with a cold one, heat flows until both reach the same temperature. At equilibrium, individual…",
        explanation: "When a hot object is placed in contact with a cold one, heat flows until both reach the same temperature. At equilibrium, individual particles still exchange energy, but the average energy per particle is the same, so there is no net flow.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Reaching thermal equilibrium” requires you to distinguish or calculate.",
            solution: "Use the core idea: When a hot object is placed in contact with a cold one, heat flows until both reach the same temperature. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Reaching thermal equilibrium",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-temperature-heat", "phy-heat-transfer-mechanisms"],
    content: true,
    buildsOn: ["phy-temperature-heat", "phy-work-energy"],
    leadsTo: ["phy-heat-transfer-mechanisms"],
    usedIn: ["meteo-heat-transfer", "meteo-radiation-laws", "env-climate-change-response"]
  },

  {
    id: "phy-thermodynamics-laws",
    sectionId: "PHY-04",
    order: 4,
    title: "Laws of Thermodynamics, Internal Energy & Latent Heat",
    definition: "Thermodynamics describes how energy is exchanged as heat and work. The first law states that the change in internal energy equals heat added minus work done by the system. The second law says heat naturally flows from hot to cold. Latent heat is the energy absorbed or released during a change of state at constant temperature.",
    keyFacts: [
      "Internal energy is the total kinetic and potential energy of all particles in a system.",
      "First Law: ΔU = Q − W, where Q is heat added to the system and W is work done by the system.",
      "Second Law: heat cannot spontaneously flow from a colder body to a hotter body; natural processes increase total entropy.",
      "Latent heat of fusion L_f: energy needed to melt 1 kg of solid at its melting point.",
      "Latent heat of vaporisation L_v: energy needed to boil 1 kg of liquid at its boiling point.",
      "During melting or boiling, temperature stays constant while internal energy increases."
    ],
    explanationSections: [
      { heading: "Internal energy", body: "Internal energy includes the kinetic energy of particles (related to temperature) and the potential energy stored in intermolecular bonds. Heating a solid raises its temperature by increasing kinetic energy; melting it increases potential energy by breaking bonds while temperature stays fixed." },
      { heading: "First Law of Thermodynamics", body: "The first law is conservation of energy for thermal systems. If you heat a gas (Q positive) and it expands, doing work on its surroundings (W positive), the change in internal energy is Q − W. If the gas is compressed (work done on it), W is negative and internal energy rises more." },
      { heading: "Second Law and direction of heat flow", body: "Heat naturally flows from hot to cold. A refrigerator can move heat from cold to hot, but only by doing work. The second law also means no heat engine can be 100% efficient because some heat must be rejected to a cold reservoir." },
      { heading: "Latent heat", body: "Boiling water at 100 °C stays at 100 °C while energy goes into separating molecules against intermolecular forces. The large latent heat of vaporisation of water makes it an effective coolant: sweating removes a lot of heat when sweat evaporates." }
    ],
    formula: [
      {
        name: "First Law of Thermodynamics",
        expression: "\\Delta U = Q - W",
        variables: [
          { symbol: "\\Delta U", meaning: "change in internal energy (J)" },
          { symbol: "Q", meaning: "heat added to system (J)" },
          { symbol: "W", meaning: "work done by system (J)" }
        ]
      },
      {
        name: "Latent heat",
        expression: "Q = m L",
        variables: [
          { symbol: "Q", meaning: "heat transferred (J)" },
          { symbol: "m", meaning: "mass (kg)" },
          { symbol: "L", meaning: "specific latent heat (J/kg)" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "How much heat is needed to melt 0.20 kg of ice at 0 °C? (L_f for ice = 3.34 × 10⁵ J/kg.)",
        solution: "Q = m L_f = 0.20 kg × 3.34 × 10⁵ J/kg = 6.68 × 10⁴ J.",
        answer: "66.8 kJ."
      },
      {
        problem: "Steam at 100 °C condenses on a burn. Calculate the energy released when 2.0 g of steam condenses. (L_v for water = 2.26 × 10⁶ J/kg.)",
        solution: "Mass = 2.0 g = 0.0020 kg. Q = m L_v = 0.0020 kg × 2.26 × 10⁶ J/kg = 4.52 × 10³ J.",
        answer: "4.52 kJ released."
      }
    ],
    commonMistakes: [
      "Confusing Q = mcΔT with Q = mL; the first changes temperature, the second changes state.",
      "Thinking temperature changes during a phase change; it stays constant for a pure substance at fixed pressure.",
      "Using the wrong latent heat (fusion vs vaporisation).",
      "Forgetting the sign convention in the First Law (W is work done by the system).",
      "Assuming the Second Law forbids refrigerators; it only says they need external work."
    ],
    examPoints: [
      "Latent heat of vaporisation of water is much larger than its latent heat of fusion.",
      "Steam burns are worse than boiling-water burns because of the extra latent heat released on condensation.",
      "The First Law is conservation of energy; the Second Law sets the direction of natural heat flow.",
      "Internal energy of an ideal gas depends only on temperature."
    ],
    limitCases: [
      { condition: "Q = 0 (adiabatic)", result: "ΔU = −W", physicalMeaning: "Work done by the gas comes from its internal energy, so it cools." },
      { condition: "W = 0 (constant volume)", result: "ΔU = Q", physicalMeaning: "All heat added changes internal energy." }
    ],

    subtopics: [
      {
        id: "phy-thermodynamics-laws-internal-energy",
        title: "Internal energy",
        summary: "Internal energy includes the kinetic energy of particles (related to temperature) and the potential energy stored in intermolecular bonds.…",
        explanation: "Internal energy includes the kinetic energy of particles (related to temperature) and the potential energy stored in intermolecular bonds. Heating a solid raises its temperature by increasing kinetic energy; melting it increases potential energy by breaking bonds while temperature stays fixed.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-thermodynamics-laws-first-law-of-thermodynamics",
        title: "First Law of Thermodynamics",
        summary: "The first law is conservation of energy for thermal systems. If you heat a gas (Q positive) and it expands, doing work on its surroundings…",
        explanation: "The first law is conservation of energy for thermal systems. If you heat a gas (Q positive) and it expands, doing work on its surroundings (W positive), the change in internal energy is Q − W. If the gas is compressed (work done on it), W is negative and internal energy rises more.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “First Law of Thermodynamics” requires you to distinguish or calculate.",
            solution: "Use the core idea: The first law is conservation of energy for thermal systems. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "First Law of Thermodynamics",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-thermodynamics-laws-second-law-and-direction-of-heat-flow",
        title: "Second Law and direction of heat flow",
        summary: "Heat naturally flows from hot to cold. A refrigerator can move heat from cold to hot, but only by doing work. The second law also means no…",
        explanation: "Heat naturally flows from hot to cold. A refrigerator can move heat from cold to hot, but only by doing work. The second law also means no heat engine can be 100% efficient because some heat must be rejected to a cold reservoir.",
                examples: [
          {
            problem: "A 5 kg box accelerates at 3 m/s² on a frictionless surface. What net force acts on it?",
            solution: "Newton’s second law: F = ma = 5 kg × 3 m/s² = 15 N in the direction of acceleration.",
            answer: "15 N",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-thermodynamics-laws-latent-heat",
        title: "Latent heat",
        summary: "Boiling water at 100 °C stays at 100 °C while energy goes into separating molecules against intermolecular forces. The large latent heat of…",
        explanation: "Boiling water at 100 °C stays at 100 °C while energy goes into separating molecules against intermolecular forces. The large latent heat of vaporisation of water makes it an effective coolant: sweating removes a lot of heat when sweat evaporates.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Latent heat” requires you to distinguish or calculate.",
            solution: "Use the core idea: Boiling water at 100 °C stays at 100 °C while energy goes into separating molecules against intermolecular forces. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Latent heat",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-temperature-heat", "phy-work-energy", "phy-states-of-matter"],
    content: true,
    buildsOn: ["phy-work-energy", "phy-states-of-matter", "phy-temperature-heat"],
    leadsTo: [],
    usedIn: ["meteo-adiabatic-cloud-formation", "env-energy-sources"]
  },

  {
    id: "phy-heat-transfer-mechanisms",
    sectionId: "PHY-04",
    order: 5,
    title: "Heat Transfer Mechanisms: Conduction, Convection & Radiation in Detail",
    definition: "Heat transfer occurs through three distinct physical mechanisms. Conduction requires matter and transfers energy through collisions; convection requires a fluid and transfers energy through bulk motion; radiation requires no medium and transfers energy as electromagnetic waves.",
    keyFacts: [
      "Conduction is fastest in solids, especially metals with free electrons.",
      "Convection currents transfer heat in fluids and drive weather and ocean circulation.",
      "Radiation intensity follows the Stefan-Boltzmann law: power radiated ∝ T⁴ for a perfect black body.",
      "Good absorbers of radiation are also good emitters (Kirchhoff's radiation law).", 
      "A vacuum prevents conduction and convection but not radiation.",
      "Greenhouse gases absorb outgoing infrared radiation, warming the atmosphere."
    ],
    explanationSections: [
      { heading: "Conduction in metals vs insulators", body: "Metals have free electrons that move quickly and carry kinetic energy from hot to cold regions. In insulators, only vibrating atoms pass energy along, which is slower. This is why a metal door handle feels colder than a wooden door at the same air temperature." },
      { heading: "Convection cells", body: "In a heated room, warm air near a radiator rises, spreads across the ceiling, cools, sinks and returns to be reheated, forming a convection cell. Similar cells drive Hadley, Ferrel and Polar circulation in the atmosphere." },
      { heading: "Radiation and temperature", body: "Hotter objects radiate more intensely and at shorter wavelengths. A red-hot poker is cooler than a white-hot one. The Sun emits mostly visible and ultraviolet; Earth emits infrared." },
      { heading: "Earth's energy balance", body: "Earth absorbs solar radiation and emits infrared radiation. Greenhouse gases absorb some outgoing infrared and re-radiate it back downward, keeping the surface warmer than it would be otherwise. This is the natural greenhouse effect; human activity enhances it." }
    ],
    commonMistakes: [
      "Thinking radiation requires a medium; it travels through vacuum.",
      "Confusing the greenhouse effect with the ozone layer; they involve different processes.",
      "Assuming shiny surfaces are good absorbers; they are good reflectors and poor absorbers.",
      "Forgetting that convection cannot occur in solids."
    ],
    examPoints: [
      "The three mechanisms often act together; identify the dominant one in each situation.",
      "Radiation is the only heat transfer mechanism that works in a vacuum.",
      "Dull black surfaces are good absorbers and emitters; polished silver surfaces are poor absorbers/emitters.",
      "Meteorology applies these mechanisms to lapse rates, convection and the greenhouse effect."
    ],
    comparisonTable: {
      headers: ["Mechanism", "Requires medium?", "Particle movement", "Vacuum works?", "Key examples"],
      rows: [
        ["Conduction", "Yes", "Vibrations/collisions, no bulk flow", "No", "Metal rod heated at one end"],
        ["Convection", "Yes (fluid)", "Bulk fluid motion", "No", "Boiling water, atmospheric circulation"],
        ["Radiation", "No", "None (EM waves)", "Yes", "Sunlight, infrared heaters"]
      ]
    },

    subtopics: [
      {
        id: "phy-heat-transfer-mechanisms-conduction-in-metals-vs-insulators",
        title: "Conduction in metals vs insulators",
        summary: "Metals have free electrons that move quickly and carry kinetic energy from hot to cold regions. In insulators, only vibrating atoms pass…",
        explanation: "Metals have free electrons that move quickly and carry kinetic energy from hot to cold regions. In insulators, only vibrating atoms pass energy along, which is slower. This is why a metal door handle feels colder than a wooden door at the same air temperature.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-heat-transfer-mechanisms-convection-cells",
        title: "Convection cells",
        summary: "In a heated room, warm air near a radiator rises, spreads across the ceiling, cools, sinks and returns to be reheated, forming a convection…",
        explanation: "In a heated room, warm air near a radiator rises, spreads across the ceiling, cools, sinks and returns to be reheated, forming a convection cell. Similar cells drive Hadley, Ferrel and Polar circulation in the atmosphere.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Convection cells” requires you to distinguish or calculate.",
            solution: "Use the core idea: In a heated room, warm air near a radiator rises, spreads across the ceiling, cools, sinks and returns to be reheated, forming a convection cell. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Convection cells",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-heat-transfer-mechanisms-radiation-and-temperature",
        title: "Radiation and temperature",
        summary: "Hotter objects radiate more intensely and at shorter wavelengths. A red-hot poker is cooler than a white-hot one. The Sun emits mostly…",
        explanation: "Hotter objects radiate more intensely and at shorter wavelengths. A red-hot poker is cooler than a white-hot one. The Sun emits mostly visible and ultraviolet; Earth emits infrared.",
                examples: [
          {
            problem: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.",
            solution: "v = fλ = 50 × 4 = 200 m/s.",
            answer: "200 m/s",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-heat-transfer-mechanisms-earth-s-energy-balance",
        title: "Earth's energy balance",
        summary: "Earth absorbs solar radiation and emits infrared radiation. Greenhouse gases absorb some outgoing infrared and re-radiate it back downward,…",
        explanation: "Earth absorbs solar radiation and emits infrared radiation. Greenhouse gases absorb some outgoing infrared and re-radiate it back downward, keeping the surface warmer than it would be otherwise. This is the natural greenhouse effect; human activity enhances it.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-temperature-heat", "phy-heat-transfer-equilibrium", "meteo-greenhouse-effect"],
    content: true,
    buildsOn: ["phy-heat-transfer-equilibrium", "phy-temperature-heat"],
    leadsTo: [],
    usedIn: ["meteo-heat-transfer", "meteo-radiation-laws", "env-climate-change-response"]
  },

  {
    id: "phy-kinetic-theory",
    sectionId: "PHY-04",
    order: 6,
    title: "Kinetic Theory of Gases",
    definition: "The kinetic theory models a gas as a large number of tiny particles moving randomly and colliding elastically with each other and the walls of their container. Pressure arises from collisions with the walls, and temperature is proportional to the average kinetic energy of the particles.",
    keyFacts: [
      "Gas pressure is caused by the force exerted by particles colliding with container walls.",
      "Temperature (in kelvin) is proportional to the average kinetic energy of the gas particles.",
      "At the same temperature, all ideal-gas particles have the same average kinetic energy, regardless of mass.",
      "For an ideal gas: PV = nRT, where n is amount of substance and R is the universal gas constant.",
      "Boyle's law: P ∝ 1/V at constant temperature.",
      "Charles's law: V ∝ T at constant pressure; pressure law: P ∝ T at constant volume."
    ],
    explanationSections: [
      { heading: "Pressure from collisions", body: "Each gas particle collision with a wall exerts a tiny force. With billions of particles colliding every second, the average force is steady and produces measurable pressure. Faster particles or more particles mean more frequent, harder collisions and higher pressure." },
      { heading: "Temperature and kinetic energy", body: "Raising the temperature increases the average kinetic energy of particles. At the same temperature, light hydrogen molecules move faster than heavy oxygen molecules, but their average kinetic energies are equal. Absolute zero is the temperature at which particle motion is minimum." },
      { heading: "Ideal gas assumptions", body: "An ideal gas consists of point particles that move randomly and collide elastically, with no intermolecular forces except during collisions. Real gases approximate ideal behaviour best at low pressure and high temperature." },
      { heading: "Connecting to meteorology", body: "The ideal gas law explains why warm air at constant pressure expands and becomes less dense, leading to rising motion and cloud formation. It underlies the gas law topic in Meteorology." }
    ],
    formula: [
      {
        name: "Ideal gas equation",
        expression: "P V = n R T",
        variables: [
          { symbol: "P", meaning: "pressure (Pa)" },
          { symbol: "V", meaning: "volume (m³)" },
          { symbol: "n", meaning: "amount of gas (mol)" },
          { symbol: "R", meaning: "universal gas constant (8.314 J/(mol·K))" },
          { symbol: "T", meaning: "absolute temperature (K)" }
        ]
      },
      {
        name: "Gas laws",
        expression: "P V = \\text{constant (constant T)} \\quad \\frac{V}{T} = \\text{constant (constant P)} \\quad \\frac{P}{T} = \\text{constant (constant V)}",
        variables: [
          { symbol: "P", meaning: "pressure" },
          { symbol: "V", meaning: "volume" },
          { symbol: "T", meaning: "absolute temperature" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "A fixed mass of gas occupies 2.0 dm³ at 300 K. If the pressure is kept constant and the temperature is raised to 400 K, what is the new volume?",
        solution: "Using Charles's law V/T = constant: V₁/T₁ = V₂/T₂. So 2.0/300 = V₂/400, giving V₂ = 2.0 × 400 / 300 ≈ 2.67 dm³.",
        answer: "≈ 2.7 dm³."
      }
    ],
    commonMistakes: [
      "Using Celsius instead of kelvin in gas-law calculations.",
      "Confusing average speed with average kinetic energy; at the same T, KE is equal but speed depends on mass.",
      "Assuming real gases are always ideal; ideal behaviour breaks down at high pressure or low temperature.",
      "Forgetting that absolute zero is 0 K, not 0 °C."
    ],
    examPoints: [
      "Temperature in gas-law equations must be in kelvin (K = °C + 273.15).",
      "Boyle's law gives a hyperbolic P-V graph at constant temperature.",
      "Doubling absolute temperature at constant volume doubles the pressure.",
      "The kinetic theory links microscopic particle motion to macroscopic pressure and temperature."
    ],

    subtopics: [
      {
        id: "phy-kinetic-theory-pressure-from-collisions",
        title: "Pressure from collisions",
        summary: "Each gas particle collision with a wall exerts a tiny force. With billions of particles colliding every second, the average force is steady…",
        explanation: "Each gas particle collision with a wall exerts a tiny force. With billions of particles colliding every second, the average force is steady and produces measurable pressure. Faster particles or more particles mean more frequent, harder collisions and higher pressure.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-kinetic-theory-temperature-and-kinetic-energy",
        title: "Temperature and kinetic energy",
        summary: "Raising the temperature increases the average kinetic energy of particles. At the same temperature, light hydrogen molecules move faster…",
        explanation: "Raising the temperature increases the average kinetic energy of particles. At the same temperature, light hydrogen molecules move faster than heavy oxygen molecules, but their average kinetic energies are equal. Absolute zero is the temperature at which particle motion is minimum.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-kinetic-theory-ideal-gas-assumptions",
        title: "Ideal gas assumptions",
        summary: "An ideal gas consists of point particles that move randomly and collide elastically, with no intermolecular forces except during…",
        explanation: "An ideal gas consists of point particles that move randomly and collide elastically, with no intermolecular forces except during collisions. Real gases approximate ideal behaviour best at low pressure and high temperature.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-kinetic-theory-connecting-to-meteorology",
        title: "Connecting to meteorology",
        summary: "The ideal gas law explains why warm air at constant pressure expands and becomes less dense, leading to rising motion and cloud formation.…",
        explanation: "The ideal gas law explains why warm air at constant pressure expands and becomes less dense, leading to rising motion and cloud formation. It underlies the gas law topic in Meteorology.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-states-of-matter", "phy-temperature-heat", "meteo-gas-law"],
    content: true,
    buildsOn: ["phy-states-of-matter", "phy-temperature-heat"],
    leadsTo: [],
    usedIn: ["phy-thermodynamics-laws", "meteo-gas-law"]
  },

// ============================= SECTION PHY-05: Waves =============================

  {
    id: "phy-wave-properties",
    sectionId: "PHY-05",
    order: 1,
    title: "Wave Properties",
    definition: "A wave is a disturbance that transfers energy from one place to another without permanently displacing the medium. Mechanical waves need a medium; electromagnetic waves do not.",
    keyFacts: [
      "Wavelength λ is the distance between two consecutive identical points on a wave, measured in metres.",
      "Frequency f is the number of complete waves passing a point per second, measured in hertz (Hz).",
      "Wave speed v = f λ; it depends on the medium, not on f or λ individually for a given medium.",
      "Amplitude is the maximum displacement from the rest position; it is related to wave energy.",
      "Period T = 1/f is the time for one complete wave to pass a point.",
      "The wave equation relates speed, frequency and wavelength: v = fλ."
    ],
    explanationSections: [
      { heading: "Wave speed depends on the medium", body: "Sound travels faster through steel than air because particles in steel are closer and stiffer. Light slows down when entering glass from air. For a given medium, if frequency increases, wavelength decreases so that the product fλ stays constant." },
      { heading: "Amplitude and energy", body: "A loud sound has large amplitude; a bright light has large amplitude. Energy carried by a wave is proportional to amplitude squared. Doubling the amplitude quadruples the energy." },
      { heading: "Graphs of waves", body: "A displacement-distance graph shows the shape of the wave at one instant. A displacement-time graph shows how one point oscillates. The wavelength is read from the first graph; the period from the second." },
      { heading: "FPSC traps", body: "Students often confuse frequency with speed or loudness with speed. A high-pitched sound has high frequency and short wavelength, but its speed in air is the same as a low-pitched sound at the same temperature." }
    ],
    formula: {
      name: "Wave equation",
      expression: "v = f \\lambda = \\frac{\\lambda}{T}",
      variables: [
        { symbol: "v", meaning: "wave speed (m/s)" },
        { symbol: "f", meaning: "frequency (Hz)" },
        { symbol: "\\lambda", meaning: "wavelength (m)" },
        { symbol: "T", meaning: "period (s)" }
      ]
    },
    workedExample: [
      {
        problem: "A wave has a frequency of 5.0 Hz and a wavelength of 0.40 m. Calculate its speed.",
        solution: "v = fλ = 5.0 Hz × 0.40 m = 2.0 m/s.",
        answer: "2.0 m/s."
      },
      {
        problem: "A sound wave of speed 340 m/s has a frequency of 850 Hz. Find its wavelength.",
        solution: "λ = v/f = 340 m/s / 850 Hz = 0.40 m.",
        answer: "0.40 m."
      }
    ],
    commonMistakes: [
      "Confusing frequency with speed.",
      "Thinking amplitude affects wave speed; speed depends on the medium.",
      "Using the wrong graph to find wavelength or period.",
      "Forgetting that v = fλ applies to all waves."
    ],
    examPoints: [
      "Wave speed is determined by the medium, not by amplitude or frequency.",
      "For a fixed medium, doubling frequency halves wavelength.",
      "Amplitude is measured from rest position to crest, not crest to trough.",
      "1 Hz = 1 cycle per second."
    ],
    limitCases: [
      { condition: "f = 0", result: "No wave; only a static displacement", physicalMeaning: "Zero frequency means no oscillation and no travelling wave." },
      { condition: "λ very short", result: "High frequency for the same speed", physicalMeaning: "High-pitched sound or high-energy radiation." }
    ],

    subtopics: [
      {
        id: "phy-wave-properties-wave-speed-depends-on-the-medium",
        title: "Wave speed depends on the medium",
        summary: "Sound travels faster through steel than air because particles in steel are closer and stiffer. Light slows down when entering glass from…",
        explanation: "Sound travels faster through steel than air because particles in steel are closer and stiffer. Light slows down when entering glass from air. For a given medium, if frequency increases, wavelength decreases so that the product fλ stays constant.",
                examples: [
          {
            problem: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.",
            solution: "v = fλ = 50 × 4 = 200 m/s.",
            answer: "200 m/s",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-wave-properties-amplitude-and-energy",
        title: "Amplitude and energy",
        summary: "A loud sound has large amplitude; a bright light has large amplitude. Energy carried by a wave is proportional to amplitude squared.…",
        explanation: "A loud sound has large amplitude; a bright light has large amplitude. Energy carried by a wave is proportional to amplitude squared. Doubling the amplitude quadruples the energy.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-wave-properties-graphs-of-waves",
        title: "Graphs of waves",
        summary: "A displacement-distance graph shows the shape of the wave at one instant. A displacement-time graph shows how one point oscillates. The…",
        explanation: "A displacement-distance graph shows the shape of the wave at one instant. A displacement-time graph shows how one point oscillates. The wavelength is read from the first graph; the period from the second.",
                examples: [
          {
            problem: "A runner completes one full 400 m circular track and stops at the start. What are the distance and displacement?",
            solution: "Distance is the path length = 400 m. Displacement is the change in position = 0 because start and finish coincide.",
            answer: "Distance 400 m; displacement 0",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-wave-properties-fpsc-traps",
        title: "FPSC traps",
        summary: "Students often confuse frequency with speed or loudness with speed. A high-pitched sound has high frequency and short wavelength, but its…",
        explanation: "Students often confuse frequency with speed or loudness with speed. A high-pitched sound has high frequency and short wavelength, but its speed in air is the same as a low-pitched sound at the same temperature.",
                examples: [
          {
            problem: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.",
            solution: "v = fλ = 50 × 4 = 200 m/s.",
            answer: "200 m/s",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-wave-types", "phy-sound-waves", "phy-doppler-effect", "phy-reflection-refraction"],
    content: true,
    buildsOn: ["phy-scalars-vectors", "math-4-4"],
    leadsTo: ["phy-wave-types", "phy-sound-waves", "phy-doppler-effect", "phy-reflection-refraction"],
    usedIn: ["meteo-radiation-laws", "meteo-remote-sensing"]
  },

  {
    id: "phy-wave-types",
    sectionId: "PHY-05",
    order: 2,
    title: "Types of Waves",
    definition: "Waves are classified by how particles of the medium move relative to the wave direction. In transverse waves the oscillation is perpendicular to the direction of travel; in longitudinal waves it is parallel.",
    keyFacts: [
      "Transverse waves: particle displacement is perpendicular to wave direction; examples include waves on a string and electromagnetic waves.",
      "Longitudinal waves: particle displacement is parallel to wave direction; examples include sound in air and compression waves in a spring.",
      "Transverse waves have crests and troughs; longitudinal waves have compressions and rarefactions.",
      "Electromagnetic waves are transverse and can travel through a vacuum.",
      "Mechanical waves need a material medium; they can be transverse or longitudinal.",
      "Surface water waves are a mixture of transverse and longitudinal motion."
    ],
    explanationSections: [
      { heading: "Transverse waves", body: "Imagine shaking a rope up and down. The wave travels horizontally while each piece of rope moves vertically. Light and other electromagnetic waves are transverse, with electric and magnetic fields oscillating perpendicular to the direction of travel." },
      { heading: "Longitudinal waves", body: "In a sound wave, air particles oscillate back and forth along the direction the sound travels. Regions of compression have higher pressure and density; rarefactions have lower pressure and density." },
      { heading: "Mechanical vs electromagnetic", body: "Mechanical waves need a medium because they move by disturbing particles. Electromagnetic waves are self-propagating oscillations of electric and magnetic fields and travel through empty space at about 3 × 10⁸ m/s." },
      { heading: "Exam clues", body: "If a question asks about compressions and rarefactions, it is longitudinal. If it asks about crests, troughs or polarisation, it is transverse. Only transverse waves can be polarised." }
    ],
    commonMistakes: [
      "Thinking sound is a transverse wave; it is longitudinal.",
      "Confusing compressions with crests.",
      "Believing all waves need a medium; electromagnetic waves do not.",
      "Forgetting that water surface waves are neither purely transverse nor purely longitudinal."
    ],
    examPoints: [
      "Sound is a longitudinal mechanical wave.",
      "Light is a transverse electromagnetic wave.",
      "Only transverse waves can be polarised.",
      "In a longitudinal wave, the distance between two consecutive compressions is one wavelength."
    ],
    comparisonTable: {
      headers: ["Feature", "Transverse wave", "Longitudinal wave"],
      rows: [
        ["Particle motion", "Perpendicular to wave direction", "Parallel to wave direction"],
        ["Pattern", "Crests and troughs", "Compressions and rarefactions"],
        ["Examples", "Light, waves on a string", "Sound, compression in a spring"],
        ["Can be polarised?", "Yes", "No"],
        ["Need medium?", "Mechanical ones do; EM does not", "Yes"]
      ]
    },

    subtopics: [
      {
        id: "phy-wave-types-transverse-waves",
        title: "Transverse waves",
        summary: "Imagine shaking a rope up and down. The wave travels horizontally while each piece of rope moves vertically. Light and other…",
        explanation: "Imagine shaking a rope up and down. The wave travels horizontally while each piece of rope moves vertically. Light and other electromagnetic waves are transverse, with electric and magnetic fields oscillating perpendicular to the direction of travel.",
                examples: [
          {
            problem: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.",
            solution: "v = fλ = 50 × 4 = 200 m/s.",
            answer: "200 m/s",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-wave-types-longitudinal-waves",
        title: "Longitudinal waves",
        summary: "In a sound wave, air particles oscillate back and forth along the direction the sound travels. Regions of compression have higher pressure…",
        explanation: "In a sound wave, air particles oscillate back and forth along the direction the sound travels. Regions of compression have higher pressure and density; rarefactions have lower pressure and density.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-wave-types-mechanical-vs-electromagnetic",
        title: "Mechanical vs electromagnetic",
        summary: "Mechanical waves need a medium because they move by disturbing particles. Electromagnetic waves are self-propagating oscillations of…",
        explanation: "Mechanical waves need a medium because they move by disturbing particles. Electromagnetic waves are self-propagating oscillations of electric and magnetic fields and travel through empty space at about 3 × 10⁸ m/s.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Mechanical vs electromagnetic” requires you to distinguish or calculate.",
            solution: "Use the core idea: Mechanical waves need a medium because they move by disturbing particles. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Mechanical vs electromagnetic",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-wave-types-exam-clues",
        title: "Exam clues",
        summary: "If a question asks about compressions and rarefactions, it is longitudinal. If it asks about crests, troughs or polarisation, it is…",
        explanation: "If a question asks about compressions and rarefactions, it is longitudinal. If it asks about crests, troughs or polarisation, it is transverse. Only transverse waves can be polarised.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Exam clues” requires you to distinguish or calculate.",
            solution: "Use the core idea: If a question asks about compressions and rarefactions, it is longitudinal. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Exam clues",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-wave-properties", "phy-sound-waves", "phy-reflection-refraction"],
    content: true,
    buildsOn: ["phy-wave-properties"],
    leadsTo: ["phy-sound-waves", "phy-doppler-effect"],
    usedIn: ["meteo-scales-of-motion", "earth-h2"]
  },

  {
    id: "phy-sound-waves",
    sectionId: "PHY-05",
    order: 3,
    title: "Sound Waves",
    definition: "Sound is a longitudinal mechanical wave that travels through a medium as a series of compressions and rarefactions. It requires a material medium and cannot travel through a vacuum.",
    keyFacts: [
      "Sound is produced by vibrating objects and travels as a longitudinal wave.",
      "The speed of sound in air at room temperature is about 340 m/s.",
      "Sound travels faster in solids and liquids than in gases because particles are closer together.",
      "Pitch is determined by frequency; loudness is determined by amplitude.",
      "The audible range for humans is roughly 20 Hz to 20 000 Hz.",
      "Ultrasound has frequency above 20 000 Hz; infrasound below 20 Hz."
    ],
    explanationSections: [
      { heading: "How sound travels", body: "A vibrating source pushes neighbouring air molecules together, creating a compression. The compressed region expands into the next region, leaving a rarefaction behind. The disturbance travels while individual air molecules oscillate about fixed positions." },
      { heading: "Pitch, loudness and quality", body: "Pitch corresponds to frequency: a whistle has high pitch, a drum has low pitch. Loudness corresponds to amplitude and is measured on a logarithmic scale (decibels). The same note played on a piano and a flute sounds different because of harmonics, called quality or timbre." },
      { heading: "Speed of sound in different media", body: "Sound travels about 15 times faster through steel than through air and about 4 times faster through water than air. This is because particles in solids and liquids are closer and more strongly coupled, so vibrations transfer faster." },
      { heading: "Echoes and reverberation", body: "An echo is a reflected sound heard distinctly after a delay. The minimum delay the human ear notices is about 0.1 s, so an echo requires a reflecting surface roughly 17 m away. Reverberation is multiple rapid reflections that blur the sound." }
    ],
    formula: {
      name: "Speed, distance and echo time",
      expression: "v = \\frac{2d}{t}",
      variables: [
        { symbol: "v", meaning: "speed of sound (m/s)" },
        { symbol: "d", meaning: "distance to reflecting surface (m)" },
        { symbol: "t", meaning: "time interval for echo (s)" }
      ]
    },
    workedExample: [
      {
        problem: "A person stands 85 m from a cliff and shouts. How long after the shout does she hear the echo? (Speed of sound = 340 m/s.)",
        solution: "The sound travels to the cliff and back: total distance = 2 × 85 m = 170 m. Time = distance/speed = 170 m / 340 m/s = 0.50 s.",
        answer: "0.50 s."
      }
    ],
    commonMistakes: [
      "Thinking sound can travel through a vacuum; it cannot.",
      "Confusing loudness (amplitude) with pitch (frequency).",
      "Using one-way distance instead of round-trip distance in echo problems.",
      "Believing sound travels faster in air than in water or steel."
    ],
    examPoints: [
      "Speed of sound in air ≈ 340 m/s at room temperature.",
      "Sound is fastest in solids, then liquids, then gases.",
      "Frequency determines pitch; amplitude determines loudness.",
      "Echoes are used in sonar, ultrasound imaging and depth sounding."
    ],

    subtopics: [
      {
        id: "phy-sound-waves-how-sound-travels",
        title: "How sound travels",
        summary: "A vibrating source pushes neighbouring air molecules together, creating a compression. The compressed region expands into the next region,…",
        explanation: "A vibrating source pushes neighbouring air molecules together, creating a compression. The compressed region expands into the next region, leaving a rarefaction behind. The disturbance travels while individual air molecules oscillate about fixed positions.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “How sound travels” requires you to distinguish or calculate.",
            solution: "Use the core idea: A vibrating source pushes neighbouring air molecules together, creating a compression. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "How sound travels",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-sound-waves-pitch-loudness-and-quality",
        title: "Pitch, loudness and quality",
        summary: "Pitch corresponds to frequency: a whistle has high pitch, a drum has low pitch. Loudness corresponds to amplitude and is measured on a…",
        explanation: "Pitch corresponds to frequency: a whistle has high pitch, a drum has low pitch. Loudness corresponds to amplitude and is measured on a logarithmic scale (decibels). The same note played on a piano and a flute sounds different because of harmonics, called quality or timbre.",
                examples: [
          {
            problem: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.",
            solution: "v = fλ = 50 × 4 = 200 m/s.",
            answer: "200 m/s",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-sound-waves-speed-of-sound-in-different-media",
        title: "Speed of sound in different media",
        summary: "Sound travels about 15 times faster through steel than through air and about 4 times faster through water than air. This is because…",
        explanation: "Sound travels about 15 times faster through steel than through air and about 4 times faster through water than air. This is because particles in solids and liquids are closer and more strongly coupled, so vibrations transfer faster.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Speed of sound in different media” requires you to distinguish or calculate.",
            solution: "Use the core idea: Sound travels about 15 times faster through steel than through air and about 4 times faster through water than air. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Speed of sound in different media",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-sound-waves-echoes-and-reverberation",
        title: "Echoes and reverberation",
        summary: "An echo is a reflected sound heard distinctly after a delay. The minimum delay the human ear notices is about 0.1 s, so an echo requires a…",
        explanation: "An echo is a reflected sound heard distinctly after a delay. The minimum delay the human ear notices is about 0.1 s, so an echo requires a reflecting surface roughly 17 m away. Reverberation is multiple rapid reflections that blur the sound.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Echoes and reverberation” requires you to distinguish or calculate.",
            solution: "Use the core idea: An echo is a reflected sound heard distinctly after a delay. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Echoes and reverberation",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-wave-properties", "phy-wave-types", "phy-doppler-effect"],
    content: true,
    buildsOn: ["phy-wave-properties", "phy-wave-types"],
    leadsTo: ["phy-doppler-effect"],
    usedIn: ["meteo-remote-sensing", "env-air-pollution"]
  },

  {
    id: "phy-doppler-effect",
    sectionId: "PHY-05",
    order: 4,
    title: "The Doppler Effect & Applications",
    definition: "The Doppler effect is the change in frequency or wavelength of a wave in relation to an observer who is moving relative to the wave source.",
    keyFacts: [
      "When a source moves toward an observer, the observed frequency increases and wavelength decreases.",
      "When a source moves away from an observer, the observed frequency decreases and wavelength increases.",
      "The effect applies to sound, light and all waves.",
      "The speed of the wave in the medium does not change; only the observed frequency changes.",
      "A sonic boom occurs when a source travels faster than the speed of sound.",
      "Redshift in light from distant galaxies is evidence that the universe is expanding."
    ],
    explanationSections: [
      { heading: "Sound example", body: "An ambulance siren sounds higher pitched as it approaches because the sound waves in front of it are compressed, shortening wavelength and raising frequency. As it passes and moves away, the waves behind it are stretched, lowering the frequency. The siren itself has not changed; only the observer's measurement has." },
      { heading: "Light and redshift", body: "Light from a receding star or galaxy is shifted toward longer wavelengths (red end of the spectrum). This redshift is key evidence for the expansion of the universe. Approaching sources show blueshift." },
      { heading: "Speed of wave vs observed frequency", body: "The Doppler effect does not change the speed of the wave in the medium. It changes how many wave crests reach the observer each second. For sound, the speed in air is still about 340 m/s regardless of source motion." },
      { heading: "Applications", body: "Police radar guns, weather Doppler radar, medical ultrasound and astronomy all use the Doppler effect. In meteorology, Doppler radar measures wind speed by detecting frequency shifts from moving raindrops." }
    ],
    formula: {
      name: "Doppler effect for sound (source moving)",
      expression: "f' = f \\left( \\frac{v}{v \\pm v_s} \\right)",
      variables: [
        { symbol: "f'", meaning: "observed frequency (Hz)" },
        { symbol: "f", meaning: "source frequency (Hz)" },
        { symbol: "v", meaning: "speed of sound in medium (m/s)" },
        { symbol: "v_s", meaning: "speed of source (m/s)" }
      ]
    },
    workedExample: [
      {
        problem: "A siren emits sound at 500 Hz. An observer is standing by the road as an ambulance passes at 30 m/s. What frequency does the observer hear (a) before the ambulance passes and (b) after it passes? (Speed of sound = 340 m/s.)",
        solution: "(a) Approaching: f' = f × v/(v − v_s) = 500 × 340/(340 − 30) = 500 × 340/310 ≈ 548 Hz. (b) Receding: f' = 500 × 340/(340 + 30) = 500 × 340/370 ≈ 459 Hz.",
        answer: "Approaching ≈ 548 Hz; receding ≈ 459 Hz."
      }
    ],
    commonMistakes: [
      "Thinking the speed of the wave changes; only observed frequency changes.",
      "Using the wrong sign in the denominator (minus for approaching, plus for receding).",
      "Confusing redshift (receding, lower frequency) with blueshift (approaching, higher frequency).",
      "Applying the moving-observer formula when the source is moving."
    ],
    examPoints: [
      "Approaching source → higher observed frequency; receding source → lower observed frequency.",
      "The Doppler effect applies to all waves, including light.",
      "Redshift of distant galaxies supports the expanding universe.",
      "Doppler radar is used in meteorology to measure wind and precipitation motion."
    ],
    qualitativeScenarios: [
      {
        scenario: "What happens to the observed pitch of a train whistle as the train passes a stationary observer?",
        answer: "The pitch drops suddenly as the train passes.",
        why: "Before passing, compressed waves raise frequency; after passing, stretched waves lower frequency."
      }
    ],

    subtopics: [
      {
        id: "phy-doppler-effect-sound-example",
        title: "Sound example",
        summary: "An ambulance siren sounds higher pitched as it approaches because the sound waves in front of it are compressed, shortening wavelength and…",
        explanation: "An ambulance siren sounds higher pitched as it approaches because the sound waves in front of it are compressed, shortening wavelength and raising frequency. As it passes and moves away, the waves behind it are stretched, lowering the frequency. The siren itself has not changed; only the observer's measurement has.",
                examples: [
          {
            problem: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.",
            solution: "v = fλ = 50 × 4 = 200 m/s.",
            answer: "200 m/s",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-doppler-effect-light-and-redshift",
        title: "Light and redshift",
        summary: "Light from a receding star or galaxy is shifted toward longer wavelengths (red end of the spectrum). This redshift is key evidence for the…",
        explanation: "Light from a receding star or galaxy is shifted toward longer wavelengths (red end of the spectrum). This redshift is key evidence for the expansion of the universe. Approaching sources show blueshift.",
                examples: [
          {
            problem: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.",
            solution: "v = fλ = 50 × 4 = 200 m/s.",
            answer: "200 m/s",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-doppler-effect-speed-of-wave-vs-observed-frequency",
        title: "Speed of wave vs observed frequency",
        summary: "The Doppler effect does not change the speed of the wave in the medium. It changes how many wave crests reach the observer each second. For…",
        explanation: "The Doppler effect does not change the speed of the wave in the medium. It changes how many wave crests reach the observer each second. For sound, the speed in air is still about 340 m/s regardless of source motion.",
                examples: [
          {
            problem: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.",
            solution: "v = fλ = 50 × 4 = 200 m/s.",
            answer: "200 m/s",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-doppler-effect-applications",
        title: "Applications",
        summary: "Police radar guns, weather Doppler radar, medical ultrasound and astronomy all use the Doppler effect. In meteorology, Doppler radar…",
        explanation: "Police radar guns, weather Doppler radar, medical ultrasound and astronomy all use the Doppler effect. In meteorology, Doppler radar measures wind speed by detecting frequency shifts from moving raindrops.",
                examples: [
          {
            problem: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.",
            solution: "v = fλ = 50 × 4 = 200 m/s.",
            answer: "200 m/s",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-wave-properties", "phy-sound-waves", "meteo-remote-sensing"],
    content: true,
    buildsOn: ["phy-wave-properties", "phy-sound-waves"],
    leadsTo: [],
    usedIn: ["meteo-remote-sensing", "env-air-pollution"]
  },

// ============================= SECTION PHY-06: Optics =============================

  {
    id: "phy-reflection-refraction",
    sectionId: "PHY-06",
    order: 1,
    title: "Reflection & Refraction",
    definition: "Reflection is the bouncing back of light from a surface; refraction is the bending of light as it passes from one transparent medium into another because its speed changes.",
    keyFacts: [
      "Law of reflection: angle of incidence equals angle of reflection, measured from the normal.",
      "Refraction occurs because light changes speed when it enters a different medium.",
      "When light enters an optically denser medium it bends toward the normal; when entering a less dense medium it bends away.",
      "Refractive index n = speed of light in vacuum / speed of light in the medium; n ≥ 1.",
      "Snell's law: n₁ sin θ₁ = n₂ sin θ₂.",
      "Total internal reflection occurs when light travels from a denser to a less dense medium and the angle of incidence exceeds the critical angle."
    ],
    explanationSections: [
      { heading: "Reflection", body: "A smooth surface such as a mirror reflects parallel light rays in one direction, producing a clear image. A rough surface scatters light in many directions, causing diffuse reflection, which is why paper looks white from any angle." },
      { heading: "Refraction", body: "Light slows down in glass or water. When a ray enters such a medium at an angle, the part that enters first slows down first, bending the ray toward the normal. Upon exiting, the reverse happens and the ray bends away from the normal." },
      { heading: "Total internal reflection", body: "When light inside glass strikes the glass-air boundary at a large angle, it can be completely reflected back into the glass. This principle is used in optical fibres, prismatic binoculars and diamonds, where the critical angle is small because of the high refractive index." },
      { heading: "Real-world examples", body: "A swimming pool looks shallower than it is because light from the bottom bends away from the normal as it leaves the water. A straw in a glass of water appears bent at the surface. Mirages and atmospheric refraction make the Sun visible slightly after it has geometrically set." }
    ],
    formula: [
      {
        name: "Snell's law",
        expression: "n_1 \\sin \\theta_1 = n_2 \\sin \\theta_2",
        variables: [
          { symbol: "n_1, n_2", meaning: "refractive indices of the two media" },
          { symbol: "\\theta_1", meaning: "angle of incidence (to normal)" },
          { symbol: "\\theta_2", meaning: "angle of refraction (to normal)" }
        ]
      },
      {
        name: "Critical angle",
        expression: "\\sin \\theta_c = \\frac{n_2}{n_1} \\quad (n_1 > n_2)",
        variables: [
          { symbol: "\\theta_c", meaning: "critical angle" },
          { symbol: "n_1", meaning: "refractive index of denser medium" },
          { symbol: "n_2", meaning: "refractive index of less dense medium" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "Light passes from air (n = 1.0) into glass (n = 1.5) at an angle of incidence of 30°. Calculate the angle of refraction.",
        solution: "Using Snell's law: 1.0 × sin 30° = 1.5 × sin θ₂. sin 30° = 0.50, so sin θ₂ = 0.50/1.5 = 0.333. θ₂ = sin⁻¹(0.333) ≈ 19.5°.",
        answer: "≈ 19.5°."
      },
      {
        problem: "Calculate the critical angle for light going from glass (n = 1.5) to air (n = 1.0).",
        solution: "sin θ_c = n_air/n_glass = 1.0/1.5 = 0.667. θ_c = sin⁻¹(0.667) ≈ 41.8°.",
        answer: "≈ 42°."
      }
    ],
    commonMistakes: [
      "Measuring angles of incidence and refraction from the surface instead of the normal.",
      "Forgetting that light bends toward the normal when entering a denser medium.",
      "Confusing the critical angle formula (sin θ_c = n₂/n₁ with n₂ < n₁).",
      "Thinking refraction changes the frequency of light; frequency stays constant, wavelength changes."
    ],
    examPoints: [
      "Angles in reflection and refraction are always measured from the normal.",
      "A higher refractive index means a lower speed of light in the medium.",
      "Total internal reflection only happens when going from denser to less dense medium.",
      "Optical fibres use total internal reflection to transmit light with little loss."
    ],

    subtopics: [
      {
        id: "phy-reflection-refraction-reflection",
        title: "Reflection",
        summary: "A smooth surface such as a mirror reflects parallel light rays in one direction, producing a clear image. A rough surface scatters light in…",
        explanation: "A smooth surface such as a mirror reflects parallel light rays in one direction, producing a clear image. A rough surface scatters light in many directions, causing diffuse reflection, which is why paper looks white from any angle.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Reflection” requires you to distinguish or calculate.",
            solution: "Use the core idea: A smooth surface such as a mirror reflects parallel light rays in one direction, producing a clear image. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Reflection",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-reflection-refraction-refraction",
        title: "Refraction",
        summary: "Light slows down in glass or water. When a ray enters such a medium at an angle, the part that enters first slows down first, bending the…",
        explanation: "Light slows down in glass or water. When a ray enters such a medium at an angle, the part that enters first slows down first, bending the ray toward the normal. Upon exiting, the reverse happens and the ray bends away from the normal.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Refraction” requires you to distinguish or calculate.",
            solution: "Use the core idea: Light slows down in glass or water. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Refraction",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-reflection-refraction-total-internal-reflection",
        title: "Total internal reflection",
        summary: "When light inside glass strikes the glass-air boundary at a large angle, it can be completely reflected back into the glass. This principle…",
        explanation: "When light inside glass strikes the glass-air boundary at a large angle, it can be completely reflected back into the glass. This principle is used in optical fibres, prismatic binoculars and diamonds, where the critical angle is small because of the high refractive index.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Total internal reflection” requires you to distinguish or calculate.",
            solution: "Use the core idea: When light inside glass strikes the glass-air boundary at a large angle, it can be completely reflected back into the glass. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Total internal reflection",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-reflection-refraction-real-world-examples",
        title: "Real-world examples",
        summary: "A swimming pool looks shallower than it is because light from the bottom bends away from the normal as it leaves the water. A straw in a…",
        explanation: "A swimming pool looks shallower than it is because light from the bottom bends away from the normal as it leaves the water. A straw in a glass of water appears bent at the surface. Mirages and atmospheric refraction make the Sun visible slightly after it has geometrically set.",
                examples: [
          {
            problem: "An object is placed 30 cm from a thin lens of focal length 10 cm. Where is the image (lens formula)?",
            solution: "1/v − 1/u = 1/f. With u = −30 cm, f = +10 cm: 1/v = 1/10 + 1/(−30) wait sign convention: 1/v = 1/f + 1/u = 1/10 − 1/30 = 1/15, so v = 15 cm (real image on the far side for a converging lens with object beyond f).",
            answer: "v = +15 cm (typical real image for convex lens)",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-wave-properties", "phy-lens-mirror-imaging", "phy-lenses-mirrors-em-spectrum"],
    content: true,
    buildsOn: ["phy-wave-properties", "math-4-1"],
    leadsTo: ["phy-diffraction-interference", "phy-lens-mirror-imaging", "phy-lenses-mirrors-em-spectrum"],
    usedIn: ["meteo-remote-sensing", "earth-k2"]
  },

  {
    id: "phy-diffraction-interference",
    sectionId: "PHY-06",
    order: 2,
    title: "Diffraction & Interference",
    definition: "Diffraction is the spreading of waves when they pass through an aperture or around an obstacle. Interference occurs when two or more waves superpose to produce a resultant wave of greater or smaller amplitude.",
    keyFacts: [
      "Diffraction is most noticeable when the gap or obstacle size is comparable to the wavelength.",
      "Constructive interference occurs when waves meet in phase; destructive interference when they meet out of phase by half a wavelength.",
      "Young's double-slit experiment shows that light produces an interference pattern, demonstrating its wave nature.",
      "Bright fringes occur when path difference = nλ; dark fringes when path difference = (n + ½)λ.",
      "Thin-film interference produces colours in soap bubbles and oil slicks.",
      "Diffraction limits the resolution of optical instruments."
    ],
    explanationSections: [
      { heading: "Diffraction", body: "When waves pass through a narrow slit, they spread out. Sound bends around doorways because its wavelength is similar to the doorway width. Light has a very short wavelength, so it diffracts only through very narrow slits or around sharp edges." },
      { heading: "Interference", body: "When two coherent waves meet, their displacements add. If crest meets crest, the result is a larger wave (constructive interference). If crest meets trough, they cancel (destructive interference). The pattern depends on the path difference between the waves." },
      { heading: "Young's double slits", body: "A single light source illuminates two closely spaced slits. The slits act as coherent sources. On a distant screen, bright and dark fringes appear because the path difference to the screen varies with angle. This was crucial evidence for the wave theory of light." },
      { heading: "Everyday examples", body: "CDs and DVDs show rainbow colours because the closely spaced tracks diffract light. Soap films show colours because light reflected from the front and back surfaces interferes." }
    ],
    formula: {
      name: "Double-slit fringe spacing",
      expression: "\\Delta y = \\frac{\\lambda D}{d}",
      variables: [
        { symbol: "\\Delta y", meaning: "fringe separation (m)" },
        { symbol: "\\lambda", meaning: "wavelength of light (m)" },
        { symbol: "D", meaning: "distance from slits to screen (m)" },
        { symbol: "d", meaning: "slit separation (m)" }
      ]
    },
    workedExample: [
      {
        problem: "In a double-slit experiment, light of wavelength 600 nm passes through slits 0.20 mm apart. The screen is 1.5 m away. Calculate the separation of adjacent bright fringes.",
        solution: "λ = 600 nm = 6.0 × 10⁻⁷ m; d = 0.20 mm = 2.0 × 10⁻⁴ m. Δy = λD/d = (6.0 × 10⁻⁷ × 1.5) / 2.0 × 10⁻⁴ = 4.5 × 10⁻³ m.",
        answer: "4.5 mm."
      }
    ],
    commonMistakes: [
      "Confusing diffraction with refraction.",
      "Forgetting that interference needs coherent sources (same frequency and constant phase difference).",
      "Using wrong units for wavelength or slit separation in the double-slit formula.",
      "Thinking destructive interference destroys energy; energy is redistributed, not lost."
    ],
    examPoints: [
      "Diffraction and interference are wave properties; their observation supports the wave model of light.",
      "Longer wavelengths diffract more than shorter wavelengths.",
      "Bright fringes: path difference = nλ; dark fringes: path difference = (n + ½)λ.",
      "Interference is used in thin-film coatings and anti-reflection lenses."
    ],

    subtopics: [
      {
        id: "phy-diffraction-interference-diffraction",
        title: "Diffraction",
        summary: "When waves pass through a narrow slit, they spread out. Sound bends around doorways because its wavelength is similar to the doorway width.…",
        explanation: "When waves pass through a narrow slit, they spread out. Sound bends around doorways because its wavelength is similar to the doorway width. Light has a very short wavelength, so it diffracts only through very narrow slits or around sharp edges.",
                examples: [
          {
            problem: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.",
            solution: "v = fλ = 50 × 4 = 200 m/s.",
            answer: "200 m/s",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-diffraction-interference-interference",
        title: "Interference",
        summary: "When two coherent waves meet, their displacements add. If crest meets crest, the result is a larger wave (constructive interference). If…",
        explanation: "When two coherent waves meet, their displacements add. If crest meets crest, the result is a larger wave (constructive interference). If crest meets trough, they cancel (destructive interference). The pattern depends on the path difference between the waves.",
                examples: [
          {
            problem: "A runner completes one full 400 m circular track and stops at the start. What are the distance and displacement?",
            solution: "Distance is the path length = 400 m. Displacement is the change in position = 0 because start and finish coincide.",
            answer: "Distance 400 m; displacement 0",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-diffraction-interference-young-s-double-slits",
        title: "Young's double slits",
        summary: "A single light source illuminates two closely spaced slits. The slits act as coherent sources. On a distant screen, bright and dark fringes…",
        explanation: "A single light source illuminates two closely spaced slits. The slits act as coherent sources. On a distant screen, bright and dark fringes appear because the path difference to the screen varies with angle. This was crucial evidence for the wave theory of light.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Young's double slits” requires you to distinguish or calculate.",
            solution: "Use the core idea: A single light source illuminates two closely spaced slits. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Young's double slits",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-diffraction-interference-everyday-examples",
        title: "Everyday examples",
        summary: "CDs and DVDs show rainbow colours because the closely spaced tracks diffract light. Soap films show colours because light reflected from…",
        explanation: "CDs and DVDs show rainbow colours because the closely spaced tracks diffract light. Soap films show colours because light reflected from the front and back surfaces interferes.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Everyday examples” requires you to distinguish or calculate.",
            solution: "Use the core idea: CDs and DVDs show rainbow colours because the closely spaced tracks diffract light. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Everyday examples",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-wave-properties", "phy-reflection-refraction", "phy-lenses-mirrors-em-spectrum"],
    content: true,
    buildsOn: ["phy-wave-properties", "phy-reflection-refraction"],
    leadsTo: [],
    usedIn: ["meteo-remote-sensing"]
  },

  {
    id: "phy-lenses-mirrors-em-spectrum",
    sectionId: "PHY-06",
    order: 3,
    title: "Lenses, Mirrors & the Electromagnetic Spectrum",
    definition: "Lenses refract light to converge or diverge rays; mirrors reflect light. The electromagnetic spectrum arranges all electromagnetic waves by wavelength and frequency, from radio waves to gamma rays.",
    keyFacts: [
      "A convex (converging) lens is thicker in the middle and brings parallel rays to a real focus.",
      "A concave (diverging) lens is thinner in the middle and makes parallel rays appear to diverge from a virtual focus.",
      "A concave mirror converges light; a convex mirror diverges light.",
      "The focal length f is the distance from the lens or mirror to the principal focus.",
      "The electromagnetic spectrum, in order of increasing frequency: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma ray.",
      "All electromagnetic waves travel at about 3 × 10⁸ m/s in a vacuum."
    ],
    explanationSections: [
      { heading: "Converging and diverging lenses", body: "A convex lens bends incoming rays toward the principal axis. Parallel rays from a distant object meet at the focal point on the opposite side. A concave lens bends rays away from the axis; the focal point is on the same side as the incoming light and is virtual." },
      { heading: "Mirror shapes", body: "A concave mirror reflects parallel rays to a real focus, so it is used in telescopes and shaving mirrors. A convex mirror always produces a diminished, upright, virtual image, giving a wide field of view for car wing mirrors and shop security mirrors." },
      { heading: "Electromagnetic spectrum", body: "All EM waves are transverse and consist of oscillating electric and magnetic fields. Frequency and wavelength are inversely related: c = fλ. Higher frequency means higher photon energy and greater potential to ionise matter." },
      { heading: "Practical uses", body: "Radio and microwaves carry communications. Infrared is felt as heat. Visible light enables sight. Ultraviolet causes tanning and vitamin D production but can damage skin. X-rays image bones. Gamma rays are used in radiotherapy and arise in nuclear reactions." }
    ],
    formula: {
      name: "Lens and mirror power",
      expression: "P = \\frac{1}{f}",
      variables: [
        { symbol: "P", meaning: "power (dioptres, D)" },
        { symbol: "f", meaning: "focal length (m)" }
      ]
    },
    workedExample: [
      {
        problem: "A convex lens has a focal length of 20 cm. What is its power in dioptres?",
        solution: "f = 20 cm = 0.20 m. P = 1/f = 1/0.20 = 5.0 D.",
        answer: "5.0 D."
      }
    ],
    commonMistakes: [
      "Confusing convex and concave lenses; convex converges, concave diverges.",
      "Thinking all mirrors invert images; plane mirrors produce laterally inverted virtual images.",
      "Confusing the order of the electromagnetic spectrum.",
      "Believing EM waves of different frequencies travel at different speeds in a vacuum."
    ],
    examPoints: [
      "Convex lenses and concave mirrors converge light; concave lenses and convex mirrors diverge light.",
      "Power in dioptres is the reciprocal of focal length in metres.",
      "Visible light ranges roughly from 400 nm (violet) to 700 nm (red).",
      "Gamma rays have the highest frequency and energy; radio waves the lowest."
    ],
    comparisonTable: {
      headers: ["Optical element", "Effect on parallel rays", "Typical image type", "Common use"],
      rows: [
        ["Convex lens", "Converge", "Real or virtual depending on object distance", "Camera, magnifying glass"],
        ["Concave lens", "Diverge", "Virtual, upright, diminished", "Correcting short sight"],
        ["Concave mirror", "Converge", "Real or virtual", "Telescope, shaving mirror"],
        ["Convex mirror", "Diverge", "Virtual, upright, diminished", "Car wing mirror"]
      ]
    },

    subtopics: [
      {
        id: "phy-lenses-mirrors-em-spectrum-converging-and-diverging-lenses",
        title: "Converging and diverging lenses",
        summary: "A convex lens bends incoming rays toward the principal axis. Parallel rays from a distant object meet at the focal point on the opposite…",
        explanation: "A convex lens bends incoming rays toward the principal axis. Parallel rays from a distant object meet at the focal point on the opposite side. A concave lens bends rays away from the axis; the focal point is on the same side as the incoming light and is virtual.",
                examples: [
          {
            problem: "An object is placed 30 cm from a thin lens of focal length 10 cm. Where is the image (lens formula)?",
            solution: "1/v − 1/u = 1/f. With u = −30 cm, f = +10 cm: 1/v = 1/10 + 1/(−30) wait sign convention: 1/v = 1/f + 1/u = 1/10 − 1/30 = 1/15, so v = 15 cm (real image on the far side for a converging lens with object beyond f).",
            answer: "v = +15 cm (typical real image for convex lens)",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-lenses-mirrors-em-spectrum-mirror-shapes",
        title: "Mirror shapes",
        summary: "A concave mirror reflects parallel rays to a real focus, so it is used in telescopes and shaving mirrors. A convex mirror always produces a…",
        explanation: "A concave mirror reflects parallel rays to a real focus, so it is used in telescopes and shaving mirrors. A convex mirror always produces a diminished, upright, virtual image, giving a wide field of view for car wing mirrors and shop security mirrors.",
                examples: [
          {
            problem: "An object is placed 30 cm from a thin lens of focal length 10 cm. Where is the image (lens formula)?",
            solution: "1/v − 1/u = 1/f. With u = −30 cm, f = +10 cm: 1/v = 1/10 + 1/(−30) wait sign convention: 1/v = 1/f + 1/u = 1/10 − 1/30 = 1/15, so v = 15 cm (real image on the far side for a converging lens with object beyond f).",
            answer: "v = +15 cm (typical real image for convex lens)",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-lenses-mirrors-em-spectrum-electromagnetic-spectrum",
        title: "Electromagnetic spectrum",
        summary: "All EM waves are transverse and consist of oscillating electric and magnetic fields. Frequency and wavelength are inversely related: c =…",
        explanation: "All EM waves are transverse and consist of oscillating electric and magnetic fields. Frequency and wavelength are inversely related: c = fλ. Higher frequency means higher photon energy and greater potential to ionise matter.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-lenses-mirrors-em-spectrum-practical-uses",
        title: "Practical uses",
        summary: "Radio and microwaves carry communications. Infrared is felt as heat. Visible light enables sight. Ultraviolet causes tanning and vitamin D…",
        explanation: "Radio and microwaves carry communications. Infrared is felt as heat. Visible light enables sight. Ultraviolet causes tanning and vitamin D production but can damage skin. X-rays image bones. Gamma rays are used in radiotherapy and arise in nuclear reactions.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Practical uses” requires you to distinguish or calculate.",
            solution: "Use the core idea: Radio and microwaves carry communications. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Practical uses",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-reflection-refraction", "phy-lens-mirror-imaging", "phy-wave-properties"],
    content: true,
    buildsOn: ["phy-reflection-refraction"],
    leadsTo: ["phy-lens-mirror-imaging"],
    usedIn: ["meteo-remote-sensing"]
  },

  {
    id: "phy-lens-mirror-imaging",
    sectionId: "PHY-06",
    order: 4,
    title: "Lens & Mirror Image Formation",
    definition: "The position, size and nature of an image formed by a lens or mirror can be found using ray diagrams or the mirror/lens formula. Images may be real or virtual, upright or inverted, magnified or diminished.",
    keyFacts: [
      "Lens formula: 1/f = 1/v + 1/u, where u is object distance, v is image distance and f is focal length.",
      "Mirror formula: 1/f = 1/v + 1/u (same sign convention as lenses in most FPSC courses).",
      "Magnification m = v/u = image height / object height.",
      "Real images can be projected on a screen; virtual images cannot.",
      "For a converging lens, objects beyond 2F produce real, inverted, diminished images between F and 2F.",
      "For a diverging lens or convex mirror, the image is always virtual, upright and diminished."
    ],
    explanationSections: [
      { heading: "Sign convention", body: "Use the real-is-positive convention commonly taught in FSc/O-Level: real objects and real images have positive distances on the incident-light side and image side respectively. Virtual images have negative image distances. A positive focal length is converging; a negative focal length is diverging. Always state your convention." },
      { heading: "Ray diagrams", body: "For a converging lens, draw a ray parallel to the axis refracting through the far focus, and a ray through the optical centre continuing straight. Their intersection locates the image. For mirrors, a ray parallel to the axis reflects through (or appears to come from) the focus." },
      { heading: "Real vs virtual images", body: "A real image forms where light rays actually converge; it can be projected on a screen. A virtual image forms where rays only appear to diverge from; it is seen by looking through the lens or into the mirror." },
      { heading: "Image characteristics by position", body: "For a converging lens: object at infinity → image at focus; beyond 2F → real, inverted, diminished; at 2F → real, inverted, same size; between F and 2F → real, inverted, magnified; inside F → virtual, upright, magnified." }
    ],
    formula: [
      {
        name: "Mirror / lens formula",
        expression: "\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}",
        variables: [
          { symbol: "f", meaning: "focal length (m)" },
          { symbol: "v", meaning: "image distance (m)" },
          { symbol: "u", meaning: "object distance (m)" }
        ]
      },
      {
        name: "Linear magnification",
        expression: "m = \\frac{v}{u} = \\frac{h_i}{h_o}",
        variables: [
          { symbol: "m", meaning: "magnification" },
          { symbol: "h_i", meaning: "image height (m)" },
          { symbol: "h_o", meaning: "object height (m)" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "An object is placed 30 cm from a converging lens of focal length 10 cm. Find the image position and magnification.",
        solution: "1/f = 1/v + 1/u → 1/10 = 1/v + 1/30. 1/v = 1/10 − 1/30 = (3 − 1)/30 = 2/30 = 1/15. So v = 15 cm. Magnification m = v/u = 15/30 = 0.5.",
        answer: "Image is 15 cm from the lens on the opposite side; magnification = 0.5 (real, inverted, diminished)."
      },
      {
        problem: "A concave mirror has focal length 12 cm. An object is placed 8 cm from the mirror. Describe the image.",
        solution: "1/f = 1/v + 1/u → 1/12 = 1/v + 1/8. 1/v = 1/12 − 1/8 = (2 − 3)/24 = −1/24. So v = −24 cm. The negative image distance means the image is virtual. Magnification m = v/u = (−24)/8 = −3 (upright and magnified by factor 3).",
        answer: "Virtual, upright, magnified, 24 cm behind the mirror."
      }
    ],
    commonMistakes: [
      "Mixing up object distance u and image distance v.",
      "Using the wrong sign for virtual image distances or diverging focal lengths.",
      "Thinking magnification greater than 1 always means the image is larger; check sign for orientation.",
      "Forgetting that a negative magnification means an inverted image."
    ],
    examPoints: [
      "Real images are inverted; virtual images are upright for single lenses/mirrors.",
      "A converging lens produces a virtual image only when the object is inside the focal length.",
      "Magnification m = image height / object height; |m| > 1 means enlarged.",
      "Sign conventions vary between textbooks; be consistent."
    ],
    comparisonTable: {
      headers: ["Property", "Real image", "Virtual image"],
      rows: [
        ["Formed where", "Light rays actually converge", "Rays only appear to diverge"],
        ["Can be projected?", "Yes", "No"],
        ["Orientation (single lens/mirror)", "Inverted", "Upright"],
        ["Example", "Image on a cinema screen", "Image in a plane mirror"]
      ]
    },
    misconceptionRemediation: [
      {
        misconception: "Virtual images are not 'real' so they cannot be seen.",
        whyStudentsThinkIt: "The word 'virtual' suggests imaginary.",
        correctModel: "Virtual images are seen clearly by the eye or camera because the eye traces diverging rays back to a point. They simply cannot be projected on a screen placed at that point."
      }
    ],

    subtopics: [
      {
        id: "phy-lens-mirror-imaging-sign-convention",
        title: "Sign convention",
        summary: "Use the real-is-positive convention commonly taught in FSc/O-Level: real objects and real images have positive distances on the…",
        explanation: "Use the real-is-positive convention commonly taught in FSc/O-Level: real objects and real images have positive distances on the incident-light side and image side respectively. Virtual images have negative image distances. A positive focal length is converging; a negative focal length is diverging. Always state your convention.",
                examples: [
          {
            problem: "An object is placed 30 cm from a thin lens of focal length 10 cm. Where is the image (lens formula)?",
            solution: "1/v − 1/u = 1/f. With u = −30 cm, f = +10 cm: 1/v = 1/10 + 1/(−30) wait sign convention: 1/v = 1/f + 1/u = 1/10 − 1/30 = 1/15, so v = 15 cm (real image on the far side for a converging lens with object beyond f).",
            answer: "v = +15 cm (typical real image for convex lens)",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-lens-mirror-imaging-ray-diagrams",
        title: "Ray diagrams",
        summary: "For a converging lens, draw a ray parallel to the axis refracting through the far focus, and a ray through the optical centre continuing…",
        explanation: "For a converging lens, draw a ray parallel to the axis refracting through the far focus, and a ray through the optical centre continuing straight. Their intersection locates the image. For mirrors, a ray parallel to the axis reflects through (or appears to come from) the focus.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Ray diagrams” requires you to distinguish or calculate.",
            solution: "Use the core idea: For a converging lens, draw a ray parallel to the axis refracting through the far focus, and a ray through the optical centre continuing straight. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Ray diagrams",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-lens-mirror-imaging-real-vs-virtual-images",
        title: "Real vs virtual images",
        summary: "A real image forms where light rays actually converge; it can be projected on a screen. A virtual image forms where rays only appear to…",
        explanation: "A real image forms where light rays actually converge; it can be projected on a screen. A virtual image forms where rays only appear to diverge from; it is seen by looking through the lens or into the mirror.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Real vs virtual images” requires you to distinguish or calculate.",
            solution: "Use the core idea: A real image forms where light rays actually converge; it can be projected on a screen. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Real vs virtual images",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-lens-mirror-imaging-image-characteristics-by-position",
        title: "Image characteristics by position",
        summary: "For a converging lens: object at infinity → image at focus; beyond 2F → real, inverted, diminished; at 2F → real, inverted, same size;…",
        explanation: "For a converging lens: object at infinity → image at focus; beyond 2F → real, inverted, diminished; at 2F → real, inverted, same size; between F and 2F → real, inverted, magnified; inside F → virtual, upright, magnified.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Image characteristics by position” requires you to distinguish or calculate.",
            solution: "Use the core idea: For a converging lens: object at infinity → image at focus; beyond 2F → real, inverted, diminished; at 2F → real, inverted, same size; between F and 2F → real, inverted, magnified; inside F → virtual, upright, magnified. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Image characteristics by position",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-reflection-refraction", "phy-lenses-mirrors-em-spectrum"],
    content: true,
    buildsOn: ["phy-reflection-refraction", "phy-lenses-mirrors-em-spectrum"],
    leadsTo: [],
    usedIn: ["meteo-remote-sensing"]
  },

// ============================= SECTION PHY-07: Electricity =============================

  {
    id: "phy-electric-charge-coulomb",
    sectionId: "PHY-07",
    order: 1,
    title: "Electric Charge & Coulomb's Law",
    definition: "Electric charge is a fundamental property of matter that causes it to experience a force in an electric field. Coulomb's law gives the force between two point charges.",
    keyFacts: [
      "There are two types of charge: positive and negative; like charges repel, opposite charges attract.",
      "Charge is conserved and quantised; the elementary charge e ≈ 1.6 × 10⁻¹⁹ C.",
      "SI unit of charge is the coulomb (C).",
      "Coulomb's law: F = k q₁ q₂ / r², where k ≈ 9.0 × 10⁹ N·m²/C².",
      "The force is inversely proportional to the square of the distance between the charges.",
      "An electrostatic conductor allows charge to move; an insulator does not."
    ],
    explanationSections: [
      { heading: "Charge transfer", body: "Objects become charged by gaining or losing electrons. Rubbing a rod with cloth can transfer electrons, leaving one object positively charged and the other negatively charged. Charge is always conserved in these processes." },
      { heading: "Coulomb's law", body: "The electrostatic force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation. The force is attractive for opposite charges and repulsive for like charges. It acts along the line joining the charges." },
      { heading: "Conductors and insulators", body: "In conductors such as metals, electrons move freely, so charge spreads out. In insulators, electrons are tightly bound to atoms. Charging by induction uses a conductor's mobile charges without direct contact." },
      { heading: "Inverse-square pattern", body: "Doubling the distance between two charges reduces the force to one-quarter. Halving the distance quadruples the force. This inverse-square dependence is shared by gravity and electric force, but electric force can be attractive or repulsive." }
    ],
    formula: {
      name: "Coulomb's law",
      expression: "F = \\frac{k q_1 q_2}{r^2}",
      variables: [
        { symbol: "F", meaning: "electrostatic force (N)" },
        { symbol: "k", meaning: "Coulomb constant, ≈ 9.0 × 10⁹ N·m²/C²" },
        { symbol: "q_1, q_2", meaning: "charges (C)" },
        { symbol: "r", meaning: "separation between charges (m)" }
      ]
    },
    workedExample: [
      {
        problem: "Two point charges of +2.0 µC and +3.0 µC are 0.30 m apart in air. Calculate the force between them.",
        solution: "q₁ = 2.0 × 10⁻⁶ C, q₂ = 3.0 × 10⁻⁶ C. F = (9.0 × 10⁹ × 2.0 × 10⁻⁶ × 3.0 × 10⁻⁶) / (0.30)² = 0.054 / 0.09 = 0.60 N.",
        answer: "0.60 N repulsive."
      },
      {
        problem: "The force between two charges is 8.0 N when they are 0.20 m apart. What is the force when the distance is doubled?",
        solution: "Force is inversely proportional to distance squared. Doubling the distance reduces force by 2² = 4. New force = 8.0 N / 4 = 2.0 N.",
        answer: "2.0 N."
      }
    ],
    commonMistakes: [
      "Forgetting that like charges repel and opposite charges attract.",
      "Using distance in cm instead of metres in Coulomb's law.",
      "Confusing microcoulombs (µC) with coulombs.",
      "Treating Coulomb's law as one-dimensional when charges can attract or repel along a line."
    ],
    examPoints: [
      "Elementary charge e ≈ 1.6 × 10⁻¹⁹ C; an electron has charge −e, a proton +e.",
      "Coulomb's force follows an inverse-square law.",
      "Charge is conserved; it cannot be created or destroyed, only transferred.",
      "Insulators can be charged by friction; conductors can be charged by induction."
    ],
    limitCases: [
      { condition: "r → ∞", result: "F → 0", physicalMeaning: "Very distant charges exert negligible force on each other." },
      { condition: "r → 0", result: "F becomes very large", physicalMeaning: "Coulomb's law applies to point charges; at very small separations other effects matter." }
    ],

    subtopics: [
      {
        id: "phy-electric-charge-coulomb-charge-transfer",
        title: "Charge transfer",
        summary: "Objects become charged by gaining or losing electrons. Rubbing a rod with cloth can transfer electrons, leaving one object positively…",
        explanation: "Objects become charged by gaining or losing electrons. Rubbing a rod with cloth can transfer electrons, leaving one object positively charged and the other negatively charged. Charge is always conserved in these processes.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Charge transfer” requires you to distinguish or calculate.",
            solution: "Use the core idea: Objects become charged by gaining or losing electrons. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Charge transfer",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-electric-charge-coulomb-coulomb-s-law",
        title: "Coulomb's law",
        summary: "The electrostatic force between two point charges is proportional to the product of the charges and inversely proportional to the square of…",
        explanation: "The electrostatic force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation. The force is attractive for opposite charges and repulsive for like charges. It acts along the line joining the charges.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Coulomb's law” requires you to distinguish or calculate.",
            solution: "Use the core idea: The electrostatic force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Coulomb's law",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-electric-charge-coulomb-conductors-and-insulators",
        title: "Conductors and insulators",
        summary: "In conductors such as metals, electrons move freely, so charge spreads out. In insulators, electrons are tightly bound to atoms. Charging…",
        explanation: "In conductors such as metals, electrons move freely, so charge spreads out. In insulators, electrons are tightly bound to atoms. Charging by induction uses a conductor's mobile charges without direct contact.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Conductors and insulators” requires you to distinguish or calculate.",
            solution: "Use the core idea: In conductors such as metals, electrons move freely, so charge spreads out. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Conductors and insulators",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-electric-charge-coulomb-inverse-square-pattern",
        title: "Inverse-square pattern",
        summary: "Doubling the distance between two charges reduces the force to one-quarter. Halving the distance quadruples the force. This inverse-square…",
        explanation: "Doubling the distance between two charges reduces the force to one-quarter. Halving the distance quadruples the force. This inverse-square dependence is shared by gravity and electric force, but electric force can be attractive or repulsive.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Inverse-square pattern” requires you to distinguish or calculate.",
            solution: "Use the core idea: Doubling the distance between two charges reduces the force to one-quarter. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Inverse-square pattern",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-electric-field-potential", "phy-current-voltage-resistance", "phy-universal-gravitation"],
    content: true,
    buildsOn: ["phy-units-measurement", "math-3-1"],
    leadsTo: ["phy-electric-field-potential"],
    usedIn: ["phy-current-voltage-resistance"]
  },

  {
    id: "phy-electric-field-potential",
    sectionId: "PHY-07",
    order: 2,
    title: "Electric Field & Electric Potential",
    definition: "An electric field is a region where a charged particle experiences a force. Electric potential is the potential energy per unit charge at a point in the field.",
    keyFacts: [
      "Electric field strength E = F/q; SI unit N/C or V/m.",
      "Electric field lines point away from positive charges and toward negative charges.",
      "The density of field lines indicates field strength.",
      "Electric potential V = potential energy per unit charge; SI unit volt (V), where 1 V = 1 J/C.",
      "For a point charge, field strength E = kQ/r² and potential V = kQ/r.",
      "A positive charge moves from high potential to low potential if free."
    ],
    explanationSections: [
      { heading: "Field as a force per unit charge", body: "Electric field strength tells you the force that would act on a small positive test charge placed at a point. A negative charge experiences a force in the opposite direction to the field." },
      { heading: "Field lines", body: "Field lines show the direction of force on a positive charge. They never cross, because a charge cannot experience two force directions at one point. Closer lines mean a stronger field." },
      { heading: "Electric potential", body: "Potential measures how much potential energy each coulomb of charge has. A 9 V battery gives each coulomb 9 J of energy. Positive charges tend to move from high potential to low potential; negative charges move the other way." },
      { heading: "Uniform fields", body: "Between two parallel charged plates, the electric field is approximately uniform. In a uniform field E, the potential difference between plates separated by distance d is V = E d." }
    ],
    formula: [
      {
        name: "Electric field strength",
        expression: "E = \\frac{F}{q} = \\frac{k Q}{r^2}",
        variables: [
          { symbol: "E", meaning: "electric field strength (N/C or V/m)" },
          { symbol: "F", meaning: "force on charge (N)" },
          { symbol: "q", meaning: "test charge (C)" },
          { symbol: "Q", meaning: "source charge (C)" },
          { symbol: "r", meaning: "distance from source charge (m)" }
        ]
      },
      {
        name: "Uniform field between parallel plates",
        expression: "E = \\frac{V}{d}",
        variables: [
          { symbol: "E", meaning: "electric field strength (V/m)" },
          { symbol: "V", meaning: "potential difference between plates (V)" },
          { symbol: "d", meaning: "plate separation (m)" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "A charge of +4.0 µC experiences a force of 0.20 N in an electric field. What is the field strength?",
        solution: "E = F/q = 0.20 N / 4.0 × 10⁻⁶ C = 5.0 × 10⁴ N/C.",
        answer: "5.0 × 10⁴ N/C (or V/m)."
      },
      {
        problem: "Two parallel plates are 2.0 cm apart and have a potential difference of 400 V. Calculate the electric field between them.",
        solution: "d = 2.0 cm = 0.020 m. E = V/d = 400 V / 0.020 m = 2.0 × 10⁴ V/m.",
        answer: "2.0 × 10⁴ V/m."
      }
    ],
    commonMistakes: [
      "Confusing electric field with electric potential; field is force per charge, potential is energy per charge.",
      "Forgetting field direction is defined for a positive test charge.",
      "Using total distance instead of perpendicular plate separation in E = V/d.",
      "Thinking electric potential is a vector; it is a scalar."
    ],
    examPoints: [
      "1 V = 1 J/C; field can be measured in N/C or V/m.",
      "Field lines are closer together where the field is stronger.",
      "In a uniform field, E = V/d.",
      "A charge released in an electric field gains kinetic energy equal to qV."
    ],

    subtopics: [
      {
        id: "phy-electric-field-potential-field-as-a-force-per-unit-charge",
        title: "Field as a force per unit charge",
        summary: "Electric field strength tells you the force that would act on a small positive test charge placed at a point. A negative charge experiences…",
        explanation: "Electric field strength tells you the force that would act on a small positive test charge placed at a point. A negative charge experiences a force in the opposite direction to the field.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Field as a force per unit charge” requires you to distinguish or calculate.",
            solution: "Use the core idea: Electric field strength tells you the force that would act on a small positive test charge placed at a point. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Field as a force per unit charge",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-electric-field-potential-field-lines",
        title: "Field lines",
        summary: "Field lines show the direction of force on a positive charge. They never cross, because a charge cannot experience two force directions at…",
        explanation: "Field lines show the direction of force on a positive charge. They never cross, because a charge cannot experience two force directions at one point. Closer lines mean a stronger field.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Field lines” requires you to distinguish or calculate.",
            solution: "Use the core idea: Field lines show the direction of force on a positive charge. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Field lines",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-electric-field-potential-electric-potential",
        title: "Electric potential",
        summary: "Potential measures how much potential energy each coulomb of charge has. A 9 V battery gives each coulomb 9 J of energy. Positive charges…",
        explanation: "Potential measures how much potential energy each coulomb of charge has. A 9 V battery gives each coulomb 9 J of energy. Positive charges tend to move from high potential to low potential; negative charges move the other way.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-electric-field-potential-uniform-fields",
        title: "Uniform fields",
        summary: "Between two parallel charged plates, the electric field is approximately uniform. In a uniform field E, the potential difference between…",
        explanation: "Between two parallel charged plates, the electric field is approximately uniform. In a uniform field E, the potential difference between plates separated by distance d is V = E d.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-electric-charge-coulomb", "phy-current-voltage-resistance", "phy-capacitance"],
    content: true,
    buildsOn: ["phy-electric-charge-coulomb"],
    leadsTo: ["phy-current-voltage-resistance", "phy-capacitance"],
    usedIn: ["phy-circuits-power-energy"]
  },

  {
    id: "phy-current-voltage-resistance",
    sectionId: "PHY-07",
    order: 3,
    title: "Current, Voltage, Resistance & Ohm's Law",
    definition: "Electric current is the rate of flow of charge. Voltage is the energy transferred per unit charge. Resistance measures how much a component opposes current. Ohm's law states that current is proportional to voltage for a conductor at constant temperature.",
    keyFacts: [
      "Current I = Q/t; SI unit ampere (A), where 1 A = 1 C/s.",
      "Voltage (potential difference) V = W/Q; SI unit volt (V), where 1 V = 1 J/C.",
      "Resistance R = V/I; SI unit ohm (Ω).",
      "Ohm's law: V = I R, for a metallic conductor at constant temperature.",
      "Current is the same at all points in a series circuit.",
      "The sum of potential differences across components in series equals the supply voltage."
    ],
    explanationSections: [
      { heading: "Current as flow of charge", body: "In a metal, current is the drift of free electrons. The direction of conventional current is from positive to negative, opposite to the electron flow. In a circuit, charge is already present everywhere; the battery provides the energy that drives it around." },
      { heading: "Voltage as energy per charge", body: "A 12 V battery gives 12 joules of energy to each coulomb of charge that passes through it. Voltage is not a force or a current; it is the driving energy for charge." },
      { heading: "Resistance", body: "Resistance arises from collisions between charge carriers and the lattice of the conductor. Thinner, longer and hotter wires have higher resistance. Materials with constant resistance obey Ohm's law and give a straight-line I-V graph through the origin." },
      { heading: "Series and parallel at a glance", body: "In series, current is the same everywhere and voltages add. In parallel, voltage is the same across each branch and currents add. These rules are the starting point for almost all circuit calculations." }
    ],
    formula: [
      {
        name: "Current, voltage and resistance",
        expression: "I = \\frac{Q}{t} \\quad V = \\frac{W}{Q} \\quad R = \\frac{V}{I}",
        variables: [
          { symbol: "I", meaning: "current (A)" },
          { symbol: "Q", meaning: "charge (C)" },
          { symbol: "t", meaning: "time (s)" },
          { symbol: "V", meaning: "potential difference (V)" },
          { symbol: "W", meaning: "energy (J)" },
          { symbol: "R", meaning: "resistance (Ω)" }
        ]
      },
      {
        name: "Ohm's law",
        expression: "V = I R",
        variables: [
          { symbol: "V", meaning: "voltage (V)" },
          { symbol: "I", meaning: "current (A)" },
          { symbol: "R", meaning: "resistance (Ω)" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "A current of 0.50 A flows through a 12 Ω resistor. Find the potential difference across it.",
        solution: "V = I R = 0.50 A × 12 Ω = 6.0 V.",
        answer: "6.0 V."
      },
      {
        problem: "How much charge passes through a component in 2.0 minutes when the current is 0.30 A?",
        solution: "t = 2.0 min = 120 s. Q = I t = 0.30 A × 120 s = 36 C.",
        answer: "36 C."
      }
    ],
    commonMistakes: [
      "Confusing current with voltage; current is flow, voltage is the push.",
      "Assuming all conductors obey Ohm's law; filament lamps and diodes do not.",
      "Using total resistance in parallel as the sum of resistances; it is not.",
      "Forgetting that current is the same in series but splits in parallel."
    ],
    examPoints: [
      "1 A = 1 C/s; 1 V = 1 J/C; 1 Ω = 1 V/A.",
      "Ohm's law applies only when temperature (and hence resistance) is constant.",
      "Conventional current flows from positive terminal to negative terminal.",
      "Electrons flow in the opposite direction to conventional current."
    ],
    methodChooser: {
      title: "Circuit quantity to find",
      intro: "Start by identifying whether the circuit is series, parallel or mixed, then choose the appropriate rule.",
      steps: [
        { condition: "Unknown is current through a resistor", recommendation: "Use I = V/R", notes: "Use the voltage across that resistor" },
        { condition: "Unknown is voltage across a resistor", recommendation: "Use V = IR", notes: "Use the current through that resistor" },
        { condition: "Resistors in series", recommendation: "R_total = R₁ + R₂ + ...", notes: "Current is the same through all" },
        { condition: "Resistors in parallel", recommendation: "1/R_total = 1/R₁ + 1/R₂ + ...", notes: "Voltage is the same across all" }
      ]
    },

    subtopics: [
      {
        id: "phy-current-voltage-resistance-current-as-flow-of-charge",
        title: "Current as flow of charge",
        summary: "In a metal, current is the drift of free electrons. The direction of conventional current is from positive to negative, opposite to the…",
        explanation: "In a metal, current is the drift of free electrons. The direction of conventional current is from positive to negative, opposite to the electron flow. In a circuit, charge is already present everywhere; the battery provides the energy that drives it around.",
                examples: [
          {
            problem: "A resistor of 10 Ω carries 0.5 A. What is the potential difference across it?",
            solution: "V = IR = 0.5 × 10 = 5 V.",
            answer: "5 V",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-current-voltage-resistance-voltage-as-energy-per-charge",
        title: "Voltage as energy per charge",
        summary: "A 12 V battery gives 12 joules of energy to each coulomb of charge that passes through it. Voltage is not a force or a current; it is the…",
        explanation: "A 12 V battery gives 12 joules of energy to each coulomb of charge that passes through it. Voltage is not a force or a current; it is the driving energy for charge.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-current-voltage-resistance-resistance",
        title: "Resistance",
        summary: "Resistance arises from collisions between charge carriers and the lattice of the conductor. Thinner, longer and hotter wires have higher…",
        explanation: "Resistance arises from collisions between charge carriers and the lattice of the conductor. Thinner, longer and hotter wires have higher resistance. Materials with constant resistance obey Ohm's law and give a straight-line I-V graph through the origin.",
                examples: [
          {
            problem: "A resistor of 10 Ω carries 0.5 A. What is the potential difference across it?",
            solution: "V = IR = 0.5 × 10 = 5 V.",
            answer: "5 V",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-current-voltage-resistance-series-and-parallel-at-a-glance",
        title: "Series and parallel at a glance",
        summary: "In series, current is the same everywhere and voltages add. In parallel, voltage is the same across each branch and currents add. These…",
        explanation: "In series, current is the same everywhere and voltages add. In parallel, voltage is the same across each branch and currents add. These rules are the starting point for almost all circuit calculations.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Series and parallel at a glance” requires you to distinguish or calculate.",
            solution: "Use the core idea: In series, current is the same everywhere and voltages add. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Series and parallel at a glance",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-electric-charge-coulomb", "phy-electric-field-potential", "phy-circuits-power-energy"],
    content: true,
    buildsOn: ["phy-electric-field-potential", "phy-units-measurement"],
    leadsTo: ["phy-circuits-power-energy"],
    usedIn: ["phy-circuits-power-energy", "phy-transformers-ac"]
  },

  {
    id: "phy-circuits-power-energy",
    sectionId: "PHY-07",
    order: 4,
    title: "Circuits, Electrical Power & Energy",
    definition: "An electric circuit provides a closed path for current. Electrical power is the rate at which a device transfers energy. Energy transferred equals power multiplied by time.",
    keyFacts: [
      "In a series circuit, current is the same everywhere and total resistance is the sum of individual resistances.",
      "In a parallel circuit, voltage is the same across each branch and total current is the sum of branch currents.",
      "Power in a resistor can be written as P = IV, P = I²R or P = V²/R.",
      "Electrical energy E = P t; domestic energy is often measured in kilowatt-hours (kWh).",
      "1 kWh = 3.6 × 10⁶ J.",
      "Fuses and circuit breakers protect circuits by breaking the current when it exceeds a safe value."
    ],
    explanationSections: [
      { heading: "Series circuits", body: "Components are connected end-to-end, so there is only one path for current. If one component fails, the circuit is broken. The total resistance increases as more resistors are added, reducing the current from a given supply." },
      { heading: "Parallel circuits", body: "Components are connected across common points, so each branch has the full supply voltage. Adding more branches increases total current but does not affect the voltage across existing branches. Household circuits are wired in parallel so each appliance receives the same voltage." },
      { heading: "Power forms", body: "P = IV is the general definition. Using Ohm's law, it becomes I²R or V²/R for resistors. Use whichever form matches the known quantities. For example, if current and resistance are known, P = I²R avoids calculating voltage first." },
      { heading: "Energy and cost", body: "Electricity meters measure energy in kilowatt-hours. To find cost, multiply energy in kWh by the price per kWh. Remember that power in kW is power in W divided by 1 000." }
    ],
    formula: [
      {
        name: "Series and parallel resistance",
        expression: "R_{series} = R_1 + R_2 + \\dots \\quad \\frac{1}{R_{parallel}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots",
        variables: [
          { symbol: "R_{series}", meaning: "total resistance in series (Ω)" },
          { symbol: "R_{parallel}", meaning: "total resistance in parallel (Ω)" },
          { symbol: "R_1, R_2", meaning: "individual resistances (Ω)" }
        ]
      },
      {
        name: "Electrical power and energy",
        expression: "P = I V = I^2 R = \\frac{V^2}{R} \\quad E = P t",
        variables: [
          { symbol: "P", meaning: "power (W)" },
          { symbol: "E", meaning: "energy (J or kWh)" },
          { symbol: "t", meaning: "time (s or h)" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "A 60 W lamp is connected to 240 V. Calculate (a) the current it draws and (b) its resistance.",
        solution: "(a) I = P/V = 60 W / 240 V = 0.25 A. (b) R = V/I = 240 V / 0.25 A = 960 Ω (or R = V²/P = 240²/60 = 960 Ω).",
        answer: "0.25 A; 960 Ω."
      },
      {
        problem: "Two resistors of 4.0 Ω and 6.0 Ω are connected in parallel across a 12 V battery. Find the total current drawn from the battery.",
        solution: "1/R_total = 1/4.0 + 1/6.0 = (3 + 2)/12 = 5/12, so R_total = 12/5 = 2.4 Ω. Total current I = V/R_total = 12 V / 2.4 Ω = 5.0 A.",
        answer: "5.0 A."
      }
    ],
    commonMistakes: [
      "Adding resistances in parallel instead of using reciprocals.",
      "Using total voltage with one resistor's current in series without first finding that current.",
      "Confusing power with energy; power is the rate of energy transfer.",
      "Forgetting to convert watts to kilowatts when calculating kWh."
    ],
    examPoints: [
      "Household appliances are connected in parallel to the mains.",
      "Total resistance in parallel is always less than the smallest individual resistance.",
      "1 kWh = 3.6 MJ.",
      "A fuse rating should be slightly higher than the normal operating current."
    ],
    comparisonTable: {
      headers: ["Feature", "Series circuit", "Parallel circuit"],
      rows: [
        ["Current", "Same everywhere", "Splits between branches"],
        ["Voltage", "Shared between components", "Same across each branch"],
        ["Total resistance", "R_total = R₁ + R₂ + ...", "1/R_total = 1/R₁ + 1/R₂ + ..."],
        ["If one component fails", "Circuit breaks", "Other branches keep working"],
        ["Domestic use?", "Rare", "Standard wiring"]
      ]
    },
    methodChooser: {
      title: "Which power formula to use",
      intro: "Choose the form of P = IV that avoids unnecessary intermediate steps.",
      steps: [
        { condition: "Current and voltage known", recommendation: "P = IV", notes: "Most direct" },
        { condition: "Current and resistance known", recommendation: "P = I²R", notes: "Avoids finding V" },
        { condition: "Voltage and resistance known", recommendation: "P = V²/R", notes: "Avoids finding I" },
        { condition: "Energy consumed over time", recommendation: "E = Pt", notes: "Use kW and hours for kWh" }
      ]
    },

    subtopics: [
      {
        id: "phy-circuits-power-energy-series-circuits",
        title: "Series circuits",
        summary: "Components are connected end-to-end, so there is only one path for current. If one component fails, the circuit is broken. The total…",
        explanation: "Components are connected end-to-end, so there is only one path for current. If one component fails, the circuit is broken. The total resistance increases as more resistors are added, reducing the current from a given supply.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Series circuits” requires you to distinguish or calculate.",
            solution: "Use the core idea: Components are connected end-to-end, so there is only one path for current. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Series circuits",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-circuits-power-energy-parallel-circuits",
        title: "Parallel circuits",
        summary: "Components are connected across common points, so each branch has the full supply voltage. Adding more branches increases total current but…",
        explanation: "Components are connected across common points, so each branch has the full supply voltage. Adding more branches increases total current but does not affect the voltage across existing branches. Household circuits are wired in parallel so each appliance receives the same voltage.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Parallel circuits” requires you to distinguish or calculate.",
            solution: "Use the core idea: Components are connected across common points, so each branch has the full supply voltage. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Parallel circuits",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-circuits-power-energy-power-forms",
        title: "Power forms",
        summary: "P = IV is the general definition. Using Ohm's law, it becomes I²R or V²/R for resistors. Use whichever form matches the known quantities.…",
        explanation: "P = IV is the general definition. Using Ohm's law, it becomes I²R or V²/R for resistors. Use whichever form matches the known quantities. For example, if current and resistance are known, P = I²R avoids calculating voltage first.",
                examples: [
          {
            problem: "A resistor of 10 Ω carries 0.5 A. What is the potential difference across it?",
            solution: "V = IR = 0.5 × 10 = 5 V.",
            answer: "5 V",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-circuits-power-energy-energy-and-cost",
        title: "Energy and cost",
        summary: "Electricity meters measure energy in kilowatt-hours. To find cost, multiply energy in kWh by the price per kWh. Remember that power in kW…",
        explanation: "Electricity meters measure energy in kilowatt-hours. To find cost, multiply energy in kWh by the price per kWh. Remember that power in kW is power in W divided by 1 000.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-current-voltage-resistance", "phy-power-efficiency", "phy-transformers-ac"],
    content: true,
    buildsOn: ["phy-current-voltage-resistance", "phy-work-energy", "phy-power-efficiency"],
    leadsTo: ["phy-transformers-ac"],
    usedIn: ["env-energy-sources"]
  },

  {
    id: "phy-capacitance",
    sectionId: "PHY-07",
    order: 5,
    title: "Capacitance & Capacitors",
    definition: "A capacitor stores electric charge and energy in an electric field between two conductors separated by an insulator. Capacitance measures how much charge a capacitor stores per volt of potential difference.",
    keyFacts: [
      "Capacitance C = Q/V; SI unit is the farad (F), where 1 F = 1 C/V.",
      "Common subunits: µF (10⁻⁶ F), nF (10⁻⁹ F), pF (10⁻¹² F).",
      "Energy stored in a charged capacitor: E = ½ QV = ½ CV² = ½ Q²/C.",
      "Capacitors block direct current but allow alternating current to pass in AC circuits.",
      "In a charging/discharging RC circuit, the time constant τ = RC.",
      "Capacitors are used in smoothing circuits, camera flashes and tuning circuits."
    ],
    explanationSections: [
      { heading: "How a capacitor stores energy", body: "When connected to a battery, charge builds up on the capacitor plates. Positive charge accumulates on one plate and negative charge on the other, creating an electric field between them. Energy is stored in this field. Removing the battery leaves the charge in place until a path is provided." },
      { heading: "Capacitance", body: "A capacitor with large capacitance stores more charge for the same voltage. Capacitance depends on plate area, plate separation and the material between the plates. Larger plates and smaller separation give larger capacitance." },
      { heading: "Charging and discharging", body: "When a capacitor charges through a resistor, current is initially high and then falls as the capacitor voltage approaches the supply voltage. The product RC gives the time constant: after one time constant the capacitor has charged to about 63% of the supply voltage." },
      { heading: "AC behaviour", body: "A capacitor continuously charges and discharges in an AC circuit, so current appears to flow. The opposition to AC is called capacitive reactance, which decreases as frequency increases." }
    ],
    formula: [
      {
        name: "Capacitance and stored energy",
        expression: "C = \\frac{Q}{V} \\quad E = \\frac{1}{2} Q V = \\frac{1}{2} C V^2",
        variables: [
          { symbol: "C", meaning: "capacitance (F)" },
          { symbol: "Q", meaning: "charge (C)" },
          { symbol: "V", meaning: "potential difference (V)" },
          { symbol: "E", meaning: "stored energy (J)" }
        ]
      },
      {
        name: "RC time constant",
        expression: "\\tau = R C",
        variables: [
          { symbol: "\\tau", meaning: "time constant (s)" },
          { symbol: "R", meaning: "resistance (Ω)" },
          { symbol: "C", meaning: "capacitance (F)" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "A 100 µF capacitor is connected to a 12 V battery. How much charge is stored, and how much energy is stored?",
        solution: "C = 100 µF = 1.0 × 10⁻⁴ F. Q = CV = 1.0 × 10⁻⁴ F × 12 V = 1.2 × 10⁻³ C. E = ½CV² = 0.5 × 1.0 × 10⁻⁴ × 12² = 7.2 × 10⁻³ J.",
        answer: "Q = 1.2 mC; E = 7.2 mJ."
      }
    ],
    commonMistakes: [
      "Forgetting that capacitors store energy, not charge permanently; they discharge through a resistor.",
      "Using Q = CV without converting microfarads to farads.",
      "Confusing capacitance with the charge stored; capacitance is charge per volt.",
      "Thinking capacitors pass DC; they block steady DC after charging."
    ],
    examPoints: [
      "1 farad is very large; practical capacitors are usually µF, nF or pF.",
      "Energy stored in a capacitor is proportional to V², so doubling voltage quadruples stored energy.",
      "Capacitors are used for energy storage, smoothing and timing circuits.",
      "In an RC circuit, after τ seconds the capacitor is about 63% charged; after 5τ it is effectively fully charged."
    ],

    subtopics: [
      {
        id: "phy-capacitance-how-a-capacitor-stores-energy",
        title: "How a capacitor stores energy",
        summary: "When connected to a battery, charge builds up on the capacitor plates. Positive charge accumulates on one plate and negative charge on the…",
        explanation: "When connected to a battery, charge builds up on the capacitor plates. Positive charge accumulates on one plate and negative charge on the other, creating an electric field between them. Energy is stored in this field. Removing the battery leaves the charge in place until a path is provided.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-capacitance-capacitance",
        title: "Capacitance",
        summary: "A capacitor with large capacitance stores more charge for the same voltage. Capacitance depends on plate area, plate separation and the…",
        explanation: "A capacitor with large capacitance stores more charge for the same voltage. Capacitance depends on plate area, plate separation and the material between the plates. Larger plates and smaller separation give larger capacitance.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Capacitance” requires you to distinguish or calculate.",
            solution: "Use the core idea: A capacitor with large capacitance stores more charge for the same voltage. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Capacitance",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-capacitance-charging-and-discharging",
        title: "Charging and discharging",
        summary: "When a capacitor charges through a resistor, current is initially high and then falls as the capacitor voltage approaches the supply…",
        explanation: "When a capacitor charges through a resistor, current is initially high and then falls as the capacitor voltage approaches the supply voltage. The product RC gives the time constant: after one time constant the capacitor has charged to about 63% of the supply voltage.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Charging and discharging” requires you to distinguish or calculate.",
            solution: "Use the core idea: When a capacitor charges through a resistor, current is initially high and then falls as the capacitor voltage approaches the supply voltage. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Charging and discharging",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-capacitance-ac-behaviour",
        title: "AC behaviour",
        summary: "A capacitor continuously charges and discharges in an AC circuit, so current appears to flow. The opposition to AC is called capacitive…",
        explanation: "A capacitor continuously charges and discharges in an AC circuit, so current appears to flow. The opposition to AC is called capacitive reactance, which decreases as frequency increases.",
                examples: [
          {
            problem: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.",
            solution: "v = fλ = 50 × 4 = 200 m/s.",
            answer: "200 m/s",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-electric-field-potential", "phy-current-voltage-resistance"],
    content: true,
    buildsOn: ["phy-electric-field-potential"],
    leadsTo: [],
    usedIn: ["phy-circuits-power-energy"]
  },

// ============================= SECTION PHY-08: Magnetism =============================

  {
    id: "phy-magnetic-fields-force",
    sectionId: "PHY-08",
    order: 1,
    title: "Magnetic Fields, Force & Electromagnets",
    definition: "A magnetic field is a region where a moving charge or a magnetic material experiences a force. Magnetic field lines emerge from north poles and enter south poles. An electromagnet is a coil of wire carrying a current, which produces a magnetic field similar to a bar magnet.",
    keyFacts: [
      "Magnetic field lines go from north pole to south pole outside a magnet.",
      "Like poles repel; unlike poles attract.",
      "A current-carrying conductor produces a circular magnetic field around it.",
      "The right-hand grip rule gives the field direction around a straight current-carrying wire.",
      "A force acts on a current-carrying conductor placed perpendicular to a magnetic field: F = B I L.",
      "An electromagnet's strength increases with current, number of turns and presence of a soft iron core."
    ],
    explanationSections: [
      { heading: "Magnetic fields around magnets", body: "A bar magnet has a north pole and a south pole. Magnetic field lines leave the north pole, curve around outside the magnet and enter the south pole. The field is strongest where the lines are closest together, near the poles." },
      { heading: "Magnetic field due to current", body: "An electric current creates a magnetic field. For a straight wire, the field lines are circles centred on the wire. For a coil or solenoid, the field inside is nearly uniform and similar to a bar magnet; the end where field lines emerge is the north pole." },
      { heading: "Force on a current-carrying conductor", body: "When a wire carrying current is placed in a magnetic field, the wire experiences a force. The force is greatest when the wire is perpendicular to the field and zero when parallel. Fleming's left-hand rule gives the direction of the force: First finger = Field, seCond finger = Current, thuMb = Motion." },
      { heading: "Electromagnets", body: "A coil of wire wound on a soft iron core becomes a strong magnet when current flows. Soft iron loses its magnetism quickly when the current stops, making electromagnets useful in relays, cranes, loudspeakers and MRI machines." }
    ],
    formula: {
      name: "Force on a current-carrying conductor",
      expression: "F = B I L \\sin \\theta",
      variables: [
        { symbol: "F", meaning: "force (N)" },
        { symbol: "B", meaning: "magnetic flux density (T)" },
        { symbol: "I", meaning: "current (A)" },
        { symbol: "L", meaning: "length of conductor in field (m)" },
        { symbol: "\\theta", meaning: "angle between conductor and field" }
      ]
    },
    workedExample: [
      {
        problem: "A 0.25 m wire carries a current of 3.0 A perpendicular to a uniform magnetic field of 0.40 T. Calculate the force on the wire.",
        solution: "F = BIL = 0.40 T × 3.0 A × 0.25 m = 0.30 N.",
        answer: "0.30 N."
      }
    ],
    commonMistakes: [
      "Confusing the right-hand grip rule (field around a wire) with Fleming's left-hand rule (force on a wire).",
      "Forgetting that magnetic field lines form closed loops from north to south outside and south to north inside the magnet.",
      "Using total wire length instead of the length actually in the magnetic field.",
      "Thinking electromagnets retain strong magnetism after current is switched off; they use soft iron precisely because it does not."
    ],
    examPoints: [
      "1 tesla (T) is the SI unit of magnetic flux density.",
      "Fleming's left-hand rule: Field (first), Current (second), Motion (thumb).",
      "A current-carrying coil behaves like a bar magnet; reversing current reverses polarity.",
      "Electromagnets are stronger if the current is larger, there are more turns, or a soft iron core is used."
    ],

    subtopics: [
      {
        id: "phy-magnetic-fields-force-magnetic-fields-around-magnets",
        title: "Magnetic fields around magnets",
        summary: "A bar magnet has a north pole and a south pole. Magnetic field lines leave the north pole, curve around outside the magnet and enter the…",
        explanation: "A bar magnet has a north pole and a south pole. Magnetic field lines leave the north pole, curve around outside the magnet and enter the south pole. The field is strongest where the lines are closest together, near the poles.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Magnetic fields around magnets” requires you to distinguish or calculate.",
            solution: "Use the core idea: A bar magnet has a north pole and a south pole. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Magnetic fields around magnets",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-magnetic-fields-force-magnetic-field-due-to-current",
        title: "Magnetic field due to current",
        summary: "An electric current creates a magnetic field. For a straight wire, the field lines are circles centred on the wire. For a coil or solenoid,…",
        explanation: "An electric current creates a magnetic field. For a straight wire, the field lines are circles centred on the wire. For a coil or solenoid, the field inside is nearly uniform and similar to a bar magnet; the end where field lines emerge is the north pole.",
                examples: [
          {
            problem: "A resistor of 10 Ω carries 0.5 A. What is the potential difference across it?",
            solution: "V = IR = 0.5 × 10 = 5 V.",
            answer: "5 V",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-magnetic-fields-force-force-on-a-current-carrying-conductor",
        title: "Force on a current-carrying conductor",
        summary: "When a wire carrying current is placed in a magnetic field, the wire experiences a force. The force is greatest when the wire is…",
        explanation: "When a wire carrying current is placed in a magnetic field, the wire experiences a force. The force is greatest when the wire is perpendicular to the field and zero when parallel. Fleming's left-hand rule gives the direction of the force: First finger = Field, seCond finger = Current, thuMb = Motion.",
                examples: [
          {
            problem: "A resistor of 10 Ω carries 0.5 A. What is the potential difference across it?",
            solution: "V = IR = 0.5 × 10 = 5 V.",
            answer: "5 V",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-magnetic-fields-force-electromagnets",
        title: "Electromagnets",
        summary: "A coil of wire wound on a soft iron core becomes a strong magnet when current flows. Soft iron loses its magnetism quickly when the current…",
        explanation: "A coil of wire wound on a soft iron core becomes a strong magnet when current flows. Soft iron loses its magnetism quickly when the current stops, making electromagnets useful in relays, cranes, loudspeakers and MRI machines.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Electromagnets” requires you to distinguish or calculate.",
            solution: "Use the core idea: A coil of wire wound on a soft iron core becomes a strong magnet when current flows. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Electromagnets",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-current-voltage-resistance", "phy-electromagnetic-induction", "phy-transformers-ac"],
    content: true,
    buildsOn: ["phy-current-voltage-resistance", "phy-electric-charge-coulomb"],
    leadsTo: ["phy-electromagnetic-induction"],
    usedIn: ["phy-transformers-ac"]
  },

  {
    id: "phy-electromagnetic-induction",
    sectionId: "PHY-08",
    order: 2,
    title: "Electromagnetic Induction & EM Waves",
    definition: "Electromagnetic induction is the production of an electromotive force (emf) across a conductor when it experiences a changing magnetic field. Electromagnetic waves are self-propagating waves of oscillating electric and magnetic fields.",
    keyFacts: [
      "An induced emf is produced whenever there is a change in magnetic flux linkage through a circuit.",
      "Faraday's law: induced emf is proportional to the rate of change of magnetic flux linkage.",
      "Lenz's law: the induced current flows in a direction that opposes the change producing it.",
      "Moving a magnet into a coil induces an emf; moving it out induces an emf in the opposite direction.",
      "A generator converts mechanical energy into electrical energy by electromagnetic induction.",
      "Electromagnetic waves are transverse and travel at about 3 × 10⁸ m/s in a vacuum."
    ],
    explanationSections: [
      { heading: "What causes induction", body: "To induce an emf, the magnetic field through a coil must change. This can happen by moving a magnet, moving the coil, changing the current in a nearby circuit or rotating a coil in a magnetic field. Stationary magnet and stationary coil produce no emf." },
      { heading: "Faraday's and Lenz's laws", body: "Faraday's law tells us how much emf is induced: faster change means larger emf. Lenz's law tells us the direction: the induced current creates a magnetic field that opposes the motion or change. This opposition is a consequence of conservation of energy." },
      { heading: "Generators and dynamos", body: "A coil rotating in a magnetic field has a continuously changing flux linkage, producing an alternating emf. This is the working principle of power-station generators and bicycle dynamos. Faster rotation or stronger fields give larger peak voltage." },
      { heading: "Electromagnetic waves", body: "A changing electric field generates a changing magnetic field, and vice versa. The result is a self-sustaining wave that needs no medium. The spectrum ranges from low-frequency radio waves to high-frequency gamma rays; all travel at the speed of light in a vacuum." }
    ],
    formula: {
      name: "Transformer emf equation",
      expression: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p}",
      variables: [
        { symbol: "V_s", meaning: "secondary voltage (V)" },
        { symbol: "V_p", meaning: "primary voltage (V)" },
        { symbol: "N_s", meaning: "number of turns on secondary coil" },
        { symbol: "N_p", meaning: "number of turns on primary coil" }
      ]
    },
    workedExample: [
      {
        problem: "A magnet is moved into a coil of 200 turns, producing an average induced emf of 0.80 V. If the same magnet is moved in half the time, what is the new average emf?",
        solution: "Induced emf is proportional to rate of change of flux. Halving the time doubles the rate, so the emf doubles: 2 × 0.80 V = 1.60 V.",
        answer: "1.60 V."
      }
    ],
    commonMistakes: [
      "Thinking an emf is induced by a steady magnetic field; a changing field is required.",
      "Forgetting Lenz's law direction; the induced effect opposes the change.",
      "Confusing electromagnetic induction with the magnetic force on a current-carrying wire.",
      "Believing electromagnetic waves need a medium; they travel through a vacuum."
    ],
    examPoints: [
      "Faraday's law gives the size of induced emf; Lenz's law gives its direction.",
      "Transformers work only with alternating current, not steady DC.",
      "All electromagnetic waves travel at c ≈ 3.0 × 10⁸ m/s in a vacuum.",
      "EM waves are transverse and consist of oscillating electric and magnetic fields."
    ],
    qualitativeScenarios: [
      {
        scenario: "What happens to the induced current when a magnet is pulled out of a coil more quickly?",
        answer: "The induced current increases.",
        why: "A faster change of magnetic flux linkage produces a larger induced emf, and therefore a larger current for a given circuit resistance."
      }
    ],

    subtopics: [
      {
        id: "phy-electromagnetic-induction-what-causes-induction",
        title: "What causes induction",
        summary: "To induce an emf, the magnetic field through a coil must change. This can happen by moving a magnet, moving the coil, changing the current…",
        explanation: "To induce an emf, the magnetic field through a coil must change. This can happen by moving a magnet, moving the coil, changing the current in a nearby circuit or rotating a coil in a magnetic field. Stationary magnet and stationary coil produce no emf.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “What causes induction” requires you to distinguish or calculate.",
            solution: "Use the core idea: To induce an emf, the magnetic field through a coil must change. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "What causes induction",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-electromagnetic-induction-faraday-s-and-lenz-s-laws",
        title: "Faraday's and Lenz's laws",
        summary: "Faraday's law tells us how much emf is induced: faster change means larger emf. Lenz's law tells us the direction: the induced current…",
        explanation: "Faraday's law tells us how much emf is induced: faster change means larger emf. Lenz's law tells us the direction: the induced current creates a magnetic field that opposes the motion or change. This opposition is a consequence of conservation of energy.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Faraday's and Lenz's laws” requires you to distinguish or calculate.",
            solution: "Use the core idea: Faraday's law tells us how much emf is induced: faster change means larger emf. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Faraday's and Lenz's laws",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-electromagnetic-induction-generators-and-dynamos",
        title: "Generators and dynamos",
        summary: "A coil rotating in a magnetic field has a continuously changing flux linkage, producing an alternating emf. This is the working principle…",
        explanation: "A coil rotating in a magnetic field has a continuously changing flux linkage, producing an alternating emf. This is the working principle of power-station generators and bicycle dynamos. Faster rotation or stronger fields give larger peak voltage.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Generators and dynamos” requires you to distinguish or calculate.",
            solution: "Use the core idea: A coil rotating in a magnetic field has a continuously changing flux linkage, producing an alternating emf. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Generators and dynamos",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-electromagnetic-induction-electromagnetic-waves",
        title: "Electromagnetic waves",
        summary: "A changing electric field generates a changing magnetic field, and vice versa. The result is a self-sustaining wave that needs no medium.…",
        explanation: "A changing electric field generates a changing magnetic field, and vice versa. The result is a self-sustaining wave that needs no medium. The spectrum ranges from low-frequency radio waves to high-frequency gamma rays; all travel at the speed of light in a vacuum.",
                examples: [
          {
            problem: "A wave has frequency 50 Hz and wavelength 4 m. Find its speed.",
            solution: "v = fλ = 50 × 4 = 200 m/s.",
            answer: "200 m/s",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-magnetic-fields-force", "phy-wave-properties", "phy-transformers-ac"],
    content: true,
    buildsOn: ["phy-magnetic-fields-force", "phy-wave-properties"],
    leadsTo: ["phy-transformers-ac"],
    usedIn: ["env-energy-sources"]
  },

  {
    id: "phy-transformers-ac",
    sectionId: "PHY-08",
    order: 3,
    title: "Transformers & AC Power",
    definition: "A transformer changes an alternating voltage from one value to another using electromagnetic induction. It consists of primary and secondary coils wound on a soft iron core.",
    keyFacts: [
      "A step-up transformer increases voltage and decreases current; a step-down transformer decreases voltage and increases current.",
      "For an ideal transformer: V_p/V_s = N_p/N_s = I_s/I_p.",
      "Transformers work only with AC because they need a changing magnetic flux.",
      "Efficiency is high but not 100% due to resistive heating, eddy currents and hysteresis losses.",
      "High-voltage transmission reduces current and therefore reduces power loss in cables (P_loss = I²R).",
      "National grids use step-up transformers before transmission and step-down transformers before distribution."
    ],
    explanationSections: [
      { heading: "How a transformer works", body: "An alternating current in the primary coil produces a changing magnetic field in the iron core. This changing field links the secondary coil and induces an alternating emf. The ratio of secondary to primary voltage equals the ratio of turns." },
      { heading: "Step-up and step-down", body: "If the secondary has more turns than the primary, the secondary voltage is higher (step-up). To conserve power, the secondary current is lower. Step-down transformers do the reverse and are used to convert high transmission voltage to safer household voltage." },
      { heading: "Why AC is used", body: "A transformer needs a changing magnetic flux, so it requires alternating current. Direct current would produce a steady field and no induced emf in the secondary. This is why mains electricity is AC." },
      { heading: "Power transmission", body: "Power loss in cables is I²R. By transmitting at high voltage, the current is reduced for the same power, cutting cable losses dramatically. Step-down transformers then reduce voltage at substations and local transformers." }
    ],
    formula: {
      name: "Transformer equation",
      expression: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
      variables: [
        { symbol: "V_p, V_s", meaning: "primary and secondary voltages (V)" },
        { symbol: "N_p, N_s", meaning: "primary and secondary turns" },
        { symbol: "I_p, I_s", meaning: "primary and secondary currents (A)" }
      ]
    },
    workedExample: [
      {
        problem: "A transformer has 100 primary turns and 2 000 secondary turns. The primary voltage is 240 V. Calculate the secondary voltage. If the primary current is 5.0 A and the transformer is 100% efficient, what is the secondary current?",
        solution: "V_s = V_p × (N_s/N_p) = 240 V × (2 000/100) = 4 800 V. For an ideal transformer, V_p I_p = V_s I_s, so I_s = (240 V × 5.0 A) / 4 800 V = 0.25 A.",
        answer: "Secondary voltage = 4 800 V; secondary current = 0.25 A."
      }
    ],
    commonMistakes: [
      "Trying to use a transformer with DC supply; transformers need AC.",
      "Confusing step-up and step-down turn ratios.",
      "Forgetting that ideal transformer power input equals power output.",
      "Assuming transformers are 100% efficient in real problems unless told so."
    ],
    examPoints: [
      "Step-up: N_s > N_p, V_s > V_p, I_s < I_p.",
      "Step-down: N_s < N_p, V_s < V_p, I_s > I_p.",
      "High-voltage transmission reduces I²R losses.",
      "Real transformers have losses from resistance, eddy currents and core hysteresis."
    ],

    subtopics: [
      {
        id: "phy-transformers-ac-how-a-transformer-works",
        title: "How a transformer works",
        summary: "An alternating current in the primary coil produces a changing magnetic field in the iron core. This changing field links the secondary…",
        explanation: "An alternating current in the primary coil produces a changing magnetic field in the iron core. This changing field links the secondary coil and induces an alternating emf. The ratio of secondary to primary voltage equals the ratio of turns.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-transformers-ac-step-up-and-step-down",
        title: "Step-up and step-down",
        summary: "If the secondary has more turns than the primary, the secondary voltage is higher (step-up). To conserve power, the secondary current is…",
        explanation: "If the secondary has more turns than the primary, the secondary voltage is higher (step-up). To conserve power, the secondary current is lower. Step-down transformers do the reverse and are used to convert high transmission voltage to safer household voltage.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Step-up and step-down” requires you to distinguish or calculate.",
            solution: "Use the core idea: If the secondary has more turns than the primary, the secondary voltage is higher (step-up). Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Step-up and step-down",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-transformers-ac-why-ac-is-used",
        title: "Why AC is used",
        summary: "A transformer needs a changing magnetic flux, so it requires alternating current. Direct current would produce a steady field and no…",
        explanation: "A transformer needs a changing magnetic flux, so it requires alternating current. Direct current would produce a steady field and no induced emf in the secondary. This is why mains electricity is AC.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Why AC is used” requires you to distinguish or calculate.",
            solution: "Use the core idea: A transformer needs a changing magnetic flux, so it requires alternating current. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Why AC is used",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-transformers-ac-power-transmission",
        title: "Power transmission",
        summary: "Power loss in cables is I²R. By transmitting at high voltage, the current is reduced for the same power, cutting cable losses dramatically.…",
        explanation: "Power loss in cables is I²R. By transmitting at high voltage, the current is reduced for the same power, cutting cable losses dramatically. Step-down transformers then reduce voltage at substations and local transformers.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Power transmission” requires you to distinguish or calculate.",
            solution: "Use the core idea: Power loss in cables is I²R. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Power transmission",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-electromagnetic-induction", "phy-circuits-power-energy"],
    content: true,
    buildsOn: ["phy-electromagnetic-induction", "phy-circuits-power-energy"],
    leadsTo: [],
    usedIn: ["env-energy-sources"]
  },

// ============================= SECTION PHY-09: Modern Physics =============================

  {
    id: "phy-atomic-structure",
    sectionId: "PHY-09",
    order: 1,
    title: "Atomic Structure & the Nucleus",
    definition: "An atom consists of a small, dense, positively charged nucleus surrounded by electrons. The nucleus contains protons and neutrons; the number of protons defines the element.",
    keyFacts: [
      "Protons have charge +e and mass ≈ 1 u; neutrons are neutral and mass ≈ 1 u; electrons have charge −e and much smaller mass.",
      "Atomic number Z = number of protons; mass number A = protons + neutrons.",
      "Isotopes of an element have the same Z but different numbers of neutrons.",
      "Electrons occupy energy levels or shells around the nucleus.",
      "The Rutherford scattering experiment showed that the atom has a small, dense nucleus.",
      "Bohr's model explained atomic spectra by quantised electron orbits."
    ],
    explanationSections: [
      { heading: "Nuclear notation", body: "A nucleus is written as ᴬ_Z X, where X is the chemical symbol, A is the mass number (nucleon number) and Z is the atomic number (proton number). For example, ¹⁴_₆C has 6 protons and 8 neutrons." },
      { heading: "Isotopes", body: "Isotopes have the same number of protons and therefore the same chemical properties, but different numbers of neutrons. Hydrogen-1, deuterium and tritium are isotopes of hydrogen. Some isotopes are stable; others are radioactive." },
      { heading: "Rutherford's experiment", body: "Alpha particles fired at a thin gold foil were mostly undeflected, but a few bounced back. Rutherford concluded that the atom's mass and positive charge are concentrated in a tiny nucleus, with electrons orbiting at relatively large distances." },
      { heading: "Energy levels", body: "Electrons in an atom can occupy only certain allowed energy levels. When an electron drops from a higher level to a lower one, a photon is emitted with energy equal to the difference between the levels. This produces line spectra." }
    ],
    commonMistakes: [
      "Confusing atomic number with mass number.",
      "Thinking the mass number counts electrons.",
      "Confusing isotopes with ions; isotopes differ in neutron number, ions differ in electron number.",
      "Believing Rutherford discovered the electron; he discovered the nucleus."
    ],
    examPoints: [
      "Number of neutrons = A − Z.",
      "The nucleus occupies a tiny fraction of the atom's volume but contains nearly all its mass.",
      "Isotopes have identical chemical behaviour because chemistry depends on electrons, not neutrons.",
      "Line spectra provide evidence for discrete electron energy levels."
    ],

    subtopics: [
      {
        id: "phy-atomic-structure-nuclear-notation",
        title: "Nuclear notation",
        summary: "A nucleus is written as ᴬ_Z X, where X is the chemical symbol, A is the mass number (nucleon number) and Z is the atomic number (proton…",
        explanation: "A nucleus is written as ᴬ_Z X, where X is the chemical symbol, A is the mass number (nucleon number) and Z is the atomic number (proton number). For example, ¹⁴_₆C has 6 protons and 8 neutrons.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Nuclear notation” requires you to distinguish or calculate.",
            solution: "Use the core idea: A nucleus is written as ᴬ_Z X, where X is the chemical symbol, A is the mass number (nucleon number) and Z is the atomic number (proton number). Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Nuclear notation",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-atomic-structure-isotopes",
        title: "Isotopes",
        summary: "Isotopes have the same number of protons and therefore the same chemical properties, but different numbers of neutrons. Hydrogen-1,…",
        explanation: "Isotopes have the same number of protons and therefore the same chemical properties, but different numbers of neutrons. Hydrogen-1, deuterium and tritium are isotopes of hydrogen. Some isotopes are stable; others are radioactive.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Isotopes” requires you to distinguish or calculate.",
            solution: "Use the core idea: Isotopes have the same number of protons and therefore the same chemical properties, but different numbers of neutrons. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Isotopes",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-atomic-structure-rutherford-s-experiment",
        title: "Rutherford's experiment",
        summary: "Alpha particles fired at a thin gold foil were mostly undeflected, but a few bounced back. Rutherford concluded that the atom's mass and…",
        explanation: "Alpha particles fired at a thin gold foil were mostly undeflected, but a few bounced back. Rutherford concluded that the atom's mass and positive charge are concentrated in a tiny nucleus, with electrons orbiting at relatively large distances.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Rutherford's experiment” requires you to distinguish or calculate.",
            solution: "Use the core idea: Alpha particles fired at a thin gold foil were mostly undeflected, but a few bounced back. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Rutherford's experiment",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-atomic-structure-energy-levels",
        title: "Energy levels",
        summary: "Electrons in an atom can occupy only certain allowed energy levels. When an electron drops from a higher level to a lower one, a photon is…",
        explanation: "Electrons in an atom can occupy only certain allowed energy levels. When an electron drops from a higher level to a lower one, a photon is emitted with energy equal to the difference between the levels. This produces line spectra.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-radioactivity-nuclear", "phy-half-life-decay", "phy-fission-chain-reaction"],
    content: true,
    buildsOn: ["phy-units-measurement", "math-3-4"],
    leadsTo: ["phy-radioactivity-nuclear"],
    usedIn: ["phy-half-life-decay", "phy-fission-chain-reaction"]
  },

  {
    id: "phy-radioactivity-nuclear",
    sectionId: "PHY-09",
    order: 2,
    title: "Radioactivity, Nuclear Fission & Fusion",
    definition: "Radioactivity is the spontaneous decay of unstable nuclei, emitting radiation. Nuclear fission is the splitting of a heavy nucleus into smaller nuclei, releasing energy. Nuclear fusion is the joining of light nuclei to form a heavier nucleus, also releasing energy.",
    keyFacts: [
      "Alpha (α) radiation consists of helium nuclei (2 protons + 2 neutrons); it is least penetrating and most ionising.",
      "Beta (β) radiation consists of fast electrons (or positrons); it is moderately penetrating and ionising.",
      "Gamma (γ) radiation is high-energy electromagnetic radiation; it is most penetrating and least ionising.",
      "Radioactive decay is random and spontaneous; it cannot be speeded up or slowed down by chemical or physical means.",
      "In fission, a heavy nucleus such as uranium-235 splits when hit by a neutron, releasing more neutrons and energy.",
      "In fusion, light nuclei such as hydrogen isotopes combine at very high temperature and pressure, as in the Sun."
    ],
    explanationSections: [
      { heading: "Alpha, beta and gamma", body: "Alpha particles are relatively heavy and slow, so they ionise matter strongly but are stopped by paper or a few centimetres of air. Beta particles are lighter and faster, stopped by a few millimetres of aluminium. Gamma rays are uncharged electromagnetic waves and require thick lead or concrete to reduce their intensity significantly." },
      { heading: "Nuclear equations", body: "In nuclear equations, both mass number A and atomic number Z must balance. In alpha decay, A decreases by 4 and Z decreases by 2. In beta-minus decay, A stays the same and Z increases by 1 because a neutron becomes a proton and an electron." },
      { heading: "Fission chain reaction", body: "When uranium-235 absorbs a neutron, it splits into two smaller nuclei plus two or three neutrons. These neutrons can cause further fissions, producing a chain reaction. Control rods in a reactor absorb excess neutrons to keep the reaction steady." },
      { heading: "Fusion", body: "Fusion releases more energy per kilogram of fuel than fission and produces less radioactive waste, but it requires extremely high temperatures and pressures to overcome electrostatic repulsion between nuclei. Controlled fusion is still a major research goal." }
    ],
    formula: {
      name: "Mass-energy equivalence",
      expression: "E = \\Delta m c^2",
      variables: [
        { symbol: "E", meaning: "energy released (J)" },
        { symbol: "\\Delta m", meaning: "mass defect (kg)" },
        { symbol: "c", meaning: "speed of light in vacuum (m/s)" }
      ]
    },
    workedExample: [
      {
        problem: "In a fission reaction, 0.0010 kg of matter is converted into energy. Calculate the energy released.",
        solution: "E = Δm c² = 0.0010 kg × (3.0 × 10⁸ m/s)² = 0.0010 × 9.0 × 10¹⁶ = 9.0 × 10¹³ J.",
        answer: "9.0 × 10¹³ J."
      }
    ],
    commonMistakes: [
      "Confusing alpha particles with helium atoms; alpha particles are helium nuclei (He²⁺).",
      "Forgetting to balance both mass number and atomic number in nuclear equations.",
      "Thinking chemical treatment can change the rate of radioactive decay.",
      "Confusing fission (splitting heavy nuclei) with fusion (joining light nuclei)."
    ],
    examPoints: [
      "Penetration: α < β < γ; ionising power: α > β > γ.",
      "In β⁻ decay, a neutron → proton + electron + antineutrino; Z increases by 1, A unchanged.",
      "Nuclear reactions release energy because the total mass of products is slightly less than reactants (mass defect).",
      "Control rods regulate fission by absorbing neutrons."
    ],
    comparisonTable: {
      headers: ["Radiation", "Nature", "Charge", "Penetration", "Ionisation"],
      rows: [
        ["Alpha (α)", "Helium nucleus", "+2e", "Stopped by paper", "Strong"],
        ["Beta (β)", "Fast electron", "−e", "Stopped by a few mm Al", "Moderate"],
        ["Gamma (γ)", "EM wave", "0", "Reduced by thick lead", "Weak"]
      ]
    },

    subtopics: [
      {
        id: "phy-radioactivity-nuclear-alpha-beta-and-gamma",
        title: "Alpha, beta and gamma",
        summary: "Alpha particles are relatively heavy and slow, so they ionise matter strongly but are stopped by paper or a few centimetres of air. Beta…",
        explanation: "Alpha particles are relatively heavy and slow, so they ionise matter strongly but are stopped by paper or a few centimetres of air. Beta particles are lighter and faster, stopped by a few millimetres of aluminium. Gamma rays are uncharged electromagnetic waves and require thick lead or concrete to reduce their intensity significantly.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Alpha, beta and gamma” requires you to distinguish or calculate.",
            solution: "Use the core idea: Alpha particles are relatively heavy and slow, so they ionise matter strongly but are stopped by paper or a few centimetres of air. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Alpha, beta and gamma",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-radioactivity-nuclear-nuclear-equations",
        title: "Nuclear equations",
        summary: "In nuclear equations, both mass number A and atomic number Z must balance. In alpha decay, A decreases by 4 and Z decreases by 2. In…",
        explanation: "In nuclear equations, both mass number A and atomic number Z must balance. In alpha decay, A decreases by 4 and Z decreases by 2. In beta-minus decay, A stays the same and Z increases by 1 because a neutron becomes a proton and an electron.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Nuclear equations” requires you to distinguish or calculate.",
            solution: "Use the core idea: In nuclear equations, both mass number A and atomic number Z must balance. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Nuclear equations",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-radioactivity-nuclear-fission-chain-reaction",
        title: "Fission chain reaction",
        summary: "When uranium-235 absorbs a neutron, it splits into two smaller nuclei plus two or three neutrons. These neutrons can cause further…",
        explanation: "When uranium-235 absorbs a neutron, it splits into two smaller nuclei plus two or three neutrons. These neutrons can cause further fissions, producing a chain reaction. Control rods in a reactor absorb excess neutrons to keep the reaction steady.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Fission chain reaction” requires you to distinguish or calculate.",
            solution: "Use the core idea: When uranium-235 absorbs a neutron, it splits into two smaller nuclei plus two or three neutrons. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Fission chain reaction",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-radioactivity-nuclear-fusion",
        title: "Fusion",
        summary: "Fusion releases more energy per kilogram of fuel than fission and produces less radioactive waste, but it requires extremely high…",
        explanation: "Fusion releases more energy per kilogram of fuel than fission and produces less radioactive waste, but it requires extremely high temperatures and pressures to overcome electrostatic repulsion between nuclei. Controlled fusion is still a major research goal.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-atomic-structure", "phy-half-life-decay", "phy-fission-chain-reaction"],
    content: true,
    buildsOn: ["phy-atomic-structure", "math-3-1"],
    leadsTo: ["phy-half-life-decay", "phy-fission-chain-reaction"],
    usedIn: ["earth-c2"]
  },

  {
    id: "phy-half-life-decay",
    sectionId: "PHY-09",
    order: 3,
    title: "Half-Life, Decay Constant & Radioactive Dating",
    definition: "The half-life of a radioactive isotope is the time taken for half of the radioactive nuclei in a sample to decay. The decay constant λ is the probability of decay per unit time and is related to half-life by t½ = ln 2/λ.",
    keyFacts: [
      "Half-life is constant for a given isotope and is unaffected by temperature, pressure or chemical state.",
      "After n half-lives, the fraction remaining is (1/2)ⁿ.",
      "Activity A = λN, where N is the number of undecayed nuclei.",
      "Carbon-14 dating uses the known half-life of ¹⁴C (about 5 730 years) to estimate the age of organic material.",
      "Radioactive dating of rocks uses long-lived isotopes such as uranium-238.",
      "The exponential decay curve never reaches zero; it approaches it asymptotically."
    ],
    explanationSections: [
      { heading: "Meaning of half-life", body: "Half-life is a statistical property of a large number of nuclei. We cannot predict when an individual nucleus will decay, but we can say that after one half-life about half of a large sample remains undecayed. After two half-lives, one-quarter remains, and so on." },
      { heading: "Decay constant", body: "The decay constant λ tells us the fraction of nuclei expected to decay per unit time. A large λ means a short half-life and rapid decay. The relationship t½ = 0.693/λ is useful for converting between the two quantities." },
      { heading: "Radioactive dating", body: "Living things absorb carbon-14 while alive. After death, the ¹⁴C decays with a half-life of 5 730 years. By comparing the remaining ¹⁴C activity to that in living material, archaeologists estimate age. For much older rocks, uranium-lead dating is used." },
      { heading: "Exponential decay", body: "Radioactive decay follows N = N₀ e^−λt. The curve falls rapidly at first and then more slowly. This is why small samples can still be hazardous long after their initial activity has fallen." }
    ],
    formula: [
      {
        name: "Half-life relation",
        expression: "t_{1/2} = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0.693}{\\lambda}",
        variables: [
          { symbol: "t_{1/2}", meaning: "half-life (s)" },
          { symbol: "\\lambda", meaning: "decay constant (s⁻¹)" }
        ]
      },
      {
        name: "Remaining activity / nuclei",
        expression: "N = N_0 \\left(\\frac{1}{2}\\right)^{t/t_{1/2}} \\quad A = A_0 \\left(\\frac{1}{2}\\right)^{t/t_{1/2}}",
        variables: [
          { symbol: "N", meaning: "number of nuclei remaining" },
          { symbol: "N_0", meaning: "initial number of nuclei" },
          { symbol: "A", meaning: "activity remaining" },
          { symbol: "A_0", meaning: "initial activity" },
          { symbol: "t", meaning: "elapsed time" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "A radioactive sample has a half-life of 8 days. What fraction remains after 24 days?",
        solution: "Number of half-lives = 24/8 = 3. Fraction remaining = (1/2)³ = 1/8.",
        answer: "1/8 of the original sample."
      },
      {
        problem: "The activity of a sample falls from 800 Bq to 100 Bq. How many half-lives have passed?",
        solution: "800 → 400 → 200 → 100, which is 3 halvings. So 3 half-lives have passed.",
        answer: "3 half-lives."
      }
    ],
    commonMistakes: [
      "Thinking half-life means half the time for all nuclei to decay.",
      "Confusing the number of half-lives with the fraction remaining.",
      "Forgetting that radioactive decay is exponential, not linear.",
      "Believing half-life can be changed by heating or chemical reaction."
    ],
    examPoints: [
      "After n half-lives, remaining fraction = (1/2)ⁿ.",
      "Half-life is a property of the isotope, not the sample size.",
      "Carbon-14 half-life ≈ 5 730 years; used for dating organic remains up to about 50 000 years.",
      "Activity is measured in becquerels (Bq); 1 Bq = 1 decay per second."
    ],
    misconceptionRemediation: [
      {
        misconception: "After two half-lives, all the radioactive material has decayed.",
        whyStudentsThinkIt: "'Half' suggests something is gone, so two halves might mean all gone.",
        correctModel: "After one half-life half remains; after two half-lives half of that half, or one-quarter, remains. Decay continues exponentially."
      }
    ],

    subtopics: [
      {
        id: "phy-half-life-decay-meaning-of-half-life",
        title: "Meaning of half-life",
        summary: "Half-life is a statistical property of a large number of nuclei. We cannot predict when an individual nucleus will decay, but we can say…",
        explanation: "Half-life is a statistical property of a large number of nuclei. We cannot predict when an individual nucleus will decay, but we can say that after one half-life about half of a large sample remains undecayed. After two half-lives, one-quarter remains, and so on.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Meaning of half-life” requires you to distinguish or calculate.",
            solution: "Use the core idea: Half-life is a statistical property of a large number of nuclei. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Meaning of half-life",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-half-life-decay-decay-constant",
        title: "Decay constant",
        summary: "The decay constant λ tells us the fraction of nuclei expected to decay per unit time. A large λ means a short half-life and rapid decay.…",
        explanation: "The decay constant λ tells us the fraction of nuclei expected to decay per unit time. A large λ means a short half-life and rapid decay. The relationship t½ = 0.693/λ is useful for converting between the two quantities.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Decay constant” requires you to distinguish or calculate.",
            solution: "Use the core idea: The decay constant λ tells us the fraction of nuclei expected to decay per unit time. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Decay constant",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-half-life-decay-radioactive-dating",
        title: "Radioactive dating",
        summary: "Living things absorb carbon-14 while alive. After death, the ¹⁴C decays with a half-life of 5 730 years. By comparing the remaining ¹⁴C…",
        explanation: "Living things absorb carbon-14 while alive. After death, the ¹⁴C decays with a half-life of 5 730 years. By comparing the remaining ¹⁴C activity to that in living material, archaeologists estimate age. For much older rocks, uranium-lead dating is used.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Radioactive dating” requires you to distinguish or calculate.",
            solution: "Use the core idea: Living things absorb carbon-14 while alive. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Radioactive dating",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-half-life-decay-exponential-decay",
        title: "Exponential decay",
        summary: "Radioactive decay follows N = N₀ e^−λt. The curve falls rapidly at first and then more slowly. This is why small samples can still be…",
        explanation: "Radioactive decay follows N = N₀ e^−λt. The curve falls rapidly at first and then more slowly. This is why small samples can still be hazardous long after their initial activity has fallen.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Exponential decay” requires you to distinguish or calculate.",
            solution: "Use the core idea: Radioactive decay follows N = N₀ e^−λt. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Exponential decay",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-atomic-structure", "phy-radioactivity-nuclear"],
    content: true,
    buildsOn: ["phy-radioactivity-nuclear", "math-3-1", "math-3-3"],
    leadsTo: [],
    usedIn: ["earth-c2"]
  },

  {
    id: "phy-fission-chain-reaction",
    sectionId: "PHY-09",
    order: 4,
    title: "Nuclear Fission, Chain Reactions & Nuclear Power",
    definition: "Nuclear fission is the splitting of a heavy nucleus into two or more smaller nuclei, accompanied by the release of energy and neutrons. A chain reaction occurs when the released neutrons cause further fissions.",
    keyFacts: [
      "Uranium-235 and plutonium-239 are common fissile fuels.",
      "A neutron-induced fission releases about 200 MeV of energy per fission.",
      "A controlled chain reaction occurs in a nuclear reactor; an uncontrolled chain reaction occurs in a nuclear bomb.",
      "Moderators such as graphite or heavy water slow neutrons to increase the probability of fission.",
      "Control rods absorb neutrons to regulate the reaction rate.",
      "Nuclear waste remains radioactive and must be stored safely for long periods."
    ],
    explanationSections: [
      { heading: "Energy from fission", body: "The total mass of the fission products and released neutrons is slightly less than the mass of the original nucleus plus neutron. This mass difference is converted to energy via E = mc², mostly as kinetic energy of the fragments, which becomes heat." },
      { heading: "Chain reaction", body: "One fission releases two or three neutrons. If at least one neutron on average causes another fission, the reaction is self-sustaining. In a bomb, the reaction runs away; in a reactor, control rods keep exactly one neutron per fission causing another fission." },
      { heading: "Reactor components", body: "Fuel rods contain enriched uranium. A moderator slows fast neutrons so they are more likely to cause fission. Coolant removes heat to generate steam and drive turbines. A containment structure prevents radiation release." },
      { heading: "Pros and cons", body: "Nuclear power produces large amounts of energy without CO₂ emissions during operation, but it produces radioactive waste, carries accident risk and has high construction costs. FPSC questions often test safety, waste and chain-reaction concepts rather than detailed engineering." }
    ],
    formula: {
      name: "Energy from mass defect",
      expression: "E = \\Delta m c^2",
      variables: [
        { symbol: "E", meaning: "energy released (J)" },
        { symbol: "\\Delta m", meaning: "mass defect (kg)" },
        { symbol: "c", meaning: "speed of light (m/s)" }
      ]
    },
    workedExample: [
      {
        problem: "A nuclear reactor produces energy from fission reactions, each releasing 200 MeV. If 1 MeV = 1.6 × 10⁻¹³ J, how many fissions per second are needed to produce 1 000 MW of thermal power?",
        solution: "Energy per fission = 200 × 1.6 × 10⁻¹³ J = 3.2 × 10⁻¹¹ J. Power = 1 000 MW = 1.0 × 10⁹ J/s. Number of fissions per second = 1.0 × 10⁹ / 3.2 × 10⁻¹¹ ≈ 3.1 × 10¹⁹.",
        answer: "≈ 3 × 10¹⁹ fissions per second."
      }
    ],
    commonMistakes: [
      "Confusing fission with fusion.",
      "Thinking the moderator speeds up neutrons; it slows them.",
      "Believing control rods speed up the reaction; they absorb neutrons and slow it.",
      "Forgetting that the mass-energy relation applies to the small mass defect, not the whole nucleus."
    ],
    examPoints: [
      "Fission releases energy because the binding energy per nucleon increases for medium-mass products.",
      "Control rods regulate reaction rate by absorbing neutrons.",
      "Moderators slow neutrons to thermal speeds for efficient U-235 fission.",
      "Nuclear power plants use heat from fission to produce steam and drive turbines."
    ],

    subtopics: [
      {
        id: "phy-fission-chain-reaction-energy-from-fission",
        title: "Energy from fission",
        summary: "The total mass of the fission products and released neutrons is slightly less than the mass of the original nucleus plus neutron. This mass…",
        explanation: "The total mass of the fission products and released neutrons is slightly less than the mass of the original nucleus plus neutron. This mass difference is converted to energy via E = mc², mostly as kinetic energy of the fragments, which becomes heat.",
                examples: [
          {
            problem: "A 2 kg object moves at 4 m/s. What is its kinetic energy?",
            solution: "KE = ½mv² = ½ × 2 × 16 = 16 J.",
            answer: "16 J",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-fission-chain-reaction-chain-reaction",
        title: "Chain reaction",
        summary: "One fission releases two or three neutrons. If at least one neutron on average causes another fission, the reaction is self-sustaining. In…",
        explanation: "One fission releases two or three neutrons. If at least one neutron on average causes another fission, the reaction is self-sustaining. In a bomb, the reaction runs away; in a reactor, control rods keep exactly one neutron per fission causing another fission.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Chain reaction” requires you to distinguish or calculate.",
            solution: "Use the core idea: One fission releases two or three neutrons. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Chain reaction",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-fission-chain-reaction-reactor-components",
        title: "Reactor components",
        summary: "Fuel rods contain enriched uranium. A moderator slows fast neutrons so they are more likely to cause fission. Coolant removes heat to…",
        explanation: "Fuel rods contain enriched uranium. A moderator slows fast neutrons so they are more likely to cause fission. Coolant removes heat to generate steam and drive turbines. A containment structure prevents radiation release.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Reactor components” requires you to distinguish or calculate.",
            solution: "Use the core idea: Fuel rods contain enriched uranium. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Reactor components",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-fission-chain-reaction-pros-and-cons",
        title: "Pros and cons",
        summary: "Nuclear power produces large amounts of energy without CO₂ emissions during operation, but it produces radioactive waste, carries accident…",
        explanation: "Nuclear power produces large amounts of energy without CO₂ emissions during operation, but it produces radioactive waste, carries accident risk and has high construction costs. FPSC questions often test safety, waste and chain-reaction concepts rather than detailed engineering.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Pros and cons” requires you to distinguish or calculate.",
            solution: "Use the core idea: Nuclear power produces large amounts of energy without CO₂ emissions during operation, but it produces radioactive waste, carries accident risk and has high construction costs. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Pros and cons",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-atomic-structure", "phy-radioactivity-nuclear"],
    content: true,
    buildsOn: ["phy-radioactivity-nuclear", "phy-atomic-structure"],
    leadsTo: [],
    usedIn: ["env-energy-sources"]
  },

// ============================= SECTION PHY-10: Gravity =============================

  {
    id: "phy-universal-gravitation",
    sectionId: "PHY-10",
    order: 1,
    title: "Newton's Law of Universal Gravitation",
    definition: "Every particle of matter in the universe attracts every other particle with a force that is directly proportional to the product of their masses and inversely proportional to the square of the distance between their centres.",
    keyFacts: [
      "Universal gravitation: F = G m₁ m₂ / r², where G ≈ 6.67 × 10⁻¹¹ N·m²/kg².",
      "The force is always attractive and acts along the line joining the centres of the two masses.",
      "Gravitational field strength g at a point is the force per unit mass: g = GM/r².",
      "Weight W = m g is the gravitational force on a mass near a planet or moon.",
      "The acceleration due to gravity on Earth's surface is approximately 9.8 m/s².",
      "Satellites orbit because their horizontal speed is large enough that they continuously fall toward Earth but miss it."
    ],
    explanationSections: [
      { heading: "Inverse-square law", body: "The gravitational force between two masses weakens rapidly with distance. If the distance between their centres doubles, the force becomes one-quarter. If the distance triples, the force becomes one-ninth. This is why astronauts in low orbit still feel most of Earth's gravity, while distant spacecraft feel very little." },
      { heading: "Gravitational field strength", body: "The value of g at a planet's surface depends on the planet's mass and radius. More massive planets have stronger g; larger planets (for the same mass) have weaker surface g. This is why Jupiter's surface gravity is much greater than Mercury's." },
      { heading: "Weight on other bodies", body: "Your mass is the same everywhere, but your weight changes because g changes. On the Moon, g ≈ 1.6 N/kg, so a 60 kg person weighs about 96 N instead of 588 N on Earth." },
      { heading: "Satellite motion", body: "A satellite in a stable orbit is in free fall. Gravity provides the centripetal force needed for circular motion. For a given orbital radius, there is one specific speed that produces a circular orbit. Higher orbits have lower orbital speeds and longer periods." }
    ],
    formula: [
      {
        name: "Newton's law of gravitation",
        expression: "F = \\frac{G m_1 m_2}{r^2}",
        variables: [
          { symbol: "F", meaning: "gravitational force (N)" },
          { symbol: "G", meaning: "gravitational constant (N·m²/kg²)" },
          { symbol: "m_1, m_2", meaning: "masses (kg)" },
          { symbol: "r", meaning: "distance between centres (m)" }
        ]
      },
      {
        name: "Gravitational field strength",
        expression: "g = \\frac{G M}{r^2}",
        variables: [
          { symbol: "g", meaning: "gravitational field strength (N/kg)" },
          { symbol: "G", meaning: "gravitational constant" },
          { symbol: "M", meaning: "mass of planet or body (kg)" },
          { symbol: "r", meaning: "distance from centre (m)" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "Calculate the gravitational force between two 1.0 kg masses placed 0.50 m apart.",
        solution: "F = G m₁ m₂ / r² = 6.67 × 10⁻¹¹ × 1.0 × 1.0 / (0.50)² = 6.67 × 10⁻¹¹ / 0.25 = 2.67 × 10⁻¹⁰ N.",
        answer: "2.7 × 10⁻¹⁰ N."
      },
      {
        problem: "The gravitational field strength at the surface of a planet of mass 6.0 × 10²⁴ kg and radius 6.4 × 10⁶ m is approximately what value?",
        solution: "g = GM/r² = (6.67 × 10⁻¹¹ × 6.0 × 10²⁴) / (6.4 × 10⁶)² = 4.0 × 10¹⁴ / 4.096 × 10¹³ ≈ 9.77 N/kg.",
        answer: "≈ 9.8 N/kg."
      }
    ],
    commonMistakes: [
      "Using surface-to-surface distance instead of centre-to-centre distance.",
      "Confusing mass with weight.",
      "Forgetting that G is very small, so ordinary objects attract each other negligibly.",
      "Thinking orbiting astronauts experience zero gravity; they are in free fall, not free of gravity."
    ],
    examPoints: [
      "G ≈ 6.67 × 10⁻¹¹ N·m²/kg²; it is a universal constant.",
      "Gravity is an inverse-square force.",
      "g = GM/r²; at a planet's surface r is the planet's radius.",
      "Weight varies with location; mass does not."
    ],
    limitCases: [
      { condition: "r → ∞", result: "F → 0", physicalMeaning: "Gravitational force becomes negligible at very large distances." },
      { condition: "One mass is doubled", result: "F doubles", physicalMeaning: "Force is directly proportional to each mass." },
      { condition: "r doubles", result: "F becomes one-quarter", physicalMeaning: "Inverse-square dependence." }
    ],

    subtopics: [
      {
        id: "phy-universal-gravitation-inverse-square-law",
        title: "Inverse-square law",
        summary: "The gravitational force between two masses weakens rapidly with distance. If the distance between their centres doubles, the force becomes…",
        explanation: "The gravitational force between two masses weakens rapidly with distance. If the distance between their centres doubles, the force becomes one-quarter. If the distance triples, the force becomes one-ninth. This is why astronauts in low orbit still feel most of Earth's gravity, while distant spacecraft feel very little.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Inverse-square law” requires you to distinguish or calculate.",
            solution: "Use the core idea: The gravitational force between two masses weakens rapidly with distance. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Inverse-square law",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-universal-gravitation-gravitational-field-strength",
        title: "Gravitational field strength",
        summary: "The value of g at a planet's surface depends on the planet's mass and radius. More massive planets have stronger g; larger planets (for the…",
        explanation: "The value of g at a planet's surface depends on the planet's mass and radius. More massive planets have stronger g; larger planets (for the same mass) have weaker surface g. This is why Jupiter's surface gravity is much greater than Mercury's.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Gravitational field strength” requires you to distinguish or calculate.",
            solution: "Use the core idea: The value of g at a planet's surface depends on the planet's mass and radius. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Gravitational field strength",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-universal-gravitation-weight-on-other-bodies",
        title: "Weight on other bodies",
        summary: "Your mass is the same everywhere, but your weight changes because g changes. On the Moon, g ≈ 1.6 N/kg, so a 60 kg person weighs about 96 N…",
        explanation: "Your mass is the same everywhere, but your weight changes because g changes. On the Moon, g ≈ 1.6 N/kg, so a 60 kg person weighs about 96 N instead of 588 N on Earth.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Weight on other bodies” requires you to distinguish or calculate.",
            solution: "Use the core idea: Your mass is the same everywhere, but your weight changes because g changes. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Weight on other bodies",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-universal-gravitation-satellite-motion",
        title: "Satellite motion",
        summary: "A satellite in a stable orbit is in free fall. Gravity provides the centripetal force needed for circular motion. For a given orbital…",
        explanation: "A satellite in a stable orbit is in free fall. Gravity provides the centripetal force needed for circular motion. For a given orbital radius, there is one specific speed that produces a circular orbit. Higher orbits have lower orbital speeds and longer periods.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Satellite motion” requires you to distinguish or calculate.",
            solution: "Use the core idea: A satellite in a stable orbit is in free fall. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Satellite motion",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-gravity-weight-friction", "phy-kinematics"],
    content: true,
    buildsOn: ["phy-gravity-weight-friction", "math-3-1"],
    leadsTo: [],
    usedIn: ["earth-a5"]
  },

// ============================= SECTION PHY-11: Measurement & Vectors =============================

  {
    id: "phy-units-measurement",
    sectionId: "PHY-11",
    order: 1,
    title: "SI Units, Prefixes & Dimensional Analysis",
    definition: "The International System of Units (SI) provides standard units for physical quantities. Prefixes such as kilo-, milli- and micro- denote multiples or fractions of units. Dimensional analysis checks that equations are consistent by comparing units.",
    keyFacts: [
      "The seven SI base units include metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol) and candela (cd).",
      "Derived units include newton (N = kg·m/s²), joule (J = N·m) and watt (W = J/s).",
      "Common prefixes: kilo (k) = 10³, centi (c) = 10⁻², milli (m) = 10⁻³, micro (µ) = 10⁻⁶, nano (n) = 10⁻⁹.",
      "Dimensional analysis can verify formulas and convert units.",
      "A quantity with units can never be added to a quantity with different units.",
      "When solving problems, convert all quantities to base or consistent derived units before substituting."
    ],
    explanationSections: [
      { heading: "Base and derived units", body: "Base units are defined independently. Derived units are combinations of base units. For example, speed is m/s, force is kg·m/s² and pressure is kg/(m·s²). Knowing these combinations helps check equations." },
      { heading: "Using prefixes", body: "A milligram is 10⁻³ g and a kilometre is 10³ m. Be careful with squared or cubed units: 1 cm² = (10⁻² m)² = 10⁻⁴ m², and 1 cm³ = 10⁻⁶ m³. These conversions are a frequent source of error." },
      { heading: "Dimensional analysis", body: "If a formula claims F = m v, check units: left side is kg·m/s², right side is kg·m/s. They do not match, so the formula is wrong. Dimensional analysis does not prove a formula is right, but it can prove it wrong." },
      { heading: "Significant figures", body: "Final answers should be given to a sensible number of significant figures, usually matching the least precise given value. In competitive exams, choosing the correct option often depends on rounding carefully." }
    ],
    workedExample: [
      {
        problem: "Show that the units of kinetic energy, ½mv², are equivalent to joules.",
        solution: "[m] = kg, [v] = m/s, so [mv²] = kg × (m/s)² = kg·m²/s². A joule is N·m = (kg·m/s²) × m = kg·m²/s². The units match.",
        answer: "Units are consistent: kg·m²/s² = J."
      },
      {
        problem: "Convert 5.0 g/cm³ to kg/m³.",
        solution: "1 g = 10⁻³ kg and 1 cm³ = 10⁻⁶ m³. So 5.0 g/cm³ = 5.0 × 10⁻³ kg / 10⁻⁶ m³ = 5.0 × 10³ kg/m³.",
        answer: "5 000 kg/m³."
      }
    ],
    commonMistakes: [
      "Forgetting to convert prefixes before substituting into formulas.",
      "Squaring or cubing prefix conversions incorrectly.",
      "Adding quantities with different units.",
      "Giving answers with too many significant figures."
    ],
    examPoints: [
      "Always write units in final answers.",
      "The SI unit of pressure is the pascal (Pa = N/m²).",
      "1 litre = 1 000 cm³ = 10⁻³ m³.",
      "Dimensional analysis is a quick way to eliminate wrong formulas in MCQs."
    ],

    subtopics: [
      {
        id: "phy-units-measurement-base-and-derived-units",
        title: "Base and derived units",
        summary: "Base units are defined independently. Derived units are combinations of base units. For example, speed is m/s, force is kg·m/s² and…",
        explanation: "Base units are defined independently. Derived units are combinations of base units. For example, speed is m/s, force is kg·m/s² and pressure is kg/(m·s²). Knowing these combinations helps check equations.",
                examples: [
          {
            problem: "A force of 200 N acts uniformly on an area of 0.5 m². Find the pressure.",
            solution: "P = F/A = 200 / 0.5 = 400 Pa.",
            answer: "400 Pa",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-units-measurement-using-prefixes",
        title: "Using prefixes",
        summary: "A milligram is 10⁻³ g and a kilometre is 10³ m. Be careful with squared or cubed units: 1 cm² = (10⁻² m)² = 10⁻⁴ m², and 1 cm³ = 10⁻⁶ m³.…",
        explanation: "A milligram is 10⁻³ g and a kilometre is 10³ m. Be careful with squared or cubed units: 1 cm² = (10⁻² m)² = 10⁻⁴ m², and 1 cm³ = 10⁻⁶ m³. These conversions are a frequent source of error.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Using prefixes” requires you to distinguish or calculate.",
            solution: "Use the core idea: A milligram is 10⁻³ g and a kilometre is 10³ m. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Using prefixes",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-units-measurement-dimensional-analysis",
        title: "Dimensional analysis",
        summary: "If a formula claims F = m v, check units: left side is kg·m/s², right side is kg·m/s. They do not match, so the formula is wrong.…",
        explanation: "If a formula claims F = m v, check units: left side is kg·m/s², right side is kg·m/s. They do not match, so the formula is wrong. Dimensional analysis does not prove a formula is right, but it can prove it wrong.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Dimensional analysis” requires you to distinguish or calculate.",
            solution: "Use the core idea: If a formula claims F = m v, check units: left side is kg·m/s², right side is kg·m/s. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Dimensional analysis",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-units-measurement-significant-figures",
        title: "Significant figures",
        summary: "Final answers should be given to a sensible number of significant figures, usually matching the least precise given value. In competitive…",
        explanation: "Final answers should be given to a sensible number of significant figures, usually matching the least precise given value. In competitive exams, choosing the correct option often depends on rounding carefully.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Significant figures” requires you to distinguish or calculate.",
            solution: "Use the core idea: Final answers should be given to a sensible number of significant figures, usually matching the least precise given value. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Significant figures",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-scalars-vectors", "phy-kinematics", "phy-density"],
    content: true,
    buildsOn: ["math-2-2", "math-1-6", "math-3-4"],
    leadsTo: ["phy-scalars-vectors", "phy-kinematics", "phy-pressure-fluids"],
    usedIn: ["phy-temperature-heat", "phy-atmospheric-pressure-physics", "meteo-hydrostatic-equation", "meteo-radiation-laws", "meteo-pressure-instruments"]
  },

  {
    id: "phy-scalars-vectors",
    sectionId: "PHY-11",
    order: 2,
    title: "Scalars vs Vectors: Magnitude and Direction",
    definition: "Scalars are quantities that have only magnitude. Vectors have both magnitude and direction and obey the rules of vector addition.",
    keyFacts: [
      "Scalars: distance, speed, mass, time, temperature, energy, power, pressure, density.",
      "Vectors: displacement, velocity, acceleration, force, momentum, weight, electric field, magnetic field.",
      "A vector is represented by an arrow whose length shows magnitude and whose direction shows the vector's direction.",
      "Two vectors are equal if they have the same magnitude and direction, regardless of where they are drawn.",
      "The negative of a vector has the same magnitude but opposite direction.",
      "Adding a vector to its negative gives the zero vector."
    ],
    explanationSections: [
      { heading: "Why direction matters", body: "A displacement of 5 km north is different from 5 km east, even though both have magnitude 5 km. A force of 10 N upward has a different effect from 10 N downward. Direction is part of the physical meaning of a vector." },
      { heading: "Representing vectors", body: "A vector arrow points in the direction of the quantity. The arrow's length is drawn to scale to represent magnitude. In equations, vectors may be written in bold (F) or with an arrow (F⃗)." },
      { heading: "Adding and subtracting", body: "Vectors are added by placing them tip-to-tail. The resultant runs from the tail of the first to the tip of the last. Subtracting a vector is the same as adding its negative. These operations are essential for finding net force, resultant velocity and total displacement." },
      { heading: "Common scalar/vector pairs", body: "Distance (scalar) and displacement (vector); speed (scalar) and velocity (vector); mass (scalar) and weight (vector). Recognising the pair prevents sign and direction errors." }
    ],
    commonMistakes: [
      "Calling a vector negative because its magnitude is small; negative means opposite direction.",
      "Trying to add vectors as ordinary numbers without considering direction.",
      "Confusing speed (scalar) with velocity (vector).",
      "Treating weight as a scalar; it is a force and therefore a vector."
    ],
    examPoints: [
      "Always check whether a quantity needs a direction before answering.",
      "Resultant displacement can be zero even when distance travelled is large.",
      "Vectors are added geometrically, not algebraically unless components are used.",
      "The zero vector has zero magnitude and no defined direction."
    ],
    comparisonTable: {
      headers: ["Quantity", "Scalar or vector?", "Notes"],
      rows: [
        ["Distance", "Scalar", "Path length"],
        ["Displacement", "Vector", "Net position change"],
        ["Speed", "Scalar", "Distance/time"],
        ["Velocity", "Vector", "Displacement/time"],
        ["Mass", "Scalar", "Amount of matter"],
        ["Weight", "Vector", "Gravitational force"],
        ["Force", "Vector", "Push or pull"],
        ["Energy", "Scalar", "Capacity to do work"]
      ]
    },

    subtopics: [
      {
        id: "phy-scalars-vectors-why-direction-matters",
        title: "Why direction matters",
        summary: "A displacement of 5 km north is different from 5 km east, even though both have magnitude 5 km. A force of 10 N upward has a different…",
        explanation: "A displacement of 5 km north is different from 5 km east, even though both have magnitude 5 km. A force of 10 N upward has a different effect from 10 N downward. Direction is part of the physical meaning of a vector.",
                examples: [
          {
            problem: "A runner completes one full 400 m circular track and stops at the start. What are the distance and displacement?",
            solution: "Distance is the path length = 400 m. Displacement is the change in position = 0 because start and finish coincide.",
            answer: "Distance 400 m; displacement 0",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-scalars-vectors-representing-vectors",
        title: "Representing vectors",
        summary: "A vector arrow points in the direction of the quantity. The arrow's length is drawn to scale to represent magnitude. In equations, vectors…",
        explanation: "A vector arrow points in the direction of the quantity. The arrow's length is drawn to scale to represent magnitude. In equations, vectors may be written in bold (F) or with an arrow (F⃗).",
                examples: [
          {
            problem: "A runner completes one full 400 m circular track and stops at the start. What are the distance and displacement?",
            solution: "Distance is the path length = 400 m. Displacement is the change in position = 0 because start and finish coincide.",
            answer: "Distance 400 m; displacement 0",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-scalars-vectors-adding-and-subtracting",
        title: "Adding and subtracting",
        summary: "Vectors are added by placing them tip-to-tail. The resultant runs from the tail of the first to the tip of the last. Subtracting a vector…",
        explanation: "Vectors are added by placing them tip-to-tail. The resultant runs from the tail of the first to the tip of the last. Subtracting a vector is the same as adding its negative. These operations are essential for finding net force, resultant velocity and total displacement.",
                examples: [
          {
            problem: "A runner completes one full 400 m circular track and stops at the start. What are the distance and displacement?",
            solution: "Distance is the path length = 400 m. Displacement is the change in position = 0 because start and finish coincide.",
            answer: "Distance 400 m; displacement 0",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-scalars-vectors-common-scalar-vector-pairs",
        title: "Common scalar/vector pairs",
        summary: "Distance (scalar) and displacement (vector); speed (scalar) and velocity (vector); mass (scalar) and weight (vector). Recognising the pair…",
        explanation: "Distance (scalar) and displacement (vector); speed (scalar) and velocity (vector); mass (scalar) and weight (vector). Recognising the pair prevents sign and direction errors.",
                examples: [
          {
            problem: "A runner completes one full 400 m circular track and stops at the start. What are the distance and displacement?",
            solution: "Distance is the path length = 400 m. Displacement is the change in position = 0 because start and finish coincide.",
            answer: "Distance 400 m; displacement 0",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-units-measurement", "phy-vector-operations", "phy-kinematics"],
    content: true,
    buildsOn: ["math-7-1", "phy-units-measurement"],
    leadsTo: ["phy-vector-operations", "phy-kinematics"],
    usedIn: ["phy-vector-operations", "phy-vector-applications", "phy-newtons-laws", "meteo-forces-governing-wind", "meteo-coriolis-effect"]
  },

  {
    id: "phy-vector-operations",
    sectionId: "PHY-11",
    order: 3,
    title: "Vector Operations: Addition, Subtraction & Components",
    definition: "Vector addition combines two or more vectors into a single resultant vector. Vectors can be resolved into perpendicular components, usually horizontal and vertical, which simplifies calculations.",
    keyFacts: [
      "The resultant of two vectors can be found by the parallelogram method or the tip-to-tail method.",
      "For perpendicular vectors, the magnitude of the resultant is √(a² + b²) and the direction is tan⁻¹(b/a).",
      "A vector can be resolved into components: A_x = A cos θ and A_y = A sin θ, where θ is the angle with the x-axis.",
      "To add vectors analytically, add their corresponding components.",
      "The component of a vector along a direction is found using cos θ for the adjacent component.",
      "Resolving is essential for problems involving inclined planes, projectiles and forces at angles."
    ],
    explanationSections: [
      { heading: "Tip-to-tail addition", body: "To add vectors A and B, place the tail of B at the tip of A. The resultant R runs from the tail of A to the tip of B. This works for any number of vectors and is the basis of graphical vector addition." },
      { heading: "Parallelogram rule", body: "Draw the two vectors from the same point and complete the parallelogram. The diagonal from the common starting point is the resultant. This is equivalent to the tip-to-tail method." },
      { heading: "Resolving into components", body: "A vector at an angle can be split into perpendicular parts. If a force F acts at angle θ above the horizontal, its horizontal component is F cos θ and its vertical component is F sin θ. Components are scalars with signs." },
      { heading: "Analytical addition", body: "Resolve every vector into x and y components, sum the x components to get R_x, sum the y components to get R_y, then combine: R = √(R_x² + R_y²) and θ = tan⁻¹(R_y/R_x). This method is precise and avoids scale-drawing errors." }
    ],
    formula: [
      {
        name: "Components and resultant",
        expression: "A_x = A \\cos \\theta \\quad A_y = A \\sin \\theta \\quad R = \\sqrt{R_x^2 + R_y^2} \\quad \\theta = \\tan^{-1}\\left(\\frac{R_y}{R_x}\\right)",
        variables: [
          { symbol: "A_x, A_y", meaning: "x and y components of vector A" },
          { symbol: "A", meaning: "magnitude of vector A" },
          { symbol: "\\theta", meaning: "angle with x-axis" },
          { symbol: "R", meaning: "resultant magnitude" },
          { symbol: "R_x, R_y", meaning: "sum of x and y components" }
        ]
      }
    ],
    workedExample: [
      {
        problem: "A force of 50 N acts at 37° above the horizontal. Find its horizontal and vertical components.",
        solution: "F_x = 50 cos 37° ≈ 50 × 0.80 = 40 N. F_y = 50 sin 37° ≈ 50 × 0.60 = 30 N.",
        answer: "Horizontal component = 40 N; vertical component = 30 N."
      },
      {
        problem: "A displacement of 3.0 m east is followed by a displacement of 4.0 m north. Find the magnitude and direction of the resultant displacement.",
        solution: "R = √(3.0² + 4.0²) = 5.0 m. θ = tan⁻¹(4.0/3.0) ≈ 53° north of east.",
        answer: "5.0 m at 53° north of east."
      }
    ],
    commonMistakes: [
      "Using sin instead of cos for the adjacent component.",
      "Forgetting to square and sum components before taking the square root.",
      "Using the wrong angle in component calculations.",
      "Adding magnitudes directly when vectors are not parallel."
    ],
    examPoints: [
      "Always draw a diagram before resolving vectors.",
      "For a vector at angle θ to the x-axis, x-component = A cos θ and y-component = A sin θ.",
      "The resultant of two perpendicular vectors is the hypotenuse of a right triangle.",
      "Vector subtraction A − B is equivalent to A + (−B)."
    ],

    subtopics: [
      {
        id: "phy-vector-operations-tip-to-tail-addition",
        title: "Tip-to-tail addition",
        summary: "To add vectors A and B, place the tail of B at the tip of A. The resultant R runs from the tail of A to the tip of B. This works for any…",
        explanation: "To add vectors A and B, place the tail of B at the tip of A. The resultant R runs from the tail of A to the tip of B. This works for any number of vectors and is the basis of graphical vector addition.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Tip-to-tail addition” requires you to distinguish or calculate.",
            solution: "Use the core idea: To add vectors A and B, place the tail of B at the tip of A. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Tip-to-tail addition",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-vector-operations-parallelogram-rule",
        title: "Parallelogram rule",
        summary: "Draw the two vectors from the same point and complete the parallelogram. The diagonal from the common starting point is the resultant. This…",
        explanation: "Draw the two vectors from the same point and complete the parallelogram. The diagonal from the common starting point is the resultant. This is equivalent to the tip-to-tail method.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Parallelogram rule” requires you to distinguish or calculate.",
            solution: "Use the core idea: Draw the two vectors from the same point and complete the parallelogram. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Parallelogram rule",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-vector-operations-resolving-into-components",
        title: "Resolving into components",
        summary: "A vector at an angle can be split into perpendicular parts. If a force F acts at angle θ above the horizontal, its horizontal component is…",
        explanation: "A vector at an angle can be split into perpendicular parts. If a force F acts at angle θ above the horizontal, its horizontal component is F cos θ and its vertical component is F sin θ. Components are scalars with signs.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Resolving into components” requires you to distinguish or calculate.",
            solution: "Use the core idea: A vector at an angle can be split into perpendicular parts. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Resolving into components",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-vector-operations-analytical-addition",
        title: "Analytical addition",
        summary: "Resolve every vector into x and y components, sum the x components to get R_x, sum the y components to get R_y, then combine: R = √(R_x² +…",
        explanation: "Resolve every vector into x and y components, sum the x components to get R_x, sum the y components to get R_y, then combine: R = √(R_x² + R_y²) and θ = tan⁻¹(R_y/R_x). This method is precise and avoids scale-drawing errors.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Analytical addition” requires you to distinguish or calculate.",
            solution: "Use the core idea: Resolve every vector into x and y components, sum the x components to get R_x, sum the y components to get R_y, then combine: R = √(R_x² + R_y²) and θ = tan⁻¹(R_y/R_x). Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Analytical addition",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-scalars-vectors", "phy-vector-applications", "phy-newtons-laws"],
    content: true,
    buildsOn: ["phy-scalars-vectors", "math-5-1", "math-5-2"],
    leadsTo: ["phy-vector-applications", "phy-kinematics", "phy-newtons-laws"],
    usedIn: ["phy-vector-applications", "phy-momentum-impulse", "meteo-forces-governing-wind"]
  },

  {
    id: "phy-vector-applications",
    sectionId: "PHY-11",
    order: 4,
    title: "Vector Applications: Force, Velocity, Wind & Wave Components",
    definition: "Vector components are used to analyse forces, velocities and other directed quantities in two or three dimensions. This is essential for problems involving inclined planes, projectiles, wind components and wave forces.",
    keyFacts: [
      "On an inclined plane, weight has components mg sin θ parallel to the plane and mg cos θ perpendicular to the plane.",
      "Projectile motion is analysed separately in horizontal (constant velocity) and vertical (constant acceleration g) components.",
      "Wind velocity can be resolved into components along chosen axes.",
      "The resultant of several forces gives the net force that determines acceleration via F = ma.",
      "Vector diagrams are powerful tools for solving equilibrium problems.",
      "Lami's theorem can be used for three forces in equilibrium."
    ],
    explanationSections: [
      { heading: "Inclined planes", body: "A block on a slope is pulled downward by a component of its weight along the slope: mg sin θ. The normal force from the slope balances the perpendicular component mg cos θ. Friction, if present, acts up the slope opposing motion." },
      { heading: "Projectile motion", body: "The horizontal motion of a projectile has constant velocity (ignoring air resistance), while the vertical motion has constant downward acceleration g. The two motions are independent. The time of flight depends only on vertical motion." },
      { heading: "Wind and current problems", body: "A plane's velocity relative to the ground is the vector sum of its velocity relative to the air and the wind velocity. Similarly, a boat's velocity relative to the shore is the vector sum of its velocity in still water and the current velocity." },
      { heading: "Equilibrium", body: "When the vector sum of all forces on an object is zero, the object is in equilibrium. Draw the force polygon; if it closes, the forces balance. This is used for suspended signs, towed objects and structural problems." }
    ],
    workedExample: [
      {
        problem: "A 10 kg block rests on a smooth slope inclined at 30° to the horizontal. Find the component of its weight (a) down the slope and (b) perpendicular to the slope.",
        solution: "Weight W = mg = 10 × 9.8 = 98 N. Component down slope = W sin 30° = 98 × 0.50 = 49 N. Component perpendicular = W cos 30° = 98 × 0.866 ≈ 84.9 N.",
        answer: "49 N down the slope; 84.9 N perpendicular into the slope."
      },
      {
        problem: "An aircraft can fly at 200 m/s in still air. It heads due north but a wind of 50 m/s blows from west to east. Find the aircraft's resultant velocity.",
        solution: "The wind adds an eastward component of 50 m/s. Resultant speed = √(200² + 50²) = √(40 000 + 2 500) = √42 500 ≈ 206 m/s. Direction θ = tan⁻¹(50/200) ≈ 14° east of north.",
        answer: "≈ 206 m/s at 14° east of north."
      }
    ],
    commonMistakes: [
      "Using the wrong trig ratio for inclined-plane components.",
      "Treating horizontal and vertical projectile motions as connected by time but forgetting they share the same time of flight.",
      "Forgetting to add wind/current as a vector, not a scalar.",
      "Drawing the normal force perpendicular to the surface but then using mg for it."
    ],
    examPoints: [
      "On a slope: parallel component = mg sin θ; perpendicular component = mg cos θ.",
      "Projectile range is maximum at 45° for a given launch speed (ignoring air resistance).",
      "Resultant velocity is found by vector addition of all velocity contributions.",
      "For equilibrium, the vector sum of forces and the vector sum of torques must both be zero."
    ],

    subtopics: [
      {
        id: "phy-vector-applications-inclined-planes",
        title: "Inclined planes",
        summary: "A block on a slope is pulled downward by a component of its weight along the slope: mg sin θ. The normal force from the slope balances the…",
        explanation: "A block on a slope is pulled downward by a component of its weight along the slope: mg sin θ. The normal force from the slope balances the perpendicular component mg cos θ. Friction, if present, acts up the slope opposing motion.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Inclined planes” requires you to distinguish or calculate.",
            solution: "Use the core idea: A block on a slope is pulled downward by a component of its weight along the slope: mg sin θ. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Inclined planes",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-vector-applications-projectile-motion",
        title: "Projectile motion",
        summary: "The horizontal motion of a projectile has constant velocity (ignoring air resistance), while the vertical motion has constant downward…",
        explanation: "The horizontal motion of a projectile has constant velocity (ignoring air resistance), while the vertical motion has constant downward acceleration g. The two motions are independent. The time of flight depends only on vertical motion.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Projectile motion” requires you to distinguish or calculate.",
            solution: "Use the core idea: The horizontal motion of a projectile has constant velocity (ignoring air resistance), while the vertical motion has constant downward acceleration g. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Projectile motion",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-vector-applications-wind-and-current-problems",
        title: "Wind and current problems",
        summary: "A plane's velocity relative to the ground is the vector sum of its velocity relative to the air and the wind velocity. Similarly, a boat's…",
        explanation: "A plane's velocity relative to the ground is the vector sum of its velocity relative to the air and the wind velocity. Similarly, a boat's velocity relative to the shore is the vector sum of its velocity in still water and the current velocity.",
                examples: [
          {
            problem: "A resistor of 10 Ω carries 0.5 A. What is the potential difference across it?",
            solution: "V = IR = 0.5 × 10 = 5 V.",
            answer: "5 V",
          },
        ],
        shortcuts: [],
        traps: [],
      },
      {
        id: "phy-vector-applications-equilibrium",
        title: "Equilibrium",
        summary: "When the vector sum of all forces on an object is zero, the object is in equilibrium. Draw the force polygon; if it closes, the forces…",
        explanation: "When the vector sum of all forces on an object is zero, the object is in equilibrium. Draw the force polygon; if it closes, the forces balance. This is used for suspended signs, towed objects and structural problems.",
                examples: [
          {
            problem: "In one exam-style sentence, state what “Equilibrium” requires you to distinguish or calculate.",
            solution: "Use the core idea: When the vector sum of all forces on an object is zero, the object is in equilibrium. Apply definitions and units carefully; check whether the quantity is scalar or vector if relevant.",
            answer: "Equilibrium",
          },
        ],
        shortcuts: [],
        traps: [],
      },
    ],
    relatedTopics: ["phy-vector-operations", "phy-newtons-laws", "phy-kinematics"],
    content: true,
    buildsOn: ["phy-vector-operations", "phy-newtons-laws"],
    leadsTo: ["meteo-forces-governing-wind"],
    usedIn: ["meteo-forces-governing-wind", "meteo-geostrophic-wind", "meteo-global-circulation"]
  }
]
