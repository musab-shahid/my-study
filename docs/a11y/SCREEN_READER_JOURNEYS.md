# Screen-Reader Verification Log

This file is a log template for the human screen-reader pass. It is the only
checklist item that cannot be automated. Fill it in after running the journeys
below with NVDA + Firefox/Chrome (Windows) and TalkBack + Chrome (Android).
VoiceOver + Safari (iOS) is optional but valuable.

## How to record a finding

Journey number, screen reader + browser, expected, actual, severity:
- **Blocker** — task cannot be completed.
- **Major** — completed with real difficulty.
- **Minor** — annoyance, task still flows.

Exit criteria: zero blockers, zero majors in journeys 4, 5, 7 and 9, and all
fixes retested on the same setup.

## Journeys

| # | Journey | Pass if |
|---|---------|---------|
| 1 | Skip link and landmarks | Skip link is the first stop and lands in main; landmarks list shows navigation and main |
| 2 | Home to subject to topic | One clear page heading per screen; headings outline makes sense |
| 3 | Learning Outcomes disclosure | Announced as collapsed or expanded; Enter or Space toggles it |
| 4 | Quick quiz, keyboard only | Question and options announced; feedback announced without focus jumping; results summary readable |
| 5 | Keyboard-help dialog | Focus moves inside; Escape closes; focus returns to the trigger |
| 6 | Mobile More sheet (TalkBack) | Focus stays inside; back or Escape closes; current destination announced |
| 7 | AI tutor | Reply announced once (not repeated per token); errors announced; counter is not read on every keystroke |
| 8 | Math (KaTeX) | A formula reads as meaningful math, not as visual fragments |
| 9 | Settings and sign-in | Fields have labels; errors announced; disabled backup buttons say why |
| 10 | Update and install prompts | Announced; Restart and Install are reachable and named |

## Results

| # | Setup | Expected | Actual | Severity | Notes |
|---|-------|----------|--------|----------|-------|
|   |       |          |        |          |       |
