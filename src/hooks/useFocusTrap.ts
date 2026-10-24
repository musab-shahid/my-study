import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], area[href], button, input:not([type="hidden"]), select, textarea, iframe, object, embed, [contenteditable="true"], [tabindex]';

/** Return visible, enabled elements that can participate in sequential keyboard focus. */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => {
    if (el.matches(':disabled') || el.getAttribute('aria-hidden') === 'true') return false;
    if (el.closest('[inert], [aria-hidden="true"]')) return false;
    if (el.tabIndex < 0) return false;

    // getClientRects alone includes visibility:hidden elements and descendants of
    // visibility-hidden containers, which must not become trap boundaries.
    if (el.getClientRects().length === 0) return false;
    let current: HTMLElement | null = el;
    while (current && current !== container) {
      if (window.getComputedStyle(current).visibility === 'hidden') return false;
      current = current.parentElement;
    }
    return true;
  });
}

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
  // Keep the latest callback without restarting the trap when callers render inline handlers.
  const onEscapeRef = useRef(onEscape);
  useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const node = containerRef.current;

    const focusInitial = () => {
      const requested = initialFocusRef?.current;
      const target =
        requested && node && getFocusableElements(node).includes(requested)
          ? requested
          : node
            ? getFocusableElements(node)[0] ?? node
            : undefined;
      target?.focus();
    };
    // Defer so dialog content is mounted.
    const t = window.setTimeout(focusInitial, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onEscapeRef.current?.();
        return;
      }
      if (e.key !== 'Tab' || !containerRef.current) return;

      const container = containerRef.current;
      const focusable = getFocusableElements(container);
      if (focusable.length === 0) {
        e.preventDefault();
        container.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const focusEscaped = !container.contains(active);
      const activeIsNotFocusable = active !== container && !focusable.includes(active as HTMLElement);

      if (focusEscaped || activeIsNotFocusable) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && (active === first || active === container)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [open, containerRef, initialFocusRef]);
}
