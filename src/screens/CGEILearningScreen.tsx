import { ArrowRight, BookOpen, CheckCircle2, Clock3, GraduationCap, Layers3 } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from '@/router';
import { useData } from '@/hooks/useData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import type { SubjectId } from '@/types';
import { cgeiCurriculum } from '@/data/cgei/curriculum';
import { hasSubstantiveLessonContent } from '@/data/cgei/readiness';
import { subjectsByTrack } from '@/data/subjects';
import { isTrackEnrolled } from '@/lib/track-access';
import { getSubjectStyle } from '@/data/subject-colors';
import { PageContainer, Card, Button, Badge, ProgressBar } from '@/components/ui';
import { BackButton, Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CGEI_DOMAIN_GROUPS } from '@/screens/CGEITrackOverviewScreen';

function lessonIsStudied(lesson: (typeof cgeiCurriculum.lessons)[number], data: ReturnType<typeof useData>['data']) {
  return lesson.sourceTopicId
    ? data.studiedTopics.includes(lesson.sourceTopicId)
    : (data.studiedCurriculumLessons ?? []).includes(lesson.id);
}

function subjectLessons(subjectId: string) {
  const subject = cgeiCurriculum.subjects.find((item) => item.subjectId === subjectId);
  const units = subject?.unitIds
    .map((id) => cgeiCurriculum.units.find((unit) => unit.id === id))
    .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit))
    .sort((a, b) => a.order - b.order) ?? [];
  const lessons = [...new Set(units.flatMap((unit) => unit.lessonIds))]
    .map((id) => cgeiCurriculum.lessons.find((lesson) => lesson.id === id))
    .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson));
  return { subject, units, lessons };
}

export function CGEILearningScreen({ subjectId }: { subjectId?: string }) {
  return subjectId
    ? <CGEISubjectOverviewScreen subjectId={subjectId} />
    : <CGEILearningHomeScreen />;
}

function CGEILearningHomeScreen() {
  const { data, setActiveEnrolledTrack } = useData();
  const { setActiveTrack } = useSubjectSelection();
  const { navigate, currentRoute } = useRouter();
  const enrolled = isTrackEnrolled(data, 'cgei');
  const subjects = subjectsByTrack('cgei');
  const allLessons = cgeiCurriculum.lessons;
  const authoredLessons = allLessons.filter(hasSubstantiveLessonContent);
  const studiedCount = authoredLessons.filter((lesson) => lessonIsStudied(lesson, data)).length;
  const lastLesson = data.lastOpenedCurriculumLesson
    ? allLessons.find((lesson) => lesson.id === data.lastOpenedCurriculumLesson)
    : undefined;
  const recommendedLesson = authoredLessons.find((lesson) => !lessonIsStudied(lesson, data));
  const resumeLesson = lastLesson ?? recommendedLesson;
  const resumeLabel = lastLesson ? 'Continue learning' : 'Recommended starting point';

  const activateCgei = () => {
    const result = setActiveEnrolledTrack('cgei');
    if (!result.ok) return false;
    setActiveTrack('cgei');
    return true;
  };
  const openSubject = (id: string) => {
    if (!enrolled || !activateCgei()) return;
    navigate({ screen: 'learn', subjectId: id, parent: currentRoute });
  };
  const openLesson = (id: string) => {
    if (!enrolled || !activateCgei()) return;
    navigate({ screen: 'curriculum-lesson', lessonId: id, parent: currentRoute });
  };

  return (
    <PageContainer width="wide">
      <div className="flex items-center gap-2 mb-4"><BackButton /><Breadcrumbs /></div>
      <div className="relative overflow-hidden rounded-card border border-slate-200 bg-white p-card-pad sm:p-card-pad-lg mb-6">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-600" aria-hidden />
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-800">Climate & Geospatial Intelligence</p>
            <h1 className="text-page-title sm:text-page-title-lg font-semibold tracking-tight text-ink mt-1">CGEI Learning</h1>
            <p className="text-sm text-muted leading-relaxed mt-2 max-w-2xl">A connected progression from environmental foundations to applied intelligence, research and professional practice. Choose a domain, then follow its units and lessons in order.</p>
          </div>
          <Button type="button" variant="secondary" onClick={() => navigate({ screen: 'track', trackId: 'cgei', parent: currentRoute })}>Track overview</Button>
        </div>
      </div>

      {resumeLesson ? (
        <Card className="p-4 sm:p-5 mb-6 border border-brand-200 bg-brand-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-800 flex items-center gap-2"><BookOpen className="w-4 h-4" />{resumeLabel}</p>
              <p className="font-semibold text-ink mt-1">{resumeLesson.title}</p>
              <p className="text-xs text-muted mt-1">{resumeLesson.readiness} · {resumeLesson.estimatedMinutes ? `${resumeLesson.estimatedMinutes} minutes` : 'Lesson'}</p>
              <p className="text-xs text-muted mt-1">{lastLesson ? 'Return to the last lesson you opened.' : 'Start with the first lesson that contains substantive learning material.'}</p>
            </div>
            <Button type="button" onClick={() => openLesson(resumeLesson.id)}> {lastLesson ? 'Resume lesson' : 'Start lesson'} <ArrowRight className="w-4 h-4 ml-1" /></Button>
          </div>
        </Card>
      ) : authoredLessons.length > 0 ? (
        <Card className="p-4 mb-6">
          <p className="font-semibold text-ink">You have studied the currently authored lessons</p>
          <p className="text-sm text-muted mt-1">Explore another domain or return to the track overview. Additional lessons will appear as they are authored.</p>
        </Card>
      ) : (
        <Card className="p-4 mb-6">
          <p className="font-semibold text-ink">Your learning path is being prepared</p>
          <p className="text-sm text-muted mt-1">The domain catalogue is available below. Lessons will appear here as substantive content is authored.</p>
        </Card>
      )}

      <Card className="p-4 sm:p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-ink">Overall curriculum progress</h2>
            <p className="text-xs text-muted mt-1">{studiedCount} of {authoredLessons.length} authored lessons marked studied</p>
          </div>
          <span className="text-sm font-semibold tabular-nums text-ink">{authoredLessons.length ? Math.round(studiedCount / authoredLessons.length * 100) : 0}%</span>
        </div>
        <ProgressBar value={authoredLessons.length ? studiedCount / authoredLessons.length * 100 : 0} />
        <p className="text-xs text-muted mt-2">This counts lessons explicitly marked studied. Opening a lesson or answering an unrecorded knowledge check does not count as completion or demonstrated mastery.</p>
      </Card>

      <div className="mb-4">
        <h2 className="text-xl font-bold text-ink">Your 13 learning domains</h2>
        <p className="text-sm text-muted mt-1">Select a domain to see its purpose, orientation and ordered unit progression.</p>
      </div>
      <div className="space-y-6">
        {CGEI_DOMAIN_GROUPS.map((group) => (
          <section key={group.id} aria-labelledby={`cgei-learning-${group.id}`}>
            <div className="mb-3">
              <h3 id={`cgei-learning-${group.id}`} className="font-bold text-ink">{group.title.replace(/^\d+ · /, '')}</h3>
              <p className="text-sm text-muted mt-0.5">{group.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {group.subjectIds.map((id) => {
                const subject = subjects.find((item) => item.id === id);
                if (!subject) return null;
                const canonical = cgeiCurriculum.subjects.find((item) => item.subjectId === id);
                const units = canonical?.unitIds.length ?? 0;
                const lessons = canonical ? subjectLessons(id).lessons : [];
                const authored = lessons.filter(hasSubstantiveLessonContent).length;
                const studied = lessons.filter((lesson) => hasSubstantiveLessonContent(lesson) && lessonIsStudied(lesson, data)).length;
                const style = getSubjectStyle(id);
                const Icon = subject.lucideIcon ?? Layers3;
                return (
                  <Card key={id} className={`p-4 border ${style.border} ${style.hoverBorder} transition-colors`}>
                    <div className="flex items-start gap-3">
                      <div className={`rounded-xl ${style.tint} p-2.5 shrink-0`}><Icon className={`w-5 h-5 ${style.text}`} aria-hidden /></div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-ink">{subject.title}</h4>
                        <p className="text-xs text-muted mt-1">{units} units · {authored} authored lessons · {studied} studied</p>
                        {lessons.length > 0 ? <div className="mt-2"><ProgressBar value={(authored ? studied / authored : 0) * 100} /></div> : <p className="text-xs text-muted mt-2">Unit and lesson content is being developed.</p>}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 mt-4">
                      <span className="text-xs text-muted">{canonical?.readiness ?? 'roadmap'}</span>
                      <Button type="button" size="sm" variant="secondary" disabled={!enrolled} onClick={() => openSubject(id)}>Open domain <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </PageContainer>
  );
}

function CGEISubjectOverviewScreen({ subjectId }: { subjectId: string }) {
  const { data, trackMembership, setActiveEnrolledTrack } = useData();
  const { setActiveTrack } = useSubjectSelection();
  const { navigate } = useRouter();
  const { subject, units, lessons } = subjectLessons(subjectId);

  useEffect(() => {
    if (trackMembership.activeTrackId === 'cgei') return;
    const switched = setActiveEnrolledTrack('cgei');
    if (switched.ok) setActiveTrack('cgei');
  }, [trackMembership.activeTrackId, setActiveEnrolledTrack, setActiveTrack]);
  const subjectDefinition = subjectsByTrack('cgei').find((item) => item.id === subjectId);
  const authoredLessons = lessons.filter(hasSubstantiveLessonContent);
  const studiedCount = authoredLessons.filter((lesson) => lessonIsStudied(lesson, data)).length;
  const lastLesson = data.lastOpenedCurriculumLesson
    ? lessons.find((lesson) => lesson.id === data.lastOpenedCurriculumLesson)
    : undefined;
  const nextLesson = lessons.find((lesson) => !lessonIsStudied(lesson, data) && hasSubstantiveLessonContent(lesson));
  const authoredCount = lessons.filter(hasSubstantiveLessonContent).length;
  const style = getSubjectStyle(subjectId as SubjectId);
  const Icon = subjectDefinition?.lucideIcon ?? GraduationCap;

  if (!subjectDefinition) {
    return <PageContainer><BackButton /><Card className="p-6"><h1 className="font-semibold text-ink">CGEI domain not found</h1><p className="text-sm text-muted mt-1">This domain is not registered in the current CGEI pathway.</p></Card></PageContainer>;
  }

  return (
    <PageContainer width="wide">
      <div className="flex items-center gap-2 mb-4"><BackButton /><Breadcrumbs /></div>
      <div className="rounded-card border border-slate-200 bg-white p-card-pad sm:p-card-pad-lg mb-5">
        <div className="flex items-start gap-3">
          <div className={`rounded-xl ${style.tint} p-3 shrink-0`}><Icon className={`w-6 h-6 ${style.text}`} aria-hidden /></div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-teal-800">CGEI domain</p>
            <h1 className="text-page-title sm:text-page-title-lg font-semibold tracking-tight text-ink mt-1">{subjectDefinition.title}</h1>
            {subject && <p className="text-sm font-medium text-muted mt-1">{subject.subtitle}</p>}
          </div>
        </div>
        {subject?.overview ? <p className="text-sm text-muted leading-relaxed mt-4">{subject.overview}</p> : <p className="text-sm text-muted mt-4">This domain is part of the connected CGEI learning pathway.</p>}
        {subject?.purpose ? <p className="text-sm text-muted leading-relaxed mt-2"><strong className="text-ink">Why it matters. </strong>{subject.purpose}</p> : null}
        {subject?.audience ? <p className="text-sm text-muted leading-relaxed mt-2"><strong className="text-ink">Who it is for. </strong>{subject.audience}</p> : null}
      </div>

      <Card className="p-4 sm:p-5 mb-5">
        <div className="flex items-center justify-between gap-3">
          <div><h2 className="font-semibold text-ink">Domain progress</h2><p className="text-xs text-muted mt-1">{studiedCount} of {authoredLessons.length} authored lessons marked studied</p></div>
          <span className="font-semibold text-sm tabular-nums text-ink">{authoredLessons.length ? Math.round(studiedCount / authoredLessons.length * 100) : 0}%</span>
        </div>
        <ProgressBar value={authoredLessons.length ? studiedCount / authoredLessons.length * 100 : 0} />
        <p className="text-xs text-muted mt-2">{authoredCount} of {lessons.length} registered lessons contain substantive learning material. Studied status is not a mastery claim.</p>
      </Card>

      {(subject?.prerequisites?.length || subject?.outcomes?.length) ? (
        <Card className="p-4 mb-5">
          {subject?.prerequisites?.length ? <div><h2 className="text-sm font-semibold text-ink">Prerequisites and connections</h2><ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted">{subject.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul></div> : null}
          {subject?.outcomes?.length ? <div className="mt-4"><h2 className="text-sm font-semibold text-ink">What you will be able to do</h2><ul className="mt-2 space-y-2">{subject.outcomes.map((outcome) => <li key={outcome.id} className="flex gap-2 text-sm text-muted"><CheckCircle2 className="w-4 h-4 text-success-700 shrink-0 mt-0.5" /><span>{outcome.statement}</span></li>)}</ul></div> : null}
        </Card>
      ) : null}

      <Card className="p-4 sm:p-5 mb-5 border border-slate-200 bg-slate-50/50">
        <details>
          <summary className="cursor-pointer list-none flex items-center justify-between gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2">
            <span><span className="block text-sm font-semibold text-ink">Before you begin</span><span className="block text-xs text-muted mt-0.5">{subject?.subtitle ?? subjectDefinition.title} · {units.length} units · expand for goals and how to study</span></span>
            <span className="text-xs text-brand-700 font-semibold">Orientation</span>
          </summary>
          <div className="pt-4 mt-3 border-t border-slate-200 space-y-3">
            {subject?.overview ? <p className="text-sm text-muted leading-relaxed">{subject.overview}</p> : null}
            {subject?.purpose ? <p className="text-sm text-muted leading-relaxed"><strong className="text-ink">Purpose. </strong>{subject.purpose}</p> : null}
            {subject?.prerequisites?.length ? <ul className="list-disc pl-5 space-y-1 text-sm text-muted">{subject.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul> : null}
            <p className="text-xs text-muted">Orientation is context only. It is not counted as a lesson or mastery item.</p>
          </div>
        </details>
      </Card>

      <Card className="p-4 sm:p-5 border border-success-200 bg-white">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div><h2 className="text-base font-semibold text-ink">Learning path</h2><p className="text-xs text-muted mt-1">{authoredCount > 0 ? `${studiedCount} of ${authoredCount} authored lessons marked studied · follow units in order` : 'Units registered · lessons still being integrated'}</p></div>
          {lastLesson ? <Button type="button" size="sm" onClick={() => navigate({ screen: 'curriculum-lesson', lessonId: lastLesson.id })}>Resume last lesson <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button> : nextLesson ? <Button type="button" size="sm" onClick={() => navigate({ screen: 'curriculum-lesson', lessonId: nextLesson.id })}>Open next authored lesson <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button> : null}
        </div>
        {units.length ? <div className="space-y-2">{units.map((unit) => {
          const unitLessons = unit.lessonIds.map((id) => cgeiCurriculum.lessons.find((lesson) => lesson.id === id)).filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson));
          const unitStudied = unitLessons.filter((lesson) => lessonIsStudied(lesson, data)).length;
          const unitAuthored = unitLessons.filter(hasSubstantiveLessonContent).length;
          return <Button key={unit.id} type="button" variant="secondary" onClick={() => navigate({ screen: 'curriculum-unit', unitId: unit.id })} className="w-full justify-start rounded-xl bg-slate-50/80 p-3 text-left">
            <span className="flex items-start gap-3 w-full"><span className="text-xs font-bold text-success-700 w-10 shrink-0 pt-0.5">{unit.code}</span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><span className="font-semibold text-sm text-ink">{unit.title}</span><Badge color={unit.readiness === 'review' ? 'amber' : unit.readiness === 'outlined' ? 'sky' : 'slate'}>{unit.readiness}</Badge></span><span className="block text-xs text-muted leading-relaxed mt-1">{unit.summary}</span><span className="block text-xs text-muted mt-1">{unitAuthored} authored / {unitLessons.length} lessons · {unitStudied} studied</span></span><ArrowRight className="w-4 h-4 text-success-700 shrink-0 mt-1" /></span>
          </Button>;
        })}</div> : <div className="rounded-xl border border-dashed border-slate-300 p-5 text-center"><Clock3 className="w-6 h-6 text-muted mx-auto mb-2" /><p className="font-medium text-sm text-ink">Canonical units are being authored</p><p className="text-xs text-muted mt-1">This domain remains in the pathway catalogue, but no unit sequence is registered yet. Orientation does not substitute for lessons.</p></div>}
      </Card>
    </PageContainer>
  );
}
