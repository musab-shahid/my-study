# UI Consistency Rules

Enforced by `check:contrast`, `check:design-system`, and the patterns below.

## 1. Page headings

- **Default pages** (Dashboard, Settings, Learn subject hub, Progress, Search, etc.):
  use `ScreenHeader` from `@/components/ui` + the page-title type scale. Do not
  reinvent a heading hierarchy with raw `<h1>`/`<h2>` + ad-hoc classes.
- **Focused task surfaces** (active quiz question): may use a single dominant
  `h1` for the question stem. Quiz is an exception because the question itself
  is the heading — there is no page title competing for attention. Document any
  other exception here before shipping it.
- **Curriculum lesson views**: use `ScreenHeader` or the same title scale as the
  Learn subject hub. Do not introduce a third ad-hoc hierarchy.

## 2. Buttons

- Ordinary interactive primary/secondary/ghost/danger actions use the shared
  `Button` / `IconButton` from `@/components/ui`.
- Native `<button>` is allowed only for specialized controls (disclosure
  summaries, map chrome, drag handles) and must still use the canonical focus
  ring + min touch target patterns (`focus-visible:ring-2 focus-visible:ring-brand-*`,
  `min-h-touch-*`).
- Do not duplicate `Button` visuals with weaker focus/disabled states.

## 3. Badges and chips

- Semantic token pairs only — e.g. `text-success-700 bg-success-100`,
  `text-warning-700 bg-warning-100`, `text-danger-700 bg-danger-100`.
- No raw `emerald-*`, `sky-*`, `blue-*` utility pairs on badges/labels. These
  bypass the contrast gate (the checker only reads CSS custom properties, not
  arbitrary Tailwind utilities) and have historically failed WCAG AA.
- Small text badges (≤10px) must use a ≥4.5:1 pair. Prefer darker text tokens
  (`*-700`) over mid-tones (`*-500`/`*-600`).

## 4. AI tutor chrome

Rule: **deliberately neutral brand chrome**. The tutor is a cross-cutting tool
available across all tracks, so its chrome uses shared brand semantic tokens
(`brand-700` → `brand-900` gradient, `brand-700` text/buttons) independent of
the active track. This avoids track-resolution complexity and keeps contrast
AA-validated via the semantic token gate.

No track-specific accent (sky/indigo/teal) gradients in the tutor launcher,
panel header, or message bubbles.

## 5. Track lists in navigation

- All track lists (sidebar, mobile More tray, any future surface) derive from
  the canonical registry (`src/data/tracks.ts` via `allTrackIds()` /
  `listTrackDefinitions()`). No hardcoded per-track arrays.
- Track icons come from `trackIcon(trackId)`; track accent classes come from
  `trackAccentClasses(trackId)` or `getTrackStyle(trackId)`.
- The mobile More tray label is "Learning tracks" (not "Exam tracks"), since
  CGEI is a pathway programme, not a single exam.
