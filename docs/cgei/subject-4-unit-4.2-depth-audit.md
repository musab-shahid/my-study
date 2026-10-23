# Unit 4.2 depth audit — Major data families (Core)

**Branch:** `feat/cgei-full-curriculum-skeleton`  
**Audit cycle:** post-implementation gap closure  
**Authoritative TOC:** Master Study TOC · Unit 4.2 — Major data families · Core  
**Official subtopic count:** 29 (4.2.1.1–4.2.8.3)

## Depth rubric (audit-only)

| Level | Meaning |
|-------|---------|
| D0 | Missing |
| D1 | Mentioned (label/overview only) |
| D2 | Explained (substantive distinctions) |
| D3 | Applied (worked example or decision procedure) |
| D4 | Demonstrated (explanation + assessment/practical evidence) |

## Summary counts (after this cycle)

| Depth | Approx. count | Notes |
|-------|---------------|-------|
| D0 | 0 | All 29 appear in lessons |
| D1 | ~8 | Hyperspectral/VHR, some atmosphere/snow, night lights — named |
| D2 | ~12 | Optical/thermal physics, SAR limits, DEM surface/terrain, fire distinction |
| D3 | ~5 | Selection sketch, product table, lab decode |
| D4 | ~4 | Scale/offset + QA via fixture + questions |

No subtopic marked complete solely because a keyword appears in a heading.

## Highest-impact gaps closed this cycle

1. **Optical vs thermal physical meaning (P1):** Added explicit TOA vs surface reflectance and radiance/BT/LST distinctions in lesson 4-2-1.
2. **SAR inference limits (P0/P1):** Taught that backscatter ≠ DEM / soil-moisture % / land-cover class; InSAR vs GRD distinction.
3. **DEM surface vs terrain (P1):** Explicit in lesson 4-2-2 with lidar track vs wall-to-wall caveat.
4. **Product selection (P1):** Worked monsoon selection sketch + fitness table.
5. **Scale/offset honesty (P1):** Equation block; fixture labelled illustrative; refuse-without-docs retained.
6. **Assessments:** Added q-42-006 (SAR), q-42-007 (DEM), q-42-008 (TOA vs SR).

## Remaining partial (intentional)

- Live product downloads and operational USGS scale tables are **not** claimed.
- NISAR / thermal-mission status is literacy only — verify agency notices.
- Atmosphere/cryosphere families remain overview depth (D1–D2); sufficient for family literacy, not retrieval science.
- No SAR processing lab (deferred to later units).

## Unit 4.3 readiness

**Next TOC unit:** Unit 4.3 — Spectral indices and thermal products · **Core**  
**Prerequisite judgment:** Unit 4.2 now supplies product-family selection, optical/thermal distinction, QA/scale literacy, and SAR/DEM inference limits needed to approach indices and LST discipline without re-teaching data families.  
**Blockers:** None that prevent starting 4.3 content design. Residual partial mappings on atmosphere/cryosphere do not block spectral indices / thermal products.

## Evidence commands

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_4_2_data_families_check.py
# (plus repository validate:data / test / typecheck / lint / build / e2e as available)
```
