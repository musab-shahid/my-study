import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronRight, Clock3, Link2 } from 'lucide-react';
import { useRouter } from '@/router';
import { useData } from '@/hooks/useData';
import { cgeiCurriculum } from '@/data/cgei/curriculum';
import type { CurriculumQuestion } from '@/types/curriculum';
import type { Question, SubjectId } from '@/types';
import { loadSubjectQuestions } from '@/data/lazy-data';
import {
  collectLessonChecks,
  getVisibleLessonChecks,
  LESSON_CHECK_DISPLAY_LIMIT,
  curriculumQuestionToCheck,
  shuffleOptions,
  type LessonCheckItem,
} from '@/lib/cgei-lesson-questions';
import { CurriculumLessonContent } from '@/components/curriculum/CurriculumLessonContent';
import { PageContainer, Card, EmptyState, Button, Heading } from '@/components/ui';
import { BackButton, Breadcrumbs } from '@/components/layout/Breadcrumbs';

function CurriculumQuestionCard({ item }: { item: LessonCheckItem }) {
  const [attempt, setAttempt] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const shuffled = useMemo(
    () => shuffleOptions(item.options, item.correctAnswer),
    // attempt forces a new shuffle; item identity covers content changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.id, attempt],
  );
  const isCorrect = selected === shuffled.correctAnswer;
  return (
    <Card className="p-card-pad border border-slate-200">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-label uppercase tracking-wide font-semibold text-muted">{item.difficulty}{item.cognitiveLevel ? ` · ${item.cognitiveLevel}` : ''}</span>
        <span className="text-label text-muted">Unrecorded knowledge check</span>
      </div>
      <p className="font-medium text-sm sm:text-base text-ink leading-relaxed">{item.prompt}</p>
      <p className="text-xs text-muted mt-1">Options are shuffled each attempt. Your answer is checked on this screen only. It is not saved to Progress and does not establish mastery.</p>
      <div className="space-y-2 mt-3" role="radiogroup" aria-label="Answer options">
        {shuffled.options.map((option, index) => {
          const isSelected = selected === index;
          const isAnswer = submitted && index === shuffled.correctAnswer;
          const isWrongSelection = submitted && isSelected && !isCorrect;
          return (
            <button
              key={`${attempt}-${index}-${option.slice(0, 32)}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`Option ${index + 1}: ${option}`}
              onClick={() => { if (!submitted) setSelected(index); }}
              className={`w-full rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${isAnswer ? 'border-success-400 bg-success-50 text-success-900' : isWrongSelection ? 'border-danger-300 bg-danger-50 text-danger-900' : isSelected ? 'border-brand-400 bg-brand-50 text-brand-900' : 'border-slate-200 bg-white text-muted hover:bg-slate-50'}`}
            >
              <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>{option}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {!submitted ? (
          <Button type="button" disabled={selected === null} onClick={() => setSubmitted(true)}>Check answer</Button>
        ) : (
          <>
            <p className={`text-sm font-medium ${isCorrect ? 'text-success-700' : 'text-danger-700'}`}>{isCorrect ? 'Correct' : 'Not quite'}</p>
            <Button type="button" variant="secondary" onClick={() => { setSelected(null); setSubmitted(false); setAttempt((n) => n + 1); }}>Try again</Button>
          </>
        )}
      </div>
      {submitted && item.explanation ? <p className="text-sm text-muted mt-3 border-t border-slate-200 pt-3">{item.explanation}</p> : null}
    </Card>
  );
}

export function CurriculumUnitScreen({ unitId }: { unitId: string }) {
  const { navigate } = useRouter();
  const { data } = useData();
  const unit = cgeiCurriculum.units.find((item) => item.id === unitId);
  const subject = unit ? cgeiCurriculum.subjects.find((item) => item.unitIds.includes(unit.id)) : undefined;
  const lessons = unit?.lessonIds.map((id) => cgeiCurriculum.lessons.find((lesson) => lesson.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item)).sort((a, b) => a.order - b.order) ?? [];
  const activities = unit?.activityIds.map((id) => cgeiCurriculum.activities.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];
  const assessments = unit?.assessmentIds.map((id) => cgeiCurriculum.assessments.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];
  const resources = unit?.resourceIds.map((id) => cgeiCurriculum.resources.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];
  const deliverables = unit?.deliverableIds.map((id) => cgeiCurriculum.deliverables.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];

  if (!unit) return <PageContainer><BackButton /><EmptyState title="Curriculum unit not found" message="This unit is not registered in the current curriculum." action={<Button variant="secondary" onClick={() => navigate({ screen: 'learn' })}>Back to Learn</Button>} /></PageContainer>;

  return (
    <PageContainer className="max-w-4xl">
      <div className="flex items-center gap-2 mb-4"><BackButton /><Breadcrumbs /></div>
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="rounded-full bg-brand-50 text-brand-800 px-3 py-1 text-xs font-bold">Unit {unit.code}</span>
          <span className="rounded-full bg-slate-100 text-muted px-3 py-1 text-xs font-semibold capitalize">{unit.readiness}</span>
          {unit.estimatedHours ? <span className="text-xs text-muted">{unit.estimatedHours} estimated hours</span> : null}
        </div>
        <Heading level={1} className="font-semibold leading-tight">{unit.title}</Heading>
        {subject && <p className="text-sm text-muted mt-2">{subject.title}</p>}
        <p className="text-muted leading-relaxed mt-3">{unit.summary}</p>
      </div>

      {unit.outcomes.length > 0 && <Card className="p-0 mb-5 border border-brand-100 overflow-hidden">
        <details>
          <summary className="flex items-center justify-between gap-3 cursor-pointer list-none p-card-pad sm:p-card-pad-lg select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-inset">
            <Heading level={2} className="font-semibold">Learning outcomes</Heading>
            <span className="flex items-center gap-2 text-xs text-muted">
              <span>{unit.outcomes.length} outcomes</span>
              <ChevronDown className="w-4 h-4 text-muted transition-transform duration-DEFAULT [details[open]_&]:rotate-180" />
            </span>
          </summary>
          <div className="px-card-pad sm:px-card-pad-lg pb-card-pad sm:pb-card-pad-lg">
            <ul className="space-y-2">{unit.outcomes.map((outcome) => <li key={outcome.id} className="flex items-start gap-2 text-sm text-muted"><span className="rounded bg-brand-50 text-brand-800 border border-brand-100 px-1.5 py-0.5 text-label font-bold shrink-0">{outcome.level}</span><span>{outcome.statement}</span></li>)}</ul>
          </div>
        </details>
      </Card>}

      <section className="mb-6">
        <div className="flex items-end justify-between gap-3 mb-3">
          <Heading level={2} className="text-lg font-semibold">Lessons</Heading>
          <span className="text-xs text-muted">{lessons.length} mapped</span>
        </div>
        {lessons.length ? <div className="space-y-2">{lessons.map((lesson) => {
          const studied = lesson.sourceTopicId ? data.studiedTopics.includes(lesson.sourceTopicId) : (data.studiedCurriculumLessons ?? []).includes(lesson.id);
          return <button key={lesson.id} onClick={() => navigate({ screen: 'curriculum-lesson', lessonId: lesson.id })} className="w-full rounded-xl border border-slate-200 bg-white hover:bg-slate-50 p-4 text-left transition-colors">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-lg bg-brand-50 text-brand-800 flex items-center justify-center text-xs font-bold shrink-0">{lesson.order}</span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2"><span className="font-semibold text-ink">{lesson.title}</span><span className="rounded-full bg-slate-100 text-muted px-2 py-0.5 text-label font-semibold">{lesson.level}</span><span className="rounded-full bg-slate-100 text-muted px-2 py-0.5 text-label capitalize">{lesson.readiness}</span></span>
                <span className="flex flex-wrap items-center gap-2 text-xs text-muted mt-1">{lesson.estimatedMinutes ? <span className="inline-flex items-center gap-1"><Clock3 className="w-3 h-3" />{lesson.estimatedMinutes} min</span> : null}<span>{lesson.objectives.length} learning outcomes</span><span>{lesson.activityIds.length} practice activities</span></span>
              </span>
              {studied ? <CheckCircle2 className="w-5 h-5 text-success-600 shrink-0" /> : <ChevronRight className="w-5 h-5 text-muted shrink-0" />}
            </div>
          </button>;
        })}</div> : <Card className="p-5 border border-dashed border-slate-300 bg-slate-50"><p className="font-medium text-ink">Lesson content is being developed</p><p className="text-sm text-muted mt-1">This unit is registered in the curriculum, but its lessons have not yet been authored and validated. It is intentionally not presented as complete.</p>{unit.sourceDocument && <p className="text-xs text-muted mt-3">Source manuscript: <code>{unit.sourceDocument}</code></p>}</Card>}
      </section>

      {activities.length > 0 && <section className="mb-6"><Heading level={2} className="text-lg font-semibold mb-3">Practice activities</Heading><div className="grid md:grid-cols-2 gap-3">{activities.map((activity) => <Card key={activity.id} className="p-card-pad border border-slate-200"><div className="flex flex-wrap gap-2 items-center"><h3 className="font-semibold text-sm text-ink">{activity.title}</h3><span className="text-label bg-slate-100 rounded-full px-2 py-0.5">{activity.level}</span></div><p className="text-sm text-muted leading-relaxed mt-2">{activity.instructions}</p>{activity.expectedEvidence?.length ? <p className="text-xs text-brand-800 mt-2"><strong>Evidence:</strong> {activity.expectedEvidence.join(' · ')}</p> : null}</Card>)}</div></section>}

      {assessments.length > 0 && <section className="mb-6"><Heading level={2} className="text-lg font-semibold mb-3">Assessments</Heading><div className="grid md:grid-cols-2 gap-3">{assessments.map((assessment) => <Card key={assessment.id} className="p-card-pad border border-slate-200"><h3 className="font-semibold text-sm text-ink">{assessment.title}</h3><p className="text-sm text-muted mt-2">{assessment.purpose}</p>{assessment.passThreshold !== undefined ? <p className="text-xs text-muted mt-2">Target score: {Math.round(assessment.passThreshold * 100)}%</p> : null}{assessment.questionIds?.length ? <details className="mt-3"><summary className="cursor-pointer text-xs font-semibold text-brand-800 hover:underline">{assessment.questionIds.length} questions · Open assessment</summary><div className="space-y-3 mt-3">{assessment.questionIds.map((questionId) => cgeiCurriculum.questions.find((question) => question.id === questionId)).filter((question): question is CurriculumQuestion => Boolean(question)).map((question) => <CurriculumQuestionCard key={question.id} item={curriculumQuestionToCheck(question)} />)}</div></details> : null}</Card>)}</div></section>}

      {deliverables.length > 0 && <section className="mb-6"><Heading level={2} className="text-lg font-semibold mb-3">Portfolio evidence</Heading><div className="space-y-2">{deliverables.map((item) => <Card key={item.id} className="p-card-pad border border-slate-200"><h3 className="font-semibold text-sm text-ink">{item.title}</h3><p className="text-sm text-muted mt-1">{item.description}</p><ul className="list-disc pl-5 mt-2 text-xs text-muted space-y-1">{item.acceptanceCriteria.map((criterion) => <li key={criterion}>{criterion}</li>)}</ul></Card>)}</div></section>}

      {resources.length > 0 && <section><Heading level={2} className="text-lg font-semibold mb-3">Resources</Heading><div className="space-y-2">{resources.map((resource) => <Card key={resource.id} className="p-card-pad border border-slate-200"><div className="flex items-start gap-2"><Link2 className="w-4 h-4 text-brand-700 mt-0.5 shrink-0" />{resource.url ? <a href={resource.url} target="_blank" rel="noreferrer" className="font-medium text-sm text-brand-800 hover:underline">{resource.title}</a> : <span className="font-medium text-sm text-ink">{resource.title}</span>}</div><p className="text-sm text-muted mt-2">{resource.purpose}</p>{resource.authorOrPublisher ? <p className="text-xs text-muted mt-1">{resource.authorOrPublisher}</p> : null}</Card>)}</div></section>}
    </PageContainer>
  );
}

export function CurriculumLessonScreen({ lessonId }: { lessonId: string }) {
  const { navigate } = useRouter();
  const { data, markStudied, setLastTopic, markCurriculumLessonStudied, setLastCurriculumLesson } = useData();
  const lesson = cgeiCurriculum.lessons.find((item) => item.id === lessonId);
  const unit = lesson ? cgeiCurriculum.units.find((item) => item.lessonIds.includes(lesson.id)) : undefined;
  const subject = unit ? cgeiCurriculum.subjects.find((item) => item.unitIds.includes(unit.id)) : undefined;
  const resources = lesson?.resourceIds.map((id) => cgeiCurriculum.resources.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];
  const activities = lesson?.activityIds.map((id) => cgeiCurriculum.activities.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];
  const assessments = lesson?.assessmentIds.map((id) => cgeiCurriculum.assessments.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];
  const assessmentQuestionIds = assessments.flatMap((a) => a.questionIds ?? []);
  const subjectId = (subject?.subjectId ?? '') as SubjectId;
  const [bankQuestions, setBankQuestions] = useState<Question[]>([]);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const showAllLessonChecks = expandedLessonId === lesson?.id;

  // Expansion belongs to the current lesson only; never carry it across navigation.
  useEffect(() => {
    setExpandedLessonId(null);
  }, [lesson?.id]);

  useEffect(() => {
    if (!subject?.subjectId) {
      setBankQuestions([]);
      return;
    }
    let cancelled = false;
    loadSubjectQuestions(subject.subjectId as SubjectId)
      .then((qs) => { if (!cancelled) setBankQuestions(qs); })
      .catch(() => { if (!cancelled) setBankQuestions([]); });
    return () => { cancelled = true; };
  }, [subject?.subjectId]);

  const lessonChecks = useMemo(
    () =>
      lesson
        ? collectLessonChecks({
            lessonId: lesson.id,
            assessmentQuestionIds,
            curriculumQuestions: cgeiCurriculum.questions,
            bankQuestions,
          })
        : [],
    // assessmentQuestionIds is derived from lesson assessments
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lesson?.id, bankQuestions, assessmentQuestionIds.join('|')],
  );

  const visibleLessonChecks = getVisibleLessonChecks(lessonChecks, showAllLessonChecks);

  const isLessonStudied = lesson?.sourceTopicId
    ? data.studiedTopics.includes(lesson.sourceTopicId)
    : Boolean(lesson && (data.studiedCurriculumLessons ?? []).includes(lesson.id));

  useEffect(() => {
    if (!lesson) return;
    if (lesson.sourceTopicId) setLastTopic(lesson.sourceTopicId);
    else setLastCurriculumLesson(lesson.id);
  }, [lesson?.id, lesson?.sourceTopicId, setLastTopic, setLastCurriculumLesson]);

  if (!lesson) return <PageContainer><BackButton /><EmptyState title="Curriculum lesson not found" message="This lesson is not registered in the current curriculum." action={<Button variant="secondary" onClick={() => navigate({ screen: 'learn' })}>Back to Learn</Button>} /></PageContainer>;

  return (
    <PageContainer className="max-w-3xl">
      <div className="flex items-center gap-2 mb-4"><BackButton /><Breadcrumbs /></div>
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2"><span className="rounded-full bg-brand-50 text-brand-800 px-3 py-1 text-xs font-bold">{unit ? `Unit ${unit.code}` : 'CGEI lesson'}</span><span className="rounded-full bg-slate-100 text-muted px-3 py-1 text-xs font-semibold">{lesson.level}</span><span className="rounded-full bg-slate-100 text-muted px-3 py-1 text-xs capitalize">{lesson.readiness}</span>{lesson.estimatedMinutes ? <span className="text-xs text-muted">{lesson.estimatedMinutes} minutes</span> : null}</div>
        <Heading level={1} className="font-semibold leading-tight">{lesson.title}</Heading>
        {unit && <button onClick={() => navigate({ screen: 'curriculum-unit', unitId: unit.id })} className="text-sm text-brand-800 hover:underline mt-2 inline-flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Back to Unit {unit.code}</button>}
      </div>

      {lesson.objectives.length > 0 && <Card className="p-card-pad sm:p-card-pad-lg mb-5 border border-brand-100 bg-brand-50/40"><Heading level={2} className="font-semibold mb-2">Learning objectives</Heading><ul className="space-y-2">{lesson.objectives.map((outcome) => <li key={outcome.id} className="flex items-start gap-2 text-sm text-muted"><span className="rounded bg-white border border-brand-100 text-brand-800 px-1.5 py-0.5 text-label font-bold shrink-0">{outcome.level}</span><span>{outcome.statement}</span></li>)}</ul></Card>}

      <div className="mb-6"><CurriculumLessonContent lesson={lesson} /></div>

      {activities.length > 0 && <section className="mb-6"><Heading level={2} className="text-lg font-semibold mb-3">Practice and application</Heading><div className="space-y-3">{activities.map((activity) => <Card key={activity.id} className="p-card-pad border border-slate-200"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-ink text-sm">{activity.title}</h3><span className="rounded-full bg-slate-100 text-muted px-2 py-0.5 text-label">{activity.level}</span>{activity.estimatedMinutes ? <span className="text-xs text-muted">{activity.estimatedMinutes} min</span> : null}</div><p className="text-sm text-muted leading-relaxed mt-2">{activity.instructions}</p>{activity.expectedEvidence?.length ? <p className="text-xs text-brand-800 mt-2"><strong>Evidence to produce:</strong> {activity.expectedEvidence.join(' · ')}</p> : null}{activity.hints?.length ? <details className="mt-3"><summary className="cursor-pointer text-xs font-semibold text-brand-800">Hints</summary><ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">{activity.hints.map((hint) => <li key={hint}>{hint}</li>)}</ul></details> : null}</Card>)}</div></section>}

      {lessonChecks.length > 0 && <section className="mb-6"><div className="flex flex-wrap items-end justify-between gap-2 mb-3"><Heading level={2} className="text-lg font-semibold">Check your understanding</Heading><span className="text-xs text-muted">{showAllLessonChecks ? `All ${lessonChecks.length} checks` : `Showing ${visibleLessonChecks.length} of ${lessonChecks.length}`}</span></div><div className="space-y-3">{visibleLessonChecks.map((item) => <CurriculumQuestionCard key={item.id} item={item} />)}</div>{lessonChecks.length > LESSON_CHECK_DISPLAY_LIMIT && <div className="mt-3 flex justify-center"><Button type="button" variant="secondary" size="sm" onClick={() => setExpandedLessonId(showAllLessonChecks ? null : lesson.id)}>{showAllLessonChecks ? 'Show fewer questions' : `Show all ${lessonChecks.length} questions`}</Button></div>}<p className="text-xs text-muted mt-3">Single-choice and true/false items for this lesson. Other types stay in the quiz engine. Answers are not recorded.</p></section>}

      {resources.length > 0 && <section className="mb-6"><Heading level={2} className="text-lg font-semibold mb-3">References and tools</Heading><div className="space-y-2">{resources.map((resource) => <Card key={resource.id} className="p-card-pad border border-slate-200"><div className="flex items-start gap-2"><Link2 className="w-4 h-4 text-brand-700 mt-0.5 shrink-0" />{resource.url ? <a href={resource.url} target="_blank" rel="noreferrer" className="font-medium text-sm text-brand-800 hover:underline">{resource.title}</a> : <span className="font-medium text-sm text-ink">{resource.title}</span>}</div><p className="text-sm text-muted mt-2">{resource.purpose}</p></Card>)}</div></section>}

      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <Button variant="secondary" onClick={() => navigate({ screen: 'curriculum-unit', unitId: unit?.id ?? '' })} disabled={!unit}><ArrowLeft className="w-4 h-4 mr-1" /> Unit overview</Button>
        <Button onClick={() => lesson.sourceTopicId ? markStudied(lesson.sourceTopicId) : markCurriculumLessonStudied(lesson.id)}><CheckCircle2 className="w-4 h-4 mr-1" /> Mark lesson studied</Button>
      </div>
      {isLessonStudied && <p className="text-xs text-success-700 mt-3 text-right">This lesson is marked as studied.</p>}
    </PageContainer>
  );
}
