# CGEI subject data architecture

## The only per-subject source files

Every canonical CGEI subject has exactly two subject data files in its own folder:

- `topics-<subject>.ts`: the complete study hierarchy and learning content — subject metadata, units, lessons, outcomes, activities, assessments, resources, deliverables and projects.
- `questions-<subject>.ts`: quiz questions and the quiz-topic metadata required by the quiz engine.

No third subject data file is permitted. Do not create separate section, lesson, quiz-topic, metadata, registry, or assembler files inside a subject folder.

## Shared wiring

- `src/data/cgei/curriculum.ts` imports the two modules for each subject and assembles the canonical registry.
- `shared.ts`, `registry-shared.ts`, validation helpers and generated navigation metadata are shared track-level code, not subject data.
- Generated indexes, global lightweight topic metadata, section counts and the question-ID ledger are derived artefacts. They are not additional subject content sources.
- `scripts/check-cgei-subject-boundary.mjs` enforces the two-file boundary in the unified CGEI CI gate.

## Authoring

### Add a unit

```sh
npm run new:unit -- --subject cgei-data-science --code 5.13 --title "Unit title"
```

The command writes the unit into the subject's topics file, adds its ID to `subject.unitIds`, and regenerates the lightweight navigation index. It does not create a traceability-stub CSV or ask you to paste generated code.

### Add a lesson

```sh
npm run new:lesson -- --unit cgei-ds-unit-5-13 --title "Lesson title"
```

The command writes the lesson into the same topics file, updates the parent unit's `lessonIds`, and regenerates the navigation index. No hand-editing of the generated index is needed.

### Add a question

```sh
npm run new:question -- --lesson cgei-ds-lesson-5-13-1
```

The command writes both the question and its quiz-topic metadata into that subject's questions file. The canonical lesson ID is the quiz topic ID for a new lesson, so no legacy global topic registry edit is required. Finish the question's TODO fields, then run:

```sh
npm run cgei:sync -- --reason="add the new question"
```

That one sync command validates question quality and regenerates global lightweight topic metadata, section counts, the navigation index and permanent question IDs. Authors do not hand-edit those derived files.

## Optional advanced branches

Optional specialist branches are extensions, not a fourteenth core subject. Their roadmap is archived in `docs/cgei/ADVANCED_BRANCHES.md`; it must not be registered as a subject or given a partial subject folder. Promote a branch only through an explicit curriculum decision and the same two-file subject contract.
