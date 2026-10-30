# Traceability CSVs and scientific fixtures (Phase E5)

## Traceability: inputs, not CI outputs

| Artifact | Role |
|----------|------|
| `docs/cgei/subject-*-unit-*-subtopic-traceability.csv` | **Authoritative inputs.** Hand-maintained source → app mapping and evidence notes. |
| `docs/cgei/ALL-units-subtopic-traceability.csv` | Working aggregate. May lag per-unit files; do not treat as sole source of truth. |
| Validators (`validate:traceability:all`, etc.) | **Read** CSVs and curriculum; report integrity. They must not rewrite dispositions to make CI green. |

Dispositions (`mapped`, `mapped_partial`, `unmapped`, …) stay honest. Green structure checks never imply scientific validation.

When adding a unit (Phase D): update the per-unit CSV (or create via `npm run new:unit` stub), then refresh the aggregate only if you maintain it deliberately.

## Fixtures path

| Location | Role |
|----------|------|
| **`fixtures/cgei/`** | Canonical home for `unit_*_check.py` and shared synthetic data (Phase E5) |
| `content-drafts/chapter-05-scientific-computing/fixtures/` | Deprecated pointer README only — do not add new fixtures |

Discovery: `python scripts/run-unit-fixture-checks.py` (defaults to `fixtures/cgei`).

Manuscript/lab markdown may remain under `content-drafts/`; only **executable fixtures** moved.
