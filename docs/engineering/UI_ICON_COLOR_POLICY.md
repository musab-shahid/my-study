# UI icon and color policy

## Logo
- **One mark:** open book + check on brand-700 (`#0369a1`).
- **Sources:** `public/favicon.svg` and `src/components/ui/BrandMark.tsx` share the same geometry.
- **AppBrand** renders `BrandMark` (not a separate Lucide logo).
- PWA/Apple PNGs should be raster exports of the same SVG.

## Feature icons
- Canonical map: `src/lib/feature-icons.ts`.
- Desktop sidebar stages, mobile bottom nav, and ToolsTray secondary tools must use this map for shared destinations.
- Subject/track icons remain in `subjects.ts` / track registry.

## Color layers
1. **Product** — `brand-*`, focus ring, AppBrand.
2. **Learning identity** — `getTrackStyle` / subject styles in `subject-colors.ts`.
3. **Status** — success / warning / danger tokens.
4. **Charts only** — `src/lib/chart-colors.ts` hex constants for SVG/canvas.

Ordinary screen chrome should not introduce new raw `sky-*` / `emerald-*` pairs when a semantic or registered subject/track token exists.
