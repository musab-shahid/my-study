import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, Clock3, Link2 } from 'lucide-react';
import { useRouter } from '@/router';
import { useData } from '@/hooks/useData';
import { cgeiCurriculum } from '@/data/cgei/curriculum';
import type { CurriculumQuestion } from '@/types/curriculum';
import { CurriculumLessonContent } from '@/components/curriculum/CurriculumLessonContent';
import { PageContainer, Card, EmptyState, Button } from '@/components/ui';
import { BackButton, Breadcrumbs } from '@/components/layout/Breadcrumbs';

function CurriculumQuestionCard({ question }: { question: CurriculumQuestion }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === question.correctAnswer;
  return (
    <Card className="p-4 border border-slate-200">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-[10px] uppercase tracking-wide font-semibold text-slate-500">{question.difficulty} · {question.cognitiveLevel}</span>
        <span className="text-[10px] text-slate-400">Knowledge check</span>
      </div>
      <p className="font-medium text-sm sm:text-base text-slate-900 leading-relaxed">{question.prompt}</p>
      <div className="space-y-2 mt-3">
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          const isAnswer = submitted && index === question.correctAnswer;
          const isWrongSelection = submitted && isSelected && !isCorrect;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => { if (!submitted) setSelected(index); }}
              className={`w-full rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${isAnswer ? 'border-emerald-400 bg-emerald-50 text-emerald-900' : isWrongSelection ? 'border-rose-300 bg-rose-50 text-rose-900' : isSelected ? 'border-teal-400 bg-teal-50 text-teal-900' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
            >
              <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>{option}
            </button>
          );
        })}
      </div>
      {!submitted ? <div className="mt-3"><Button variant="secondary" disabled={selected === null} onClick={() => setSubmitted(true)}>Check answer</Button></div> : (
        <div className={`mt-3 rounded-lg border p-3 ${isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
          <p className={`font-semibold text-sm ${isCorrect ? 'text-emerald-800' : 'text-amber-900'}`}>{isCorrect ? 'Correct' : `Not quite — answer ${String.fromCharCode(65 + question.correctAnswer)}`}</p>
          <p className="text-sm text-slate-700 leading-relaxed mt-1">{question.explanation}</p>
          {question.sourceCitation ? <p className="text-[10px] text-slate-500 mt-2">Source: {question.sourceCitation}</p> : null}
          <button type="button" onClick={() => { setSelected(null); setSubmitted(false); }} className="mt-2 text-xs font-semibold text-teal-800 hover:underline">Try again</button>
        </div>
      )}
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
          <span className="rounded-full bg-teal-50 text-teal-800 px-3 py-1 text-xs font-bold">Unit {unit.code}</span>
          <span className="rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-semibold capitalize">{unit.readiness}</span>
          {unit.estimatedHours ? <span className="text-xs text-slate-500">{unit.estimatedHours} estimated hours</span> : null}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{unit.title}</h1>
        {subject && <p className="text-sm text-slate-500 mt-2">{subject.title}</p>}
        <p className="text-slate-700 leading-relaxed mt-3">{unit.summary}</p>
      </div>

      {unit.outcomes.length > 0 && <Card className="p-4 sm:p-5 mb-5 border border-teal-100">
        <h2 className="font-semibold text-slate-900 mb-3">Learning outcomes</h2>
        <ul className="space-y-2">{unit.outcomes.map((outcome) => <li key={outcome.id} className="flex items-start gap-2 text-sm text-slate-700"><span className="rounded bg-teal-50 text-teal-800 border border-teal-100 px-1.5 py-0.5 text-[10px] font-bold shrink-0">{outcome.level}</span><span>{outcome.statement}</span></li>)}</ul>
      </Card>}

      <section className="mb-6">
        <div className="flex items-end justify-between gap-3 mb-3">
          <h2 className="text-lg font-semibold text-slate-900">Lessons</h2>
          <span className="text-xs text-slate-500">{lessons.length} mapped</span>
        </div>
        {lessons.length ? <div className="space-y-2">{lessons.map((lesson) => {
          const studied = lesson.sourceTopicId ? data.studiedTopics.includes(lesson.sourceTopicId) : (data.studiedCurriculumLessons ?? []).includes(lesson.id);
          return <button key={lesson.id} onClick={() => lesson.sourceTopicId ? navigate({ screen: 'topic', topicId: lesson.sourceTopicId }) : navigate({ screen: 'curriculum-lesson', lessonId: lesson.id })} className="w-full rounded-xl border border-slate-200 bg-white hover:bg-slate-50 p-4 text-left transition-colors">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center text-xs font-bold shrink-0">{lesson.order}</span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2"><span className="font-semibold text-slate-900">{lesson.title}</span><span className="rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-[10px] font-semibold">{lesson.level}</span><span className="rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-[10px] capitalize">{lesson.readiness}</span></span>
                <span className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">{lesson.estimatedMinutes ? <span className="inline-flex items-center gap-1"><Clock3 className="w-3 h-3" />{lesson.estimatedMinutes} min</span> : null}<span>{lesson.objectives.length} learning outcomes</span><span>{lesson.activityIds.length} practice activities</span></span>
              </span>
              {studied ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />}
            </div>
          </button>;
        })}</div> : <Card className="p-5 border border-dashed border-slate-300 bg-slate-50"><p className="font-medium text-slate-800">Lesson content is being developed</p><p className="text-sm text-slate-600 mt-1">This unit is registered in the curriculum, but its lessons have not yet been authored and validated. It is intentionally not presented as complete.</p>{unit.sourceDocument && <p className="text-xs text-slate-500 mt-3">Source manuscript: <code>{unit.sourceDocument}</code></p>}</Card>}
      </section>

      {activities.length > 0 && <section className="mb-6"><h2 className="text-lg font-semibold text-slate-900 mb-3">Practice activities</h2><div className="grid md:grid-cols-2 gap-3">{activities.map((activity) => <Card key={activity.id} className="p-4 border border-slate-200"><div className="flex flex-wrap gap-2 items-center"><h3 className="font-semibold text-sm text-slate-900">{activity.title}</h3><span className="text-[10px] bg-slate-100 rounded-full px-2 py-0.5">{activity.level}</span></div><p className="text-sm text-slate-600 leading-relaxed mt-2">{activity.instructions}</p>{activity.expectedEvidence?.length ? <p className="text-xs text-teal-800 mt-2"><strong>Evidence:</strong> {activity.expectedEvidence.join(' · ')}</p> : null}</Card>)}</div></section>}

      {assessments.length > 0 && <section className="mb-6"><h2 className="text-lg font-semibold text-slate-900 mb-3">Assessments</h2><div className="grid md:grid-cols-2 gap-3">{assessments.map((assessment) => <Card key={assessment.id} className="p-4 border border-slate-200"><h3 className="font-semibold text-sm text-slate-900">{assessment.title}</h3><p className="text-sm text-slate-600 mt-2">{assessment.purpose}</p>{assessment.passThreshold !== undefined ? <p className="text-xs text-slate-500 mt-2">Target score: {Math.round(assessment.passThreshold * 100)}%</p> : null}{assessment.questionIds?.length ? <details className="mt-3"><summary className="cursor-pointer text-xs font-semibold text-teal-800 hover:underline">{assessment.questionIds.length} questions · Open assessment</summary><div className="space-y-3 mt-3">{assessment.questionIds.map((questionId) => cgeiCurriculum.questions.find((question) => question.id === questionId)).filter((question): question is CurriculumQuestion => Boolean(question)).map((question) => <CurriculumQuestionCard key={question.id} question={question} />)}</div></details> : null}</Card>)}</div></section>}

      {deliverables.length > 0 && <section className="mb-6"><h2 className="text-lg font-semibold text-slate-900 mb-3">Portfolio evidence</h2><div className="space-y-2">{deliverables.map((item) => <Card key={item.id} className="p-4 border border-slate-200"><h3 className="font-semibold text-sm text-slate-900">{item.title}</h3><p className="text-sm text-slate-600 mt-1">{item.description}</p><ul className="list-disc pl-5 mt-2 text-xs text-slate-600 space-y-1">{item.acceptanceCriteria.map((criterion) => <li key={criterion}>{criterion}</li>)}</ul></Card>)}</div></section>}

      {resources.length > 0 && <section><h2 className="text-lg font-semibold text-slate-900 mb-3">Resources</h2><div className="space-y-2">{resources.map((resource) => <Card key={resource.id} className="p-4 border border-slate-200"><div className="flex items-start gap-2"><Link2 className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />{resource.url ? <a href={resource.url} target="_blank" rel="noreferrer" className="font-medium text-sm text-teal-800 hover:underline">{resource.title}</a> : <span className="font-medium text-sm text-slate-900">{resource.title}</span>}</div><p className="text-sm text-slate-600 mt-2">{resource.purpose}</p>{resource.authorOrPublisher ? <p className="text-xs text-slate-400 mt-1">{resource.authorOrPublisher}</p> : null}</Card>)}</div></section>}
    </PageContainer>
  );
}

export function CurriculumLessonScreen({ lessonId }: { lessonId: string }) {
  const { navigate } = useRouter();
  const { data, markStudied, setLastTopic, markCurriculumLessonStudied, setLastCurriculumLesson } = useData();
  const lesson = cgeiCurriculum.lessons.find((item) => item.id === lessonId);
  const unit = lesson ? cgeiCurriculum.units.find((item) => item.lessonIds.includes(lesson.id)) : undefined;
  const resources = lesson?.resourceIds.map((id) => cgeiCurriculum.resources.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];
  const activities = lesson?.activityIds.map((id) => cgeiCurriculum.activities.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];
  const assessments = lesson?.assessmentIds.map((id) => cgeiCurriculum.assessments.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];
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
        <div className="flex flex-wrap items-center gap-2 mb-2"><span className="rounded-full bg-teal-50 text-teal-800 px-3 py-1 text-xs font-bold">{unit ? `Unit ${unit.code}` : 'CGEI lesson'}</span><span className="rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-semibold">{lesson.level}</span><span className="rounded-full bg-slate-100 text-slate-600 px-3 py-1 text-xs capitalize">{lesson.readiness}</span>{lesson.estimatedMinutes ? <span className="text-xs text-slate-500">{lesson.estimatedMinutes} minutes</span> : null}</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{lesson.title}</h1>
        {unit && <button onClick={() => navigate({ screen: 'curriculum-unit', unitId: unit.id })} className="text-sm text-teal-800 hover:underline mt-2 inline-flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Back to Unit {unit.code}</button>}
      </div>

      {lesson.objectives.length > 0 && <Card className="p-4 sm:p-5 mb-5 border border-sky-100 bg-sky-50/40"><h2 className="font-semibold text-slate-900 mb-2">Learning objectives</h2><ul className="space-y-2">{lesson.objectives.map((outcome) => <li key={outcome.id} className="flex items-start gap-2 text-sm text-slate-700"><span className="rounded bg-white border border-sky-100 text-sky-800 px-1.5 py-0.5 text-[10px] font-bold shrink-0">{outcome.level}</span><span>{outcome.statement}</span></li>)}</ul></Card>}

      <div className="mb-6"><CurriculumLessonContent lesson={lesson} /></div>

      {activities.length > 0 && <section className="mb-6"><h2 className="text-lg font-semibold text-slate-900 mb-3">Practice and application</h2><div className="space-y-3">{activities.map((activity) => <Card key={activity.id} className="p-4 border border-slate-200"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-slate-900 text-sm">{activity.title}</h3><span className="rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-[10px]">{activity.level}</span>{activity.estimatedMinutes ? <span className="text-xs text-slate-500">{activity.estimatedMinutes} min</span> : null}</div><p className="text-sm text-slate-700 leading-relaxed mt-2">{activity.instructions}</p>{activity.expectedEvidence?.length ? <p className="text-xs text-teal-800 mt-2"><strong>Evidence to produce:</strong> {activity.expectedEvidence.join(' · ')}</p> : null}{activity.hints?.length ? <details className="mt-3"><summary className="cursor-pointer text-xs font-semibold text-teal-800">Hints</summary><ul className="list-disc pl-5 mt-2 text-sm text-slate-600 space-y-1">{activity.hints.map((hint) => <li key={hint}>{hint}</li>)}</ul></details> : null}</Card>)}</div></section>}

      {assessments.length > 0 && <section className="mb-6"><h2 className="text-lg font-semibold text-slate-900 mb-3">Check your understanding</h2><div className="grid sm:grid-cols-2 gap-3">{assessments.map((assessment) => <Card key={assessment.id} className="p-4 border border-slate-200"><h3 className="font-semibold text-sm text-slate-900">{assessment.title}</h3><p className="text-sm text-slate-600 mt-2">{assessment.purpose}</p>{assessment.questionIds?.length ? <p className="text-xs text-slate-500 mt-2">{assessment.questionIds.length} linked questions</p> : null}{(assessment.questionIds ?? []).map((questionId) => cgeiCurriculum.questions.find((question) => question.id === questionId)).filter((question): question is CurriculumQuestion => Boolean(question)).map((question) => <div key={question.id} className="mt-3"><CurriculumQuestionCard question={question} /></div>)}</Card>)}</div></section>}

      {resources.length > 0 && <section className="mb-6"><h2 className="text-lg font-semibold text-slate-900 mb-3">References and tools</h2><div className="space-y-2">{resources.map((resource) => <Card key={resource.id} className="p-4 border border-slate-200"><div className="flex items-start gap-2"><Link2 className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />{resource.url ? <a href={resource.url} target="_blank" rel="noreferrer" className="font-medium text-sm text-teal-800 hover:underline">{resource.title}</a> : <span className="font-medium text-sm text-slate-900">{resource.title}</span>}</div><p className="text-sm text-slate-600 mt-2">{resource.purpose}</p></Card>)}</div></section>}

      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <Button variant="secondary" onClick={() => navigate({ screen: 'curriculum-unit', unitId: unit?.id ?? '' })} disabled={!unit}><ArrowLeft className="w-4 h-4 mr-1" /> Unit overview</Button>
        <Button onClick={() => lesson.sourceTopicId ? markStudied(lesson.sourceTopicId) : markCurriculumLessonStudied(lesson.id)}><CheckCircle2 className="w-4 h-4 mr-1" /> Mark lesson studied</Button>
      </div>
      {isLessonStudied && <p className="text-xs text-emerald-700 mt-3 text-right">This lesson is marked as studied.</p>}
    </PageContainer>
  );
}
