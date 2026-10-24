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
- Visual baselines must be captured and reviewed in a real browser before being accepted as references; do not generate expected snapshots from an unverified or broken UI.

## Migration order

1. Token foundation and shared component primitives.
2. Product shell and canonical branding.
3. Route-group migrations, preserving behavior and using screenshots at 390px and 1280px.
4. Tighten lint enforcement as legacy raw buttons, palette classes, and arbitrary sizes are migrated.
