import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], area[href], button, input:not([type="hidden"]), select, textarea, iframe, object, embed, [contenteditable="true"], [tabindex]';

/** Return visible, enabled elements that can participate in sequential keyboard focus. */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => {
    if (el.hasAttribute('disabled') || el.getAttribute('aria-hidden') === 'true') return false;
    if (el.closest('[inert], [aria-hidden="true"]')) return false;
    if (el.tabIndex < 0) return false;
    return el.getClientRects().length > 0;
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
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const node = containerRef.current;

    const focusInitial = () => {
      const target = initialFocusRef?.current ?? (node ? getFocusableElements(node)[0] : undefined);
      (target ?? node)?.focus();
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
      const focusEscaped = !container.contains(document.activeElement);
      if (focusEscaped || (e.shiftKey && document.activeElement === first)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (!e.shiftKey && document.activeElement === last) {
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
