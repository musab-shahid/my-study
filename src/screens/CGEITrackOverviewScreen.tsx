import { ArrowRight, BookOpen, CheckCircle2, Compass, FlaskConical, Layers3, Route, Sparkles } from 'lucide-react';
import { useData } from '@/hooks/useData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { useRouter } from '@/router';
import { getTrackDefinition } from '@/data/tracks';
import { subjectsByTrack } from '@/data/subjects';
import { cgeiCurriculum } from '@/data/cgei/curriculum';
import { isTrackEnrolled } from '@/lib/track-access';
import { trackAccentClasses } from '@/lib/track-chrome';
import { TrackEnrollmentBanner } from '@/components/track/TrackEnrollmentBanner';
import { PageContainer, Card, Button, ScreenHeader } from '@/components/ui';
import type { SubjectId } from '@/types';

const DOMAIN_GROUPS = [
  {
    id: 'foundations',
    title: '01 · Foundations & Earth systems',
    description: 'Build the scientific, climate, geospatial, and data foundations.',
    subjectIds: ['cgei-env-systems', 'cgei-climate-science', 'cgei-geospatial', 'cgei-remote-sensing', 'cgei-data-science'],
  },
  {
    id: 'intelligence',
    title: '02 · Applied environmental intelligence',
    description: 'Connect data, models, risk, and decision-making to real problems.',
    subjectIds: ['cgei-ml-geoai', 'cgei-climate-risk', 'cgei-decision-support'],
  },
  {
    id: 'research',
    title: '03 · Research & professional practice',
    description: 'Make work rigorous, reproducible, communicable, and useful.',
    subjectIds: ['cgei-research-practice', 'cgei-climate-policy', 'cgei-software-engineering'],
  },
  {
    id: 'advanced',
    title: '04 · Advanced pathways & capstone',
    description: 'Extend into advanced AI, a portfolio-grade capstone, or optional specialist branches.',
    subjectIds: ['cgei-advanced-ai', 'cgei-capstone', 'cgei-advanced-branches'],
  },
] as const;

/**
 * CGEI uses a richer curriculum hierarchy than exam-revision tracks.
 * This landing deliberately avoids reporting legacy roadmap cards as lessons.
 */
export function CGEITrackOverviewScreen() {
  const def = getTrackDefinition('cgei');
  const { data, enrollInTrack, setActiveEnrolledTrack, trackMembership } = useData();
  const { setActiveTrack } = useSubjectSelection();
  const { navigate, currentRoute } = useRouter();
  const enrolled = isTrackEnrolled(data, 'cgei');
  const isActive = trackMembership.activeTrackId === 'cgei';
  const accent = trackAccentClasses('cgei');
  const subjects = subjectsByTrack('cgei');
  const lastLesson = data.lastOpenedCurriculumLesson
    ? cgeiCurriculum.lessons.find((lesson) => lesson.id === data.lastOpenedCurriculumLesson)
    : undefined;

  const begin = () => {
    const result = enrollInTrack('cgei');
    if (result.ok) setActiveTrack('cgei');
  };

  const continueTrack = () => {
    const result = setActiveEnrolledTrack('cgei');
    if (result.ok) setActiveTrack('cgei');
  };

  const openSubject = (subjectId: SubjectId) => {
    if (!enrolled) return;
    const result = setActiveEnrolledTrack('cgei');
    if (!result.ok) return;
    setActiveTrack('cgei');
    navigate({ screen: 'learn', subjectId, parent: currentRoute });
  };

  return (
    <PageContainer width="wide">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 mb-6">
        <ScreenHeader title={def.title} subtitle={def.description} />
        <TrackEnrollmentBanner
          trackTitle={def.title}
          enrolled={enrolled}
          isActiveFocus={isActive}
          onBegin={begin}
          onContinue={continueTrack}
          accentClass={accent.gradient}
        />
        <div className="grid sm:grid-cols-3 gap-3 mt-5">
          <div className="rounded-xl bg-teal-50 border border-teal-100 p-3">
            <Compass className="w-5 h-5 text-teal-800 mb-2" aria-hidden />
            <p className="font-semibold text-sm text-slate-900">14 connected domains</p>
            <p className="text-xs leading-relaxed text-slate-600 mt-1">A pathway from environmental foundations to applied intelligence and research.</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
            <Layers3 className="w-5 h-5 text-slate-700 mb-2" aria-hidden />
            <p className="font-semibold text-sm text-slate-900">Overview → units → lessons</p>
            <p className="text-xs leading-relaxed text-slate-600 mt-1">Orientation material is separate from lessons and assessment progress.</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
            <FlaskConical className="w-5 h-5 text-slate-700 mb-2" aria-hidden />
            <p className="font-semibold text-sm text-slate-900">Evidence over checkmarks</p>
            <p className="text-xs leading-relaxed text-slate-600 mt-1">The long-term goal is validated analysis, code, maps, reports, and projects.</p>
          </div>
        </div>
      </div>

      {enrolled && lastLesson && (
        <Card className="p-4 mb-6 border border-teal-200 bg-teal-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-teal-800 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Continue curriculum</p>
              <p className="font-semibold text-slate-900 mt-1">{lastLesson.title}</p>
              <p className="text-xs text-slate-600 mt-1">Resume the last opened canonical lesson.</p>
            </div>
            <Button variant="secondary" onClick={() => navigate({ screen: 'curriculum-lesson', lessonId: lastLesson.id, parent: currentRoute })}>
              Resume <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Explore the pathway</h2>
        <p className="text-sm text-slate-600 mt-1">Start with the foundations, then follow the domain that matches your goals. You can return here at any time.</p>
      </div>

      <div className="space-y-6">
        {DOMAIN_GROUPS.map((group) => (
          <section key={group.id} aria-labelledby={`cgei-group-${group.id}`}>
            <div className="mb-3">
              <h3 id={`cgei-group-${group.id}`} className="font-bold text-slate-900">{group.title}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{group.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {group.subjectIds.map((subjectId) => {
                const subject = subjects.find((item) => item.id === subjectId);
                if (!subject) return null;
                const canonical = cgeiCurriculum.subjects.find((item) => item.subjectId === subject.id);
                const units = canonical?.unitIds
                  .map((id) => cgeiCurriculum.units.find((unit) => unit.id === id))
                  .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit)) ?? [];
                const authoredLessons = units.reduce((sum, unit) => sum + unit.lessonIds.filter((id) => {
                  const lesson = cgeiCurriculum.lessons.find((item) => item.id === id);
                  return Boolean(lesson?.content.length);
                }).length, 0);
                const Icon = subject.lucideIcon ?? BookOpen;
                return (
                  <Card key={subject.id} className="p-4 border border-slate-200 hover:border-teal-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-slate-100 p-2.5 shrink-0">
                        <Icon className="w-5 h-5 text-slate-700" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-slate-900 leading-snug">{subject.title}</h4>
                        {canonical ? (
                          <>
                            <p className="text-xs text-teal-800 font-semibold mt-1">Canonical curriculum pilot</p>
                            <p className="text-xs text-slate-600 mt-1">{units.length} registered units · {authoredLessons} lessons with content</p>
                          </>
                        ) : (
                          <>
                            <p className="text-xs text-slate-600 font-semibold mt-1">Domain roadmap</p>
                            <p className="text-xs text-slate-500 mt-1">Overview and legacy material are being migrated into the structured curriculum.</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        {canonical ? <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" aria-hidden /> : <Sparkles className="w-3.5 h-3.5" aria-hidden />}
                        {canonical ? 'Structured pathway' : 'Roadmap stage'}
                      </span>
                      <Button size="sm" variant="secondary" disabled={!enrolled} onClick={() => openSubject(subject.id as SubjectId)}>
                        {enrolled ? 'Explore' : 'Begin track'} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <p className="text-xs text-slate-500 mt-6 leading-relaxed">
        Coverage is intentionally shown by implementation stage, not as a single completion percentage: roadmap entries, drafted lessons, validated lessons, and demonstrated competencies are different kinds of progress.
      </p>
    </PageContainer>
  );
}
