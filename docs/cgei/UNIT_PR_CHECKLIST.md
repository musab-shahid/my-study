# CGEI per-unit pull request checklist (Phase D)

Use one unit per PR when adding or deepening content.

## Required in the PR description

1. **Unit tier** — Core or Support; one objective per cluster of subtopics.
2. **Each lesson** — about 8 content blocks (prose, worked example with real numbers, cautions) and **at least 3 questions** across **at least 2 cognitive levels**, one apply-or-higher.
3. **Fixture** — computes every number quoted; run by CI (`unit_*_check.py`). Figures in lesson blocks must match fixture output.
4. **Coding-lab activity** (when the unit needs practice) and **traceability rows** with honest evidence notes.
5. **Audit note** — findings ranked P0–P3 and what is deferred. No invented data.
6. **Readiness** stays `draft` until scientific review; green CI never validates science.

## Commands before request for review

```bash
npm run new:lesson -- --unit <unitId>          # if scaffolding
npm run new:question -- --lesson <lessonId>    # ×3+ per lesson
npm run cgei:sync -- --reason="describe added question IDs"
npm run check:cgei
npm run lint:cgei-questions
npm run validate:data
npm test
```

## Question quality (ratcheted)

- Prefer balanced correct-answer positions within the unit.
- Avoid “longest option is always correct”.
- Explanations ≥ 60 characters and name why the likeliest wrong answer fails.
- Numeric items: prefer `calculation` / quant templates tied to fixtures (quiz engine path).

## Reviewer

A subject-competent reviewer checks formulas, units, assumptions, worked examples and answer keys: every hard/numeric item and about a quarter of the rest. Record reviewer evidence before moving readiness `draft → review → validated`.
