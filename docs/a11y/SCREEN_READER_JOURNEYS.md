# Screen-reader verification journeys

Human time-boxed pass (NVDA+Firefox/Chrome, TalkBack+Chrome, optional VoiceOver+Safari).
Do not mark the foundation accessibility item complete until this log has zero blockers
and zero majors on journeys 4, 5, 7, and 9.

| # | Journey | Pass if |
|---|---------|---------|
| 1 | Skip link and landmarks | Skip link first; lands in main; landmarks list navigation + main |
| 2 | Home → subject → topic | One clear page heading; outline makes sense |
| 3 | Learning Outcomes disclosure | Collapsed/expanded announced; Enter/Space toggles |
| 4 | Quick quiz, keyboard only | Question/options announced; feedback announced; results readable |
| 5 | Keyboard-help dialog | Focus inside; Escape closes; focus returns to trigger |
| 6 | Mobile More sheet (TalkBack) | Focus trapped; Escape/back closes; destination announced |
| 7 | AI tutor | Reply announced once; errors announced; counter not re-read every keystroke |
| 8 | Math (KaTeX) | Formula reads as meaningful math |
| 9 | Settings and sign-in | Labels; errors announced; disabled buttons explain why |
| 10 | Update and install prompts | Announced; Restart/Install reachable and named |

## Findings log

| Date | # | AT + browser | Expected | Actual | Severity | Fixed in |
|------|---|--------------|----------|--------|----------|-----------|
| | | | | | | |

Severity: **Blocker** (task impossible) · **Major** (completed with real difficulty) · **Minor**

Exit criteria: zero blockers; zero majors on 4, 5, 7, 9; all fixes retested on the same setup.
