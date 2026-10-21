import { useData } from '@/hooks/useData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { useRouter } from '@/router';
import { getTrackDefinition, type TrackId } from '@/data/tracks';
import { resolveSubjectsForScope, type ScopeInput } from '@/lib/track-scope';
import { getTrackCatalog, formatQuestionCountLabel } from '@/lib/track-catalog';
import { isTrackEnrolled } from '@/lib/track-access';
import { ExamProfilePicker } from '@/components/track/ExamProfilePicker';
import { Button } from '@/components/ui';
import { trackAccentClasses } from '@/lib/track-chrome';
import {
  TrackLandingShell,
  TrackSubjectList,
  TrackSubjectRow,
} from '@/components/track/TrackLandingShell';
import { AlertCircle } from 'lucide-react';
import type { SubjectId } from '@/types';

/**
 * Generic track overview for registry tracks that do not use FPSC/HAT branded landings.
 */
export function TrackOverviewScreen({ trackId }: { trackId: TrackId }) {
  const def = getTrackDefinition(trackId);
  const { data, enrollInTrack, setActiveEnrolledTrack, trackMembership } = useData();
  const { setActiveTrack, setActiveSubjectForScreen } = useSubjectSelection();
  const { navigate, currentRoute } = useRouter();
  const enrolled = isTrackEnrolled(data, trackId);
  const isActive = trackMembership.activeTrackId === trackId;
  const examId = trackMembership.enrollments[trackId]?.activeExamId ?? null;
  const scope: ScopeInput = { trackId, examId };
  const scopeResolution = resolveSubjectsForScope(scope);
  const catalog = getTrackCatalog(scope);
  const subjects = catalog.subjects.map((s) => s.subject);
  const accent = trackAccentClasses(trackId);
  const scopeEmpty = catalog.empty;
  const scopeInvalid = scopeResolution.kind === 'invalid-profile' || scopeResolution.kind === 'invalid-track';
  const scopeEmptyPolicy = scopeResolution.kind === 'empty-policy';
  const qLabel = formatQuestionCountLabel(catalog.totalQuestions, catalog.questionCountPrecision);
  const qPrecisionNote =
    catalog.questionCountPrecision === 'estimated'
      ? ' (estimated until banks load)'
      : '';

  const handleBegin = () => {
    const r = enrollInTrack(trackId);
    if (r.ok) setActiveTrack(trackId);
  };

  const openSubject = (subjectId: SubjectId) => {
    if (!enrolled) return;
    setActiveSubjectForScreen('learn', subjectId);
    navigate({ screen: 'learn', parent: currentRoute });
  };

  return (
    <TrackLandingShell
      title={def.title}
      description={def.description}
      enrolled={enrolled}
      isActiveFocus={isActive}
      onBegin={handleBegin}
      onContinue={() => {
        const sw = setActiveEnrolledTrack(trackId);
        if (sw.ok) setActiveTrack(trackId);
      }}
      accentClass={accent.gradient}
      profileSlot={
        def.examProfiles && def.examProfiles.length > 0 ? (
          <ExamProfilePicker trackId={trackId} enrolled={enrolled} />
        ) : null
      }
      summary={
        scopeEmpty ? (
          <p className="text-white/90">
            {scopeInvalid ? 'Invalid exam profile.' : scopeEmptyPolicy ? 'No subjects defined for this profile.' : 'No subjects in scope.'}
          </p>
        ) : (
          <p className="text-white/90">
            <span className="font-semibold text-white">{subjects.length}</span> subjects ·{' '}
            <span className="font-semibold text-white">{catalog.totalTopics}</span> topics ·{' '}
            <span className="font-semibold text-white">{qLabel}</span> questions
            {qPrecisionNote && <span className="text-white/70 text-xs">{qPrecisionNote}</span>}
          </p>
        )
      }
      catalog={
        scopeEmpty ? (
          <div className="border border-dashed border-slate-200 rounded-card px-4 py-8 text-center">
            <AlertCircle className="w-6 h-6 text-slate-300 mx-auto mb-2" aria-hidden />
            <p className="text-sm font-medium text-slate-700">
              {scopeInvalid ? 'Invalid exam profile' : scopeEmptyPolicy ? 'No subjects defined for this profile' : 'No subjects available'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {scopeInvalid ? 'Choose a valid exam profile to see available subjects.' : scopeEmptyPolicy ? 'This profile exists but has no subject policy yet.' : 'Try a different profile or general preparation.'}
            </p>
          </div>
        ) : (
          <TrackSubjectList>
            {catalog.subjects.map(({ subject, topicCount, questionCount, topics: catTopics }) => {
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
                  meta={`${topicCount} topics · ${questionCount} questions`}
                  progressPct={enrolled && isActive ? progressPct : null}
                  disabled={!enrolled}
                  onOpen={() => openSubject(sid)}
                  actionLabel={enrolled ? 'Study' : 'Preview'}
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
              onClick={() => navigate({ screen: 'practice', parent: currentRoute })}
            >
              Practice
            </Button>
          </div>
        ) : null
      }
    />
  );
}
