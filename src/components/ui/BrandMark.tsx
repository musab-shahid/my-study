/**
 * Canonical My Study mark (open book + check).
 * Geometry matches public/favicon.svg — do not introduce a second logo design.
 */
export function BrandMark({
  className = '',
  title,
}: {
  className?: string;
  /** Accessible name when the mark is meaningful alone; omit when decorative beside “My Study”. */
  title?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <rect width="512" height="512" rx="112" fill="currentColor" />
      <g fill="none" stroke="#ffffff" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round">
        <path d="M256 176c-34-24-74-34-122-30v174c48-4 88 6 122 30 34-24 74-34 122-30V146c-48-4-88 6-122 30Z" />
        <path d="M256 176v174" />
        <path d="m307 239 22 22 45-50" strokeWidth="24" />
      </g>
    </svg>
  );
}
