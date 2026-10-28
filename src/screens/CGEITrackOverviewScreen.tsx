import { ArrowRight, BookOpen, CheckCircle2, Compass, FlaskConical, Layers3, Route, Sparkles } from 'lucide-react';
import { useData } from '@/hooks/useData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { useRouter } from '@/router';
import { getTrackDefinition } from '@/data/tracks';
import { subjectsByTrack } from '@/data/subjects';
import { topicsBySubject } from '@/data/topics';
import { isCgeiOverviewTopic } from '@/data/cgei/overview';
import { cgeiCurriculum } from '@/data/cgei/curriculum';
import { hasSubstantiveLessonContent } from '@/data/cgei/readiness';
import { isTrackEnrolled } from '@/lib/track-access';
import { trackAccentClasses } from '@/lib/track-chrome';
import { TrackEnrollmentBanner } from '@/components/track/TrackEnrollmentBanner';
import { PageContainer, Card, Button, ScreenHeader } from '@/components/ui';
import { getSubjectStyle } from '@/data/subject-colors';
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
      <div className="relative overflow-hidden rounded-card border border-slate-200 bg-white p-card-pad sm:p-card-pad-lg mb-6">
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent.gradient}`} aria-hidden />
        <ScreenHeader title={def.title} subtitle={def.description} />
        <TrackEnrollmentBanner
          trackTitle={def.title}
          enrolled={enrolled}
          isActiveFocus={isActive}
          onBegin={begin}
          onContinue={continueTrack}
        />
        <div className="grid sm:grid-cols-3 gap-3 mt-5">
          <div className="rounded-card bg-brand-50 border border-brand-100 p-card-pad">
            <Compass className="w-5 h-5 text-brand-800 mb-2" aria-hidden />
            <p className="font-semibold text-sm text-slate-900">14 connected domains</p>
            <p className="text-caption leading-relaxed text-slate-600 mt-1">A pathway from environmental foundations to applied intelligence and research.</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
            <Layers3 className="w-5 h-5 text-slate-700 mb-2" aria-hidden />
            <p className="font-semibold text-sm text-slate-900">Overview → units → lessons</p>
            <p className="text-caption leading-relaxed text-slate-600 mt-1">Orientation material is separate from lessons and assessment progress.</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
            <FlaskConical className="w-5 h-5 text-slate-700 mb-2" aria-hidden />
            <p className="font-semibold text-sm text-slate-900">Evidence over checkmarks</p>
            <p className="text-caption leading-relaxed text-slate-600 mt-1">The long-term goal is validated analysis, code, maps, reports, and projects.</p>
          </div>
        </div>
      </div>

      {enrolled && lastLesson && (
        <Card className="p-4 mb-6 border border-brand-200 bg-brand-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <p className="text-caption font-bold uppercase tracking-wide text-brand-800 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Continue curriculum</p>
              <p className="font-semibold text-slate-900 mt-1">{lastLesson.title}</p>
              <p className="text-caption text-slate-600 mt-1">Resume the last opened canonical lesson.</p>
            </div>
            <Button variant="secondary" onClick={() => {
              const result = setActiveEnrolledTrack('cgei');
              if (!result.ok) return;
              setActiveTrack('cgei');
              navigate({ screen: 'curriculum-lesson', lessonId: lastLesson.id, parent: currentRoute });
            }}>
              Resume <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-bold text-ink">Explore the pathway</h2>
        <p className="text-sm text-muted mt-1">Start with the foundations, then follow the domain that matches your goals. You can return here at any time.</p>
      </div>

      <div className="space-y-6">
        {DOMAIN_GROUPS.map((group) => (
          <section key={group.id} aria-labelledby={`cgei-group-${group.id}`}>
            <div className="mb-3">
              <h3 id={`cgei-group-${group.id}`} className="font-bold text-ink">{group.title}</h3>
              <p className="text-sm text-muted mt-0.5">{group.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {group.subjectIds.map((subjectId) => {
                const subject = subjects.find((item) => item.id === subjectId);
                if (!subject) return null;
                const canonical = cgeiCurriculum.subjects.find((item) => item.subjectId === subject.id);
                const subjectTopics = topicsBySubject(subject.id as SubjectId).filter((topic) => !isCgeiOverviewTopic(topic.id));
                const hasTopicContent = subjectTopics.some((topic) => topic.content);
                const hasTopicOutlines = subjectTopics.length > 0;
                const units = canonical?.unitIds
                  .map((id) => cgeiCurriculum.units.find((unit) => unit.id === id))
                  .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit)) ?? [];
                const subjectLessons = units.flatMap((unit) => unit.lessonIds
                  .map((id) => cgeiCurriculum.lessons.find((item) => item.id === id))
                  .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson)));
                const authoredLessons = subjectLessons.filter(hasSubstantiveLessonContent).length;
                const lessonReadiness = subjectLessons.reduce<Record<string, number>>((counts, lesson) => {
                  counts[lesson.readiness] = (counts[lesson.readiness] ?? 0) + 1;
                  return counts;
                }, {});
                const readinessSummary = ['planned', 'outlined', 'draft', 'review', 'validated', 'released']
                  .map((status) => `${lessonReadiness[status] ?? 0} ${status}`)
                  .join(' · ');
                const Icon = subject.lucideIcon ?? BookOpen;
                const subjectStyle = getSubjectStyle(subject.id);
                return (
                  <Card key={subject.id} className={`p-card-pad border ${subjectStyle.border} ${subjectStyle.hoverBorder} transition-colors`}>
                    <div className="flex items-start gap-3">
                      <div className={`rounded-btn ${subjectStyle.tint} p-2.5 shrink-0`}>
                        <Icon className={`w-5 h-5 ${subjectStyle.text}`} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-ink leading-snug">{subject.title}</h4>
                        {canonical ? (
                          <>
                            <p className="text-caption text-ink font-semibold mt-1">Canonical curriculum · subject readiness: {canonical.readiness}</p>
                            <p className="text-caption text-muted mt-1">{units.length} registered units · {authoredLessons}/{subjectLessons.length} lessons with substantive content</p>
                            <p className="text-caption text-muted mt-1">Lesson readiness (zero counts included): {subjectLessons.length ? readinessSummary : 'no lessons mapped'}.</p>
                          </>
                        ) : hasTopicContent ? (
                          <>
                            <p className="text-caption text-muted font-semibold mt-1">Legacy topic content · release status not tracked</p>
                            <p className="text-caption text-muted mt-1">{subjectTopics.filter((topic) => topic.content).length} content-bearing topic records; canonical lesson readiness and release evidence are not yet tracked for this domain.</p>
                          </>
                        ) : hasTopicOutlines ? (
                          <>
                            <p className="text-caption text-muted font-semibold mt-1">Partial topic outline</p>
                            <p className="text-caption text-muted mt-1">{subjectTopics.length} topic records exist, but none is marked as content-bearing; structured lessons and assessments are still needed.</p>
                          </>
                        ) : (
                          <>
                            <p className="text-caption text-muted font-semibold mt-1">Orientation only</p>
                            <p className="text-caption text-muted mt-1">The roadmap is available; no non-orientation study topics or canonical lessons are registered yet.</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-caption text-muted flex items-center gap-1">
                        {canonical ? <CheckCircle2 className="w-3.5 h-3.5 text-success-700" aria-hidden /> : <Sparkles className="w-3.5 h-3.5" aria-hidden />}
                        {canonical ? 'Structured pathway' : hasTopicContent ? 'Legacy topic content' : hasTopicOutlines ? 'Partial topic outline' : 'Orientation only'}
                      </span>
                      <Button size="sm" variant="secondary" disabled={!enrolled} onClick={() => openSubject(subject.id as SubjectId)}>
                        {enrolled ? 'Explore' : 'Locked'} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <p className="text-caption text-muted mt-6 leading-relaxed">
        Coverage is intentionally shown by implementation stage, not as a single completion percentage: roadmap entries, drafted lessons, validated lessons, and demonstrated competencies are different kinds of progress.
      </p>
    </PageContainer>
  );
}
