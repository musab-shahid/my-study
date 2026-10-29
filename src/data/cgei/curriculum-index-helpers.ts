/**
 * Hand-written helpers that operate on the CGEI navigation index.
 * Keep behavior here so generated index output can be regenerated safely.
 */
import { cgeiIndexLessons } from './curriculum-index';

export function cgeiLessonIdsForSubjects(subjectIds: ReadonlySet<string>): ReadonlySet<string> {
  return new Set(cgeiIndexLessons.filter((lesson) => subjectIds.has(lesson.subjectId)).map((lesson) => lesson.id));
}
