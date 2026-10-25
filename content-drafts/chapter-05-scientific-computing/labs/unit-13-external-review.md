# Unit 13.6 — External review and revision lab

Illustrative workflow only. The sample packet is **not** a real peer review.

## 1. Validate the illustrative packet

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_external_review_check.py
```

Packet: `labs/portfolio/external_review_packet.json`

## 2. Review workflow (ordered)

1. **Brief** — question, audience, intended use, non-claims  
2. **Evidence package** — inventory + Paths A/B/C + offline reproduction  
3. **Criteria** — data suitability, consistency, validation, uncertainty, sensitivity, overclaim risk  
4. **Feedback log** — comment → artifact → severity → evidence needed → response → disposition  
5. **Revision** — accepted change, justified rejection, or documented limitation + retest command  
6. **Release decision** — `ready` | `ready_with_limitations` | `not_ready` with rationale  

## 3. Evidence types (do not collapse)

| Evidence | Proves |
|----------|--------|
| Software tests | Behavioural contracts under fixtures |
| Processing checks | Scale/fill/schema handling |
| Scientific validation | Domain-appropriate empirical evaluation (not claimed here) |
| External review | Independent human critique (illustrative only in this lab) |
| Operational fitness | Decision context, governance, monitoring (not claimed) |

## Acceptance criteria

- Packet `review_type` is `illustrative_scenario` with a clear disclaimer  
- At least two feedback items with allowed dispositions  
- Release status justified; policy/operational readiness not asserted  
- Paths A–C remain separately citable  
