import { useState } from 'react';
import { useData } from '@/hooks/useData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { getTopic } from '@/data/topics';
import { sectionMap } from '@/data/sections';
import { canAccessSubject } from '@/lib/learning-scope';
import { isTrackId, type TrackId } from '@/data/tracks';
import { listTrackDefinitions } from '@/data/tracks';
import { EnrollmentRequired } from '@/components/track/EnrollmentRequired';
import { PageContainer, EmptyState, Card, Button } from '@/components/ui';
import { BookOpen } from 'lucide-react';

function SwitchWorkspaceCard({
  trackId,
  title,
}: {
  trackId: TrackId;
  title: string;
}) {
  const { setActiveEnrolledTrack } = useData();
  const { setActiveTrack } = useSubjectSelection();
  const [err, setErr] = useState<string | null>(null);
  const label =
    listTrackDefinitions().find((t) => t.id === trackId)?.shortTitle ?? trackId.toUpperCase();

  return (
    <PageContainer>
      <Card className="p-6 max-w-lg">
        <EmptyState
          title={`Open in ${label}?`}
          message={`${title} belongs to your ${label} enrollment, which is not the active workspace. Switch only if you want to change Study and Practice context.`}
          icon={<BookOpen className="w-12 h-12" />}
        />
        {err && (
          <p className="text-sm text-red-600 text-center mt-3" role="alert">{err}</p>
        )}
        <div className="flex justify-center mt-4">
          <Button
            type="button"
            onClick={() => {
              setErr(null);
              const r = setActiveEnrolledTrack(trackId);
              if (r.ok) {
                setActiveTrack(trackId);
              } else {
                setErr(
                  r.reason === 'persist-failed'
                    ? 'Could not save workspace switch. Check storage and try again.'
                    : 'Could not switch workspace.',
                );
              }
            }}
          >
            Switch to {label} and open
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
}

/** Gate a topic route by resolving topic → subject → track enrollment + profile tags. */
export function TopicAccessGate({
  topicId,
  children,
}: {
  topicId: string;
  children: React.ReactNode;
}) {
  const { data } = useData();
  const topic = getTopic(topicId);
  if (!topic) {
    return (
      <PageContainer>
        <Card className="p-6">
          <EmptyState
            title="Topic not found"
            message="This topic id is missing or was renamed."
            icon={<BookOpen className="w-12 h-12" />}
          />
        </Card>
      </PageContainer>
    );
  }
  const subjectId = sectionMap[topic.sectionId]?.subjectId;
  if (!subjectId) {
    return (
      <PageContainer>
        <Card className="p-6">
          <EmptyState
            title="Topic unavailable"
            message="No subject mapping for this topic."
            icon={<BookOpen className="w-12 h-12" />}
          />
        </Card>
      </PageContainer>
    );
  }
  const access = canAccessSubject(data, subjectId, topic);
  if (access.ok) return <>{children}</>;

  if (access.reason === 'other-enrolled-track' && access.trackId && isTrackId(access.trackId)) {
    return <SwitchWorkspaceCard trackId={access.trackId} title={topic.title} />;
  }

  const track: TrackId | undefined =
    access.trackId && isTrackId(access.trackId) ? access.trackId : undefined;
  return <EnrollmentRequired requiredTrack={track}>{null}</EnrollmentRequired>;
}

/** Gate a section route by section → subject → track. */
export function SectionAccessGate({
  sectionId,
  children,
}: {
  sectionId: string;
  children: React.ReactNode;
}) {
  const { data } = useData();
  const section = sectionMap[sectionId];
  if (!section) {
    return (
      <PageContainer>
        <Card className="p-6">
          <EmptyState
            title="Section not found"
            message="Unknown section id."
            icon={<BookOpen className="w-12 h-12" />}
          />
        </Card>
      </PageContainer>
    );
  }
  const access = canAccessSubject(data, section.subjectId);
  if (access.ok) return <>{children}</>;

  if (access.reason === 'other-enrolled-track' && access.trackId && isTrackId(access.trackId)) {
    return (
      <SwitchWorkspaceCard
        trackId={access.trackId}
        title={section.title}
      />
    );
  }

  const track: TrackId | undefined =
    access.trackId && isTrackId(access.trackId) ? access.trackId : undefined;
  return <EnrollmentRequired requiredTrack={track}>{null}</EnrollmentRequired>;
}
