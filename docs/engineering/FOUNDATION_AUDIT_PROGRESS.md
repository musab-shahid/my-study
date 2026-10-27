# Foundation audit progress

## Merged

- PR #151 (`76f6616`): design-system whole-tree ratchet, CI net-new range uses PR head, Settings typecheck/e2e, AuthAccountCard shared `Button`.
- PR #152 (`c1bb72e`): contrast CI gate (text-on-surface pairs), expired access-token rejection, pure `access-token.ts` tests, skip net-new on main push/merge.

## This branch

- InstallPrompt / UpdatePrompt primary CTAs: `brand-700` + canonical `ring-brand-700` (no mid-tone `brand-500` gradient with `text-white`).
- Settings cloud backup: humanized messages for `token-expired` / `invalid-token`.

## Still open

- Full branding refresh (do not merge divergent PR #6 wholesale).
- Manual screen-reader pass on UpdatePrompt / study shell.
- Full refresh-token rotation (client still stores access token only).
- Systematic slate→semantic neutral migration (ratchet holds the line; debt remains).
