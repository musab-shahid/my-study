# C.71 — Subject 3 CRS workflow batch

## Integration gate
PR #127 restores main unit-test counts after #125/#126 and teaches assign vs transform.
This pass expands the same branch into a **connected workflow**, not a separate micro-PR.

## Leaves addressed
| Leaf | Focus | Disposition |
|------|--------|-------------|
| 3.2.1.5 | Assign vs transform; OTF vs permanent | mapped_partial |
| 3.2.4.1 | Documentation checklist / operation log | mapped_partial |
| 3.2.4.3 | Landmark residual + fitness-for-use | mapped_partial |
| (link) 3.3.3.2 | CRS precondition for spatial predicates | already partial via #126 |

## Workflow taught
inspect → diagnose → assign **or** transform → landmark residual → spatial CRS guard → document

## Fixtures
- `unit_3_2_assign_vs_transform_check.py`
- `unit_3_2_transform_validation_check.py` (pre-existing)
- `unit_3_2_crs_workflow_check.py` (chain)

## Limits
Synthetic affine and residuals only. Not PROJ, GDAL, GeoPandas, or Multan survey control.
