/** Component public API — prefer deep imports for tree-shaking clarity */
export { ErrorBoundary } from './ErrorBoundary';
export { MathText } from './MathText';

// Layout
export { Header } from './layout/Header';
export { Sidebar, MobileNav } from './layout/Navigation';
export { BackButton, Breadcrumbs, HomeButton } from './layout/Breadcrumbs';
export { ToolsTray } from './layout/ToolsTray';

// Subject
export { SubjectSelector, type SubjectFilterValue } from './subject/SubjectSelector';
export { SubjectContextChip } from './subject/SubjectContextChip';
export { SectionBadge } from './SectionBadge';

// UI primitives (re-export from ui barrel)
export * from './ui';
