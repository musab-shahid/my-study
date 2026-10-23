import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Trap focus inside a container while open; restore focus to the prior element on close.
 * Optional initialFocusRef focuses a specific control when the trap activates.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  open: boolean,
  options?: {
    initialFocusRef?: RefObject<HTMLElement | null>;
    /** Called on Escape (e.g. close modal) */
    onEscape?: () => void;
  },
): void {
  const { initialFocusRef, onEscape } = options ?? {};
  const onEscapeRef = useRef(onEscape);

  // Keep the current callback without restarting the focus-trap effect when callers
  // provide an inline callback. Restarting would restore focus during ordinary renders.
  useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const node = containerRef.current;

    const focusInitial = () => {
      const target = initialFocusRef?.current ?? node?.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
    };
    // Defer so dialog content is mounted
    const t = window.setTimeout(focusInitial, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onEscapeRef.current?.();
        return;
      }
      if (e.key !== 'Tab' || !containerRef.current) return;
      const focusable = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, containerRef, initialFocusRef]);
}
