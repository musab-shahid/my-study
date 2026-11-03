import { useEffect, useRef, useState } from 'react';

/**
 * Move focus and announce a destination after a meaningful route transition.
 * The caller's key excludes transient filter/tab parameters but includes
 * content identity and the structural parent route.
 */
export function useRouteAnnouncer(routeKey: string, title: string): string {
  const previousRouteKey = useRef(routeKey);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (previousRouteKey.current === routeKey) return;
    previousRouteKey.current = routeKey;

    const main = document.getElementById('main-content');
    if (!main) return;

    let observer: MutationObserver | null = null;
    let frame = 0;
    let cancelled = false;

    const hasOpenModal = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"][aria-modal="true"]')).some(
        (dialog) =>
          dialog.getClientRects().length > 0 &&
          window.getComputedStyle(dialog).visibility !== 'hidden',
      );

    const focusDestination = () => {
      if (cancelled) return true;

      const heading = main.querySelector<HTMLElement>('h1');
      const pageName = heading?.textContent?.trim() || title;

      // Announce route changes behind a modal without stealing its focus.
      if (hasOpenModal()) {
        setAnnouncement(pageName ? `Navigated to ${pageName}` : 'Page changed');
        return true;
      }

      // Wait for lazy screens to replace their loading status before choosing
      // the heading; main is the safe fallback for screens without an h1.
      const loadingStatus = main.querySelector<HTMLElement>('[role="status"]');
      if (!heading && loadingStatus?.textContent?.includes('Loading study material')) return false;

      if (heading && !heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
      (heading ?? main).focus({ preventScroll: true });
      setAnnouncement(pageName ? `Navigated to ${pageName}` : 'Page changed');
      return true;
    };

    observer = new MutationObserver(() => {
      if (focusDestination()) observer?.disconnect();
    });
    observer.observe(main, { childList: true, subtree: true });
    frame = window.requestAnimationFrame(() => {
      if (focusDestination()) observer?.disconnect();
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [routeKey, title]);

  return announcement;
}
