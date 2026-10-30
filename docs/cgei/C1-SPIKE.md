# CGEI Phase C1 — quiz-engine mapping spike (decisions)

Status: **decisions recorded; prototype not required to merge before C2**.

## Topic granularity

**Unit-level topics (recommended).**

For each canonical unit, emit one quiz-engine `Topic` whose `id` is the unit id (e.g. `cgei-ds-unit-5-1`) and whose title is the unit title. Lessons hang under the unit via `lessonId` on questions; the engine still navigates subject → section → topic (unit) → quiz.

Rationale: units are nearly self-contained (activities/objectives do not cross units), and unit-level topics avoid exploding the topic list to 250+ entries.

## Section ID scheme

| Pattern | Meaning | Example |
|---------|---------|---------|
| `CGEI-0N` | Subject roadmap / overview section (legacy) | `CGEI-05` (if introduced) |
| `CGEI-0NU` | **Unit section** for quiz entry | `CGEI-051` remains Unit 5.1 |
| Alias | Old roadmap stubs keep IDs | `CGEI-01` … `CGEI-14` |

Rule: prefer **keeping existing section IDs** (`CGEI-051`, `CGEI-024`, …) as aliases. New units get `CGEI-` + subject number + unit code compressed (documented in scaffold). Never rename IDs that progress already stores.

## Progress aliases

| Legacy | Canonical |
|--------|-----------|
| Topic ids under Unit 5.1 (`cgei-ds-units-dimensions`, …) | `lesson.sourceTopicId` → lesson id |
| Section `CGEI-051` | Unit `cgei-ds-unit-5-1` |

Read path: if progress key is a legacy topic id, resolve via `sourceTopicId` on lessons before failing.

## Spike checklist (when prototyped)

1. Quiz screen: CGEI subject → unit section → start quiz  
2. Answers persist by question ID; SR schedules  
3. Mistake review / AI-tutor context for one unit  
4. Data Science 5.1 + Climate Science progress still resolves  
5. FPSC/HAT e2e untouched  
6. No duplicate questions module in the bundle; budget holds  

## Out of scope for C1

Data moves (C3), lesson-page renderer changes (C4), deleting `legacy/`.
