# My Study Brand System

This document records the shared visual tokens so UI work stays coherent and accessible.

## Color roles

The shared RGB-channel tokens live in `src/index.css`. Tailwind's `brand`, `success`, `warning`, and `danger` scales reference those variables in `tailwind.config.js`, including opacity modifiers.

| Token family | Intended use |
| --- | --- |
| `brand-50`–`brand-200` | Soft selection surfaces and subtle highlights |
| `brand-500`–`brand-700` | Brand accents; use `brand-700` or darker for white-text controls and `brand-600` for focus rings |
| `brand-800`–`brand-900` | High-contrast brand text on light surfaces |
| `success-*` | Correct answers and positive status |
| `warning-*` | Caution and attention-needed states |
| `danger-*` | Errors, incorrect answers, and destructive actions |
| `surface-*` | Page, card, and muted backgrounds |
| `text-primary`, `text-muted`, `border-subtle` | Neutral content and structure |

Use `success-700`, `warning-700`, and `danger-600/700` for white-text controls. Reserve lighter status values for accents unless contrast has been checked. Pair status colors with text, an icon, or another non-color cue. Track accents should map to semantic families rather than introduce one-off hex colors.

## Typography and components

- Use the shared Inter/system sans stack.
- Keep a clear title → purpose/subtitle → section-label hierarchy.
- Keep long-form study content at a comfortable reading width and line height.
- Use shared Card, Button, ListRow, ProgressBar, and EmptyState components where possible.
- Use shared card/button radii and restrained shadows.
- Keep keyboard-operable controls visibly focused and touch targets at least 44px where practical.

## Icons and motion

- Use Lucide icons from the existing dependency; do not mix emoji or a second icon family into controls.
- Give icon-only controls an accessible name; hide decorative icons from assistive technology when nearby text conveys their meaning.
- Honor `prefers-reduced-motion`; animation must not be required to understand state.

## Accessibility verification

- Maintain WCAG AA contrast for normal text (4.5:1) and large text (3:1).
- Do not rely on color alone to distinguish active, correct/incorrect, success, or error states.
- Dialogs must move focus inside when opened, keep sequential focus contained, close on Escape when appropriate, and restore focus to the trigger.
- Verify keyboard behavior and dense learning blocks at narrow viewport widths. Automated tests complement, but do not replace, manual visual review.
