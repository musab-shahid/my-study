# My Study

Learning and assessment app for multi-track study (CGEI curriculum and civil-service exam preparation).

## Status

- TypeScript typecheck clean
- Unit tests and data validators enforced in CI
- Production build with bundle budget check
- Design-system guard, secret scan, and content evidence gates in CI

## Local development

```bash
npm install
npm run dev
```

Useful scripts:

| Script | Purpose |
| --- | --- |
| `npm run typecheck` | TypeScript |
| `npm test` | Unit tests |
| `npm run lint` | ESLint |
| `npm run build` | Production build + bundle budget |
| `npm run validate:data` | Curriculum / question / traceability validators |
| `npm run check:design-system` | Net-new design-system guard on the latest diff |
| `npm run test:e2e` | Playwright e2e (requires `npm run test:e2e:install`) |

## Cloud features

Cloud backup and the cloud AI tutor require a Supabase Auth session. Without a session token, cloud backup controls stay disabled and the cloud tutor path returns “Sign in required”. Local study, quizzes, and offline progress continue to work without sign-in.

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (see `.env.example`). Provider keys for the AI proxy are edge-function secrets only and are never bundled in the client.

## Accessibility

Contrast against WCAG AA, keyboard focus, and shared UI primitives are project acceptance criteria. Prefer semantic tokens (`--text-muted`, brand/success/warning/danger steps) over raw slate/sky palette classes for text.

## License

No license file is published yet. All rights reserved unless a license is added.
