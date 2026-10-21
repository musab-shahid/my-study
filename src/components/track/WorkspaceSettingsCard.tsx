import { useState } from 'react';
import { useData } from '@/hooks/useData';
import { useSubjectSelection } from '@/contexts/subject-selection-context';
import { useRouter } from '@/router';
import {
  getTrackDefinition,
  getExamProfile,
  listTrackDefinitions,
  type TrackId,
} from '@/data/tracks';
import { enrolledTrackIds, trackIcon, trackAccentClasses } from '@/lib/track-chrome';
import { openTrackOptions } from '@/router/openTrack';
import { Card, Button } from '@/components/ui';

/**
 * Read-only membership summary + explicit Switch / Leave (progress kept).
 */
export function WorkspaceSettingsCard() {
  const { trackMembership, setActiveEnrolledTrack, leaveEnrolledTrack } = useData();
  const { setActiveTrack } = useSubjectSelection();
  const { navigate } = useRouter();
  const enrolled = enrolledTrackIds(trackMembership.enrollments);
  const [confirmLeave, setConfirmLeave] = useState<TrackId | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  if (enrolled.length === 0) {
    return (
      <Card className="p-3.5 sm:p-5 mb-4">
        <h2 className="text-sm font-semibold text-slate-900">Workspace</h2>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          You have not begun a track yet. Explore a track from Home, then use Begin — study stays locked until then.
        </p>
        <Button
          type="button"
          className="mt-3"
          onClick={() => navigate({ screen: 'home', parent: null })}
        >
          Go to Home
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-3.5 sm:p-5 mb-4">
      <h2 className="text-sm font-semibold text-slate-900">Workspace</h2>
      <p className="text-xs text-slate-500 mt-0.5 mb-3">
        Switch changes where Study and Practice point. Leave removes the track from My Tracks but keeps your progress.
      </p>
      {msg && (
        <p className="text-xs text-emerald-700 mb-2" role="status">{msg}</p>
      )}
      <ul className="space-y-2">
        {enrolled.map((id) => {
          const def = getTrackDefinition(id);
          const Icon = trackIcon(id);
          const accent = trackAccentClasses(id);
          const isActive = trackMembership.activeTrackId === id;
          const examId = trackMembership.enrollments[id]?.activeExamId ?? null;
          const profile = examId ? getExamProfile(id, examId) : null;
          return (
            <li
              key={id}
              className={`rounded-btn border px-3 py-2.5 ${
                isActive ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-btn bg-gradient-to-br ${accent.gradient} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {def.title}
                    {isActive && (
                      <span className="ml-2 text-[10px] font-bold uppercase text-emerald-700">Active</span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500">
                    Profile: {profile ? profile.title : 'General preparation'}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {!isActive && (
                  <Button
                    type="button"
                    className="text-xs py-1.5 px-2.5"
                    onClick={() => {
                      const r = setActiveEnrolledTrack(id);
                      if (r.ok) {
                        setActiveTrack(id);
                        setMsg(`Switched active workspace to ${def.shortTitle}.`);
                        setConfirmLeave(null);
                      } else {
                        setMsg(r.reason === 'persist-failed'
                          ? 'Could not save workspace switch. Check storage and try again.'
                          : 'Could not switch workspace.');
                      }
                    }}
                  >
                    Switch to this track
                  </Button>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  className="text-xs py-1.5 px-2.5"
                  onClick={() => navigate({ ...openTrackOptions(id) })}
                >
                  Open track page
                </Button>
                {confirmLeave === id ? (
                  <>
                    <Button
                      type="button"
                      variant="danger"
                      className="text-xs py-1.5 px-2.5"
                      onClick={() => {
                        const r = leaveEnrolledTrack(id);
                        if (r.ok) {
                          setMsg(`Left ${def.shortTitle}. Progress was kept.`);
                          setConfirmLeave(null);
                        } else {
                          setMsg('Could not leave track.');
                        }
                      }}
                    >
                      Confirm leave
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className="text-xs py-1.5 px-2.5"
                      onClick={() => setConfirmLeave(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="secondary"
                    className="text-xs py-1.5 px-2.5 text-slate-600"
                    onClick={() => {
                      setConfirmLeave(id);
                      setMsg(null);
                    }}
                  >
                    Leave track
                  </Button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {listTrackDefinitions().some(
        (tr) => tr.status === 'available' && !trackMembership.enrollments[tr.id],
      ) && (
        <button
          type="button"
          className="mt-3 text-xs font-semibold text-sky-700"
          onClick={() => navigate({ screen: 'home', parent: null })}
        >
          Explore another track on Home →
        </button>
      )}
    </Card>
  );
}
