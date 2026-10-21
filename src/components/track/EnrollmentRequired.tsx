import { useData } from '@/hooks/useData';
import { useRouter } from '@/router';
import { assertCanStudy, getMembership } from '@/lib/track-access';
import { openTrackOptions } from '@/router/openTrack';
import { listTrackDefinitions } from '@/data/tracks';
import { isTrackId, type TrackId } from '@/data/tracks';
import { PageContainer, Button, Card } from '@/components/ui';
import { useSubjectSelection } from '@/contexts/subject-selection-context';

type Props = {
  children: React.ReactNode;
  /**
   * When set, user must be enrolled in this track (not merely any track).
   * Omit for generic stages that use the active enrolled focus only.
   */
  requiredTrack?: TrackId;
  /** Route-specific explanation of what this tool is for */
  purpose?: string;
  purposeTitle?: string;
};

/**
 * Blocks learning screens until enrollment (and optional track) is satisfied.
 */
export function EnrollmentRequired({ children, requiredTrack, purpose, purposeTitle }: Props) {
  const { data, setActiveEnrolledTrack } = useData();
  const { setActiveTrack } = useSubjectSelection();
  const { navigate } = useRouter();

  const check = requiredTrack
    ? assertCanStudy(data, requiredTrack)
    : assertCanStudy(data);

  if (check.ok) {
    return <>{children}</>;
  }

  const exploreTrack: TrackId | null =
    requiredTrack && isTrackId(requiredTrack) ? requiredTrack : null;

  if (!check.ok && check.reason === 'no-active-workspace') {
    const enrolled = Object.keys(getMembership(data).enrollments).filter(isTrackId) as TrackId[];
    return (
      <PageContainer>
        <Card className="p-3.5 sm:p-5 max-w-lg">
          <h2 className="text-lg font-semibold text-slate-900">Choose an active workspace</h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            You are enrolled, but no track is active. Switch to a workspace to open Study and Practice.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {enrolled.map((id) => {
              const title = listTrackDefinitions().find((t) => t.id === id)?.shortTitle ?? id;
              return (
                <Button
                  key={id}
                  type="button"
                  onClick={() => {
                    const r = setActiveEnrolledTrack(id);
                    if (r.ok) setActiveTrack(id);
                  }}
                >
                  Activate {title}
                </Button>
              );
            })}
          </div>
        </Card>
      </PageContainer>
    );
  }

  const title =
    purposeTitle ??
    (requiredTrack
      ? `Begin ${requiredTrack.toUpperCase()} to continue`
      : 'Choose a track to begin');
  const body =
    purpose ??
    (requiredTrack
      ? `This content belongs to the ${requiredTrack.toUpperCase()} track. Preview the track, then use Begin — opening a page does not enroll you.`
      : 'Study, practice, and review unlock after you begin a track. Preview FPSC or HAT first — beginning is an explicit step.');

  return (
    <PageContainer>
      <Card className="p-3.5 sm:p-5 max-w-lg">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">{body}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {exploreTrack ? (
            <Button type="button" onClick={() => navigate({ ...openTrackOptions(exploreTrack) })}>
              Explore {exploreTrack.toUpperCase()}
            </Button>
          ) : (
            <>
              <Button type="button" onClick={() => navigate({ ...openTrackOptions('fpsc') })}>
                Explore FPSC
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate({ ...openTrackOptions('hat') })}
              >
                Explore HAT
              </Button>
            </>
          )}
        </div>
      </Card>
    </PageContainer>
  );
}
