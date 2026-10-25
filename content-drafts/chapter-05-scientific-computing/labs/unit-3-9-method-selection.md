# Unit 3.9 — Method selection under sparse or noisy samples

## Commands

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_3_9_spatial_stats_check.py
python content-drafts/chapter-05-scientific-computing/fixtures/unit_3_9_method_selection_check.py
```

## Tasks

1. For the sparse (n=3) case, state the recommended action and why interpolation is unsafe.
2. For the noise grid, explain why near vs far dissimilarity rejects spatial interpolation.
3. For the smooth gradient, recommend IDW or OK and what leave-location-out should still show.
4. Write a one-sentence rule for when the correct decision is **do not interpolate**.

## Acceptance criteria

| Criterion | Pass |
|-----------|------|
| Sparse | Chooses do_not_interpolate |
| Noise | Chooses do_not_interpolate |
| Structured | Allows ok_candidate or idw_ok with LOO caveat |
| Non-claim | Heuristic is not treated as operational model selection |

## Non-claims

Synthetic point sets only. Not PySAL, not fitted variogram search, not a production mapping standard.
