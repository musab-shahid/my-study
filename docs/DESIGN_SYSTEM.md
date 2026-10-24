# My Study design system

## Purpose

My Study uses one product-wide interface system with controlled track and subject identities. Consistency means shared hierarchy and behavior, not identical screens.

## Identity layers

1. **Product** — My Study wordmark, core brand palette, typography, surface colors, spacing, component behavior, and accessibility defaults.
2. **Track** — FPSC, HAT, and CGEI use the existing track registry and track-chrome mapping for a small, intentional accent palette.
3. **Subject** — subject-specific accents come from `src/data/subject-colors.ts`. Reuse those mappings; do not create new screen-local palettes.

Track and subject colors identify context and provide restrained highlights. They must not replace semantic success, warning, danger, or neutral colors, and must not be the only way to communicate status. Primary actions, focus behavior, typography, spacing, and component states remain consistent across all tracks.

## Tokens

Tailwind's semantic color utilities resolve from RGB CSS variables in `src/index.css`. Typography and spacing scales are defined in `tailwind.config.js`.

Use the tokens:
- Page headings: `text-page-title` and `text-page-title-lg`
- Section/card headings: `text-section-title` and `text-card-title`
- Body/caption/label: `text-body`, `text-body-sm`, `text-caption`, `text-label`
- Page padding: `px-page-x`, `sm:px-page-x-sm`, `lg:px-page-x-lg`, `py-page-y`
- Shared gaps and padding: `gap-section-gap`, `p-card-pad`, `sm:p-card-pad-lg`, `gap-control-gap`

Avoid arbitrary typography and spacing values when a semantic token fits. The current app has legacy one-off classes; migrate them by route group rather than changing every screen in a single risky pass.

## Component policy

Prefer the shared components in `src/components/ui` for common controls and layout primitives. A screen may compose variants, but should not redefine the core interaction or visual language. New exceptions should be documented and justified by a real task-specific need.

## Accessibility and regression rules

- Primary actions use the accessible brand-700 fill with white text.
- Focus indicators use the shared focus-ring token on light surfaces; dark surfaces may use a contrast-safe inverse treatment.
- White text on color fills must meet 4.5:1 contrast for normal text.
- Focus indicators and meaningful component boundaries must maintain at least 3:1 contrast against adjacent surfaces.
- Design-token contrast tests run with the unit test suite.
- Playwright captures key routes at 390px and 1280px as reviewable CI artifacts. Do not promote them to golden baselines until a human reviews them; never generate expected snapshots from an unverified or broken UI.

## Migration order

1. Token foundation and shared component primitives.
2. Product shell and canonical branding.
3. Route-group migrations, preserving behavior and using screenshots at 390px and 1280px.
4. Tighten lint enforcement as legacy raw buttons, palette classes, and arbitrary sizes are migrated.


## Shell and page-heading rules

- The application shell owns navigation, product identity, breadcrumb ancestors, and optional workspace/subject context. It does not render a second page title.
- The screen owns its page-level heading. Keep one H1 in the main content region; use H2/H3 for sections.
- The mobile header uses the compact My Study wordmark. Desktop branding remains in the sidebar.
- Breadcrumbs can hide the current item when used beside a page heading; ancestor links remain navigable.
- Page content should use the shared PageContainer width variants instead of inventing a new maximum width or page padding for each screen. Full-bleed track landing pages may retain a documented hero exception.
- Track-specific navigation colors come from the typed track style registry; subject-specific accents come from the subject style registry. Do not branch on color-name substrings in UI components.


## Route-group migration notes: dashboard and tracks

- Dashboard primary and secondary actions use the shared `Button` variants. Keep custom buttons only for controls whose state semantics need a bespoke treatment (for example, the active-workspace switcher).
- Focus-area rows use `ListRow` so pointer, keyboard, target size, and focus behavior stay aligned with other list navigation.
- Track identity should be visible but restrained. Track landing pages use the track registry for the overall accent; subject cards use `getSubjectStyle(subjectId)` for the icon/tint/border identity.
- Use semantic spacing and typography tokens for shared track cards and supporting labels. Subject accent colors do not replace status colors or the product's primary action color.


## Route-group migration notes: Study and Curriculum

- Learn and curriculum pages use the shared page-title scale for their primary heading, and avoid metadata labels below 12px.
- Primary study actions use the shared `Button` variants rather than a subject's saturated fill with white text. Subject colors remain visible in restrained icon, tint, and border treatments.
- Curriculum assessment feedback uses semantic success, danger, and warning tokens. Track accent colors may identify the CGEI curriculum, but must not replace feedback semantics.
- Keep lesson and activity metadata compact but readable; use `text-label` for compact metadata and shared card-padding tokens for common curriculum cards.


## Route-group migration notes: Quiz, Practice, and Flashcards

- Shared primary and secondary actions use `Button`; icon-only actions use `IconButton` with explicit accessible labels.
- Custom quiz-option and listbox controls may remain native buttons where they implement stateful option/listbox semantics, but must keep shared focus-ring, target-size, and disabled-state behavior.
- Practice and quiz headings use the same semantic title scale. Quiz question text uses a focused heading variant so the task remains visually prominent without borrowing dashboard sizing.
- Flashcard filters use shared button variants with a minimum 44px target. The reveal state uses brand surface tokens, not a separate screen-local color family.


## Route-group migration notes: Settings and Search

- Settings displays the canonical product name and tagline; installation and update actions use shared button variants.
- Selection controls expose their pressed state to assistive technology. Track and subject colors remain contextual accents, while selected-state treatment uses the product brand tokens.
- Search results use the shared list-row interaction and the subject's registered accent for the result icon/tint. Search scope, loading, retry, and navigation behavior remain unchanged.
- Remove third-party placeholder social-preview metadata. Do not reintroduce template-brand assets into product metadata; a purpose-designed social image can be added when a verified image asset is available.


## Route-group migration notes: Progress, Revision, Formula Vault, and Cloud Atlas

- Analytics, revision, and formula cards use shared spacing tokens instead of screen-local padding choices.
- Sticky-miss navigation uses `ListRow`; semantic danger/warning colors describe performance signals, while primary navigation remains product-branded.
- Formula metadata uses the shared label scale and the shared focus-ring token; opening a topic uses the common button component.
- Cloud Atlas uses the semantic analytics content width, shared focus-ring contrast, and a 44px close target while retaining its focus-trapped dialog behavior.


## Track landing identity rules

- Every track landing uses the same layout and action hierarchy, with a restrained accent stripe derived from the track registry.
- Track accents identify the track; the primary Begin/Continue action remains product-branded.
- Track-specific accent gradients must be registry-derived, not hard-coded separately in FPSC, HAT, or generic overview screens.
- Subject dots/icons come from the subject registry in every track catalog, including generic track overviews.
- Track icon fills and text accents use darker palette steps on light surfaces to preserve non-text/text contrast; semantic enrollment status stays green.
- Exam-profile controls use the shared product focus ring, regardless of track accent.


## Enforcement and contrast acceptance

- CI runs the design-system guard on each pull request. New UI code may not add raw buttons outside the shared UI layer, arbitrary font sizes, raw track/subject palette colors, white text on mid-tone fills, or non-canonical 500-level focus rings.
- Contrast tests compute WCAG contrast ratios from the actual CSS RGB tokens. They cover primary/muted text on page, raised, and muted surfaces; semantic foregrounds on tinted surfaces; white text on approved action fills; and the canonical focus ring on every shared surface.
- The muted text token is deliberately darker than Slate 500 so small labels have enough contrast. Do not lighten it without updating the measured acceptance tests.
- Exceptions must be narrow and documented in the shared UI or identity registry, not added screen by screen.


## Visual regression review

- CI captures full-page PNG references for the routable screens at 390px and 1280px and uploads them with each E2E run.
- The capture test also checks that each route has exactly one main-content H1 and no document-level horizontal overflow at either viewport.
- These captures are review artifacts, not yet pixel-diff golden baselines. Golden snapshots must be created only from an explicitly reviewed reference set; never auto-update them as part of an ordinary CI run.
- The active quiz is not a shareable URL state by design, so it requires a separate seeded interaction flow before it can be added as a stable visual baseline.
