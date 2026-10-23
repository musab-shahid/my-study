# ExamPrep Hub Brand System

This document records the visual tokens used by the app so future UI work stays coherent rather than accumulating one-off colors and styles.

## Brand character

- **Clear and calm:** prioritize legibility and task focus over decorative gradients or competing visual effects.
- **Trustworthy:** use deep blue for navigation, focus, links, and primary actions.
- **Progress-oriented:** use green for successful completion, amber for caution, and red for errors or destructive actions.
- **Content-first:** keep learning and reading surfaces neutral; reserve stronger color for actions, status, and orientation.

## Color roles

The shared RGB-channel tokens live in `src/index.css`. Tailwind's `brand`, `success`, `warning`, and `danger` scales reference those variables in `tailwind.config.js`.

| Token family | Intended use |
| --- | --- |
| `brand-50`–`brand-200` | Soft selection surfaces, quiet badges, and subtle highlights |
| `brand-500`–`brand-700` | Brand accents; use `brand-700` or darker for white-text controls, and `brand-600` for focus rings |
| `brand-800`–`brand-900` | High-contrast brand text on light surfaces |
| `success-*` | Correct answers, successful completion, and positive status |
| `warning-*` | Caution, at-risk status, and attention-needed states |
| `danger-*` | Errors, incorrect answers, and destructive actions |
| `surface-*` | Page, card, and muted backgrounds |
| `text-primary`, `text-muted`, `border-subtle` | Neutral content and structure |

Use `success-700`, `warning-700`, and `danger-600/700` for white-text controls; reserve the lighter `*-500` values for accents unless contrast has been checked. Do not use status colors as decoration alone. Pair important status colors with text, an icon, or another non-color cue. Track-specific accents should map to these semantic families instead of introducing unrelated one-off hex colors.

## Typography and reading

- Use the shared Inter/system sans stack for application UI.
- Use clear title → purpose/subtitle → section-label hierarchy; avoid repeating the same title in both the sticky header and the page body.
- Keep long-form study content at a comfortable reading width and line height.
- Use tabular numerals for scores, percentages, timers, and other values that need visual comparison.

## Components and shape

- Use the shared `Card`, `Button`, `ListRow`, `ProgressBar`, and `EmptyState` components before inventing a screen-specific variant.
- Use the shared card and button radii and the restrained shadow scale.
- Reserve the hero elevation for one primary focal area; most content should use flat or raised surfaces.
- Keep touch targets at least 44px where practical, with visible focus rings on keyboard-operable controls.

## Icons

- Use Lucide icons from the existing dependency.
- Keep icon size and stroke weight consistent within a control group.
- Give icon-only controls an accessible name; decorative icons should be hidden from assistive technology when their meaning is already conveyed by text.
- Avoid adding a second icon style or emoji-based icon system to application navigation.

## Motion and accessibility

- Honor `prefers-reduced-motion`; animation must not be required to understand state.
- Use the shared focus token for keyboard focus and preserve a visible focus indicator.
- Maintain text contrast and do not rely on color alone to distinguish correct/incorrect, active/inactive, or success/error states.
- Verify dense learning blocks, quiz feedback, and fixed mobile navigation at narrow viewport widths before treating a visual pass as complete.
