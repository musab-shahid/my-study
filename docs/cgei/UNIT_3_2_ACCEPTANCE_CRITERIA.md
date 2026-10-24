# Unit 3.2 — Acceptance criteria (Gate C.4)

## Official leaves in scope

| Leaf | Requirement | Deterministic evidence | Real-world evidence |
|------|-------------|------------------------|---------------------|
| 3.2.2.2 | Datum transforms / grid-shift accuracy in error budget | `unit_3_2_transform_validation_check.py` rejects high-accuracy claims without grid | National NTv2 (or equivalent) not shipped; learner must supply |
| 3.2.4.3 | Landmark check after reprojection | Synthetic residual = 13 m locked | Independent survey/open control in target CRS |
| 3.2.4.2 | Legacy local datums | Teaching caution | SOP/cadastral grid identification outside CI |

## Acceptance rules (curriculum)

1. **Metadata:** Every permanent transform records `source_crs`, `target_crs`, `transform_method`, `grid_available`.
2. **Grid honesty:** If `grid_available=false`, do not claim sub-metre / centimetre accuracy.
3. **Landmarks:** Report residual for ≥1 independent check point when claiming positional validation; synthetic points test method only.
4. **Use-case tolerance:** Residual tolerance is application-specific (climate raster vs cadastral)—must be stated.

## Explicit non-claims

- No Multan survey control in-repo.
- No national grid-shift file fitted.
- Unit remains **draft / mapped_partial** until real-world protocol is executed with documented points.
