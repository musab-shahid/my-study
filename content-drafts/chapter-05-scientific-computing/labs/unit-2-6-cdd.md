# Unit 2.6 — Pedagogical CDD (consecutive dry days)

## Rules

| Label | Condition |
|-------|-----------|
| Dry | precipitation **< 1.0 mm** (valid observation) |
| Wet | precipitation **>= 1.0 mm** |
| Missing | `None` / unknown — **breaks** a confirmed dry run |

**CDD_confirmed** = maximum length of consecutive **observed** dry days.  
If any day is missing, mark **incomplete**: the true period maximum may be larger.

## Commands

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_6_etccdi_cdd_check.py
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_6_etccdi_r10mm_check.py
```

## Tasks

1. Classify each day in `[0, 0.5, 2, 0, 0.2, 0]` and report CDD_confirmed.
2. For `[0, 0, missing, 0, 0]`, report CDD_confirmed and incomplete.
3. Show the wrong answer obtained by replacing missing with 0.
4. Why is CDD_confirmed not always the true period maximum?

## Acceptance criteria

| Criterion | Pass |
|-----------|------|
| Threshold | 1.0 mm is wet, not dry |
| Gap policy | Missing breaks confirmed runs |
| Zero-fill | Identified as error |
| Incomplete | Flagged when any missing present |

## Non-claims

Synthetic only. Not full ETCCDI. Not calendar QC. Not drought attribution.
