import { listExamProfiles, type TrackId } from "@/data/tracks";
import { useData } from "@/hooks/useData";
import { useSubjectSelection } from "@/contexts/subject-selection-context";
import { subjectInScope } from "@/lib/track-scope";

type Props = {
  trackId: TrackId;
  /** Only show when enrolled */
  enrolled: boolean;
};

/**
 * Optional exam/post focus within a track. null = general track preparation.
 */
export function ExamProfilePicker({ trackId, enrolled }: Props) {
  const { trackMembership, setExamProfile } = useData();
  const { lastSelected, setGlobalSubject } = useSubjectSelection();
  const profiles = listExamProfiles(trackId).filter((p) => p.status === "available");
  if (!enrolled || profiles.length === 0) return null;

  const current = trackMembership.enrollments[trackId]?.activeExamId ?? null;

  return (
    <div className="rounded-card border border-slate-200 bg-white px-3.5 py-3 sm:px-5 sm:py-4 mb-4 sm:mb-6">
      <label htmlFor={`exam-profile-${trackId}`} className="block text-sm font-semibold text-slate-900">
        Preparing for
      </label>
      <p className="text-xs text-slate-500 mt-0.5 mb-2">
        Optional. General uses the whole track. A profile focuses subjects and tagged content — progress is not erased.
      </p>
      <select
        id={`exam-profile-${trackId}`}
        className="w-full sm:w-auto max-w-full rounded-btn border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
        value={current ?? ""}
        onChange={(e) => {
          const v = e.target.value;
          const examId = v === "" ? null : v;
          const r = setExamProfile(trackId, examId);
          if (!r.ok) {
            // Revert select to canonical membership value
            e.target.value = current ?? "";
            return;
          }
          // Soft-clear subject picks that fall outside the new profile
          if (lastSelected && lastSelected !== "all" && !subjectInScope(lastSelected, { trackId, examId })) {
            setGlobalSubject("all");
          }
        }}
      >
        <option value="">General track (all subjects)</option>
        {profiles.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title}
            {p.scale ? ` · ${p.scale.toUpperCase()}` : ""}
          </option>
        ))}
      </select>
      {current && (
        <p className="text-xs text-slate-600 mt-2">
          {profiles.find((p) => p.id === current)?.description}
        </p>
      )}
    </div>
  );
}
