import { useState } from 'react';
import { useRouter } from '@/router';
import { Button } from '@/components/ui';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { useData } from '@/hooks/useData';
import type { SubjectId } from '@/types';
import { ExamProfilePicker } from '@/components/track/ExamProfilePicker';
import {
  TrackLandingShell,
  TrackSubjectList,
  TrackSubjectRow,
} from '@/components/track/TrackLandingShell';
import { resolveSubjectsForScope, type ScopeInput } from '@/lib/track-scope';
import { getTrackCatalog, formatQuestionCountLabel } from '@/lib/track-catalog';
import { getSubjectStyle } from '@/data/subject-colors';
import { AlertCircle } from 'lucide-react';

export function FpscLandingScreen() {
  const { navigate, currentRoute } = useRouter();
  const { setActiveSubjectForScreen, setActiveTrack } = useSubjectSelection();
  const { data, enrollInTrack, setActiveEnrolledTrack, trackMembership } = useData();
  const enrolled = Boolean(trackMembership.enrollments.fpsc);
  const isActive = trackMembership.activeTrackId === 'fpsc';
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  const examId = trackMembership.enrollments.fpsc?.activeExamId ?? null;
  const scope: ScopeInput = { trackId: 'fpsc', examId };
  const scopeResolution = resolveSubjectsForScope(scope);
  const catalog = getTrackCatalog(scope);
  const fpscSubjects = catalog.subjects.map((s) => s.subject);
  const totalTopics = catalog.totalTopics;
  const totalQuestions = catalog.totalQuestions;
  const scopeEmpty = catalog.empty;
  const scopeInvalid = scopeResolution.kind === 'invalid-profile' || scopeResolution.kind === 'invalid-track';
  const scopeEmptyPolicy = scopeResolution.kind === 'empty-policy';
  const qLabel = formatQuestionCountLabel(catalog.totalQuestions, catalog.questionCountPrecision);
  const qPrecisionNote =
    catalog.questionCountPrecision === 'estimated'
      ? ' (estimated until banks load)'
      : catalog.questionCountPrecision === 'unavailable'
        ? ''
        : '';

  const handleBegin = () => {
    setEnrolling(true);
    setEnrollError(null);
    const r = enrollInTrack('fpsc');
    setEnrolling(false);
    if (!r.ok) {
      setEnrollError(
        r.reason === 'not-enrollable'
          ? 'This track is not available to begin yet.'
          : 'Could not start this track. Try again.',
      );
      return;
    }
    setActiveTrack('fpsc');
  };

  const guard = (fn: () => void) => {
    if (!enrolled) return;
    fn();
  };

  const openSubject = (subjectId: SubjectId) => {
    guard(() => {
      setActiveSubjectForScreen('learn', subjectId);
      navigate({ screen: 'learn', parent: currentRoute });
    });
  };

  return (
    <TrackLandingShell
      title="FPSC Exam"
      description="Federal Public Service Commission — meteorology, sciences, maths, English, and research."
      enrolled={enrolled}
      isActiveFocus={isActive}
      enrolling={enrolling}
      onBegin={handleBegin}
      onContinue={() => {
        const sw = setActiveEnrolledTrack('fpsc');
        if (sw.ok) setActiveTrack('fpsc');
      }}
      enrollError={enrollError}
      accentClass="from-sky-600 to-sky-700"
      profileSlot={<ExamProfilePicker trackId="fpsc" enrolled={enrolled} />}
      summary={
        scopeEmpty ? (
          <p className="text-white/90">
            {scopeInvalid
              ? 'This exam profile is not valid — no subjects in scope.'
              : scopeEmptyPolicy
                ? 'This exam profile defines no subjects yet.'
                : 'No subjects in scope.'}
          </p>
        ) : (
          <p className="text-white/90">
            <span className="font-semibold text-white">{fpscSubjects.length}</span> subjects
            {' · '}
            <span className="font-semibold text-white">{totalTopics}</span> topics
            {' · '}
            <span className="font-semibold text-white">{qLabel}</span> questions in scope
            {qPrecisionNote && <span className="text-white/70 text-xs">{qPrecisionNote}</span>}
          </p>
        )
      }
      catalog={
        scopeEmpty ? (
          <div className="border border-dashed border-slate-200 rounded-card px-4 py-8 text-center">
            <AlertCircle className="w-6 h-6 text-slate-300 mx-auto mb-2" aria-hidden />
            <p className="text-sm font-medium text-slate-700">
              {scopeInvalid
                ? 'Invalid exam profile'
                : scopeEmptyPolicy
                  ? 'No subjects defined for this profile'
                  : 'No subjects available'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {scopeInvalid
                ? 'Choose a valid exam profile to see available subjects.'
                : scopeEmptyPolicy
                  ? 'This profile exists but has no subject policy yet.'
                  : 'Try a different profile or general preparation.'}
            </p>
          </div>
        ) : (
          <TrackSubjectList>
            {catalog.subjects.map(({ subject, topicCount, questionCount, questionCountPrecision, sectionCount, topics: catTopics }) => {
              const sid = subject.id as SubjectId;
              const studied = isActive
                ? catTopics.filter((t) => (data.studiedTopics ?? []).includes(t.id)).length
                : 0;
              const progressPct =
                isActive && topicCount > 0 ? Math.round((studied / topicCount) * 100) : null;
              return (
                <TrackSubjectRow
                  key={sid}
                  title={subject.title}
                  meta={`${sectionCount} sections · ${topicCount} topics · ${formatQuestionCountLabel(questionCount, questionCountPrecision)} questions`}
                  progressPct={enrolled && isActive ? progressPct : null}
                  disabled={!enrolled}
                  onOpen={() => openSubject(sid)}
                  actionLabel={enrolled ? 'Study' : 'Preview'}
                  dotClass={getSubjectStyle(sid).dotBg}
                />
              );
            })}
          </TrackSubjectList>
        )
      }
      footer={
        enrolled ? (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
            <Button
              type="button"
              variant="secondary"
              onClick={() => guard(() => navigate({ screen: 'practice', parent: currentRoute }))}
            >
              Practice
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={totalQuestions < 10}
              onClick={() =>
                guard(() => navigate({ screen: 'practice', mode: 'mock', parent: currentRoute }))
              }
            >
              Mock exam
            </Button>
          </div>
        ) : null
      }
    />
  );
}
