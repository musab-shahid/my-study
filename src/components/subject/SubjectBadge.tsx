import type { Section } from '@/types';
import { subjectMap } from '@/data/subjects';
import { getSubjectStyle } from '@/data/subject-colors';
function shortCode(sectionId: string): string {
  const idx = sectionId.lastIndexOf('-');
  return idx >= 0 ? sectionId.slice(idx + 1) : sectionId;
}
export function SectionBadge({ section, className = '' }: { section: Section; className?: string }) {
  const subject = subjectMap[section.subjectId];
  const Icon = subject?.lucideIcon;
  const color = getSubjectStyle(section.subjectId);
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold ${color.tint} ${color.text} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {shortCode(section.id)}
    </span>
  );
}
