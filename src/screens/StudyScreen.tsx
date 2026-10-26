import { useState, useEffect, useMemo } from 'react';
import { BookOpen, ChevronRight, ChevronLeft, ChevronDown, Cloud, Calculator, MapIcon, GraduationCap, ArrowRight, AlertTriangle, BookCopy, Star, XCircle } from 'lucide-react';
import { useRouter } from '@/router';
import { useSubjectData } from '@/hooks/useSubjectData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { SubjectSelector, type SubjectFilterValue } from '@/components/subject/SubjectSelector';
import { useData } from '@/hooks/useData';
import { subjects, subjectMap } from '@/data/subjects';
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
import type { SubjectId, Topic, Question, MethodChooser } from '@/types';
import type { CurriculumLesson } from '@/types/curriculum';
import type { QuantFormulaEntry } from '@/components/study/TopicContentBlocks';
import { AiTutorChat } from '@/components/AiTutorChat';
import { buildTopicContext, buildStudentContext, consumePendingExplain } from '@/lib/ai-tutor';
import { isTopicMastered } from '@/lib/attention';
import { getTopicStatusFromProgress } from '@/lib/constants';
import { selectContinueLearningTopic } from '@/lib/continue-learning';
import {
  IdiomGroupsBlock,
  SubstitutionGroupsBlock,
  VocabularyGroupsBlock,
  PrefixGroupsBlock,
  SuffixGroupsBlock,
  RootGroupsBlock,
  GrammarRulesBlock,
  SubtopicsBlock,
  QuantFormulasBlock,
  ComparisonTableBlock,
} from '@/components/study/TopicContentBlocks';

// ---- Learn Landing ----
export function StudyScreen() {
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
                      {topics.length > 0 ? <span className="text-slate-500 text-xs">{topics.length} {subject.id === 'cgei-data-science' ? 'lessons' : 'topics'}</span> : hasOverview ? <span className="text-slate-500 text-xs">Domain overview</span> : null}
                      {topics.length > 0 ? <span className={`text-xs font-medium ${color.text}`}>{studied}/{topics.length} studied</span> : hasOverview ? <span className={`text-xs font-medium ${color.text}`}>Orientation</span> : null}
                    </div>
                    {topics.length > 0 && <div className="mt-2"><ProgressBar value={Math.round((studied / topics.length) * 100)} colorClass={getSubjectColor(subject.id).bar} /></div>}
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 transition-transform group-hover:translate-x-0.5" />
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
              <p className="text-lg sm:text-xl font-bold leading-snug text-slate-900 mb-1 break-words">{continueTopic.title}</p>
              <p className="text-slate-500 text-sm mb-1">Section: {sectionMap[continueTopic.sectionId]?.title ?? continueTopic.sectionId}</p>
              <p className="text-slate-400 text-xs mb-4">
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
                <p className="font-semibold text-card-title text-slate-900">Pakistan Climate</p>
                <p className="text-slate-700 text-body-sm">7 topics covering climate zones, monsoon patterns, and climate change</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500 shrink-0" aria-hidden />
            </button>
          )}

          {(showFormulaVault || subjectId === 'meteo-climatology') && (
            <div className={`grid gap-2 sm:gap-3 mb-3 sm:mb-6 ${subjectId === 'meteo-climatology' ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {showFormulaVault && (
                <button onClick={() => navigate({ screen: 'formulas' })} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-left">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0"><Calculator className="w-5 h-5 text-slate-700" /></div>
                  <div className="min-w-0"><p className="font-semibold text-slate-900 text-sm">Formula Vault</p><p className="text-slate-500 text-xs">All formulas in {subjectTitle}</p></div>
                </button>
              )}
              {subjectId === 'meteo-climatology' && (
                <button onClick={() => navigate({ screen: 'cloud-atlas' })} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-left">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0"><Cloud className="w-5 h-5 text-slate-700" /></div>
                  <div className="min-w-0"><p className="font-semibold text-slate-900 text-sm">Cloud Atlas</p><p className="text-slate-500 text-xs">10 cloud genera</p></div>
                </button>
              )}
            </div>
          )}

          {roadmapTopicId && !roadmapTopic && subjectTopics.length === 0 && (
            <Card className="mb-4 sm:mb-6 p-4 border border-slate-200">
              <div className="flex items-center gap-3"><LoadingSpinner /><p className="text-sm text-slate-600">Loading domain orientation…</p></div>
            </Card>
          )}

          {/* Supporting orientation — collapsed by default; full content when expanded */}
          {(roadmapTopic || curriculumSubject) && (
            <Card className="mb-3 p-3 sm:p-4 border border-slate-200 bg-slate-50/50">
              <details>
                <summary className="cursor-pointer list-none flex items-center justify-between gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2">
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-900">
                      {curriculumSubject ? 'Before you begin' : 'Domain orientation'}
                    </span>
                    <span className="block text-xs text-slate-500 mt-0.5">
                      {curriculumSubject
                        ? `${curriculumSubject.subtitle} · ${curriculumUnits.length} units · expand for goals and how to study`
                        : `Context for ${subjectTitle} · expand for orientation notes`}
                    </span>
                  </span>
                  <ChevronDown className="w-4 h-4 shrink-0 text-slate-500" aria-hidden />
                </summary>
                <div className="pt-4 space-y-5 border-t border-slate-200 mt-3">
                  {curriculumSubject && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-success-700 mb-1">This subject</p>
                      <h2 className="text-base font-bold text-slate-900">{curriculumSubject.subtitle}</h2>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2">{curriculumSubject.overview}</p>
                      {curriculumSubject.purpose ? (
                        <p className="text-sm text-slate-700 leading-relaxed mt-2"><span className="font-semibold text-slate-800">Why it matters. </span>{curriculumSubject.purpose}</p>
                      ) : null}
                      {curriculumSubject.audience ? (
                        <p className="text-sm text-slate-600 leading-relaxed mt-2"><span className="font-semibold text-slate-700">Who it is for. </span>{curriculumSubject.audience}</p>
                      ) : null}
                      {curriculumSubject.prerequisites?.length ? (
                        <div className="mt-3">
                          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Prerequisites and connections</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                            {curriculumSubject.prerequisites.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      {curriculumUnits.length > 0 ? (
                        <div className="mt-3">
                          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">How the subject is organised</h3>
                          <p className="text-sm text-slate-600 mb-2">Study the units below in order. Each unit groups related lessons, practice, and checks.</p>
                          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
                            {curriculumUnits.map((unit) => (
                              <li key={unit.id}><span className="font-medium text-slate-800">{unit.code}</span> — {unit.title}</li>
                            ))}
                          </ol>
                        </div>
                      ) : null}
                      {curriculumSubject.outcomes?.length ? (
                        <div className="mt-3">
                          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">What you will be able to do</h3>
                          <ul className="space-y-1.5">
                            {curriculumSubject.outcomes.slice(0, 12).map((outcome) => (
                              <li key={outcome.id} className="text-sm text-slate-700 flex gap-2">
                                <span className="text-success-700 font-bold">•</span><span>{outcome.statement}</span>
                              </li>
                            ))}
                            {curriculumSubject.outcomes.length > 12 ? (
                              <li className="text-xs text-slate-500">…and {curriculumSubject.outcomes.length - 12} further outcomes across the units.</li>
                            ) : null}
                          </ul>
                        </div>
                      ) : null}
                      <p className="mt-3 text-xs text-slate-500">Orientation is context only. It is not counted as a lesson or mastery item.</p>
                    </div>
                  )}
                  {roadmapTopic && (
                    <div className={curriculumSubject ? 'pt-2 border-t border-slate-100' : ''}>
                      {curriculumSubject ? (
                        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 mb-2">Domain context</p>
                      ) : (
                        <>
                          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 mb-1">Domain orientation</p>
                          <h2 className="text-base font-bold text-slate-900">{subjectTitle}</h2>
                        </>
                      )}
                      {roadmapTopic.definition && <p className="text-sm text-slate-700 leading-relaxed mt-1">{roadmapTopic.definition}</p>}
                      {roadmapTopic.explanationSections?.map((section) => (
                        <div key={section.heading} className="mt-3">
                          <h3 className="text-sm font-semibold text-slate-900">{section.heading}</h3>
                          <p className="text-sm text-slate-700 leading-relaxed mt-1">{section.body}</p>
                        </div>
                      ))}
                      {roadmapTopic.keyFacts?.length ? (
                        <div className="mt-3">
                          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Orientation notes</h3>
                          <ul className="space-y-1.5">{roadmapTopic.keyFacts.map((fact) => <li key={fact} className="text-sm text-slate-700 flex gap-2"><span className="text-brand-700 font-bold">•</span><span>{fact}</span></li>)}</ul>
                        </div>
                      ) : null}
                      {roadmapTopic.examPoints?.length ? (
                        <div className="mt-3">
                          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Learning principles</h3>
                          <ul className="space-y-1.5">{roadmapTopic.examPoints.map((point) => <li key={point} className="text-sm text-slate-700 flex gap-2"><span className="text-brand-700 font-bold">•</span><span>{point}</span></li>)}</ul>
                        </div>
                      ) : null}
                      {!curriculumSubject && subjectTopics.length === 0 && (
                        <p className="mt-3 rounded-lg border border-brand-100 bg-white/80 p-3 text-xs text-slate-600">
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
                  <h3 className="text-sm font-semibold text-slate-900">Learning path</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {curriculumLessons.length > 0
                      ? `${studiedCurriculumLessonCount} of ${curriculumLessons.length} lessons marked studied · follow units in order`
                      : 'Units registered · lessons still being integrated'}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {curriculumUnits.map((unit) => (
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
                          <span className="font-semibold text-sm text-slate-900">{unit.title}</span>
                          <Badge color={unit.readiness === 'review' ? 'amber' : unit.readiness === 'outlined' ? 'sky' : 'slate'}>{unit.readiness}</Badge>
                        </span>
                        <span className="block text-xs text-slate-600 leading-relaxed mt-1">{unit.summary}</span>
                        <span className="block text-xs text-slate-400 mt-1">{unit.lessonIds.length ? `${unit.lessonIds.length} lessons` : 'Lessons not yet integrated'}</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-success-700 shrink-0 mt-1" />
                    </div>
                  </Button>
                ))}
              </div>
              {curriculumSubject.projectIds.map((projectId) => {
                const project = cgeiCurriculum.projects.find((item) => item.id === projectId);
                if (!project) return null;
                return (
                  <div key={project.id} className="mt-4 rounded-xl border border-violet-200 bg-violet-50/70 p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-violet-800 shrink-0">Project</span>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-slate-900">{project.title}</p>
                        <p className="text-xs text-slate-600 mt-1">{project.purpose}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {lastCurriculumLesson && (
                <Button type="button" variant="secondary" onClick={() => navigate({ screen: 'curriculum-lesson', lessonId: lastCurriculumLesson.id })} className="w-full mt-4 justify-start rounded-xl border-brand-200 bg-brand-50 p-3 text-left">
                  <span className="text-label font-semibold uppercase tracking-wide text-brand-700">Resume</span>
                  <span className="flex items-center justify-between gap-3 mt-1"><span className="font-semibold text-sm text-slate-900">{lastCurriculumLesson.title}</span><ChevronRight className="w-4 h-4 text-brand-700 shrink-0" /></span>
                </Button>
              )}
            </Card>
          )}

          {/* Legacy Section → Topic path only when this subject has no canonical unit path yet */}
          {subjectSections.length > 0 && !(curriculumSubject && curriculumUnits.length > 0) && (
          <Card className="p-3.5 sm:p-5 mb-3 sm:mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">
                {subjectId?.startsWith('cgei-') ? 'Topic groups' : 'Sections'}
              </h3>
              <span className="text-slate-400 text-sm">{subjectSections.length}</span>
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
                        <p className="font-medium text-slate-900 text-sm break-words">{section.title}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{sectionTopics.length} {section.subjectId === 'cgei-data-science' ? 'lessons' : 'topics'} · {studiedInSection} studied · {masteredInSection} mastered</p>
                      </div>
                      {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" /> : <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />}
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
                              <span className="min-w-0 flex-1 break-words whitespace-normal text-slate-700 text-sm font-medium">{topic.title}</span>
                              {topic.postRestriction === 'bs17' && (
                                <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-100 text-amber-700 border border-amber-200 shrink-0">BS-17</span>
                              )}
                              <span className="text-slate-400 text-xs shrink-0">{statusLabel}</span>
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
            <p className="text-slate-500 text-sm text-center">
              {subjectTopics.filter((t) => data.studiedTopics.includes(t.id)).length} / {subjectTopics.length} topics studied · {Math.round((subjectTopics.filter((t) => data.studiedTopics.includes(t.id)).length / subjectTopics.length) * 100)}% complete
            </p>
          )}
        </>
      )}
    </PageContainer>
  );
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
        <h1 className="text-page-title sm:text-page-title-lg font-semibold text-slate-900 tracking-tight leading-tight">{section.title}</h1>
        <p className="text-slate-600 mt-1 text-body-sm">{section.topicCount} {section.subjectId === 'cgei-data-science' ? 'lessons' : 'topics'}</p>
      </div>
      {curriculumUnit && (
        <Card className="mb-5 p-card-pad sm:p-card-pad-lg border border-success-100 bg-teal-50/30">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold text-slate-900">Unit learning plan</h2>
            <button type="button" onClick={() => navigate({ screen: 'curriculum-unit', unitId: curriculumUnit.id })} className="text-xs font-semibold text-success-700 hover:underline">Open unit workspace <span aria-hidden="true">→</span></button>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed mt-1">{curriculumUnit.summary}</p>
          {curriculumUnit.outcomes.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Learning outcomes</h3>
              <ul className="space-y-2">
                {curriculumUnit.outcomes.map((outcome) => (
                  <li key={outcome.id} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="rounded-md bg-white border border-success-100 px-1.5 py-0.5 text-label font-bold text-success-700 shrink-0">{outcome.level}</span>
                    <span>{outcome.statement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {unitActivities.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Practice activities</h3>
              <div className="space-y-2">
                {unitActivities.map((activity) => (
                  <div key={activity.id} className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">{activity.title}</span>
                      <span className="rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-label font-semibold">{activity.level}</span>
                      {activity.estimatedMinutes && <span className="text-label text-slate-500">~{activity.estimatedMinutes} min</span>}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{activity.instructions}</p>
                    {activity.expectedEvidence?.length ? <p className="text-xs text-success-700 mt-2"><span className="font-semibold">Evidence:</span> {activity.expectedEvidence.join(' · ')}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {unitAssessments.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Checks and assessments</h3>
                <ul className="space-y-2">
                  {unitAssessments.map((assessment) => (
                    <li key={assessment.id} className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="font-medium text-sm text-slate-900">{assessment.title}</p>
                      <p className="text-xs text-slate-600 mt-1">{assessment.purpose}</p>
                      {assessment.passThreshold !== undefined && <p className="text-xs text-slate-500 mt-1">Target: {Math.round(assessment.passThreshold * 100)}%</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {unitDeliverables.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Portfolio evidence</h3>
                <ul className="space-y-2">
                  {unitDeliverables.map((deliverable) => (
                    <li key={deliverable.id} className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="font-medium text-sm text-slate-900">{deliverable.title}</p>
                      <p className="text-xs text-slate-600 mt-1">{deliverable.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {unitResources.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Supporting references</h3>
                <ul className="space-y-2">
                  {unitResources.map((resource) => (
                    <li key={resource.id} className="rounded-lg border border-slate-200 bg-white p-3">
                      {resource.url ? (
                        <a href={resource.url} target="_blank" rel="noreferrer" className="font-medium text-sm text-success-700 hover:underline">{resource.title}</a>
                      ) : <p className="font-medium text-sm text-slate-900">{resource.title}</p>}
                      <p className="text-xs text-slate-600 mt-1">{resource.purpose}</p>
                      {resource.authorOrPublisher && <p className="text-label text-slate-400 mt-1">{resource.authorOrPublisher} · checked {resource.accessedOn ?? 'date not recorded'}</p>}
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
                <span className="text-slate-400 text-xs font-bold w-6 shrink-0">{topic.order}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-sm sm:text-base leading-snug">{topic.title}</p>
                  {(() => {
                    const lesson = cgeiCurriculum.lessons.find((item) => item.sourceTopicId === topic.id);
                    return (
                      <span className="text-xs text-slate-500">
                        {lesson ? `${lesson.level} · ~${lesson.estimatedMinutes ?? 0} min · ${lesson.readiness}` : topic.content ? 'Content available' : 'Content coming soon'}
                      </span>
                    );
                  })()}
                </div>
                <TopicStatusIcon status={status} />
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </button>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}

// ---- Topic Reader ----
export function TopicScreen({ topicId }: { topicId: string }) {
  const { navigate } = useRouter();
  const { data, markStudied, setLastTopic } = useData();
  const meta = getTopic(topicId);
  const [topic, setTopic] = useState<Topic | undefined>(meta);
  const [topicQuestions, setTopicQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set([0]));
  const [expandedSubGroups, setExpandedSubGroups] = useState<Set<number>>(new Set([0]));
  const [expandedVocabGroups, setExpandedVocabGroups] = useState<Set<number>>(new Set([0]));
  const [expandedPrefixGroups, setExpandedPrefixGroups] = useState<Set<number>>(new Set([0]));
  const [expandedSuffixGroups, setExpandedSuffixGroups] = useState<Set<number>>(new Set([0]));
  const [expandedRootGroups, setExpandedRootGroups] = useState<Set<number>>(new Set([0]));
  const [expandedGrammarGroups, setExpandedGrammarGroups] = useState<Set<number>>(new Set([0]));
  const [expandedSubtopics, setExpandedSubtopics] = useState<Set<number>>(new Set([0]));
  const [pendingExplain, setPendingExplain] = useState<string | null>(null);
  const [autoOpenTutor, setAutoOpenTutor] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [topicId]);

  // Consume one-shot "explain my mistake" payload from quiz results
  useEffect(() => {
    const payload = consumePendingExplain(topicId);
    if (payload?.message) {
      setPendingExplain(payload.message);
      setAutoOpenTutor(true);
    } else {
      setPendingExplain(null);
      setAutoOpenTutor(false);
    }
  }, [topicId]);

  useEffect(() => { setLastTopic(topicId); }, [topicId, setLastTopic]);

  const toggleSet = (setter: React.Dispatch<React.SetStateAction<Set<number>>>) => (idx: number) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(false);
    getTopicAsync(topicId).then((t) => {
      if (cancelled) return;
      setTopic(t);
      setLoading(false);
      if (t?.content) {
        loadQuestionsForTopic(topicId).then((qs) => {
          if (!cancelled) setTopicQuestions(qs);
        }).catch(() => {});
      }
    }).catch(() => {
      if (cancelled) return;
      setLoadError(true);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [topicId]);

  if (loading) return <PageContainer><LoadingSpinner label="Loading topic…" /></PageContainer>;
  if (loadError) return (
    <PageContainer>
      <Card className="p-8">
        <EmptyState title="Failed to load" message="Something went wrong while loading this topic." icon={<AlertTriangle className="w-12 h-12" />} />
        <div className="flex justify-center mt-4">
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </Card>
    </PageContainer>
  );
  if (!topic) {
    return (
      <PageContainer>
        <EmptyState
          title="Topic not found"
          message="This topic does not exist or was removed."
          action={<Button variant="secondary" onClick={() => navigate({ screen: 'learn', parent: null })}>Back to Learn</Button>}
        />
      </PageContainer>
    );
  }

  const isStudied = data.studiedTopics.includes(topicId);
  const topicPositionLabel = topic.sectionId === 'CGEI-051' ? `Unit 5.1 · Lesson ${topic.order}` : `Section ${topic.sectionId} · Topic ${topic.order}`;
  const curriculumLesson = cgeiCurriculum.lessons.find((lesson) => lesson.sourceTopicId === topic.id && lesson.content.length > 0);
  const lessonActivities = curriculumLesson
    ? curriculumLesson.activityIds.map((id) => cgeiCurriculum.activities.find((activity) => activity.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item))
    : [];
  const lessonAssessments = curriculumLesson
    ? curriculumLesson.assessmentIds.map((id) => cgeiCurriculum.assessments.find((assessment) => assessment.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item))
    : [];
  const lessonResources = curriculumLesson
    ? curriculumLesson.resourceIds.map((id) => cgeiCurriculum.resources.find((resource) => resource.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item))
    : [];

  if (!topic.content) {
    return (
      <PageContainer>
          <div className="mb-4">
          <span className="text-xs font-bold text-sky-600 bg-sky-100 px-2 py-0.5 rounded">{topicPositionLabel}</span>
          <h1 className="text-page-title sm:text-page-title-lg font-semibold text-slate-900 leading-tight mt-2">{topic.title}</h1>
        </div>
        <Card className="p-8">
          <EmptyState title="Content Coming Soon" message="This topic hasn't been authored yet." icon={<BookOpen className="w-12 h-12" />} />
          <div className="flex justify-center mt-4">
            <Button variant="secondary" onClick={() => navigate({ screen: 'section', sectionId: topic.sectionId })}>Back to Section</Button>
          </div>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-3xl">
      <div className="flex items-center gap-2 mb-4"><BackButton /><Breadcrumbs /></div>
      <div className="mb-6 sm:mb-8">
        <span className="text-xs font-bold text-sky-600 bg-sky-100 px-2 py-0.5 rounded">{topicPositionLabel}</span>
        <h1 className="text-page-title sm:text-page-title-lg font-semibold text-slate-900 leading-tight mt-2">{topic.title}</h1>
        {curriculumLesson && (
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500">
            <span className="rounded-full bg-sky-50 text-brand-700 px-2.5 py-1 font-semibold">{curriculumLesson.level}</span>
            {curriculumLesson.estimatedMinutes ? <span>Estimated time: {curriculumLesson.estimatedMinutes} min</span> : null}
            <span className="capitalize">Content status: {curriculumLesson.readiness}</span>
          </div>
        )}
        {curriculumLesson?.objectives.length ? (
          <section className="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-sky-900 mb-2">By the end of this lesson, you should be able to</h2>
            <ul className="space-y-2">{curriculumLesson.objectives.map((outcome) => (
              <li key={outcome.id} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="rounded bg-white border border-brand-100 px-1.5 py-0.5 text-label font-bold text-brand-700 shrink-0">{outcome.level}</span>
                <span>{outcome.statement}</span>
              </li>
            ))}</ul>
          </section>
        ) : null}
        {isStudied && <span className="inline-flex items-center gap-1 text-success-600 text-sm font-medium mt-2"><BookOpen className="w-4 h-4" /> Studied</span>}
      </div>
      <article className="space-y-6 sm:space-y-8">
        {curriculumLesson ? <CurriculumLessonContent lesson={curriculumLesson} /> : (<>
        {topic.definition && (
          <section>
            <h2 className="font-semibold text-slate-900 text-sm uppercase tracking-wider text-brand-700 mb-2.5">Definition</h2>
            <p className="text-slate-800 text-base sm:text-lg leading-7 sm:leading-8"><MathText text={topic.definition} /></p>
          </section>
        )}
        {topic.keyFacts && topic.keyFacts.length > 0 && (
          <section>
            <h2 className="font-semibold text-slate-900 text-sm uppercase tracking-wider text-slate-500 mb-3">Key Facts</h2>
            <ul className="space-y-2">{topic.keyFacts.map((fact, i) => <li key={i} className="flex items-start gap-2.5 text-slate-700 text-base leading-7"><span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" /><MathText text={fact} /></li>)}</ul>
          </section>
        )}
        {topic.explanationSections && topic.explanationSections.map((sec, i) => (
          <section key={i}>
            <h2 className="font-semibold text-slate-900 text-lg sm:text-xl tracking-tight mb-2.5">{sec.heading}</h2>
            <p className="text-slate-700 text-base leading-7 sm:leading-8"><MathText text={sec.body} /></p>
          </section>
        ))}
        {topic.subtopics && topic.subtopics.length > 0 && (
          <SubtopicsBlock subtopics={topic.subtopics} expandedGroups={expandedSubtopics} onToggleGroup={toggleSet(setExpandedSubtopics)} />
        )}
        {topic.vocabularyGroups && topic.vocabularyGroups.length > 0 && (
          <VocabularyGroupsBlock groups={topic.vocabularyGroups} expandedGroups={expandedVocabGroups} onToggleGroup={toggleSet(setExpandedVocabGroups)} />
        )}
        {topic.prefixGroups && topic.prefixGroups.length > 0 && (
          <PrefixGroupsBlock groups={topic.prefixGroups} expandedGroups={expandedPrefixGroups} onToggleGroup={toggleSet(setExpandedPrefixGroups)} />
        )}
        {topic.suffixGroups && topic.suffixGroups.length > 0 && (
          <SuffixGroupsBlock groups={topic.suffixGroups} expandedGroups={expandedSuffixGroups} onToggleGroup={toggleSet(setExpandedSuffixGroups)} />
        )}
        {topic.rootGroups && topic.rootGroups.length > 0 && (
          <RootGroupsBlock groups={topic.rootGroups} expandedGroups={expandedRootGroups} onToggleGroup={toggleSet(setExpandedRootGroups)} />
        )}
        {topic.grammarRules && topic.grammarRules.length > 0 && (
          <GrammarRulesBlock groups={topic.grammarRules} expandedGroups={expandedGrammarGroups} onToggleGroup={toggleSet(setExpandedGrammarGroups)} />
        )}
        {topic.substitutionGroups && topic.substitutionGroups.length > 0 && (
          <SubstitutionGroupsBlock groups={topic.substitutionGroups} expandedGroups={expandedSubGroups} onToggleGroup={toggleSet(setExpandedSubGroups)} />
        )}
        {topic.idiomGroups && topic.idiomGroups.length > 0 && (
          <IdiomGroupsBlock groups={topic.idiomGroups} expandedGroups={expandedGroups} onToggleGroup={toggleSet(setExpandedGroups)} />
        )}
        {(() => { const raw = topic.formula ?? (topic as Topic & { formulas?: typeof topic.formula }).formulas; if (!raw) return null; const formulas = Array.isArray(raw) ? raw : [raw]; return formulas.map((f, fi) => (
          <Card key={fi} className="p-5 border border-slate-200 bg-white overflow-hidden">
            <div className="flex items-start gap-2.5 mb-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <Calculator className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-label font-semibold uppercase tracking-wide text-slate-500">Formula{formulas.length > 1 ? ` ${fi + 1} of ${formulas.length}` : ''}</p>
                <h3 className="font-semibold text-slate-900 text-sm leading-snug">{f.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">From this topic · {topic.title}</p>
              </div>
            </div>
            <div className="formula-display text-slate-900 text-base sm:text-lg mb-4 text-center py-4 px-3 bg-slate-50 border border-slate-200 rounded-xl overflow-x-auto">
              <MathText text={`$$${f.expression}$$`} />
            </div>
            {(f.variables?.length ?? 0) > 0 && (
              <div className="space-y-2">
                <p className="text-label font-semibold uppercase tracking-wide text-slate-500">Symbols</p>
                {f.variables.map((v, i) => (
                  <div key={i} className="flex items-baseline gap-3 text-sm">
                    <span className="text-slate-900 font-semibold shrink-0 min-w-[3rem]">
                      <MathText text={`$${v.symbol}$`} />
                    </span>
                    <span className="text-slate-600">= {v.meaning}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )); })()}
        {(topic as Topic & { quantFormulas?: unknown[] }).quantFormulas && (topic as Topic & { quantFormulas?: unknown[] }).quantFormulas!.length > 0 && (
          <QuantFormulasBlock formulas={(topic as Topic & { quantFormulas?: QuantFormulaEntry[] }).quantFormulas!} />
        )}
        {topic.examPoints && topic.examPoints.length > 0 && (
          <Card className="p-3.5 sm:p-5 border-l-4 border-l-amber-500 bg-amber-50/50">
            <div className="flex items-center gap-2 mb-3"><span className="text-warning-600 font-semibold text-sm uppercase tracking-wide">Exam Points</span></div>
            <ul className="space-y-2">{topic.examPoints.map((point, i) => <li key={i} className="flex items-start gap-2 text-slate-800 text-base leading-7"><Star className="w-3.5 h-3.5 text-warning-500 mt-0.5 shrink-0 fill-warning-500" /><MathText text={point} /></li>)}</ul>
          </Card>
        )}
        {topic.comparisonTable && <ComparisonTableBlock table={topic.comparisonTable} />}
        {topic.comparisonTableEras && <ComparisonTableBlock table={topic.comparisonTableEras} />}
        {topic.comparisonTableEras2 && <ComparisonTableBlock table={topic.comparisonTableEras2} />}
        {topic.comparisonTableHazards && <ComparisonTableBlock table={topic.comparisonTableHazards} />}
        {topic.comparisonTables?.map((t, i) => <ComparisonTableBlock key={`ct-plural-${i}`} table={t} />)}
        {(() => { const rawEx = topic.workedExample ?? (topic as Topic & { workedExamples?: typeof topic.workedExample }).workedExamples; if (!rawEx) return null; const examples = Array.isArray(rawEx) ? rawEx : [rawEx]; return examples.map((ex, ei) => (
          <Card key={ei} className="p-5 border-l-4 border-l-emerald-500 bg-emerald-50/40">
            <div className="flex items-center gap-2 mb-3"><span className="text-emerald-700 font-semibold text-sm uppercase tracking-wide">Worked Example{examples.length > 1 ? ` ${ei + 1}` : ''}</span></div>
            <div className="space-y-2 sm:space-y-3">
              <div><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Problem</p><p className="text-slate-800 text-base leading-7"><MathText text={ex.problem} /></p></div>
              {ex.solution && typeof ex.solution === 'string' && <div><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Solution</p><p className="text-slate-700 text-base leading-7"><MathText text={ex.solution} /></p></div>}
              {ex.solution && typeof ex.solution === 'object' && <div><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Solution</p><div className="space-y-2">{Object.entries(ex.solution).map(([key, val]) => <div key={key}><p className="text-slate-900 text-sm font-medium"><MathText text={key} /></p><p className="text-slate-600 text-base leading-7"><MathText text={val} /></p></div>)}</div></div>}
              {ex.solutionSteps && <div><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Solution</p><div className="space-y-2">{Object.entries(ex.solutionSteps).map(([key, val]) => <div key={key}><p className="text-slate-900 text-sm font-medium"><MathText text={key} /></p><p className="text-slate-600 text-sm leading-relaxed"><MathText text={val} /></p></div>)}</div></div>}
              {ex.answer && <div className="pt-2 border-t border-emerald-200"><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Answer</p><p className="text-emerald-800 text-base font-semibold"><MathText text={ex.answer} /></p></div>}
              {ex.takeaway && <div className="pt-2 border-t border-emerald-200"><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Takeaway</p><p className="text-emerald-800 text-sm leading-relaxed"><MathText text={ex.takeaway} /></p></div>}
            </div>
          </Card>
        )); })()}
        {topic.commonMistakes && topic.commonMistakes.length > 0 && (
          <Card className="p-3.5 sm:p-5 border-l-4 border-l-rose-500 bg-rose-50/40">
            <div className="flex items-center gap-2 mb-3"><span className="text-rose-700 font-semibold text-sm uppercase tracking-wide">Common Mistakes</span></div>
            <ul className="space-y-2 sm:space-y-3">{topic.commonMistakes.map((mistake, i) => {
              if (typeof mistake === 'string') {
                return <li key={i} className="flex items-start gap-2 text-slate-800 text-base leading-7"><XCircle className="w-3.5 h-3.5 text-danger-500 mt-0.5 shrink-0" /><MathText text={mistake} /></li>;
              }
              const m = mistake as { mistake: string; correction: string; explanation: string };
              return (
                <li key={i} className="text-sm leading-relaxed space-y-1">
                  <div className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-danger-500 mt-0.5 shrink-0" /><span className="text-danger-700 line-through"><MathText text={m.mistake} /></span></div>
                  <div className="flex items-start gap-2 pl-5"><span className="text-success-700 font-medium"><MathText text={m.correction} /></span></div>
                  <p className="pl-5 text-slate-500 text-xs"><MathText text={m.explanation} /></p>
                </li>
              );
            })}</ul>
          </Card>
        )}
        {topic.methodChooser && (() => {
          const chooser = topic.methodChooser;
          const isStepsForm = Array.isArray(chooser) || (chooser as MethodChooser).steps;
          if (isStepsForm) {
            const steps = Array.isArray(chooser) ? chooser : (chooser as MethodChooser).steps!;
            const title = Array.isArray(chooser) ? 'Which method / equation?' : ((chooser as MethodChooser).title ?? 'Which method / equation?');
            const intro = Array.isArray(chooser) ? undefined : (chooser as MethodChooser).intro;
            if (!steps?.length) return null;
            return (
              <Card className="p-3.5 sm:p-5 border-l-4 border-l-sky-500 bg-sky-50/40">
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-2">{title}</h3>
                {intro && <p className="text-slate-600 text-sm mb-3 leading-relaxed"><MathText text={intro} /></p>}
                <ul className="space-y-2">
                  {steps.map((step, i) => {
                    const when = step.when ?? step.condition ?? '';
                    const use = step.use ?? step.recommendation ?? '';
                    return (
                      <li key={i} className="text-sm text-slate-800 leading-relaxed">
                        <span className="font-medium text-brand-700">If </span>
                        <MathText text={when} />
                        <span className="font-medium text-brand-700"> → </span>
                        <MathText text={use} />
                        {step.notes && <span className="block text-slate-500 text-xs mt-0.5"><MathText text={step.notes} /></span>}
                      </li>
                    );
                  })}
                </ul>
              </Card>
            );
          }
          const tc = chooser as { title?: string; root?: string; branches?: Array<{ condition: string; result?: string; branches?: any[] }> };
          if (tc.branches) {
            const renderBranches = (branches: Array<{ condition: string; result?: string; branches?: any[] }>, depth: number) =>
              branches.map((b, i) => (
                <li key={`${depth}-${i}`} className={depth > 0 ? 'pl-4' : ''}>
                  <span className="font-medium text-brand-700">{b.condition}</span>
                  {b.result && <span className="text-slate-700"> → <MathText text={b.result} /></span>}
                  {b.branches && <ul className="space-y-1 mt-1 pl-4 border-l border-brand-200">{renderBranches(b.branches, depth + 1)}</ul>}
                </li>
              ));
            return (
              <Card className="p-3.5 sm:p-5 border-l-4 border-l-sky-500 bg-sky-50/40">
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-2">{tc.title ?? 'Which method / equation?'}</h3>
                {tc.root && <p className="text-slate-600 text-sm mb-3 leading-relaxed"><MathText text={tc.root} /></p>}
                <ul className="space-y-2">{renderBranches(tc.branches, 0)}</ul>
              </Card>
            );
          }
          const mc = chooser as MethodChooser;
          if (!mc.options?.length) return null;
          return (
            <Card className="p-3.5 sm:p-5 border-l-4 border-l-sky-500 bg-sky-50/40">
              <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-2">Which method / equation?</h3>
              {mc.scenario && <p className="text-slate-600 text-sm mb-3 leading-relaxed"><MathText text={mc.scenario} /></p>}
              <div className="space-y-2 sm:space-y-3">
                {mc.options.map((opt, i) => (
                  <div key={i} className="space-y-1">
                    {opt.name && <p className="text-sm font-semibold text-brand-700"><MathText text={opt.name} /></p>}
                    {opt.when && <p className="text-xs text-slate-500 leading-relaxed"><span className="font-medium">When: </span><MathText text={opt.when} /></p>}
                    {opt.steps && <ul className="space-y-1 pl-4">{opt.steps.map((s, si) => <li key={si} className="text-xs text-slate-700 leading-relaxed list-disc"><MathText text={s} /></li>)}</ul>}
                  </div>
                ))}
              </div>
              {mc.recommendation && <p className="mt-3 pt-2 border-t border-brand-200 text-xs text-slate-600 leading-relaxed"><span className="font-medium text-brand-700">Recommendation: </span><MathText text={mc.recommendation} /></p>}
            </Card>
          );
        })()}
        {topic.limitCases && topic.limitCases.length > 0 && (
          <section>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-3">Limit cases</h3>
            <ul className="space-y-2 sm:space-y-3">
              {topic.limitCases.map((lc, i) => {
                if (lc.condition) {
                  return (
                    <li key={i} className="text-sm text-slate-800 leading-relaxed">
                      <span className="font-medium"><MathText text={lc.condition} /></span>
                      <span className="text-slate-500"> → </span>
                      <MathText text={lc.result ?? ''} />
                      {lc.physicalMeaning && <span className="block text-slate-500 text-xs mt-0.5"><MathText text={lc.physicalMeaning} /></span>}
                    </li>
                  );
                }
                return (
                  <li key={i} className="text-sm text-slate-800 leading-relaxed space-y-1">
                    {lc.case && <p className="font-medium text-slate-900"><MathText text={lc.case} /></p>}
                    {lc.example && <p className="text-slate-600 text-xs italic"><MathText text={lc.example} /></p>}
                    {lc.resolution && <p className="text-slate-700"><MathText text={lc.resolution} /></p>}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
        {topic.misconceptionRemediation && topic.misconceptionRemediation.length > 0 && (
          <Card className="p-3.5 sm:p-5 border-l-4 border-l-amber-500 bg-amber-50/40">
            <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-3">Misconceptions</h3>
            <div className="space-y-3 sm:space-y-4">
              {topic.misconceptionRemediation.map((m, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-sm font-medium text-amber-900"><XCircle className="inline w-3.5 h-3.5 text-danger-500 -mt-0.5 mr-1" /><MathText text={m.misconception ?? (m as { name?: string }).name} /></p>
                  {m.whyStudentsThinkIt && <p className="text-xs text-slate-600 leading-relaxed"><span className="font-medium">Why it feels right: </span><MathText text={m.whyStudentsThinkIt} /></p>}
                  {m.correctModel && <p className="text-sm text-slate-800 leading-relaxed"><span className="font-medium text-emerald-700">Correct model: </span><MathText text={m.correctModel} /></p>}
                  {m.remedy && <p className="text-sm text-slate-800 leading-relaxed"><span className="font-medium text-emerald-700">Remedy: </span><MathText text={m.remedy} /></p>}
                  {m.drill && <p className="text-xs text-slate-500 leading-relaxed mt-1 pl-3 border-l-2 border-amber-200"><MathText text={m.drill} /></p>}
                </div>
              ))}
            </div>
          </Card>
        )}
        {topic.qualitativeScenarios && topic.qualitativeScenarios.length > 0 && (
          <Card className="p-3.5 sm:p-5 border-l-4 border-l-violet-500 bg-violet-50/30">
            <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-3">Think it through</h3>
            <div className="space-y-3 sm:space-y-4">
              {topic.qualitativeScenarios.map((q, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-sm font-medium text-slate-900"><MathText text={q.scenario ?? (q as { question?: string }).question ?? ''} /></p>
                  <p className="text-sm text-violet-800"><span className="font-medium">Answer: </span><MathText text={q.answer ?? ''} /></p>
                  <p className="text-xs text-slate-600 leading-relaxed"><MathText text={q.why ?? (q as { reasoning?: string }).reasoning ?? ''} /></p>
                </div>
              ))}
            </div>
          </Card>
        )}
        {Array.isArray(topic.postRestriction) && topic.postRestriction.length > 0 && (
          <Card className="p-3.5 sm:p-5 border-l-4 border-l-rose-400 bg-rose-50/30">
            <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-3">Post-Restriction Rules</h3>
            <div className="space-y-2 sm:space-y-3">
              {topic.postRestriction.map((r, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-sm font-medium text-rose-800"><MathText text={r.rule} /></p>
                  <p className="text-xs text-slate-600 leading-relaxed"><MathText text={r.restriction} /></p>
                  <p className="text-xs text-slate-500 leading-relaxed"><span className="font-medium">Consequence: </span><MathText text={r.consequence} /></p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {(() => {
          const unmastered = (topic.buildsOn ?? [])
            .map((id) => ({ id, topic: getTopic(id) }))
            .filter((x) => x.topic && !isTopicMastered(x.id, data));
          if (unmastered.length === 0) return null;
          return (
            <Card className="p-3 border-amber-200 bg-amber-50/60">
              <h3 className="font-semibold text-amber-900 text-xs mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                Prerequisites not mastered yet
              </h3>
              <p className="text-amber-800/70 text-label mb-2">
                Review these first so this topic sticks.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {unmastered.map(({ id, topic: pt }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => navigate({ screen: 'topic', topicId: id })}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-amber-200 text-amber-900 hover:bg-amber-100 transition-colors"
                  >
                    {pt!.title}
                  </button>
                ))}
              </div>
            </Card>
          );
        })()}
        {(() => {
          const groups: { label: string; ids: string[]; chipClass: string }[] = [];
          if (topic.buildsOn?.length) groups.push({ label: 'Builds On', ids: topic.buildsOn, chipClass: 'bg-green-50 hover:bg-green-100 text-green-700' });
          if (topic.leadsTo?.length) groups.push({ label: 'Leads To', ids: topic.leadsTo, chipClass: 'bg-blue-50 hover:bg-blue-100 text-blue-700' });
          if (topic.usedIn?.length) groups.push({ label: 'Used In', ids: topic.usedIn, chipClass: 'bg-amber-50 hover:bg-amber-100 text-amber-700' });
          if (groups.length === 0) return null;
          return (
            <Card className="p-3">
              <h3 className="font-semibold text-slate-500 text-xs uppercase tracking-wide mb-2">Connected Topics</h3>
              <div className="space-y-2">
                {groups.map((g) => (
                  <div key={g.label}>
                    <p className="text-slate-400 text-label font-medium mb-1">{g.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {g.ids.map((rid) => { const t = getTopic(rid); if (!t) return null; return (
                        <button key={rid} onClick={() => navigate({ screen: 'topic', topicId: rid })} className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${g.chipClass}`}>{t.title}</button>
                      ); })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })()}
        <div className="rounded-2xl border border-brand-100 bg-sky-50/70 p-card-pad sm:p-card-pad-lg">
          <p className="text-sm font-semibold text-slate-900">Finished reading?</p>
          <p className="mt-1 text-sm text-slate-600">Check what stuck, then continue to the next topic when you’re ready.</p>
          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            {topicQuestions.length > 0 && (
              <Button onClick={() => navigate({ screen: 'quiz', mode: 'topic', topicId })} className="min-h-11 flex-1 justify-center">
                Take topic quiz
              </Button>
            )}
            <Button onClick={() => markStudied(topicId)} disabled={isStudied} variant="secondary" className="min-h-11 flex-1 justify-center">
              {isStudied ? 'Marked as read' : 'Mark as read'}
            </Button>
          </div>
        </div>
        {(() => {
          const sectionTopics = topicsBySection(topic.sectionId);
          const subjectId = sectionMap[topic.sectionId]?.subjectId;
          // Research Analysis has one topic per section — chain Next/Previous across sections.
          let ordered = sectionTopics;
          if (subjectId === 'research-analysis') {
            const sectionOrder = new Map(
              sections.filter((s) => s.subjectId === subjectId).map((s, i) => [s.id, i]),
            );
            ordered = topicsBySubject(subjectId).slice().sort((a, b) => {
              const sa = sectionOrder.get(a.sectionId) ?? 999;
              const sb = sectionOrder.get(b.sectionId) ?? 999;
              if (sa !== sb) return sa - sb;
              return a.order - b.order;
            });
          }
          const currentIndex = ordered.findIndex((t) => t.id === topicId);
          const prevTopic = currentIndex > 0 ? ordered[currentIndex - 1] : null;
          const nextTopic = currentIndex >= 0 && currentIndex < ordered.length - 1 ? ordered[currentIndex + 1] : null;
          if (!prevTopic && !nextTopic) return null;
          return (
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200">
              {prevTopic ? (
                <button onClick={() => navigate({ screen: 'topic', topicId: prevTopic.id })} className="flex min-h-touch items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors text-left min-w-0 flex-1 max-w-[48%] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2">
                  <ChevronLeft className="w-5 h-5 text-slate-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 font-medium">Previous</p>
                    <p className="text-sm text-slate-700 font-medium break-words whitespace-normal">{prevTopic.title}</p>
                  </div>
                </button>
              ) : <div className="flex-1 max-w-[48%]" />}
              {nextTopic ? (
                <button onClick={() => navigate({ screen: 'topic', topicId: nextTopic.id })} className="flex min-h-touch items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors text-right min-w-0 flex-1 max-w-[48%] justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2">
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 font-medium">Next</p>
                    <p className="text-sm text-slate-700 font-medium break-words whitespace-normal">{nextTopic.title}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                </button>
              ) : <div className="flex-1 max-w-[48%]" />}
            </div>
          );
        })()}
        </>)}
        {(lessonActivities.length > 0 || lessonAssessments.length > 0 || lessonResources.length > 0) && (
          <section className="space-y-4 pt-5 border-t border-slate-200">
            {lessonActivities.length > 0 && (
              <div>
                <h2 className="font-semibold text-slate-900 mb-2">Practice and application</h2>
                <div className="space-y-2">{lessonActivities.map((activity) => (
                  <Card key={activity.id} className="p-4 border border-slate-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-slate-900 text-sm">{activity.title}</h3>
                      <span className="rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-label font-semibold">{activity.level}</span>
                      {activity.estimatedMinutes ? <span className="text-xs text-slate-500">~{activity.estimatedMinutes} min</span> : null}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed mt-2">{activity.instructions}</p>
                    {activity.expectedEvidence?.length ? <p className="text-xs text-slate-600 mt-2"><span className="font-semibold">Evidence to save:</span> {activity.expectedEvidence.join(' · ')}</p> : null}
                    {activity.hints?.length ? <details className="mt-3"><summary className="cursor-pointer text-xs font-semibold text-brand-700">Hints</summary><ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600">{activity.hints.map((hint, index) => <li key={index}>{hint}</li>)}</ul></details> : null}
                  </Card>
                ))}</div>
              </div>
            )}
            {lessonAssessments.length > 0 && (
              <div>
                <h2 className="font-semibold text-slate-900 mb-2">Knowledge and skill checks</h2>
                <div className="grid sm:grid-cols-2 gap-2">{lessonAssessments.map((assessment) => (
                  <Card key={assessment.id} className="p-4 border border-slate-200">
                    <h3 className="font-medium text-slate-900 text-sm">{assessment.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mt-1">{assessment.purpose}</p>
                    {assessment.passThreshold !== undefined ? <p className="text-xs text-slate-500 mt-2">Target: {Math.round(assessment.passThreshold * 100)}%</p> : null}
                  </Card>
                ))}</div>
              </div>
            )}
            {lessonResources.length > 0 && (
              <div>
                <h2 className="font-semibold text-slate-900 mb-2">Further reading and tools</h2>
                <ul className="space-y-2">{lessonResources.map((resource) => (
                  <li key={resource.id} className="rounded-lg border border-slate-200 bg-white p-3">
                    {resource.url ? <a href={resource.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-brand-700 hover:underline">{resource.title}</a> : <p className="text-sm font-medium text-slate-900">{resource.title}</p>}
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{resource.purpose}</p>
                    {resource.authorOrPublisher ? <p className="text-label text-slate-400 mt-1">{resource.authorOrPublisher}</p> : null}
                  </li>
                ))}</ul>
              </div>
            )}
          </section>
        )}
      </article>
      <AiTutorChat
        topicId={topic.id}
        topicTitle={topic.title}
        topicContext={buildTopicContext(topic)}
        studentContext={buildStudentContext(data, topic.id, topicQuestions)}
        initialMessage={pendingExplain}
        autoOpen={autoOpenTutor}
        onInitialMessageConsumed={() => {
          setPendingExplain(null);
          setAutoOpenTutor(false);
        }}
      />
    </PageContainer>
  );
}
