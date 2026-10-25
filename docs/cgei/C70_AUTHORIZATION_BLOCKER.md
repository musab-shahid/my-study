# C.70 — Authorization blocker (no history rewrite)

## Live SHAs (verified)
| Ref | SHA |
|-----|-----|
| #117 tip | `33d3fe3e2a574a838d3e5a38bd8fe757cc8ebf49` |
| #118 tip | `ad3921767573cb8d6afa9d1df009749306573eb9` |
| #118 base | `1ee98551c84626710e90132361479b803a503fec` |
| merge-base | `1ee98551c84626710e90132361479b803a503fec` |
| #118-only commits | 9 |
| commits on #117 not in #118 | 42 |

## Authorization evidence
- C.70 title uses the word “Authorized”; the body and operator guidance require **explicit** maintainer permission for rebase **and** `--force-with-lease`.
- No separate maintainer message in this session grants that permission.
- **Protected actions not performed:** no rebase, no force-push, no retarget, no merge.

## Recovery reference (pre-integration)
`ad3921767573cb8d6afa9d1df009749306573eb9` — current #118 head; retain until an authorized rewrite succeeds.

## Proposed operation (awaiting explicit approval)
```bash
git fetch origin
git checkout feat/cgei-subject5-sql-vertical-slice
git branch backup/c70-pre-rebase-ad39217 ad3921767573cb8d6afa9d1df009749306573eb9
git rebase origin/feat/cgei-core-leaf-coverage-gate   # tip 33d3fe3e…
# resolve conflicts preserving coverage-gate + C.68 SQL/geo content
git push --force-with-lease origin feat/cgei-subject5-sql-vertical-slice
```

## Local checks on current #118 (stale ancestry)
- `unit_5_5_sql_practice_check.py` — PASS
- `unit_3_5_python_geospatial_stack_check.py` — PASS
- `audit_core_leaf_coverage.py` — FAIL (unmapped residual on pre-gate base; expected)

## Human review
Checklist remains in `docs/cgei/C69_INTEGRATION_AND_REVIEW_PACKET.md`. Readiness: **draft**.  
#115 manual keyboard/SR review: still outstanding.

## Next single dependency
Explicit maintainer authorization text, e.g.  
“Rebase feat/cgei-subject5-sql-vertical-slice onto 33d3fe3e and force-with-lease push to origin.”
