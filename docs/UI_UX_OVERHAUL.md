# UI/UX Overhaul

## Goal

Improve the existing ExamPrep Hub experience without replacing established study, quiz, routing, enrollment, offline, or progress behavior.

## Product surfaces found in the current app

- Dashboard and active-track workspace
- Track discovery and track overview
- Structured study, sections, and topics
- Practice modes, quizzes, and mock exams
- Flashcards, formula vault, and spaced revision
- Progress and weak-topic insights
- Search, settings, and Cloud Atlas
- Responsive desktop sidebar and mobile navigation
- Offline state, install/update prompts, and local backup handling

## UX principles

1. **Clear next action:** each screen should make the main task obvious.
2. **Workspace context:** keep the active track and exam profile understandable without repeating too much chrome.
3. **Consistent visual language:** shared spacing, surface, typography, border, focus, and interaction states.
4. **Responsive by design:** preserve comfortable touch targets and prevent content from hiding behind fixed mobile navigation.
5. **Accessible interactions:** visible keyboard focus, reduced-motion support, readable contrast, and semantic controls.
6. **Protect learner data:** do not change progress calculations, saved quiz sessions, enrollment rules, or storage behavior as part of visual work.
7. **Progressive enhancement:** refine reusable components before making large screen-specific changes.

## Initial audit observations

- The project already has a reusable UI layer and a large set of feature screens; avoid introducing a parallel design system.
- Global CSS already defines surface tokens, reduced-motion handling, mobile safe-area helpers, and formula styling.
- Navigation has a dense hierarchy (tracks, subjects, stages, and tools); visual clarity and current-location feedback are important review targets.
- The dashboard includes adaptive recommendations, resume-quiz behavior, daily review, progress, and track switching. Preserve these actions and data flows.
- Screenshots are already present in the repository and can serve as a baseline for future before/after review.

## Work started

- Added a stronger global keyboard-focus indicator and base interaction affordances.
- Improved base text rendering and set an explicit minimum viewport width.
- Refined the sticky header so workspace context remains visible on small screens.
- Reworked the dashboard's primary action into a clearer, calmer visual focal point and improved progress-card spacing.
- Aligned the desktop sidebar width with the app shell's `lg:ml-64` content offset to remove the unintended 16px mismatch.
- Preserved existing color tokens, reduced-motion behavior, safe-area helpers, and KaTeX formula styling.
- Improved mobile navigation state feedback, track-aware active styling, expandable subject semantics, and the More toggle behavior.
- Polished subject-discovery cards and section/topic rows with consistent keyboard focus, touch-friendly actions, and more readable topic titles.
- Added explicit expanded-state relationships to the section accordion and strengthened the Continue Reading action’s focus and touch affordances.

## Next implementation passes

- [x] First-pass review of desktop sidebar sizing and mobile header context.
- [x] Refine dashboard hierarchy: next action, resume state, and progress-card spacing.
- [x] Review and refine mobile navigation state feedback and expanded subject hierarchy semantics.
- [x] Make a first shared-button focus-state cleanup and refine subject/section card interactions.
- [ ] Audit remaining shared cards, section headers, empty states, and form controls for consistency.
- [ ] Check study and quiz reading comfort, especially dense content and long questions.
- [ ] Verify small-screen layouts and fixed-navigation clearance.
- [ ] Run data validation, unit tests, type checks, lint, production build, and end-to-end tests where available.
- [ ] Capture updated desktop/mobile screenshots and review differences before opening a pull request.

## Safety boundary

All work for this initiative belongs on `feature/ui-ux-overhaul`. Do not merge into `main` without explicit owner approval.
