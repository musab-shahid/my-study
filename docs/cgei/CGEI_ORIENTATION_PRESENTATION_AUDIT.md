# CGEI Architecture, Orientation & Learning-Flow Audit

**Inspected SHA:** `bb5973db16015867e00807a447f24ac46f17e3a2` (`main`)  
**Branch for presentation fixes:** `fix/cgei-orientation-presentation-audit`  
**Date:** 2026-10-26

## 1. Executive summary

The Learn screen mixes **three parallel content systems**:

1. **Canonical CGEI curriculum** (`cgeiCurriculum`): Subject → Course orientation → Units → Lessons.
2. **Legacy Section → Topic** model (`sections.ts`, topic banks) still used for CGEI subjects that have registered sections/topics.
3. **Domain orientation roadmaps** (legacy Topic IDs in `CGEI_OVERVIEW_TOPIC_BY_SUBJECT`) excluded from progress via `isCgeiOverviewTopic`.

Visible “Sections” rows with badges `024`, `025`, `02` are **genuine legacy Section records** (`CGEI-024`, `CGEI-025`, `CGEI-02`), not truncated Learning Unit codes. Badge text is produced by `shortCode(section.id)` (suffix after last `-`).

“Course orientation · not a lesson” was **intentional migration language** (exclude from topic/lesson counts), not a data defect. Learner-facing wording is softened on this branch without changing progress semantics.

## 2. Canonical hierarchy (documented)

From `docs/CGEI_CURRICULUM_ARCHITECTURE.md`:

```text
CGEI Track
└── Subject / Course
    ├── Orientation (overview, audience, prerequisites, outcomes)
    ├── Learning Unit
    │   └── Lesson → content blocks, activities, assessments
    ├── Project / Capstone
    └── Competency map
```

Legacy `Section → Topic → Question` remains a **compatibility layer**. A roadmap/overview is **not** a lesson and must not count toward topic mastery.

## 3. Implemented model vs documentation

| Entity | Intended | Implemented | Classification |
|--------|----------|-------------|----------------|
| Domain orientation | Domain-level context | Legacy roadmap Topic via `overview.ts` (12 subjects) | **Intentional** migration bridge |
| Course orientation | Subject onboarding | `CurriculumSubject` card when registered in `curriculum.ts` (13 subjects) | **Confirmed** |
| Learning units | Canonical units | Rendered inside Course orientation card | **Confirmed** |
| Sections panel | Legacy only / migration | Still shown whenever `sectionsFor(subject)` has topics | **Architecture conflict** for CGEI |
| Progress exclusion | Orientation not counted | `isCgeiOverviewTopic` filters topic counts; curriculum uses separate studied keys | **Confirmed** |

### Domain vs Course orientation

They are **complementary, not synonyms**:

- **Domain orientation** = legacy roadmap Topic (`*-roadmap`), sky-styled card, loaded when `cgeiOverviewTopicIdForSubject` returns an ID.
- **Course orientation** = `cgeiCurriculum.subjects` entry for the same `subjectId`, teal-styled card, includes outcomes + unit list.

### Distribution (14 subjects)

| Subject ID | Domain orient (roadmap) | Course orient (curriculum) | Legacy sections |
|------------|-------------------------|----------------------------|-----------------|
| cgei-env-systems | yes | yes | CGEI-01 |
| cgei-climate-science | **no** | yes | CGEI-024, 025, 02 |
| cgei-geospatial | yes | yes | CGEI-03 |
| cgei-remote-sensing | yes | yes | CGEI-04 |
| cgei-data-science | **no** | yes | CGEI-051 |
| cgei-ml-geoai | yes | yes | CGEI-06 |
| cgei-climate-risk | yes | yes | CGEI-07 |
| cgei-research-practice | yes | yes | CGEI-08 |
| cgei-decision-support | yes | yes | CGEI-09 |
| cgei-climate-policy | yes | yes | CGEI-10 |
| cgei-software-engineering | yes | yes | CGEI-11 |
| cgei-advanced-ai | yes | yes | CGEI-12 |
| cgei-capstone | yes | yes | CGEI-13 |
| cgei-advanced-branches | yes | yes | CGEI-14 |

Missing domain roadmaps for **climate-science** and **data-science** are **likely intentional** (those subjects are further along on the canonical curriculum path); not treated as a defect without a product decision to add roadmaps.

## 4. “Sections” root cause

**Source:** `StudyScreen` → `sd.sectionsFor(subjectId)` filtered to sections that still have topics.

**Badge IDs:** `SectionBadge` → `shortCode('CGEI-024')` → `'024'`. Same for `CGEI-02` → `'02'`.

**Climate Science sections** (`src/data/sections.ts`):

- `CGEI-024` — Climate data products & reanalysis  
- `CGEI-025` — Time, units & daily construction  
- `CGEI-02` — Extremes and trend analysis  

These are **legacy Section IDs**, not Learning Unit codes `2.4` / `2.5` / `2.6`. The uneven numbering (`02` vs `024`) is **data hygiene debt**, not a UI truncation bug.

**Decision applied on this branch:** When a subject has canonical curriculum units, label the panel **“Legacy topic groups”** and explain that units live under Course orientation. Non-CGEI subjects retain **“Sections”**.

## 5. Progress & navigation

- Overview topics excluded from track topic counts (`track-catalog.ts` + `isCgeiOverviewTopic`).
- Curriculum lessons use `sourceTopicId` bridge or `studiedCurriculumLessons`.
- Continue Learning prefers `lastOpenedCurriculumLesson` when applicable.
- Dual orientation cards can both appear; content is not deleted.

## 6. Confirmed defects / actions

| Finding | Severity | Action |
|---------|----------|--------|
| Learner-facing “not a lesson” all-caps feel | Low UX | Softened wording; semantics unchanged |
| “Sections” label on CGEI + dual hierarchy | Medium confusion | Relabel when canonical units exist |
| `CGEI-02` vs `CGEI-024` ID scheme | Low data debt | **Deferred** (stable ID; no silent renumber) |
| Missing domain roadmap for 2 subjects | Unverified gap | **Deferred** (may be intentional) |
| Some unit `subjectId` values use short forms (`cgei-climate`) vs registry (`cgei-climate-science`) | Architecture conflict | **Deferred** — requires dedicated integrity pass |

## 7. Changes in this branch

- `src/screens/StudyScreen.tsx` — orientation labels; Sections → Legacy topic groups when curriculum units exist.
- `src/components/subject/SubjectBadge.tsx` — document `shortCode` behaviour.
- This audit document.

## 8. Deferred

- Collapse domain+course into one card.
- Migrate climate-science legacy sections fully to units-only UI.
- Rename section IDs (would need progress migration plan).
- Accessibility deep-dive with browser tooling (not run in this environment).
