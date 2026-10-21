import type { Topic, Question } from '@/types';

export { HAT_SECTIONS, HAT_EXAM_DURATION_MINUTES, HAT_TOTAL_QUESTIONS, HAT_PASSING_SCORE } from './hat-meta';

type TopicModule = { topics: Topic[] };
type QuestionModule = { questions: Question[] };

export async function loadAllHatTopics(): Promise<Topic[]> {
  const [verbal, analytical, quantitative] = await Promise.all([
    import('./verbal/topics-verbal').then((m: TopicModule) => m.topics),
    import('./analytical/topics-analytical').then((m: TopicModule) => m.topics),
    import('./quantitative/topics-quantitative').then((m: TopicModule) => m.topics),
  ]);
  return [...verbal, ...analytical, ...quantitative];
}

export async function loadAllHatQuestions(): Promise<Question[]> {
  const [verbal, analytical, quantitative] = await Promise.all([
    import('./verbal/questions-verbal').then((m: QuestionModule) => m.questions),
    import('./analytical/questions-analytical').then((m: QuestionModule) => m.questions),
    import('./quantitative/questions-quantitative').then((m: QuestionModule) => m.questions),
  ]);
  return [...verbal, ...analytical, ...quantitative];
}
