# My Study

Learning and assessment app featuring **Climate, Geospatial & Environmental Intelligence (CGEI)** alongside civil-service exam preparation. CGEI connects environmental science, Earth observation, GIS and scientific computing with structured lessons, practice and progress tracking.

## Checks available

The commands below define the reproducible checks. Consult the [latest CI runs](https://github.com/musab-shahid/my-study/actions) for results on a specific commit; configured checks alone do not imply a passing run.

- TypeScript typechecking
- Unit tests and data validators enforced in CI
- Production build with bundle budget check
- Design-system guard, secret scan, and content evidence gates in CI

[Portfolio case study](https://musab-shahid-earth-observation.brinycourt4.chatgpt.site/projects/my-study.html)

## CGEI curriculum

CGEI is a self-directed learning pathway under development, not an accredited qualification or an official university specialization. Its 13 registered subjects cover Earth systems, climate science, geospatial methods, remote sensing, data science, GeoAI, risk, research practice and integrated projects. Registered content is not a claim of complete or independently validated instruction.

### Three learning examples

| Question | Inspect the exercise |
| --- | --- |
| How do spatial joins and coordinate systems affect results? | [Geospatial stack checks](fixtures/cgei/unit_3_5_python_geospatial_stack_check.py) |
| How do day boundaries and missing data affect climate summaries? | [Climate-data handling](fixtures/cgei/unit_2_5_climate_data_handling_check.py) |
| How does geographic generalization differ from information leakage? | [Evaluation and preprocessing checks](fixtures/cgei/unit_6_4_leakage_split_check.py) |

These small Python exercises use synthetic teaching inputs. They are inspectable examples, not product-scale validation or evidence of measured educational impact. Run an exercise from the repository root with `python fixtures/cgei/<filename>.py`.

Subjects link to units, lessons, objectives and assessment records. Local study and revision work without cloud sign-in. Learner progress and instructional review status are distinct; see the guide below for implementation and review requirements.

See the [CGEI curriculum architecture and authoring guide](docs/cgei/CGEI_CURRICULUM_ARCHITECTURE.md) for the canonical subject/unit/lesson layout, per-subject question-bank contract, progress compatibility rules, authoring commands and validation gates.

## Local development

```bash
npm install
npm run dev
```

Useful scripts:

| Script | Purpose |
| --- | --- |
| `npm run typecheck` | TypeScript |
| `npm test` | Unit tests |
| `npm run lint` | ESLint |
| `npm run build` | Production build + bundle budget |
| `npm run validate:data` | Curriculum / question / traceability validators |
| `npm run check:design-system` | Whole-tree baseline ratchet + net-new styling guard |
| `npm run test:e2e` | Playwright e2e (requires `npm run test:e2e:install`) |

## Cloud features

Cloud backup and the cloud AI tutor require a Supabase Auth session. Without a session token, cloud backup controls stay disabled and the cloud tutor path returns “Sign in required”. Local study, quizzes, and offline progress continue to work without sign-in.

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (see `.env.example`). Provider keys for the AI proxy are edge-function secrets only and are never bundled in the client. Configure the edge-function secret `APP_ALLOWED_ORIGINS` as a comma-separated list of exact deployed app origins (for example, `https://study.example.com`). Localhost origins are allowed only when `ENVIRONMENT` is not `production`.

## Accessibility

Contrast against WCAG AA, keyboard focus, and shared UI primitives are project acceptance criteria. Prefer semantic tokens (`--text-muted`, brand/success/warning/danger steps) over raw slate/sky palette classes for text.

## Privacy

Progress stays on-device by default. Optional cloud backup and the AI tutor are described in **Settings → Privacy & data**.

## Security

See [SECURITY.md](./SECURITY.md) for how to report vulnerabilities.

## License

See [LICENSE](./LICENSE). All rights reserved unless a separate written grant says otherwise.
