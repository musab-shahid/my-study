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
import { TrackSubjectList, TrackSubjectRow } from '@/components/track/TrackLandingShell';
import { getSubjectStyle } from '@/data/subject-colors';
import type { SubjectId } from '@/types';

export const CGEI_DOMAIN_GROUPS = [
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
    subjectIds: ['cgei-advanced-ai', 'cgei-capstone'],
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
    ? cgeiCurriculum.lessons.find((lesson) => lesson.id === data.lastOpenedCurriculumLesson && hasSubstantiveLessonContent(lesson))
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
        <div className="flex justify-end">
          <Button type="button" variant="secondary" disabled={!enrolled} onClick={() => {
            const result = setActiveEnrolledTrack('cgei');
            if (!result.ok) return;
            setActiveTrack('cgei');
            navigate({ screen: 'learn', parent: currentRoute });
          }}>
            Open CGEI Learning <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mt-5">
          <div className="rounded-card bg-brand-50 border border-brand-100 p-card-pad">
            <Compass className="w-5 h-5 text-brand-800 mb-2" aria-hidden />
            <p className="font-semibold text-sm text-ink">{subjects.length} connected domains</p>
            <p className="text-caption leading-relaxed text-ink-muted mt-1">A pathway from environmental foundations to applied intelligence and research.</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
            <Layers3 className="w-5 h-5 text-ink mb-2" aria-hidden />
            <p className="font-semibold text-sm text-ink">Overview → units → lessons</p>
            <p className="text-caption leading-relaxed text-ink-muted mt-1">Orientation material is separate from lessons and assessment progress.</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
            <FlaskConical className="w-5 h-5 text-ink mb-2" aria-hidden />
            <p className="font-semibold text-sm text-ink">Evidence over checkmarks</p>
            <p className="text-caption leading-relaxed text-ink-muted mt-1">The long-term goal is validated analysis, code, maps, reports, and projects.</p>
          </div>
        </div>
      </div>

      {enrolled && lastLesson && (
        <Card className="p-4 mb-6 border border-brand-200 bg-brand-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <p className="text-caption font-bold uppercase tracking-wide text-brand-800 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Continue curriculum</p>
              <p className="font-semibold text-ink mt-1">{lastLesson.title}</p>
              <p className="text-caption text-ink-muted mt-1">Resume the last opened canonical lesson.</p>
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
        {CGEI_DOMAIN_GROUPS.map((group) => (
          <section key={group.id} aria-labelledby={`cgei-group-${group.id}`}>
            <div className="mb-3">
              <h3 id={`cgei-group-${group.id}`} className="font-bold text-ink">{group.title}</h3>
              <p className="text-sm text-muted mt-0.5">{group.description}</p>
            </div>
            <TrackSubjectList>
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
                const detail = canonical
                  ? `Canonical curriculum · ${canonical.readiness} · ${units.length} units · ${authoredLessons}/${subjectLessons.length} lessons with substantive content · Lesson readiness: ${subjectLessons.length ? readinessSummary : 'no lessons mapped'}`
                  : hasTopicContent
                    ? `Legacy topic content · ${subjectTopics.filter((topic) => topic.content).length} content-bearing topic records; canonical lesson readiness and release evidence are not yet tracked.`
                    : hasTopicOutlines
                      ? `Partial topic outline · ${subjectTopics.length} topic records exist, but none is marked as content-bearing.`
                      : 'Orientation only · roadmap available; no non-orientation study topics or canonical lessons are registered yet.';
                const pathLabel = canonical ? 'Structured pathway' : hasTopicContent ? 'Legacy topic content' : hasTopicOutlines ? 'Partial topic outline' : 'Orientation only';
                return (
                  <TrackSubjectRow
                    key={subject.id}
                    title={subject.title}
                    meta={
                      <div className="space-y-1">
                        <p>{detail}</p>
                        <p className="font-semibold">{pathLabel}</p>
                      </div>
                    }
                    icon={
                      <div className={`rounded-btn ${subjectStyle.tint} p-2.5 shrink-0`}>
                        <Icon className={`w-5 h-5 ${subjectStyle.text}`} aria-hidden />
                      </div>
                    }
                    disabled={!enrolled}
                    actionLabel={enrolled ? 'Explore' : 'Locked'}
                    onOpen={() => openSubject(subject.id as SubjectId)}
                  />
                );
              })}
            </TrackSubjectList>
          </section>
        ))}
      </div>

      <p className="text-caption text-muted mt-6 leading-relaxed">
        Coverage is intentionally shown by implementation stage, not as a single completion percentage: roadmap entries, drafted lessons, validated lessons, and demonstrated competencies are different kinds of progress.
      </p>
    </PageContainer>
  );
}
