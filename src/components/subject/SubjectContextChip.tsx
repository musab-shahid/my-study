/**
 * Subject context chip — show under SubjectSelector on Learn / Practice / Progress / Review.
 */
import { currentlyViewingLabel } from '@/lib/ui-states';

export function SubjectContextChip({
  activeSubject,
  subjectTitle,
  className = '',
}: {
  activeSubject: string;
  subjectTitle: string;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-medium text-slate-500 mt-2 ${className}`}
      aria-live="polite"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/90 px-2.5 py-1 text-slate-600 ring-1 ring-slate-200/60">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" aria-hidden />
        {currentlyViewingLabel(activeSubject, subjectTitle)}
      </span>
    </p>
  );
}
