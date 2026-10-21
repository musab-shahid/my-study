import { useEffect, useState } from 'react';
import { useRouter } from '@/router';
import { Button } from '@/components/ui';
import { HAT_SECTIONS, HAT_EXAM_DURATION_MINUTES } from '@/data/hat/hat-meta';
import { loadAllHatTopics, loadAllHatQuestions } from '@/data/hat';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { useData } from '@/hooks/useData';
import { getSubjectsForTrack } from '@/lib/exam-track';
import { getHatSectionStyle } from '@/data/subject-colors';
import type { Topic, Question, SubjectId } from '@/types';
import {
  TrackLandingShell,
  TrackSubjectList,
  TrackSubjectRow,
} from '@/components/track/TrackLandingShell';

function subjectIdForHatSection(sectionId: string): SubjectId {
  const hatSubjects = getSubjectsForTrack('hat');
  const code = sectionId.toLowerCase();
  const match =
    hatSubjects.find((s) => s.subjectId === code) ??
    hatSubjects.find((s) => s.subjectId === `hat-${code}`) ??
    hatSubjects.find((s) => s.subjectId.includes(code) || s.title.toLowerCase().includes(code));
  return (match?.subjectId ?? hatSubjects[0]?.subjectId ?? 'hat-verbal') as SubjectId;
}

export function HatLandingScreen() {
  const { navigate, currentRoute } = useRouter();
  const { setActiveSubjectForScreen, setActiveTrack } = useSubjectSelection();
  const { data, enrollInTrack, setActiveEnrolledTrack, trackMembership } = useData();
  const enrolled = Boolean(trackMembership.enrollments.hat);
  const isActive = trackMembership.activeTrackId === 'hat';
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [hatTopics, setHatTopics] = useState<Topic[]>([]);
  const [hatQuestions, setHatQuestions] = useState<Question[]>([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([loadAllHatTopics(), loadAllHatQuestions()])
      .then(([t, q]) => {
        if (active) {
          setHatTopics(t);
          setHatQuestions(q);
          setLoadError(false);
        }
      })
      .catch(() => {
        if (active) {
          setHatTopics([]);
          setHatQuestions([]);
          setLoadError(true);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const handleBegin = () => {
    setEnrollError(null);
    setEnrolling(true);
    try {
      const r = enrollInTrack('hat');
      if (!r.ok) {
        setEnrollError(
          r.reason === 'not-enrollable'
            ? 'This track is not available to begin yet.'
            : 'Could not start this track. Try again.',
        );
        return;
      }
      setActiveTrack('hat');
    } finally {
      setEnrolling(false);
    }
  };

  const sections = Object.values(HAT_SECTIONS);

  const openSection = (sectionKey: string) => {
    if (!enrolled) return;
    setActiveSubjectForScreen('learn', subjectIdForHatSection(sectionKey));
    navigate({ screen: 'learn', parent: currentRoute });
  };

  return (
    <TrackLandingShell
      title="HAT Preparation"
      description={`Higher Ability Test — verbal, analytical, and quantitative · ${HAT_EXAM_DURATION_MINUTES} minutes.`}
      enrolled={enrolled}
      isActiveFocus={isActive}
      enrolling={enrolling}
      onBegin={handleBegin}
      onContinue={() => {
        const sw = setActiveEnrolledTrack('hat');
        if (sw.ok) setActiveTrack('hat');
      }}
      enrollError={enrollError}
      accentClass="from-slate-700 to-slate-800"
      summary={
        loadError ? (
          <p className="text-danger-200" role="alert">
            Could not load HAT content. Refresh and try again.
          </p>
        ) : (
          <p className="text-white/90">
            <span className="font-semibold text-white">{sections.length}</span> sections
            {' · '}
            <span className="font-semibold text-white">{hatTopics.length || '—'}</span> topics
            {' · '}
            <span className="font-semibold text-white">
              {hatQuestions.length > 0 ? hatQuestions.length : hatTopics.length === 0 ? '—' : '0'}
            </span>{' '}
            questions
            {hatTopics.length === 0 && !loadError && (
              <span className="text-white/70 text-xs"> (loading…)</span>
            )}
          </p>
        )
      }
      catalog={
        <TrackSubjectList>
          {sections.map((section) => {
            const idSet = new Set(section.sectionIds as readonly string[]);
            const topics = hatTopics.filter((t) => idSet.has(t.sectionId));
            const studied = topics.filter((t) => (data.studiedTopics ?? []).includes(t.id)).length;
            const progressPct =
              topics.length > 0 ? Math.round((studied / topics.length) * 100) : null;
            const qCount = hatQuestions.filter((q) => idSet.has(q.sectionId)).length;
            const metaTopics = topics.length || section.topicCount;
            const metaQs = qCount || section.questionCount;

            return (
              <TrackSubjectRow
                key={section.id}
                title={section.name}
                meta={`${metaTopics} topics · ${metaQs} questions · ${Math.round(section.weight * 100)}% weight`}
                progressPct={enrolled ? progressPct : null}
                disabled={!enrolled}
                onOpen={() => openSection(section.id)}
                actionLabel={enrolled ? 'Study' : 'Preview'}
                dotClass={getHatSectionStyle(section.id).dotBg}
              />
            );
          })}
        </TrackSubjectList>
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
