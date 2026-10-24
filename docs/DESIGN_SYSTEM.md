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
