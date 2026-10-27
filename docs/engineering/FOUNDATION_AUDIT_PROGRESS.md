# Foundation audit progress

## Merged earlier

| PR | Delivered |
|----|-----------|
| #151–#155 | Design-system ratchet, contrast CI, session refresh, prompt/ErrorBoundary a11y paydown |

## This branch

- `check:branding` + frozen `legacy-storage-identifiers.json` (16 keys)
- Legacy product text → My Study; track breadcrumbs use track `shortTitle` (FPSC/CGEI/…)
- `security-headers.mjs` write/check; build emits `dist/_headers`; CI runs `check:headers`
- Vite preview serves CSP + nosniff for local e2e alignment
- `.env.example` placeholders only
- Brand consistency unit test (title / apple title / manifest)

## Still open

- Human screen-reader journey log
- Quiz engine extraction + deeper Study/AI/Quiz Playwright journeys + axe
- Post-deploy curl header checks against production URL
- Report-Only CSP week on real host
