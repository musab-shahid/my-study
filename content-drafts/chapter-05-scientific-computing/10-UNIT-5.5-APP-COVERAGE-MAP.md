# Unit 5.5 — Data Workflow Engineering: source-to-app coverage map

**Source manuscript:** `units/05.5-data-workflow-engineering.md`  
**Canonical unit:** `cgei-ds-unit-5-5`  
**Readiness:** `draft` — content is integrated, but code/fixture execution and instructional review are still required.

## Manuscript-to-app map

| Manuscript strand | Canonical lesson | Core app evidence |
|---|---|---|
| 5.5.1 End-to-end workflows, stages, idempotence and manifest | `cgei-ds-lesson-5-5-1` | Acquire → validate → transform → analyse → publish; raw/interim/processed separation; YAML manifest; rerun/duplicate failure example |
| 5.5.2 Relational ideas and core SQL | `cgei-ds-lesson-5-5-2` | Primary/foreign keys, station-to-observation relationship, June aggregation query, join row-count diagnostics |
| 5.5.3 HTTP hygiene, API acquisition and local cache | `cgei-ds-lesson-5-5-3` | Timeouts, status checks, bounded retry/backoff, Retry-After, pagination and raw response caching |
| 5.5.4 Licence compliance, secrets and ethical access | `cgei-ds-lesson-5-5-4` | Dataset-specific licence and attribution checks, safe `.env.example`, secret rotation, sensitive-location safeguards |
| Exercises A1–A3, B/C and final deliverable | `cgei-ds-lesson-5-5-5` | Integrated acquisition package with script, sample/stub, manifest, licence note, README, environment template and clean-run evidence |

## Assessments and evidence

- Five L3 lessons, each linked to one practice activity, one formative assessment and two interactive knowledge checks (**10 questions total**).
- Three portfolio deliverables: a reproducible acquisition package, validated SQL query, and provenance/licence/secrets note.
- Five supporting references are linked to the lessons and unit.
- Assessment IDs are `cgei-ds-assess-55-workflow`, `cgei-ds-assess-55-sql`, `cgei-ds-assess-55-api`, `cgei-ds-assess-55-provenance`, and `cgei-ds-assess-55-package`.


## C.46 bounded vertical-slice update

- Expanded the existing 5.5.2 SQL practice in `units/05.5-data-workflow-engineering.md` with a worked query, intermediate arithmetic, synthetic fixture, independent row-count and orphan-key checks, guided practice, independent transfer task, and a 10-point rubric.
- Added a stdlib SQLite check for the worked example. This validates the small synthetic SQL example only; it does not validate any live provider data or the complete lesson.
- Canonical lesson ID remains `cgei-ds-lesson-5-5-2`; readiness remains `draft`. No curriculum IDs, saved-progress keys, or readiness states were changed.

## Review criteria before changing readiness

1. The Subject 5.5 SQL worked example has a deterministic SQLite check at `fixtures/unit_5_5_sql_practice_check.py`. Run `python3 content-drafts/chapter-05-scientific-computing/fixtures/unit_5_5_sql_practice_check.py`; it checks June bounds, expected means/counts, and that the orphan-key diagnostic detects an injected unmatched key. All data are synthetic.
2. Deterministic smoke checks now cover mocked 200, 429, repeated 500 and timeout cases; do not make tests depend on a live provider.
3. Bounded retry behaviour is smoke-tested. Provider-specific pagination termination and live cache behaviour remain unverified because no live endpoint is called by CI.
4. The lesson now includes a chunked SHA-256 file-hash example; the fixture verifies it against the known digest for `abc`. Before release, verify it on an actual synthetic or permitted data file.
5. Review the exact current licence for any real dataset used; do not assume public download grants redistribution rights.
6. Confirm no real credentials, private station data or sensitive locations enter the committed fixture.
7. Run `npm run validate:data`, `npm run check`, and the scientific workflow checks. Keep readiness at `draft` until the checks and teaching review pass.

## References checked 2026-10-22

- Wilson et al. (2017), *Good enough practices in scientific computing*, PLOS Computational Biology: https://doi.org/10.1371/journal.pcbi.1005510
- SQLite SELECT statement reference: https://www.sqlite.org/lang_select.html
- Requests Quickstart: https://requests.readthedocs.io/en/stable/user/quickstart/
- Copernicus Climate Data Store terms of use: https://cds.climate.copernicus.eu/licences/terms-of-use-cds
- GitHub secret scanning documentation: https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning

These links are supporting references, not proof that a particular provider endpoint or dataset licence remains unchanged. Check the terms attached to the exact product/version at acquisition time.
