import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  type ReactElement,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { X } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';

type FieldProps = {
  id?: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

/** Consistent labelled form control with connected hint/error descriptions. */
export function Field({
  id,
  label,
  hint,
  error,
  required = false,
  className = '',
  children,
}: FieldProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const hintId = hint ? controlId + '-hint' : undefined;
  const errorId = error ? controlId + '-error' : undefined;
  const child = isValidElement(children)
    ? children as ReactElement<Record<string, unknown>>
    : null;
  const existingDescription = typeof child?.props['aria-describedby'] === 'string'
    ? child.props['aria-describedby'] as string
    : '';
  const describedBy = [existingDescription, hintId, errorId].filter(Boolean).join(' ') || undefined;
  const control = child
    ? cloneElement(child, {
        id: controlId,
        required: required || child.props.required === true,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : child.props['aria-invalid'],
      })
    : children;

  return (
    <div className={'grid gap-1.5 ' + className}>
      <label htmlFor={controlId} className="text-label text-slate-700">
        {label}
        {required && <span aria-hidden="true" className="ml-1 text-danger-700">*</span>}
      </label>
      {control}
      {hint && <p id={hintId} className="text-caption text-slate-500">{hint}</p>}
      {error && <p id={errorId} role="alert" className="text-caption text-danger-700">{error}</p>}
    </div>
  );
}

type NoticeTone = 'info' | 'success' | 'warning' | 'danger';

const NOTICE_STYLES: Record<NoticeTone, string> = {
  info: 'border-brand-200 bg-brand-50 text-brand-900',
  success: 'border-success-100 bg-success-50 text-success-700',
  warning: 'border-warning-100 bg-warning-50 text-warning-700',
  danger: 'border-danger-100 bg-danger-50 text-danger-700',
};

/** Semantic status feedback with stable spacing and accessible announcement. */
export function Notice({
  tone = 'info',
  title,
  children,
  className = '',
}: {
  tone?: NoticeTone;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={'rounded-card border p-card-pad text-body ' + NOTICE_STYLES[tone] + ' ' + className}
    >
      {title && <p className="font-semibold">{title}</p>}
      <div className={title ? 'mt-1' : ''}>{children}</div>
    </div>
  );
}

type DialogSize = 'sm' | 'md' | 'lg';

const DIALOG_WIDTH: Record<DialogSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

/** Shared modal dialog: focus trap, Escape close, focus restoration and scroll lock. */
export function Dialog({
  open,
  onClose,
  title,
  description,
  size = 'md',
  closeLabel = 'Close dialog',
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: DialogSize;
  closeLabel?: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const handleEscape = useCallback(() => onClose(), [onClose]);

  useFocusTrap(dialogRef, open, { onEscape: handleEscape });

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={'my-auto w-full rounded-card border border-slate-200 bg-white p-card-pad-lg shadow-2xl ' + DIALOG_WIDTH[size]}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 id={titleId} className="text-section-title text-slate-900">{title}</h2>
            {description && <p id={descriptionId} className="mt-1 text-body text-slate-600">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-btn text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
};

/** Controlled, keyboard-operable tabs with a single consistent visual treatment. */
export function Tabs({
  items,
  value,
  onChange,
  label,
  className = '',
}: {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}) {
  const id = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = items.find((item) => item.id === value && !item.disabled)
    ?? items.find((item) => !item.disabled);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const enabled = items.map((item, itemIndex) => ({ item, itemIndex })).filter(({ item }) => !item.disabled);
    if (!enabled.length) return;
    const currentPosition = enabled.findIndex(({ itemIndex }) => itemIndex === index);
    let nextPosition = currentPosition;
    if (event.key === 'Home') nextPosition = 0;
    else if (event.key === 'End') nextPosition = enabled.length - 1;
    else if (event.key === 'ArrowRight') nextPosition = (currentPosition + 1 + enabled.length) % enabled.length;
    else nextPosition = (currentPosition - 1 + enabled.length) % enabled.length;
    const next = enabled[nextPosition];
    onChange(next.item.id);
    refs.current[next.itemIndex]?.focus();
  };

  if (!selected) return null;

  return (
    <div className={className}>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-1 border-b border-slate-200">
        {items.map((item, index) => {
          const active = item.id === selected.id;
          return (
            <button
              key={item.id}
              ref={(node) => { refs.current[index] = node; }}
              type="button"
              role="tab"
              id={id + '-tab-' + item.id}
              aria-selected={active}
              aria-controls={id + '-panel-' + item.id}
              tabIndex={active ? 0 : -1}
              disabled={item.disabled}
              onClick={() => onChange(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={
                'min-h-touch rounded-t-btn border-b-2 px-3 py-2 text-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 ' +
                (active
                  ? 'border-brand-700 text-brand-800'
                  : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900') +
                (item.disabled ? ' cursor-not-allowed opacity-50' : '')
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => {
        const active = item.id === selected.id;
        return (
          <div
            key={item.id}
            role="tabpanel"
            id={id + '-panel-' + item.id}
            aria-labelledby={id + '-tab-' + item.id}
            hidden={!active}
            tabIndex={active ? 0 : -1}
            className="py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
          >
            {active ? item.content : null}
          </div>
        );
      })}
    </div>
  );
}
