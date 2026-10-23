# Unit 5.12 — App coverage map

**Canonical app unit:** `cgei-ds-unit-5-12`  
**Source manuscript:** `units/05.12-xarray-scalable-environmental-pipelines.md`  
**Readiness:** Draft; not released.

## Source-to-app map

| Lesson | Main competency | App instruction/evidence |
|---|---|---|
| 5.12.1 Labeled arrays and multidimensional data models | Inspect dimensions, coordinates, variables and metadata | Dataset inventory and dimensional semantics |
| 5.12.2 Coordinate alignment, selection and aggregation | Preserve spatial/temporal support | Alignment, resampling, reprojection and missing-coordinate decisions |
| 5.12.3 Lazy computation, chunking and Dask | Match chunking to operation and resources | Eager/lazy comparison, chunk design and performance evidence |
| 5.12.4 Robust spatiotemporal feature pipelines | Build validated transformations | Synthetic time × y × x feature pipeline and metadata preservation |
| 5.12.5 Validation, performance and reproducible outputs | Validate content and execution | Coordinate integrity, numerical agreement, provenance and performance report |

## Registry and quality evidence

- Five outcomes, five canonical lessons with four instructional blocks each, ten linked knowledge checks, five activities, five formative assessments, five reference resources and five portfolio deliverables.
- Structural tests assert 63 total canonical lessons, 146 questions, five Unit 5.12 lessons, ten linked questions and draft readiness.
- Validator prevents release until eager/lazy equivalence, metadata/alignment checks and scientific/UI review are documented.
- E2E smoke tests cover all five lesson routes and the unit overview.

## Scientific and computational limitations

1. Matching dimension names do not prove matching spatial grids, coordinate reference systems, units or temporal support.
2. xarray label alignment can introduce missing values or intersections; inspect alignment explicitly before arithmetic and merging.
3. Dask-backed lazy execution is not automatically faster. Chunk sizes, task graph, I/O, scheduler and available memory affect performance.
4. Reprojection, resampling, interpolation and aggregation change support or values and require explicit scientific justification.
5. Synthetic tests do not validate any real satellite or climate product, and benchmark results do not generalise automatically to other hardware or data layouts.

## Release gates

- Fresh CI passes: curriculum validator, structural tests, typecheck, lint, build and route E2E.
- Execute examples on a clean environment and compare eager/lazy outputs with justified tolerances.
- Inspect coordinate alignment, units, missingness, metadata preservation and expected output schema.
- Benchmark a representative workload and record data size, chunk sizes, environment and hardware.
- Review references and rendered lesson routes; keep readiness `draft` until these gates pass.
