import type { ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react';
import { CheckCircle2, Circle, Star, Lock, Flame } from 'lucide-react';
import { getSubjectColor } from '@/data/subject-colors';

export function LoadingSpinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 sm:py-20 px-4 sm:px-6 text-center" role="status" aria-live="polite">
      <div className="w-8 h-8 border-2 border-slate-200 border-t-brand-500 rounded-full animate-spin mb-3" />
      <p className="text-slate-500 text-sm">{label}</p>
    </div>
  );
}

/** Lightweight skeleton blocks for loading placeholders */
export function Skeleton({
  className = '',
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-lg bg-slate-100 shimmer-bg animate-shimmer ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 40%, #f1f5f9 80%)',
        backgroundSize: '200% 100%',
        ...style,
      }}
      aria-hidden
    />
  );
}

export type PageWidth = 'standard' | 'reading' | 'wide' | 'analytics' | 'focused';

const PAGE_WIDTH_CLASS: Record<PageWidth, string> = {
  standard: 'max-w-content',
  reading: 'max-w-reading',
  wide: 'max-w-wide',
  analytics: 'max-w-analytics',
  focused: 'max-w-focused',
};

export function PageContainer({
  children,
  className = '',
  width = 'standard',
}: {
  children: ReactNode;
  className?: string;
  /** Semantic content width — do not use for every page the same way */
  width?: PageWidth;
}) {
  return (
    <div
      className={`px-4 sm:px-6 lg:px-8 py-4 sm:py-6 ${PAGE_WIDTH_CLASS[width]} mx-auto w-full ${className}`}
    >
      {children}
    </div>
  );
}

/** Consistent screen title + optional subtitle / purpose line */
export function ScreenHeader({
  title,
  subtitle,
  purpose,
  className = '',
  actions,
}: {
  title: string;
  subtitle?: string;
  purpose?: string;
  className?: string;
  actions?: ReactNode;
}) {
  return (
    <div className={`mb-5 sm:mb-8 ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-[1.75rem] font-semibold text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-slate-600 mt-1 text-sm sm:text-[0.9375rem] leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
          {purpose && (
            <p className="text-sm text-slate-500 max-w-2xl mt-2 leading-relaxed">{purpose}</p>
          )}
        </div>
        {actions && <div className="flex flex-wrap gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
}

/** Uppercase section label used above card groups */
export function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[0.8125rem] font-medium text-slate-600 tracking-normal mb-2.5 ${className}`}>
      {children}
    </p>
  );
}

const CARD_ELEVATION = {
  /** Border only — nested rows, dense lists */
  flat: 'shadow-none',
  /** Default surface */
  raised: 'shadow-card',
  /** Clickable / selectable — lifts on hover */
  interactive:
    'shadow-card cursor-pointer transition-all duration-medium hover:border-slate-300 hover:shadow-card-hover active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
  /** Featured / CTA cards */
  hero: 'shadow-card-hover ring-1 ring-brand-100/80',
} as const;

export type CardElevation = keyof typeof CARD_ELEVATION;

export function Card({
  children,
  className = '',
  style,
  interactive = false,
  elevation,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** @deprecated Prefer elevation="interactive" */
  interactive?: boolean;
  /** Elevation ladder: flat | raised | interactive | hero */
  elevation?: CardElevation;
  onClick?: () => void;
}) {
  const level: CardElevation =
    elevation ?? (interactive || onClick ? 'interactive' : 'raised');
  const Comp = onClick ? 'button' : 'div';
  return (
    <Comp
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={[
        'bg-white rounded-card border border-slate-200 text-left w-full',
        CARD_ELEVATION[level],
        className,
      ].join(' ')}
      style={style}
    >
      {children}
    </Comp>
  );
}

/** Consistent clickable list row for topics, weak areas, review items */
export function ListRow({
  children,
  onClick,
  className = '',
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        'w-full flex items-center gap-3 px-3 py-2 rounded-btn text-left',
        'transition-colors duration-DEFAULT',
        'hover:bg-slate-50 active:bg-slate-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
        'min-h-touch',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}

export function ProgressBar({
  value,
  max = 100,
  color = 'sky',
  colorClass,
  size = 'md',
  ariaLabel,
}: {
  value: number;
  max?: number;
  color?: 'sky' | 'green' | 'amber' | 'red';
  colorClass?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Accessible name — defaults to "X% complete"; pass e.g. "X% accuracy" for non-completion bars */
  ariaLabel?: string;
}) {
  const pct = max > 0 ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0;
  const colors = {
    sky: 'bg-brand-500',
    green: 'bg-success-500',
    amber: 'bg-warning-500',
    red: 'bg-danger-500',
  };
  const fillClass = colorClass ?? colors[color];
  const height = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-2.5' : 'h-2';
  return (
    <div
      className={`${height} bg-slate-200/80 rounded-full overflow-hidden`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel ?? `${pct}% complete`}
    >
      <div
        className={`h-full ${fillClass} rounded-full transition-all duration-slow ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/** Unified status icon (Lucide). Prefer TopicStatusIcon name in new code. */
export function StatusIcon({ status }: { status: 'not_started' | 'studied' | 'mastered' }) {
  if (status === 'mastered') return <Star className="w-4 h-4 text-brand-500 fill-brand-500 shrink-0" aria-label="Mastered" />;
  if (status === 'studied') return <CheckCircle2 className="w-4 h-4 text-success-500 shrink-0" aria-label="Studied" />;
  return <Circle className="w-4 h-4 text-slate-300 shrink-0" aria-label="Not started" />;
}

export function EmptyState({
  title,
  message,
  icon,
  action,
}: {
  title: string;
  message: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-14 sm:py-20 px-6 text-center">
      {icon && (
        <div className="mb-5 text-slate-300 flex items-center justify-center w-16 h-16 rounded-card bg-slate-50 ring-1 ring-slate-100/80 shadow-card">
          {icon}
        </div>
      )}
      <h3 className="text-slate-800 font-semibold text-lg mb-1.5 tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm max-w-sm leading-relaxed">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Badge({
  children,
  color = 'slate',
}: {
  children: ReactNode;
  color?: 'slate' | 'sky' | 'green' | 'amber' | 'red';
}) {
  const colors = {
    slate: 'bg-slate-100 text-slate-600',
    sky: 'bg-brand-100 text-brand-700',
    green: 'bg-success-100 text-success-700',
    amber: 'bg-warning-100 text-warning-700',
    red: 'bg-danger-100 text-danger-700',
  };
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  type = 'button',
  ...rest
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'disabled' | 'className'>) {
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm shadow-brand-500/20', // button chrome, not card elevation
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 active:bg-slate-100',
    ghost: 'text-slate-600 hover:bg-slate-100 active:bg-slate-200',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700 shadow-sm shadow-danger-500/20',
  };
  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-2 text-xs rounded-lg min-h-[32px]',
    md: 'px-4 py-2 text-sm rounded-btn min-h-[40px]',
    lg: 'px-5 py-3 text-sm rounded-btn min-h-touch',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-1.5 font-medium transition-all duration-DEFAULT touch-manipulation',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Tabular mono for scores, timers, percentages */
export function StatValue({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`font-mono tabular-nums tracking-tight ${className}`}>
      {children}
    </span>
  );
}

export function ActionCard({
  children,
  className = '',
  borderColorClass = 'border-l-brand-500',
  style,
  elevation,
}: {
  children: ReactNode;
  className?: string;
  borderColorClass?: string;
  style?: CSSProperties;
  elevation?: CardElevation;
}) {
  return (
    <div
      className={`bg-white rounded-card border border-slate-200 border-l-4 ${borderColorClass} ${CARD_ELEVATION[elevation]} p-3.5 sm:p-6 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function PurposeLine({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-sm text-slate-500 italic max-w-2xl mb-3 sm:mb-6 leading-snug sm:leading-relaxed ${className}`}>{children}</p>
  );
}

/** Alias — same as StatusIcon (kept for existing imports) */
export function TopicStatusIcon({ status }: { status: 'not_started' | 'studied' | 'mastered' }) {
  return <StatusIcon status={status} />;
}

export function StreakIndicator({ streak, atRisk = false }: { streak: number; atRisk?: boolean }) {
  if (streak === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 text-sm font-medium ring-1 ring-slate-100">
        Study today to start a streak!
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
        atRisk
          ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60'
          : 'bg-orange-50 text-orange-600 ring-1 ring-orange-100'
      }`}
    >
      <Flame className="w-4 h-4" />
      {streak}-day streak{atRisk ? ' (at risk)' : ''}
    </span>
  );
}

export function AchievementBadge({
  title,
  description,
  unlocked,
  unlockDate,
  subjectId,
}: {
  title: string;
  description: string;
  unlocked: boolean;
  unlockDate?: string;
  subjectId?: string;
}) {
  const color = subjectId ? getSubjectColor(subjectId) : null;
  if (unlocked) {
    return (
      <div
        className={`rounded-2xl border p-4 text-center transition-shadow shadow-card hover:shadow-card-hover ${
          color ? `${color.tint} border-transparent` : 'bg-success-50 border-success-100'
        }`}
      >
        <div
          className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
            color ? color.bar : 'bg-success-500'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <p className="font-semibold text-slate-900 text-sm">{title}</p>
        <p className="text-slate-500 text-xs mt-1">{description}</p>
        {unlockDate && <p className="text-slate-500 text-xs mt-1.5">Unlocked {unlockDate}</p>}
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-slate-200 p-4 text-center bg-slate-50/80">
      <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center bg-slate-200">
        <Lock className="w-5 h-5 text-slate-500" />
      </div>
      <p className="font-semibold text-slate-500 text-sm">{title}</p>
      <p className="text-slate-500 text-xs mt-1">Locked — {description}</p>
    </div>
  );
}

/** Icon button with consistent 44px touch target for header / toolbars */
export function IconButton({
  children,
  onClick,
  label,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={[
        'flex items-center justify-center w-11 h-11 rounded-btn',
        'text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200',
        'transition-colors duration-DEFAULT touch-manipulation',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
