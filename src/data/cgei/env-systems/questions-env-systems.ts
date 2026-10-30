import type { Question } from '@/types';

/**
 * CGEI env-systems question bank.
 * Includes Phase C3 migrated curriculum items (engine schema + lessonId).
 */
export const questions: Question[] = [
  {
    "id": "cgei-es-q-11-001",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Which sphere coupling best describes Himalayan snow and ice feeding the Indus?",
    "options": [
      "Cryosphere → hydrosphere mass flux",
      "Only biosphere photosynthesis",
      "Lithosphere rock cycle alone",
      "No sphere interaction"
    ],
    "correctAnswer": 0,
    "explanation": "Cryospheric mass balance supplies seasonal and longer-term river flow in the Indus basin.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-1-1",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-11-002",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Using σT⁴ at T=288 K, blackbody exitance is about:",
    "options": [
      "1361 W m⁻²",
      "390 W m⁻²",
      "240 W m⁻²",
      "5.67×10⁻⁸ W m⁻²"
    ],
    "correctAnswer": 1,
    "explanation": "σ(288)⁴ ≈ 390 W m⁻² under the Stefan–Boltzmann law.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-1-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-es-q-11-003",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "With S=1361 W m⁻² and A=0.30, the planetary effective temperature Te is nearest:",
    "options": [
      "288 K",
      "255 K",
      "373 K",
      "0 K"
    ],
    "correctAnswer": 1,
    "explanation": "σTe⁴ = S(1−A)/4 yields Te ≈ 255 K; surface air temperature is warmer due to the greenhouse effect.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-1-2",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-es-q-11-004",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Ice–albedo feedback is classified as positive because:",
    "options": [
      "Melting increases albedo and cools the surface",
      "Melting decreases albedo, increases absorption and amplifies warming",
      "It always stabilises climate",
      "It equals climate sensitivity"
    ],
    "correctAnswer": 1,
    "explanation": "Lower ice cover reduces albedo, increasing absorbed solar radiation and reinforcing the initial warming.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-1-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-11-seb",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "In the teaching SEB form Rn = H + LE + G, a residual Rn − (H+LE+G) of +20 W m⁻² means:",
    "options": [
      "The surface temperature is exactly 20 °C",
      "The reported fluxes do not close the budget under the stated sign convention",
      "Albedo must be 0.2",
      "Effective temperature Te increased by 20 K"
    ],
    "correctAnswer": 1,
    "explanation": "Residual diagnoses closure under the stated convention; it is not a temperature.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-1-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-11-tau",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Residence time τ ≈ M/F is best described as:",
    "options": [
      "A universal climate sensitivity number",
      "A stock–flow ratio for a store under the stated assumptions",
      "Proof the Earth system is well mixed",
      "The same as radiative forcing"
    ],
    "correctAnswer": 1,
    "explanation": "τ organises stock–flow thinking; global climate is not assumed well mixed.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-1-3",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-110-001",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "With Q*=450, Q_F=30, Q_H=280, Q_E=80 W m⁻², storage ΔQ_S equals:",
    "options": [
      "120 W m⁻²",
      "450 W m⁻²",
      "30 W m⁻²",
      "0 W m⁻²"
    ],
    "correctAnswer": 0,
    "explanation": "ΔQ_S = Q* + Q_F − Q_H − Q_E = 450+30−280−80 = 120 W m⁻².",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-10-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-es-q-110-002",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "easy",
    "type": "single",
    "question": "Urban heat intensity for T_u=38.5°C and T_r=35.0°C is:",
    "options": [
      "73.5 K",
      "3.5 K",
      "0 K",
      "−3.5 K"
    ],
    "correctAnswer": 1,
    "explanation": "UHI = T_urban − T_rural = 3.5 K for this synthetic pair.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-10-1",
    "cognitiveLevel": "apply"
  },
  {
    "id": "cgei-es-q-110-003",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Urban expansion most directly tends to:",
    "options": [
      "Increase infiltration everywhere",
      "Increase runoff and heat-storage exposure of assets",
      "Eliminate the need for irrigation data",
      "Remove compound climate risk"
    ],
    "correctAnswer": 1,
    "explanation": "Impervious growth raises runoff and heat storage while concentrating assets and people.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-10-2",
    "cognitiveLevel": "understand"
  },
  {
    "id": "cgei-es-q-110-004",
    "sectionId": "CGEI-01",
    "topicId": "cgei-env-systems-roadmap",
    "difficulty": "medium",
    "type": "single",
    "question": "Under an AND compound rule with thresholds 0.6/0.6, heat=0.8 and drought=0.4 yields:",
    "options": [
      "Compound true",
      "Compound false because drought is below threshold",
      "Always true if heat is high",
      "Undefined"
    ],
    "correctAnswer": 1,
    "explanation": "Both stressors must meet thresholds; drought 0.4 < 0.6 so the compound flag is false.",
    "sourceCitation": "CGEI curriculum (migrated)",
    "lessonId": "cgei-es-lesson-1-10-3",
    "cognitiveLevel": "apply"
  }
];
