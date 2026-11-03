import { useState, useEffect, useMemo } from 'react';
import { CGEILearningScreen } from '@/screens/CGEILearningScreen';
import { BookOpen, ChevronRight, ChevronLeft, ChevronDown, Cloud, Calculator, MapIcon, GraduationCap, ArrowRight, AlertTriangle, BookCopy, Star, XCircle } from 'lucide-react';
import { useRouter } from '@/router';
import { useSubjectData } from '@/hooks/useSubjectData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { SubjectSelector, SubjectFilterValue } from '@/components/subject/SubjectSelector';
import { useData } from '@/hooks/useData';
import { subjectMap } from '@/data/subjects';
import { subjectsForScope } from '@/lib/track-scope';
import { getTrackDefinition, isTrackId } from '@/data/tracks';
import { topicsBySection, getTopic, topicsBySubject } from '@/data/topics';
import { sectionMap, sections } from '@/data/sections';
import { SectionBadge } from '@/components/SectionBadge';
import { getSubjectColor } from '@/data/subject-colors';
import { PageContainer, Card, EmptyState, ProgressBar, ActionCard, TopicStatusIcon, LoadingSpinner, Button, Badge, ScreenHeader } from '@/components/ui';
import { MathText } from '@/components/MathText';
import { BackButton, Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getTopicAsync } from '@/data/topics';
import { cgeiCurriculum } from '@/data/cgei/curriculum';
import { cgeiOverviewTopicIdForSubject, isCgeiOverviewTopic } from '@/data/cgei/overview';
import { CurriculumLessonContent } from '@/components/curriculum/CurriculumLessonContent';
import { loadQuestionsForTopic } from '@/data/lazy-data';
import { SubjectId, Topic, Question, MethodChooser } from '@/types';
import { QuantFormulaEntry } from '@/components/study/TopicContentBlocks';
import { AiTutorChat } from '@/components/AiTutorChat';
import { buildTopicContext, buildStudentContext, consumePendingExplain } from '@/lib/ai-tutor';
import { isTopicMastered } from '@/lib/attention';
import { getTopicStatusFromProgress } from '@/lib/constants';
import { selectContinueLearningTopic } from '@/lib/continue-learning';
import { getLearnerReadinessPresentation } from '@/lib/learner-readiness-presentation';
import { hasSubstantiveLessonContent } from '@/data/cgei/readiness';
import { IdiomGroupsBlock, SubstitutionGroupsBlock, VocabularyGroupsBlock, PrefixGroupsBlock, SuffixGroupsBlock, RootGroupsBlock, GrammarRulesBlock, SubtopicsBlock, QuantFormulasBlock, ComparisonTableBlock } from '@/components/study/TopicContentBlocks';

// ---- Learn Landing ----
function GenericStudyScreen() {
  const { navigate, currentRoute, route } = useRouter();
  const sd = useSubjectData();
  const { getActiveSubject, setActiveSubjectForScreen, activeTrack, setActiveTrack } = useSubjectSelection();
  const { data, trackMembership, setActiveEnrolledTrack } = useData();

  const activeSubject = getActiveSubject('learn');
  const isAllSubjects = activeSubject === 'all';
  const subjectId = isAllSubjects ? 'all' : (activeSubject as SubjectId);

  // A subject-aware URL is the canonical deep link for the Learn workspace.
  // Wait until the active track matches the subject before restoring its selection.
  useEffect(() => {
    if (route.screen !== 'learn' || !route.subjectId) return;
    const subject = subjectMap[route.subjectId];
    if (!subject) return;
    if (subject.track !== activeTrack) {
      // Direct links and breadcrumbs may be opened while another track is active.
      // Switch only if the learner is enrolled; the route gate handles access.
      const switched = setActiveEnrolledTrack(subject.track);
      if (switched.ok) setActiveTrack(subject.track);
      return;
    }
    setActiveSubjectForScreen('learn', route.subjectId as SubjectId);
  }, [route, activeTrack, setActiveSubjectForScreen, setActiveEnrolledTrack, setActiveTrack]);

  const roadmapTopicId = isAllSubjects ? undefined : cgeiOverviewTopicIdForSubject(subjectId as SubjectId);
  const [roadmapTopic, setRoadmapTopic] = useState<Topic | null>(null);
  useEffect(() => {
    let active = true;
    setRoadmapTopic(null);
    if (!roadmapTopicId) return () => { active = false; };
    getTopicAsync(roadmapTopicId)
      .then((topic) => { if (active) setRoadmapTopic(topic ?? null); })
      .catch(() => { if (active) setRoadmapTopic(null); });
    return () => { active = false; };
  }, [roadmapTopicId]);

  // Orientation records are loaded separately from the lesson list so they
  // never enter topic counts, study progress, revision, or mastery metrics.
  const subjectTopics = sd.topicsFor(subjectId);
  const subjectSections = isAllSubjects
    ? []
    : sd.sectionsFor(subjectId).filter((section) => subjectTopics.some((topic) => topic.sectionId === section.id));
  // Canonical curriculum registration is an independent source of learning
  // content; do not gate a registered subject behind legacy topic records.
  const curriculumSubject = isAllSubjects
    ? undefined
    : cgeiCurriculum.subjects.find((item) => item.subjectId === subjectId);
  const hasContent = isAllSubjects || subjectTopics.length > 0 || Boolean(roadmapTopicId) || Boolean(curriculumSubject);
  const subjectTitle = isAllSubjects ? 'All Subjects' : (subjectMap[subjectId]?.title ?? 'Subject');
  const showFormulaVault = Boolean(subjectMap[subjectId] && getTrackDefinition(subjectMap[subjectId].track).capabilities.formulas);
  const meteoColor = getSubjectColor('meteo-climatology');
  const curriculumUnits = curriculumSubject
    ? curriculumSubject.unitIds
        .map((id) => cgeiCurriculum.units.find((unit) => unit.id === id))
        .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit))
        .sort((a, b) => a.order - b.order)
    : [];
  const curriculumLessons = [...new Set(curriculumUnits.flatMap((unit) => unit.lessonIds))]
    .map((id) => cgeiCurriculum.lessons.find((lesson) => lesson.id === id))
    .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson));
  const studiedCurriculumLessonCount = curriculumLessons.filter((lesson) =>
    lesson.sourceTopicId
      ? data.studiedTopics.includes(lesson.sourceTopicId)
      : (data.studiedCurriculumLessons ?? []).includes(lesson.id),
  ).length;
  const lastCurriculumLesson = curriculumSubject && data.lastOpenedCurriculumLesson
    ? cgeiCurriculum.lessons.find((lesson) =>
        lesson.id === data.lastOpenedCurriculumLesson &&
        !lesson.sourceTopicId &&
        curriculumSubject.unitIds.some((unitId) => cgeiCurriculum.units.find((unit) => unit.id === unitId)?.lessonIds.includes(lesson.id))
      )
    : undefined;

  // Keep the selected subject addressable so reloads and breadcrumbs preserve context.
  useEffect(() => {
    if (route.screen !== 'learn' || !route.subjectId) return;
    const subject = subjectMap[route.subjectId];
    if (subject && subject.track === activeTrack) {
      setActiveSubjectForScreen('learn', route.subjectId as SubjectId);
    }
  }, [route, activeTrack, setActiveSubjectForScreen]);

  const handleSubjectChange = (value: SubjectFilterValue) => {
    setActiveSubjectForScreen('learn', value);
    navigate({
      screen: 'learn',
      subjectId: value === 'all' ? undefined : value,
      parent: currentRoute,
    });
  };

  // Continue Learning logic
  const continueTopic = useMemo(() => {
    if (isAllSubjects || !hasContent) return null;
    return selectContinueLearningTopic({
      subjectTopics,
      lastOpenedTopicId: data.lastOpenedTopic,
      studiedTopicIds: data.studiedTopics,
      topicProgress: data.topicProgress,
      resolveTopic: getTopic,
    });
  }, [isAllSubjects, hasContent, data.lastOpenedTopic, data.topicProgress, data.studiedTopics, subjectTopics]);

  // Accordion state
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // All subjects view
  if (isAllSubjects) {
    const examId = isTrackId(activeTrack) ? (trackMembership.enrollments[activeTrack]?.activeExamId ?? null) : null;
    const trackSubjects = isTrackId(activeTrack) ? subjectsForScope({ trackId: activeTrack, examId }) : [];
    const subjectsWithContent = trackSubjects.filter((s) => sd.topicsFor(s.id as SubjectId).length > 0 || Boolean(cgeiOverviewTopicIdForSubject(s.id as SubjectId)));
    return (
      <PageContainer className="max-w-3xl">
        <ScreenHeader
          title="Learn"
          subtitle="Read new material or revisit what you've seen."
        />
        <div className="mb-3 sm:mb-6">
          <SubjectSelector value={activeSubject} onChange={handleSubjectChange} showAllOption />
        </div>
        <div className="space-y-2 sm:space-y-3">
          {subjectsWithContent.map((subject) => {
            const topics = sd.topicsFor(subject.id as SubjectId);
            const hasOverview = Boolean(cgeiOverviewTopicIdForSubject(subject.id as SubjectId));
            const studied = topics.filter((t) => data.studiedTopics.includes(t.id)).length;
            const color = getSubjectColor(subject.id);
            const Icon = BookCopy;
            return (
              <Card key={subject.id} className="p-3.5 sm:p-4 transition-colors hover:border-slate-300">
                <button type="button" onClick={() => handleSubjectChange(subject.id as SubjectId)} className="group w-full flex items-center gap-4 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2">
                  <div className={`w-12 h-12 rounded-xl ${color.tint} flex items-center justify-center shrink-0 transition-transform group-hover:scale-[1.03]`}>
                    {Icon && <Icon className={`w-6 h-6 ${color.text}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm sm:text-base break-words ${color.text}`}>{subject.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      {topics.length > 0 ? <span className="text-muted text-xs">{topics.length} {subject.id === 'cgei-data-science' ? 'lessons' : 'topics'}</span> : hasOverview ? <span className="text-muted text-xs">Domain overview</span> : null}
                      {topics.length > 0 ? <span className={`text-xs font-medium ${color.text}`}>{studied}/{topics.length} studied</span> : hasOverview ? <span className={`text-xs font-medium ${color.text}`}>Orientation</span> : null}
                    </div>
                    {topics.length > 0 && <div className="mt-2"><ProgressBar value={Math.round((studied / topics.length) * 100)} colorClass={getSubjectColor(subject.id).bar} /></div>}
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Card>
            );
          })}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ScreenHeader
        title="Learn"
        subtitle="Read new material or revisit what you've seen."
      />

      <div className="mb-3 sm:mb-6">
        <SubjectSelector value={activeSubject} onChange={handleSubjectChange} showAllOption />
      </div>

      {!hasContent ? (
        <Card className="p-8">
          <EmptyState title={`No content for ${subjectTitle} yet`} message="Try selecting a different subject or use All Subjects." icon={<GraduationCap className="w-12 h-12" />} />
        </Card>
      ) : (
        <>
          {/* Continue Learning card */}
          {continueTopic && (() => {
            const contColor = getSubjectColor(subjectId as string);
            return (
            <ActionCard className="mb-3 sm:mb-6" borderColorClass={contColor.borderLeft}>
              <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${contColor.text}`}>Continue Learning</p>
              <p className="text-lg sm:text-xl font-bold leading-snug text-ink mb-1 break-words">{continueTopic.title}</p>
              <p className="text-muted text-sm mb-1">Section: {sectionMap[continueTopic.sectionId]?.title ?? continueTopic.sectionId}</p>
              <p className="text-muted text-xs mb-4">
                {data.studiedTopics.includes(continueTopic.id) ? '100% read' : '0% read'}
              </p>
              <Button size="lg" onClick={() => navigate({ screen: 'topic', topicId: continueTopic.id })}>
                Continue Reading <ArrowRight className="w-4 h-4" />
              </Button>
            </ActionCard>
            );
          })()}

          {/* Featured links */}
          {subjectId === 'meteo-climatology' && (
            <button
              type="button"
              onClick={() => navigate({ screen: 'section', sectionId: 'METEO-09' })}
              className={`w-full flex items-center gap-4 p-card-pad rounded-card border ${meteoColor.borderLeft} ${meteoColor.tint} hover:bg-brand-50 transition-colors text-left mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2`}
            >
              <div className={`w-12 h-12 rounded-btn bg-white flex items-center justify-center shrink-0 ${meteoColor.text}`}><MapIcon className="w-6 h-6" aria-hidden /></div>
              <div className="flex-1">
                <p className="font-semibold text-card-title text-ink">Pakistan Climate</p>
                <p className="text-muted text-body-sm">7 topics covering climate zones, monsoon patterns, and climate change</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted shrink-0" aria-hidden />
            </button>
          )}

          {(showFormulaVault || subjectId === 'meteo-climatology') && (
            <div className={`grid gap-2 sm:gap-3 mb-3 sm:mb-6 ${subjectId === 'meteo-climatology' ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {showFormulaVault && (
                <button onClick={() => navigate({ screen: 'formulas' })} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-left">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0"><Calculator className="w-5 h-5 text-muted" /></div>
                  <div className="min-w-0"><p className="font-semibold text-ink text-sm">Formula Vault</p><p className="text-muted text-xs">All formulas in {subjectTitle}</p></div>
                </button>
              )}
              {subjectId === 'meteo-climatology' && (
                <button onClick={() => navigate({ screen: 'cloud-atlas' })} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-left">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0"><Cloud className="w-5 h-5 text-muted" /></div>
                  <div className="min-w-0"><p className="font-semibold text-ink text-sm">Cloud Atlas</p><p className="text-muted text-xs">10 cloud genera</p></div>
                </button>
              )}
            </div>
          )}

          {roadmapTopicId && !roadmapTopic && subjectTopics.length === 0 && (
            <Card className="mb-4 sm:mb-6 p-4 border border-slate-200">
              <div className="flex items-center gap-3"><LoadingSpinner /><p className="text-sm text-muted">Loading domain orientation…</p></div>
            </Card>
          )}

          {/* Supporting orientation — collapsed by default; full content when expanded */}
          {(roadmapTopic || curriculumSubject) && (
            <Card className="mb-3 p-3 sm:p-4 border border-slate-200 bg-slate-50/50">
              <details>
                <summary className="cursor-pointer list-none flex items-center justify-between gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2">
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">
                      {curriculumSubject ? 'Before you begin' : 'Domain orientation'}
                    </span>
                    <span className="block text-xs text-muted mt-0.5">
                      {curriculumSubject
                        ? `${curriculumSubject.subtitle} · ${curriculumUnits.length} units · expand for goals and how to study`
                        : `Context for ${subjectTitle} · expand for orientation notes`}
                    </span>
                  </span>
                  <ChevronDown className="w-4 h-4 shrink-0 text-muted" aria-hidden />
                </summary>
                <div className="pt-4 space-y-5 border-t border-slate-200 mt-3">
                  {curriculumSubject && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-success-700 mb-1">This subject</p>
                      <h2 className="text-base font-bold text-ink">{curriculumSubject.subtitle}</h2>
                      <p className="text-sm text-muted leading-relaxed mt-2">{curriculumSubject.overview}</p>
                      {curriculumSubject.purpose ? (
                        <p className="text-sm text-muted leading-relaxed mt-2"><span className="font-semibold text-ink">Why it matters. </span>{curriculumSubject.purpose}</p>
                      ) : null}
                      {curriculumSubject.audience ? (
                        <p className="text-sm text-muted leading-relaxed mt-2"><span className="font-semibold text-muted">Who it is for. </span>{curriculumSubject.audience}</p>
                      ) : null}
                      {curriculumSubject.prerequisites?.length ? (
                        <div className="mt-3">
                          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">Prerequisites and connections</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted">
                            {curriculumSubject.prerequisites.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      {curriculumUnits.length > 0 ? (
                        <div className="mt-3">
                          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">How the subject is organised</h3>
                          <p className="text-sm text-muted mb-2">Study the units below in order. Each unit groups related lessons, practice, and checks.</p>
                          <ol className="list-decimal pl-5 space-y-1 text-sm text-muted">
                            {curriculumUnits.map((unit) => (
                              <li key={unit.id}><span className="font-medium text-ink">{unit.code}</span> — {unit.title}</li>
                            ))}
                          </ol>
                        </div>
                      ) : null}
                      {curriculumSubject.outcomes?.length ? (
                        <div className="mt-3">
                          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">What you will be able to do</h3>
                          <ul className="space-y-1.5">
                            {curriculumSubject.outcomes.slice(0, 12).map((outcome) => (
                              <li key={outcome.id} className="text-sm text-muted flex gap-2">
                                <span className="text-success-700 font-bold">•</span><span>{outcome.statement}</span>
                              </li>
                            ))}
                            {curriculumSubject.outcomes.length > 12 ? (
                              <li className="text-xs text-muted">…and {curriculumSubject.outcomes.length - 12} further outcomes across the units.</li>
                            ) : null}
                          </ul>
                        </div>
                      ) : null}
                      <p className="mt-3 text-xs text-muted">Orientation is context only. It is not counted as a lesson or mastery item.</p>
                    </div>
                  )}
                  {roadmapTopic && (
                    <div className={curriculumSubject ? 'pt-2 border-t border-slate-100' : ''}>
                      {curriculumSubject ? (
                        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 mb-2">Domain context</p>
                      ) : (
                        <>
                          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 mb-1">Domain orientation</p>
                          <h2 className="text-base font-bold text-ink">{subjectTitle}</h2>
                        </>
                      )}
                      {roadmapTopic.definition && <p className="text-sm text-muted leading-relaxed mt-1">{roadmapTopic.definition}</p>}
                      {roadmapTopic.explanationSections?.map((section) => (
                        <div key={section.heading} className="mt-3">
                          <h3 className="text-sm font-semibold text-ink">{section.heading}</h3>
                          <p className="text-sm text-muted leading-relaxed mt-1">{section.body}</p>
                        </div>
                      ))}
                      {roadmapTopic.keyFacts?.length ? (
                        <div className="mt-3">
                          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">Orientation notes</h3>
                          <ul className="space-y-1.5">{roadmapTopic.keyFacts.map((fact) => <li key={fact} className="text-sm text-muted flex gap-2"><span className="text-brand-700 font-bold">•</span><span>{fact}</span></li>)}</ul>
                        </div>
                      ) : null}
                      {roadmapTopic.examPoints?.length ? (
                        <div className="mt-3">
                          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">Learning principles</h3>
                          <ul className="space-y-1.5">{roadmapTopic.examPoints.map((point) => <li key={point} className="text-sm text-muted flex gap-2"><span className="text-brand-700 font-bold">•</span><span>{point}</span></li>)}</ul>
                        </div>
                      ) : null}
                      {!curriculumSubject && subjectTopics.length === 0 && (
                        <p className="mt-3 rounded-lg border border-brand-100 bg-white/80 p-3 text-xs text-muted">
                          Structured lessons for this domain are being migrated progressively. This overview is not counted as a lesson or mastery item.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </details>
            </Card>
          )}

          {/* Primary learning path: canonical units */}
          {curriculumSubject && (
            <Card className="mb-3 p-3.5 sm:p-5 border border-success-200 bg-white">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-ink">Learning path</h3>
                  <p className="text-xs text-muted mt-0.5">
                    {curriculumLessons.length > 0
                      ? `${studiedCurriculumLessonCount} of ${curriculumLessons.length} lessons marked studied · follow units in order`
                      : 'Units registered · lessons still being integrated'}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {curriculumUnits.map((unit) => {
                  const hasSubstantiveContent = unit.lessonIds.some((lessonId) => {
                    const lesson = cgeiCurriculum.lessons.find((item) => item.id === lessonId);
                    return lesson ? hasSubstantiveLessonContent(lesson) : false;
                  });
                  const readiness = getLearnerReadinessPresentation(unit.readiness, hasSubstantiveContent);
                  return (
                    <Button
                      key={unit.id}
                      type="button"
                      variant="secondary"
                      onClick={() => navigate({ screen: 'curriculum-unit', unitId: unit.id })}
                      className="w-full justify-start rounded-xl bg-slate-50/80 p-3 text-left"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-bold text-success-700 w-10 shrink-0 pt-0.5">{unit.code}</span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-sm text-ink">{unit.title}</span>
                            {readiness.tone !== 'ready' && <Badge color={readiness.tone === 'preview' ? 'amber' : 'slate'}>{readiness.label}</Badge>}
                          </span>
                          <span className="block text-xs text-muted leading-relaxed mt-1">{unit.summary}</span>
                          <span className="block text-xs text-muted mt-1">{unit.lessonIds.length ? `${unit.lessonIds.length} lessons` : 'Lessons not yet integrated'}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-success-700 shrink-0 mt-1" />
                      </div>
                    </Button>
                  );
                })}
              </div>
              {curriculumSubject.projectIds.map((projectId) => {
                const project = cgeiCurriculum.projects.find((item) => item.id === projectId);
                if (!project) return null;
                return (
                  <div key={project.id} className="mt-4 rounded-xl border border-brand-200 bg-brand-50/70 p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-brand-800 shrink-0">Project</span>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-ink">{project.title}</p>
                        <p className="text-xs text-muted mt-1">{project.purpose}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {lastCurriculumLesson && (
                <Button type="button" variant="secondary" onClick={() => navigate({ screen: 'curriculum-lesson', lessonId: lastCurriculumLesson.id })} className="w-full mt-4 justify-start rounded-xl border-brand-200 bg-brand-50 p-3 text-left">
                  <span className="text-label font-semibold uppercase tracking-wide text-brand-700">Resume</span>
                  <span className="flex items-center justify-between gap-3 mt-1"><span className="font-semibold text-sm text-ink">{lastCurriculumLesson.title}</span><ChevronRight className="w-4 h-4 text-brand-700 shrink-0" /></span>
                </Button>
              )}
            </Card>
          )}

          {/* Legacy Section → Topic path only when this subject has no canonical unit path yet */}
          {subjectSections.length > 0 && !(curriculumSubject && curriculumUnits.length > 0) && (
          <Card className="p-3.5 sm:p-5 mb-3 sm:mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-ink">
                {subjectId?.startsWith('cgei-') ? 'Topic groups' : 'Sections'}
              </h3>
              <span className="text-muted text-sm">{subjectSections.length}</span>
            </div>
            <div className="space-y-2">
              {subjectSections.map((section) => {
                const sectionTopics = topicsBySection(section.id).filter((topic) => !isCgeiOverviewTopic(topic.id));
                const studiedInSection = sectionTopics.filter((t) => data.studiedTopics.includes(t.id)).length;
                const masteredInSection = sectionTopics.filter((t) => {
                  const p = data.topicProgress[t.id];
                  const studied = data.studiedTopics.includes(t.id);
                  return getTopicStatusFromProgress(studied, p) === 'mastered';
                }).length;
                const isExpanded = expandedSection === section.id;
                return (
                  <div key={section.id}>
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={`section-topics-${section.id}`}
                      onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-inset"
                    >
                      <SectionBadge section={section} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-ink text-sm break-words">{section.title}</p>
                        <p className="text-muted text-xs mt-0.5">{sectionTopics.length} {section.subjectId === 'cgei-data-science' ? 'lessons' : 'topics'} · {studiedInSection} studied · {masteredInSection} mastered</p>
                      </div>
                      {isExpanded ? <ChevronDown className="w-5 h-5 text-muted shrink-0" /> : <ChevronRight className="w-5 h-5 text-muted shrink-0" />}
                    </button>
                    {isExpanded && (
                      <div id={`section-topics-${section.id}`} className="ml-12 pl-3 pr-1 py-1 space-y-1">
                        {sectionTopics.map((topic) => {
                          const p = data.topicProgress[topic.id];
                          const studied = data.studiedTopics.includes(topic.id);
                          const status = getTopicStatusFromProgress(studied, p);
                          const statusLabel = status === 'mastered' ? 'mastered' : status === 'studied' ? 'studied' : 'not started';
                          return (
                            <button
                              key={topic.id}
                              type="button"
                              onClick={() => navigate({ screen: 'topic', topicId: topic.id })}
                              className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-inset"
                            >
                              <TopicStatusIcon status={status} />
                              <span className="min-w-0 flex-1 break-words whitespace-normal text-muted text-sm font-medium">{topic.title}</span>
                              {topic.postRestriction === 'bs17' && (
                                <span className="text-xs font-medium px-2 py-0.5 rounded bg-warning-100 text-warning-700 border border-warning-200 shrink-0">BS-17</span>
                              )}
                              <span className="text-muted text-xs shrink-0">{statusLabel}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
          )}

          {/* Stats footer */}
          {subjectTopics.length > 0 && (
            <p className="text-muted text-sm text-center">
              {subjectTopics.filter((t) => data.studiedTopics.includes(t.id)).length} / {subjectTopics.length} topics studied · {Math.round((subjectTopics.filter((t) => data.studiedTopics.includes(t.id)).length / subjectTopics.length) * 100)}% complete
            </p>
          )}
        </>
      )}
    </PageContainer>
  );
}

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
