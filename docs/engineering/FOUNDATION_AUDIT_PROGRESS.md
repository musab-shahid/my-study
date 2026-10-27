# Foundation audit progress

## Merged

- PR #151 (`76f6616`): design-system whole-tree ratchet, CI net-new range uses PR head (not merge commit), Settings typecheck/e2e, AuthAccountCard uses shared `Button`.

## This branch

- Expand `scripts/check-contrast.mjs` to text-on-surface pairs; wire `npm run check:contrast` into CI `check` job.
- Reject expired Supabase access tokens in `progress-sync` (`token-expired`) before cloud push/pull.
- Unit tests for JWT expiry helper.

## Still open (not claimed done)

- Full branding refresh (do not merge divergent PR #6 wholesale).
- Manual screen-reader pass on UpdatePrompt / study shell.
- Real Supabase refresh-token rotation (client currently stores access token only).
- Systematic slate→semantic neutral migration (ratchet holds the line; debt remains).
