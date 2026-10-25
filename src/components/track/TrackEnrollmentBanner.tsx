import { Button } from '@/components/ui';

type Props = {
  trackTitle: string;
  enrolled: boolean;
  /** True when this track is the membership active focus */
  isActiveFocus?: boolean;
  enrolling?: boolean;
  onBegin: () => void;
  /** Explicit switch/continue — not triggered by merely viewing the page */
  onContinue?: () => void;
};

/** Preview vs enrolled CTA for track landings. Preview never enrolls; only Begin does. */
export function TrackEnrollmentBanner({
  trackTitle,
  enrolled,
  isActiveFocus,
  enrolling,
  onBegin,
  onContinue,
}: Props) {
  if (enrolled) {
    return (
      <div className="rounded-card border border-success-200 bg-success-50 px-3.5 py-3 sm:px-5 sm:py-4 mb-4 sm:mb-6">
        <p className="text-sm font-semibold text-success-800">
          {isActiveFocus ? 'Enrolled · Active workspace' : 'Enrolled'}
        </p>
        <p className="text-xs text-success-700 mt-0.5">
          {isActiveFocus
            ? `${trackTitle} is your active study context. Study, practice, and review use this track's subjects.`
            : `${trackTitle} is in My Tracks but not the active focus. Use Continue to switch here without losing the other track.`}
        </p>
        {!isActiveFocus && onContinue && (
          <div className="mt-3">
            <Button type="button" onClick={onContinue}>
              Continue {trackTitle}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-card border border-slate-200 bg-white px-3.5 py-3 sm:px-5 sm:py-4 mb-4 sm:mb-6 shadow-card">
      <p className="text-sm font-semibold text-slate-900">Not started</p>
      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
        You are previewing {trackTitle}. Browsing this page does not enroll you or change your other
        tracks. Begin to add it to My Tracks and unlock study and practice.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          type="button"
          disabled={enrolling}
          onClick={onBegin}
        >
          {enrolling ? 'Starting…' : `Begin ${trackTitle}`}
        </Button>
      </div>
    </div>
  );
}
