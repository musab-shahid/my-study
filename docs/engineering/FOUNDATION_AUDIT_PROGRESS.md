# Foundation audit progress

## Merged

| PR | SHA | Delivered |
|----|-----|-----------|
| #151 | `76f6616` | Design-system whole-tree ratchet; CI net-new uses PR head; Settings typecheck/e2e; AuthAccountCard shared Button |
| #152 | `c1bb72e` | Contrast CI (text-on-surface); expired access-token gate; pure access-token tests; skip net-new on main push |
| #153 | `48ab510` | Install/Update CTA brand-700; Settings token-expired copy; mid-tone white-text 6→4 |

## This branch (`fix/foundation-session-refresh-a11y`)

- Persist Supabase **refresh_token** beside access token (`session-tokens.ts`).
- `refreshSession()` via Auth REST `grant_type=refresh_token`.
- Cloud push/pull call `ensureFreshAccessToken()` and refresh once when access JWT is expired.
- UpdatePrompt: region label, `aria-busy` / `aria-label` on restart, non-decorative icon marking.
- Unit tests for session token storage.

## Explicitly not claimed complete

- **Manual screen-reader verification** on a real device/AT (code affordances improved; no VoiceOver/NVDA run in CI).
- **Wholesale branding PR #6** (divergent history — not merged).
- **Full slate→semantic neutral migration** (ratchet holds the line; ~1000 raw neutral classes remain).
- **Production auth soak** against a live Supabase project (refresh path is implemented and unit-tested at the storage layer only).
