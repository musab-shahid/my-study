# Unit 4.4 — Cloud-mask omission and commission (complete path)

## Learning outcomes
- Compute omission and commission from TP/FP/FN with stated denominators.
- Interpret trade-offs for two different analytic uses.
- Refuse to treat a single sample rate as product-wide accuracy.

## Definitions
- **Omission** (missed cloud) = FN / (TP + FN)
- **Commission** (false cloud) = FP / (TP + FP)
- Reference labels are a **protocol**, not ground truth without documentation.

## Worked example (Sample A)
Reference cloud=40. TP=35, FP=10, FN=5 → O=0.125, C≈0.222.

## Guided practice
Run:
```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_4_4_preprocess_harmonise_check.py
```
Confirm Sample A rates and note Sample B: TP=20, FP=2, FN=15.

## Independent practice
Given Sample C: TP=50, FP=25, FN=0:
1. Compute O and C.
2. Which application prefers this mask: (a) maximal clear-sky land composite, or (b) conservative cloud screening before surface-water extraction? Justify using the rates.
3. Why can O=0 on a 75-pixel sample not prove the mask never omits cirrus regionally?

## Acceptance criteria
| Criterion | Pass |
|-----------|------|
| Formulas | Correct denominators |
| Sample C | O=0, C=0.25 |
| Use-case | Trade-off argued explicitly |
| Limit | No global accuracy claim |

## Applied deliverable
One-page mask validation note: protocol, counts, O/C, decision, limitations (synthetic sample only).

## Non-claims
Not Fmask/s2cloudless certification. Not Multan field validation.
