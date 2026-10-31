# CGEI subject data architecture

Every registered CGEI subject has exactly two subject data modules:

- `topics-<subject>.ts` is the canonical learning hierarchy: subject metadata, units, lessons, outcomes, activities, assessments, resources, deliverables and projects.
- `questions-<subject>.ts` contains the quiz question bank and quiz-engine topic metadata used for quiz navigation.

All quiz topic metadata belongs with its subject question bank. Do not create separate `quiz-topics-<subject>.ts` files or shared per-subject quiz-topic banks.

`src/data/cgei/curriculum.ts` assembles the canonical curriculum registry from the per-subject learning modules and question banks. Shared registry metadata and validation helpers remain in the shared CGEI modules.
