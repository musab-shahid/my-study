import type { Question, Topic } from '@/types';

/**
 * CGEI env-systems question bank — two-file architecture.
 * Curriculum learning hierarchy lives in the subject's curriculum file.
 * All question IDs referenced by curriculum assessments resolve here.
 */

export const questions: Question[] = [
  // Unit 1.1
  {
    id: 'cgei-es-q-11-001',
    sectionId: 'CGEI-01',
    topicId: 'cgei-env-systems-earth-components',
    difficulty: 'easy',
    type: 'single',
    question: 'Which sphere coupling best describes Himalayan snow and ice feeding the Indus?',
    options: [
      'Cryosphere → hydrosphere mass flux',
      'Only biosphere photosynthesis',
      'Lithosphere rock cycle alone',
      'No sphere interaction',
    ],
    correctAnswer: 0,
    explanation: 'Cryospheric mass balance supplies seasonal and longer-term river flow in the Indus basin.',
    sourceCitation: 'CGEI curriculum Unit 1.1 (1.1.1.3)',
    lessonId: 'cgei-es-lesson-1-1-1',
    cognitiveLevel: 'understand',
  },
];

export const topics: Topic[] = [];
