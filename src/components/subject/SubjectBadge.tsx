/** Badge for a section or subject short code (suffix after last hyphen). */
export function shortCode(id: string): string {
  const i = id.lastIndexOf('-');
  return i >= 0 ? id.slice(i + 1) : id;
}

/**
 * Visual badge for section IDs (e.g. CGEI-024 → "024").
 * Legacy CGEI section IDs are intentional compatibility keys, not truncated unit codes.
 */
export function SectionBadge({ id, className = '' }: { id: string; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 ${className}`}>
      {shortCode(id)}
    </span>
  );
}
