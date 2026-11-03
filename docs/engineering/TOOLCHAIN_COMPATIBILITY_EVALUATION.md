# Toolchain compatibility evaluation

**Date:** 2026-11-04  
**Evidence run:** GitHub Actions run `41731230229` (React 19 lane passed; ESLint 10 lane failed on the reported diagnostics).
**Scope:** isolated evaluation only; no production dependency or lockfile changes.

## React 19

| Item | Result |
|---|---|
| Runtime | `react@19.3.1`, `react-dom@19.3.1` |
| Types | `@types/react@19.3.0`, `@types/react-dom@19.3.0` |
| Environment | Node 22.23.4, npm 10.9.9 |
| Install | Pass |
| Unit tests | 540 passed, 1 skipped, 0 failed |
| `npm run typecheck` | Pass |
| `npm run build` | Pass |
| Playwright E2E | 135 passed |

**Decision:** React 19 passes the complete unit, typecheck, build, and Playwright E2E checks in the isolated dependency swap. This is strong compatibility evidence, but it is still not an automatic production upgrade authorization: keep the lockfile unchanged until a separately reviewed upgrade PR runs the required checks on its exact head and verifies supported browsers/real-device behavior.

The React 19 lane intentionally excludes Lighthouse from the experimental package install so that unrelated transitive tool typings do not contaminate the React-only compatibility result. No React 19 Lighthouse claim is made.

## ESLint 10

| Item | Result |
|---|---|
| ESLint | `eslint@10.14.0` |
| Core config | `@eslint/js@10.0.1` |
| TypeScript integration | `typescript-eslint@8.72.1` |
| React Hooks plugin | `eslint-plugin-react-hooks@7.1.1` |
| Install | Pass |
| Existing `npm run lint` | Fail: 45 errors, 104 warnings |

The first install attempt exposed the expected peer conflict: the locked `eslint-plugin-react-hooks@5.2.0` declares ESLint support only through v9. The current React Hooks plugin v7.1.1 adds ESLint 10 peer support, so the evaluation used it rather than bypassing npm's peer-dependency check.

With the supported plugin, lint executes but the newer recommended rules report significant existing debt. The 45 errors include:
- ESLint 10 recommended-core changes such as `no-useless-assignment` and `preserve-caught-error`.
- React Hooks Compiler diagnostics such as `react-hooks/set-state-in-effect`, `react-hooks/purity`, `react-hooks/refs`, and `react-hooks/preserve-manual-memoization`.

These are not safe to silence wholesale. Each finding needs a behavior-aware fix or a narrowly justified rule decision. The experiment intentionally did not modify the production ESLint config or disable any rule.

**Decision:** do not upgrade ESLint 10 as a version-only change. First plan a separate React Hooks plugin/config migration and triage the new diagnostics, then rerun the full lint suite and existing CI.

## Reproducibility and scope

The compatibility workflow starts from `npm ci` and installs experimental versions with `--no-save --package-lock=false`. Neither `package.json` nor `package-lock.json` is changed by the experiment. The workflow is scoped to the compatibility branch and is not part of required production CI.
