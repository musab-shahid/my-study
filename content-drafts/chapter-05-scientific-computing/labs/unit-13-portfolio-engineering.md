# Unit 13.3 — Portfolio engineering lab

Build a portfolio evidence card for the heat-screening capstone. Use the filled example as a model; replace narrative fields with your own wording without inventing data provenance.

## Validate the example card

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_portfolio_check.py
```

Template: `labs/portfolio/capstone_portfolio_evidence.json`

## Acceptance criteria

1. **Problem–method–evidence–limitation** narrative is complete.
2. **Data inventory** labels each source as `synthetic`, `teaching_extract`, or `genuine_remote` (with checksum if genuine).
3. **Paths A/B/C** are linked separately — do not merge them into one evidence claim.
4. **Non-claims** include at least: not calibrated health risk; not operational forecast; LST ≠ air temperature.
5. **Reproduction steps** run offline without Earthdata credentials.
6. README-ready summary could be pasted into a public repository without overstating Multan findings.

## Suggested public README skeleton

```markdown
# Project title
## Question
## Data (inventory table)
## Method
## Results (only metrics that answer the question)
## Limitations and non-claims
## How to reproduce (Paths A–C)
## Licence
```
