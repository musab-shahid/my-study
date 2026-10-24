/**
 * Browser installation prompts are one-shot events. Keep both the global
 * banner and Settings from attempting to consume the same event.
 */
const claimedPrompts = new WeakSet<Event>();

export const INSTALL_PROMPT_CONSUMED_EVENT = 'examprep:install-prompt-consumed';

export function claimInstallPrompt(promptEvent: Event): boolean {
  if (claimedPrompts.has(promptEvent)) return false;
  claimedPrompts.add(promptEvent);

  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(
        new CustomEvent<Event>(INSTALL_PROMPT_CONSUMED_EVENT, { detail: promptEvent }),
      );
    } catch {
      // Claiming the one-shot event is still effective if notification fails.
    }
  }

  return true;
}
