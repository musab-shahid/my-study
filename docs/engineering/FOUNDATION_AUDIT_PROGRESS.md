# Foundation audit progress

## Merged into main

| PR | Merge tip | Delivered |
|----|-----------|-----------|
| #151 | `76f6616` | Design-system whole-tree ratchet; CI net-new uses PR head; Settings typecheck/e2e |
| #152 | `c1bb72e` | Contrast CI; expired access-token gate; skip net-new on main push |
| #153 | `48ab510` | Install/Update CTA brand-700; Settings token-expired copy |
| #154 | `e901e1e` | refresh_token + refreshSession; cloud ensureFreshAccessToken; UpdatePrompt a11y/e2e |

## This branch

- ErrorBoundary: shared `Button` primitives; danger icon uses `danger-600`; canonical focus via Button.
- InstallPrompt: decorative download icon `aria-hidden`.
- Design-system baseline regenerated after raw-button reduction.

## Still not claimed complete

- Manual screen-reader verification on real AT.
- Divergent branding PR #6 (do not merge wholesale).
- Full slate→semantic neutral migration (~1000 raw neutral classes; ratchet holds the line).
- Live Supabase production soak of refresh flow.
