import { useState, useEffect, useMemo } from 'react';
import { BookOpen, ChevronRight, ChevronLeft, ChevronDown, Cloud, Calculator, MapIcon, GraduationCap, ArrowRight, AlertTriangle, BookCopy, Star, XCircle } from 'lucide-react';
import { useRouter } from '@/router';
import { useSubjectData } from '@/hooks/useSubjectData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { SubjectSelector, type SubjectFilterValue } from '@/components/subject/SubjectSelector';
import { useData } from '@/hooks/useData';
import { subjects, subjectMap } from '@/data/subjects';
import { subjectsForScope } from '@/lib/track-scope';
import { isTrackId } from '@/data/tracks';
import { topicsBySection, getTopic, topicsBySubject } from '@/data/topics';
import { sectionMap, sections } from '@/data/sections';
import { SectionBadge } from '@/components/SectionBadge';
import { getSubjectColor } from '@/data/subject-colors';
import { PageContainer, Card, EmptyState, ProgressBar, ActionCard, TopicStatusIcon, LoadingSpinner, Button, ScreenHeader } from '@/components/ui';
import { MathText } from '@/components/MathText';
import { BackButton, Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getTopicAsync } from '@/data/topics';
import { cgeiCurriculum } from '@/data/cgei/curriculum';
import { loadQuestionsForTopic } from '@/data/lazy-data';
import type { SubjectId, Topic, Question, MethodChooser } from '@/types';
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
  const { navigate } = useRouter();
  const sd = useSubjectData();
  const { getActiveSubject, setActiveSubjectForScreen, activeTrack } = useSubjectSelection();
  const { data, trackMembership } = useData();

  const activeSubject = getActiveSubject('learn');
  const isAllSubjects = activeSubject === 'all';
  const subjectId = isAllSubjects ? 'all' : (activeSubject as SubjectId);

  const subjectSections = isAllSubjects ? [] : sd.sectionsFor(subjectId);
  const subjectTopics = sd.topicsFor(subjectId);
  const hasContent = isAllSubjects || subjectTopics.length > 0;
  const subjectTitle = isAllSubjects ? 'All Subjects' : (subjectMap[subjectId]?.title ?? 'Subject');
  const curriculumSubject = subjectId === 'cgei-data-science'
    ? cgeiCurriculum.subjects.find((item) => item.subjectId === subjectId)
    : undefined;
  const curriculumUnits = curriculumSubject
    ? curriculumSubject.unitIds
        .map((id) => cgeiCurriculum.units.find((unit) => unit.id === id))
        .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit))
        .sort((a, b) => a.order - b.order)
    : [];

  const handleSubjectChange = (value: SubjectFilterValue) => {
    setActiveSubjectForScreen('learn', value);
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
    const subjectsWithContent = trackSubjects.filter((s) => sd.topicsFor(s.id as SubjectId).length > 0);
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
            const studied = topics.filter((t) => data.studiedTopics.includes(t.id)).length;
            const color = getSubjectColor(subject.id);
            const Icon = BookCopy;
            return (
              <Card key={subject.id} className="p-4">
                <button onClick={() => handleSubjectChange(subject.id as SubjectId)} className="w-full flex items-center gap-4 text-left">
                  <div className={`w-12 h-12 rounded-xl ${color.tint} flex items-center justify-center shrink-0`}>
                    {Icon && <Icon className={`w-6 h-6 ${color.text}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm sm:text-base truncate ${color.text}`}>{subject.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-slate-500 text-xs">{topics.length} topics</span>
                      <span className={`text-xs font-medium ${color.text}`}>{studied}/{topics.length} studied</span>
                    </div>
                    <div className="mt-2"><ProgressBar value={topics.length > 0 ? Math.round((studied / topics.length) * 100) : 0} colorClass={getSubjectColor(subject.id).bar} /></div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
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
              <p className="text-lg font-bold text-slate-900 mb-1">{continueTopic.title}</p>
              <p className="text-slate-500 text-sm mb-1">Section: {sectionMap[continueTopic.sectionId]?.title ?? continueTopic.sectionId}</p>
              <p className="text-slate-400 text-xs mb-4">
                {data.studiedTopics.includes(continueTopic.id) ? '100% read' : '0% read'}
              </p>
              <button
                onClick={() => navigate({ screen: 'topic', topicId: continueTopic.id })}
                className={`inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl ${contColor.bar} text-white text-sm font-semibold hover:opacity-90 transition-opacity`}
              >
                Continue Reading <ArrowRight className="w-4 h-4" />
              </button>
            </ActionCard>
            );
          })()}

          {/* Featured links */}
          {subjectId === 'meteo-climatology' && (
            <button
              onClick={() => navigate({ screen: 'section', sectionId: 'METEO-09' })}
              className="w-full flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700 transition-colors text-left mb-4"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0"><MapIcon className="w-6 h-6 text-white" /></div>
              <div className="flex-1">
                <p className="font-semibold text-lg">Pakistan Climate</p>
                <p className="text-sky-100 text-sm">7 topics covering climate zones, monsoon patterns, and climate change</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/70 shrink-0" />
            </button>
          )}

          <div className={`grid gap-2 sm:gap-3 mb-3 sm:mb-6 ${subjectId === 'meteo-climatology' ? 'grid-cols-2' : 'grid-cols-1'}`}>
            <button onClick={() => navigate({ screen: 'formulas' })} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-left">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0"><Calculator className="w-5 h-5 text-slate-700" /></div>
              <div className="min-w-0"><p className="font-semibold text-slate-900 text-sm">Formula Vault</p><p className="text-slate-500 text-xs">All formulas in {subjectTitle}</p></div>
            </button>
            {subjectId === 'meteo-climatology' && (
              <button onClick={() => navigate({ screen: 'cloud-atlas' })} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-left">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0"><Cloud className="w-5 h-5 text-slate-700" /></div>
                <div className="min-w-0"><p className="font-semibold text-slate-900 text-sm">Cloud Atlas</p><p className="text-slate-500 text-xs">10 cloud genera</p></div>
              </button>
            )}
          </div>

          {curriculumSubject && (
            <Card className="mb-4 sm:mb-6 p-4 sm:p-5 border border-teal-100 bg-teal-50/40">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-teal-800" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-800 mb-1">Course orientation · not a lesson</p>
                  <h2 className="text-lg font-bold text-slate-900">{curriculumSubject.subtitle}</h2>
                  <p className="text-sm text-slate-700 leading-relaxed mt-2">{curriculumSubject.overview}</p>
                  <div className="mt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">What you will learn</h3>
                    <ul className="space-y-1.5">
                      {curriculumSubject.outcomes.map((outcome) => (
                        <li key={outcome.id} className="text-sm text-slate-700 flex gap-2">
                          <span className="text-teal-700 font-bold">•</span><span>{outcome.statement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Curriculum units</h3>
                    <div className="space-y-2">
                      {curriculumUnits.map((unit) => (
                        <button
                          key={unit.id}
                          disabled={!unit.legacySectionId}
                          onClick={() => unit.legacySectionId && navigate({ screen: 'section', sectionId: unit.legacySectionId })}
                          className={`w-full rounded-xl border p-3 text-left transition-colors ${unit.legacySectionId ? 'border-teal-200 bg-white hover:bg-teal-50 cursor-pointer' : 'border-slate-200 bg-white/70 cursor-default'}`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-xs font-bold text-slate-500 w-10 shrink-0 pt-0.5">{unit.code}</span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-sm text-slate-900">{unit.title}</span>
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${unit.readiness === 'review' ? 'bg-amber-100 text-amber-800' : unit.readiness === 'outlined' ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-600'}`}>{unit.readiness}</span>
                              </span>
                              <span className="block text-xs text-slate-600 leading-relaxed mt-1">{unit.summary}</span>
                              <span className="block text-xs text-slate-400 mt-1">{unit.lessonIds.length ? `${unit.lessonIds.length} lessons currently mapped` : 'Lessons not yet integrated'}</span>
                            </span>
                            {unit.legacySectionId && <ChevronRight className="w-4 h-4 text-teal-700 shrink-0 mt-1" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  {curriculumSubject.projectIds.map((projectId) => {
                    const project = cgeiCurriculum.projects.find((item) => item.id === projectId);
                    if (!project) return null;
                    return (
                      <div key={project.id} className="mt-4 rounded-xl border border-violet-200 bg-violet-50/70 p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-5 h-5 text-violet-800" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold text-sm text-slate-900">{project.title}</h3>
                              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-violet-100 text-violet-800">{project.readiness}</span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed mt-1">{project.purpose}</p>
                            <p className="text-xs text-slate-500 mt-2">{project.milestones.length} milestones · assessed with a portfolio rubric</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          )}

          {/* Sections accordion */}
          <Card className="p-3.5 sm:p-5 mb-3 sm:mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Sections</h3>
              <span className="text-slate-400 text-sm">{subjectSections.length}</span>
            </div>
            <div className="space-y-2">
              {subjectSections.map((section) => {
                const sectionTopics = topicsBySection(section.id);
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
                      onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
                    >
                      <SectionBadge section={section} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 text-sm break-words">{section.title}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{section.topicCount} {section.subjectId === 'cgei-data-science' ? 'lessons' : 'topics'} · {studiedInSection} studied · {masteredInSection} mastered</p>
                      </div>
                      {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" /> : <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />}
                    </button>
                    {isExpanded && (
                      <div className="ml-12 pl-3 pr-1 py-1 space-y-1">
                        {sectionTopics.map((topic) => {
                          const p = data.topicProgress[topic.id];
                          const studied = data.studiedTopics.includes(topic.id);
                          const status = getTopicStatusFromProgress(studied, p);
                          const statusLabel = status === 'mastered' ? 'mastered' : status === 'studied' ? 'studied' : 'not started';
                          return (
                            <button
                              key={topic.id}
                              onClick={() => navigate({ screen: 'topic', topicId: topic.id })}
                              className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left"
                            >
                              <TopicStatusIcon status={status} />
                              <span className="text-slate-700 text-sm font-medium truncate flex-1">{topic.title}</span>
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

          {/* Stats footer */}
          <p className="text-slate-500 text-sm text-center">
            {subjectTopics.filter((t) => data.studiedTopics.includes(t.id)).length} / {subjectTopics.length} topics studied · {subjectTopics.length > 0 ? Math.round((subjectTopics.filter((t) => data.studiedTopics.includes(t.id)).length / subjectTopics.length) * 100) : 0}% complete
          </p>
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
        <h1 className="text-2xl sm:text-[1.75rem] font-semibold text-slate-900 tracking-tight leading-tight">{section.title}</h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-[0.9375rem]">{section.topicCount} {section.subjectId === 'cgei-data-science' ? 'lessons' : 'topics'}</p>
      </div>
      {curriculumUnit && (
        <Card className="mb-5 p-4 sm:p-5 border border-teal-100 bg-teal-50/30">
          <h2 className="font-semibold text-slate-900">Unit learning plan</h2>
          <p className="text-sm text-slate-700 leading-relaxed mt-1">{curriculumUnit.summary}</p>
          {curriculumUnit.outcomes.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Learning outcomes</h3>
              <ul className="space-y-2">
                {curriculumUnit.outcomes.map((outcome) => (
                  <li key={outcome.id} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="rounded-md bg-white border border-teal-100 px-1.5 py-0.5 text-[10px] font-bold text-teal-800 shrink-0">{outcome.level}</span>
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
                      <span className="rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-[10px] font-semibold">{activity.level}</span>
                      {activity.estimatedMinutes && <span className="text-[10px] text-slate-500">~{activity.estimatedMinutes} min</span>}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{activity.instructions}</p>
                    {activity.expectedEvidence?.length ? <p className="text-xs text-teal-800 mt-2"><span className="font-semibold">Evidence:</span> {activity.expectedEvidence.join(' · ')}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
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
          </div>
        </Card>
      )}
      <div className="space-y-2">
        {sectionTopics.map((topic) => {
          const prog = data.topicProgress[topic.id];
          const studied = data.studiedTopics.includes(topic.id);
          const status = getTopicStatusFromProgress(studied, prog);
          return (
            <Card key={topic.id} className="p-0">
              <button onClick={() => navigate({ screen: 'topic', topicId: topic.id })} className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors text-left rounded-2xl">
                <span className="text-slate-400 text-xs font-bold w-6 shrink-0">{topic.order}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-sm sm:text-base truncate">{topic.title}</p>
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
      <div className="flex items-center gap-2 mb-4"><BackButton /><Breadcrumbs /></div>
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
        <BackButton />
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

  if (!topic.content) {
    return (
      <PageContainer>
        <div className="flex items-center gap-2 mb-4"><BackButton /><Breadcrumbs /></div>
        <div className="mb-4">
          <span className="text-xs font-bold text-sky-600 bg-sky-100 px-2 py-0.5 rounded">{topicPositionLabel}</span>
          <h1 className="text-xl sm:text-3xl font-bold text-slate-900 leading-tight mt-2">{topic.title}</h1>
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
        <h1 className="text-xl sm:text-3xl font-bold text-slate-900 leading-tight mt-2">{topic.title}</h1>
        {isStudied && <span className="inline-flex items-center gap-1 text-success-600 text-sm font-medium mt-2"><BookOpen className="w-4 h-4" /> Studied</span>}
      </div>
      <article className="space-y-6 sm:space-y-8">
        {topic.definition && (
          <section>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-sky-700 mb-2">Definition</h3>
            <p className="text-slate-800 text-base sm:text-lg leading-relaxed"><MathText text={topic.definition} /></p>
          </section>
        )}
        {topic.keyFacts && topic.keyFacts.length > 0 && (
          <section>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-3">Key Facts</h3>
            <ul className="space-y-2">{topic.keyFacts.map((fact, i) => <li key={i} className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-base leading-relaxed"><span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" /><MathText text={fact} /></li>)}</ul>
          </section>
        )}
        {topic.explanationSections && topic.explanationSections.map((sec, i) => (
          <section key={i}>
            <h3 className="font-semibold text-slate-900 text-base sm:text-lg mb-2">{sec.heading}</h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed"><MathText text={sec.body} /></p>
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
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Formula{formulas.length > 1 ? ` ${fi + 1} of ${formulas.length}` : ''}</p>
                <h3 className="font-semibold text-slate-900 text-sm leading-snug">{f.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">From this topic · {topic.title}</p>
              </div>
            </div>
            <div className="formula-display text-slate-900 text-lg mb-4 text-center py-4 px-3 bg-slate-50 border border-slate-200 rounded-xl overflow-x-auto">
              <MathText text={`$$${f.expression}$$`} />
            </div>
            {(f.variables?.length ?? 0) > 0 && (
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Symbols</p>
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
            <ul className="space-y-2">{topic.examPoints.map((point, i) => <li key={i} className="flex items-start gap-2 text-slate-800 text-sm leading-relaxed"><Star className="w-3.5 h-3.5 text-warning-500 mt-0.5 shrink-0 fill-warning-500" /><MathText text={point} /></li>)}</ul>
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
              <div><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Problem</p><p className="text-slate-800 text-base leading-relaxed"><MathText text={ex.problem} /></p></div>
              {ex.solution && typeof ex.solution === 'string' && <div><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Solution</p><p className="text-slate-700 text-sm leading-relaxed"><MathText text={ex.solution} /></p></div>}
              {ex.solution && typeof ex.solution === 'object' && <div><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Solution</p><div className="space-y-2">{Object.entries(ex.solution).map(([key, val]) => <div key={key}><p className="text-slate-900 text-sm font-medium"><MathText text={key} /></p><p className="text-slate-600 text-sm leading-relaxed"><MathText text={val} /></p></div>)}</div></div>}
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
                return <li key={i} className="flex items-start gap-2 text-slate-800 text-sm leading-relaxed"><XCircle className="w-3.5 h-3.5 text-danger-500 mt-0.5 shrink-0" /><MathText text={mistake} /></li>;
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
                        <span className="font-medium text-sky-800">If </span>
                        <MathText text={when} />
                        <span className="font-medium text-sky-800"> → </span>
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
                  <span className="font-medium text-sky-800">{b.condition}</span>
                  {b.result && <span className="text-slate-700"> → <MathText text={b.result} /></span>}
                  {b.branches && <ul className="space-y-1 mt-1 pl-4 border-l border-sky-200">{renderBranches(b.branches, depth + 1)}</ul>}
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
                    {opt.name && <p className="text-sm font-semibold text-sky-800"><MathText text={opt.name} /></p>}
                    {opt.when && <p className="text-xs text-slate-500 leading-relaxed"><span className="font-medium">When: </span><MathText text={opt.when} /></p>}
                    {opt.steps && <ul className="space-y-1 pl-4">{opt.steps.map((s, si) => <li key={si} className="text-xs text-slate-700 leading-relaxed list-disc"><MathText text={s} /></li>)}</ul>}
                  </div>
                ))}
              </div>
              {mc.recommendation && <p className="mt-3 pt-2 border-t border-sky-200 text-xs text-slate-600 leading-relaxed"><span className="font-medium text-sky-800">Recommendation: </span><MathText text={mc.recommendation} /></p>}
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
              <p className="text-amber-800/70 text-[11px] mb-2">
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
                    <p className="text-slate-400 text-[11px] font-medium mb-1">{g.label}</p>
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
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={() => markStudied(topicId)} disabled={isStudied} variant={isStudied ? 'secondary' : 'primary'} className="flex-1">{isStudied ? 'Marked as Studied' : 'Mark as Studied'}</Button>
          {topicQuestions.length > 0 && <Button variant="secondary" onClick={() => navigate({ screen: 'quiz', mode: 'topic', topicId })} className="flex-1">Test Me — {topicQuestions.length} Question{topicQuestions.length !== 1 ? 's' : ''}</Button>}
          <Button variant="secondary" onClick={() => navigate({ screen: 'flashcards', topicId })} className="flex-1">Flashcards</Button>
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
                <button onClick={() => navigate({ screen: 'topic', topicId: prevTopic.id })} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors text-left min-w-0 flex-1 max-w-[48%]">
                  <ChevronLeft className="w-5 h-5 text-slate-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 font-medium">Previous</p>
                    <p className="text-sm text-slate-700 font-medium truncate">{prevTopic.title}</p>
                  </div>
                </button>
              ) : <div className="flex-1 max-w-[48%]" />}
              {nextTopic ? (
                <button onClick={() => navigate({ screen: 'topic', topicId: nextTopic.id })} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors text-right min-w-0 flex-1 max-w-[48%] justify-end">
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 font-medium">Next</p>
                    <p className="text-sm text-slate-700 font-medium truncate">{nextTopic.title}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                </button>
              ) : <div className="flex-1 max-w-[48%]" />}
            </div>
          );
        })()}
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
