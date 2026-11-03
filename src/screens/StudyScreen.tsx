import { CGEILearningScreen } from '@/screens/CGEILearningScreen';
import { ChevronRight } from 'lucide-react';
import { useRouter } from '@/router';
import { useData } from '@/hooks/useData';
import { subjectMap } from '@/data/subjects';
import { topicsBySection } from '@/data/topics';
import { sectionMap } from '@/data/sections';
import { SectionBadge } from '@/components/SectionBadge';
import { PageContainer, Card, EmptyState, TopicStatusIcon, Button } from '@/components/ui';
import { BackButton, Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { cgeiCurriculum } from '@/data/cgei/curriculum';
import { getTopicStatusFromProgress } from '@/lib/constants';
import { getLearnerReadinessPresentation } from '@/lib/learner-readiness-presentation';
import { hasSubstantiveLessonContent } from '@/data/cgei/readiness';
import { GenericStudyScreen } from './study/GenericStudyScreen';

// ---- Learn Landing ----

/**
 * Route context is authoritative for CGEI. The shared subject preference
 * (including a historical "All Subjects" preference) must never override a
 * CGEI deep link or bring the generic selector into the CGEI experience.
 */
export function StudyScreen() {
  const { route } = useRouter();
  const { trackMembership } = useData();
  const cgeiSubjectId = route.screen === 'learn' && route.subjectId
    && subjectMap[route.subjectId]?.track === 'cgei'
    ? route.subjectId
    : undefined;
  const isCgeiLearningHome = route.screen === 'learn' && !route.subjectId
    && trackMembership.activeTrackId === 'cgei';

  if (cgeiSubjectId || isCgeiLearningHome) {
    return <CGEILearningScreen subjectId={cgeiSubjectId} />;
  }
  return <GenericStudyScreen />;
}

// ---- Section → Topic List ----
export function SectionScreen({ sectionId }: { sectionId: string }) {
  const { navigate } = useRouter();
  const { data } = useData();
  const section = sectionMap[sectionId];
  const sectionTopics = topicsBySection(sectionId);
  const curriculumUnit = cgeiCurriculum.units.find((unit) => unit.legacySectionId === sectionId);
  const unitActivities = curriculumUnit
    ? curriculumUnit.activityIds.map((id) => cgeiCurriculum.activities.find((activity) => activity.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item))
    : [];
  const unitAssessments = curriculumUnit
    ? curriculumUnit.assessmentIds.map((id) => cgeiCurriculum.assessments.find((assessment) => assessment.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item))
    : [];
  const unitDeliverables = curriculumUnit
    ? curriculumUnit.deliverableIds.map((id) => cgeiCurriculum.deliverables.find((deliverable) => deliverable.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item))
    : [];
  const unitResources = curriculumUnit
    ? curriculumUnit.resourceIds.map((id) => cgeiCurriculum.resources.find((resource) => resource.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item))
    : [];

  if (!section) {
    return (
      <PageContainer>
        <BackButton />
        <EmptyState
          title="Section not found"
          message="This section does not exist or was removed."
          action={<Button variant="secondary" onClick={() => navigate({ screen: 'learn', parent: null })}>Back to Learn</Button>}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex items-center gap-2 mb-4"><BackButton /><Breadcrumbs /></div>
      <div className="mb-5 sm:mb-8">
        <div className="flex items-center gap-2 mb-1">
          <SectionBadge section={section} />
        </div>
        <h1 className="text-page-title sm:text-page-title-lg font-semibold text-ink tracking-tight leading-tight">{section.title}</h1>
        <p className="text-muted mt-1 text-body-sm">{section.topicCount} {section.subjectId === 'cgei-data-science' ? 'lessons' : 'topics'}</p>
      </div>
      {curriculumUnit && (
        <Card className="mb-5 p-card-pad sm:p-card-pad-lg border border-success-100 bg-brand-50/30">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold text-ink">Unit learning plan</h2>
            <button type="button" onClick={() => navigate({ screen: 'curriculum-unit', unitId: curriculumUnit.id })} className="text-xs font-semibold text-success-700 hover:underline">Open unit workspace <span aria-hidden="true">→</span></button>
          </div>
          <p className="text-sm text-muted leading-relaxed mt-1">{curriculumUnit.summary}</p>
          {curriculumUnit.outcomes.length > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-muted mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 rounded-sm">
                Learning outcomes
              </summary>
              <ul className="space-y-2 mt-2">
                {curriculumUnit.outcomes.map((outcome) => (
                  <li key={outcome.id} className="flex items-start gap-2 text-sm text-muted">
                    <span className="rounded-md bg-white border border-success-100 px-1.5 py-0.5 text-label font-bold text-success-700 shrink-0">{outcome.level}</span>
                    <span>{outcome.statement}</span>
                  </li>
                ))}
              </ul>
            </details>
          )}
          {unitActivities.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">Practice activities</h3>
              <div className="space-y-2">
                {unitActivities.map((activity) => (
                  <div key={activity.id} className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-sm text-ink">{activity.title}</span>
                      <span className="rounded-full bg-slate-100 text-muted px-2 py-0.5 text-label font-semibold">{activity.level}</span>
                      {activity.estimatedMinutes && <span className="text-label text-muted">~{activity.estimatedMinutes} min</span>}
                    </div>
                    <p className="text-xs text-muted leading-relaxed mt-1">{activity.instructions}</p>
                    {activity.expectedEvidence?.length ? <p className="text-xs text-success-700 mt-2"><span className="font-semibold">Evidence:</span> {activity.expectedEvidence.join(' · ')}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {unitAssessments.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">Checks and assessments</h3>
                <ul className="space-y-2">
                  {unitAssessments.map((assessment) => (
                    <li key={assessment.id} className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="font-medium text-sm text-ink">{assessment.title}</p>
                      <p className="text-xs text-muted mt-1">{assessment.purpose}</p>
                      {assessment.passThreshold !== undefined && <p className="text-xs text-muted mt-1">Target: {Math.round(assessment.passThreshold * 100)}%</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {unitDeliverables.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">Portfolio evidence</h3>
                <ul className="space-y-2">
                  {unitDeliverables.map((deliverable) => (
                    <li key={deliverable.id} className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="font-medium text-sm text-ink">{deliverable.title}</p>
                      <p className="text-xs text-muted mt-1">{deliverable.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {unitResources.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">Supporting references</h3>
                <ul className="space-y-2">
                  {unitResources.map((resource) => (
                    <li key={resource.id} className="rounded-lg border border-slate-200 bg-white p-3">
                      {resource.url ? (
                        <a href={resource.url} target="_blank" rel="noreferrer" className="font-medium text-sm text-success-700 hover:underline">{resource.title}</a>
                      ) : <p className="font-medium text-sm text-ink">{resource.title}</p>}
                      <p className="text-xs text-muted mt-1">{resource.purpose}</p>
                      {resource.authorOrPublisher && <p className="text-label text-muted mt-1">{resource.authorOrPublisher} · checked {resource.accessedOn ?? 'date not recorded'}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}
      <div className="space-y-2">
        {sectionTopics.map((topic) => {
          const prog = data.topicProgress[topic.id];
          const studied = data.studiedTopics.includes(topic.id);
          const status = getTopicStatusFromProgress(studied, prog);
          return (
            <Card key={topic.id} className="p-0 transition-colors hover:border-slate-300">
              <button type="button" onClick={() => navigate({ screen: 'topic', topicId: topic.id })} className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 active:bg-slate-100 transition-colors text-left rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-inset">
                <span className="text-muted text-xs font-bold w-6 shrink-0">{topic.order}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink text-sm sm:text-base leading-snug">{topic.title}</p>
                  {(() => {
                    const lesson = cgeiCurriculum.lessons.find((item) => item.sourceTopicId === topic.id);
                    const readiness = lesson
                      ? getLearnerReadinessPresentation(lesson.readiness, hasSubstantiveLessonContent(lesson))
                      : null;
                    return (
                      <span className="text-xs text-muted">
                        {lesson ? `${lesson.level} · ~${lesson.estimatedMinutes ?? 0} min · ${readiness?.label}` : topic.content ? 'Content available' : 'Content coming soon'}
                      </span>
                    );
                  })()}
                </div>
                <TopicStatusIcon status={status} />
                <ChevronRight className="w-4 h-4 text-muted shrink-0" />
              </button>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}

export { TopicScreen } from './study/TopicScreen';
