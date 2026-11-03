import { MASTERY_ACCURACY_THRESHOLD, MASTERY_MIN_QUIZ_ATTEMPTS } from './constants.ts';

export interface TutorPerformanceRecord {
  title: string;
  accuracy: number;
  total: number;
}

export function tutorPerformanceBand(accuracy: number): 'needs practice' | 'developing' | 'strong' {
  if (accuracy < 70) return 'needs practice';
  if (accuracy < MASTERY_ACCURACY_THRESHOLD) return 'developing';
  return 'strong';
}

/**
 * Build the only performance details shared with the tutor.
 * Exact percentages, answer counts, Elo values, review stages and review dates
 * stay in the learner's local app state and are not included in model context.
 */
export function buildTutorPerformanceContext(
  current: Pick<TutorPerformanceRecord, 'accuracy' | 'total'>,
  topics: TutorPerformanceRecord[],
): string[] {
  const lines: string[] = [];
  if (current.total >= MASTERY_MIN_QUIZ_ATTEMPTS) {
    lines.push(`Performance band: ${tutorPerformanceBand(current.accuracy)}`);
  } else if (current.total > 0) {
    lines.push('Early practice; not enough evidence for a performance band.');
  } else {
    lines.push('No quiz attempts on this topic yet.');
  }

  const weakTopics = topics
    .filter((topic) => topic.total >= MASTERY_MIN_QUIZ_ATTEMPTS && topic.accuracy < MASTERY_ACCURACY_THRESHOLD)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);
  if (weakTopics.length > 0) {
    lines.push(
      'Weak topics overall: ' +
        weakTopics.map((topic) => `${topic.title} (${tutorPerformanceBand(topic.accuracy)})`).join(', '),
    );
  }
  return lines;
}
