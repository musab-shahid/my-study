# Security policy

## Supported versions

Security fixes are applied on the default branch (`main`) of this repository.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security-sensitive reports.

Email the maintainer with:

- A short description of the issue and impact
- Steps to reproduce or a proof of concept
- Affected URL, commit SHA, or release if known

You should receive an acknowledgement within a few days. Please give us a
reasonable window to investigate before any public disclosure.

## Scope

In scope: authentication, authorization, cloud progress sync, AI proxy, XSS/CSP,
dependency vulnerabilities in production dependencies, and exposure of secrets.

Out of scope: denial of service against third-party providers, social engineering,
and issues that require physical access to an unlocked learner device.

## Known product limitations

- Access and refresh tokens are stored in `localStorage` (documented residual risk;
  mitigated by a strict CSP and short-lived access tokens when configured).
- Password recovery depends on Supabase Auth email delivery being configured in
  the project dashboard.

## Deploy notes

- Edge function `delete-account` must be deployed for self-service cloud account
  deletion. It requires `SUPABASE_SERVICE_ROLE_KEY` (hosted Supabase injects this)
  and must never expose that key to the client.

