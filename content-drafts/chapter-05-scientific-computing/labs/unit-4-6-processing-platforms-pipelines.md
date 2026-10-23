# Unit 4.6 — Processing platforms and pipelines lab

**Unit:** Subject 4 · Unit 4.6 Processing platforms and pipelines · Core  
**Fixture:** `fixtures/unit_4_6_pipeline_platform_check.py`  
**Label:** Offline parameterised pipeline — **no** live Earth Engine authentication or STAC download.

## Learning goals

1. Distinguish platform vs pipeline vs scientific method.  
2. Validate a processing manifest before compute.  
3. Log configuration (collection ID, scale, hash) with results.  
4. Reconcile a metric against an independent calculation.  
5. Treat a successful exit code as necessary but not sufficient for scientific validity.

## 1. Run the fixture

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_4_6_pipeline_platform_check.py
```

Expected: zonal mean 311.125, stable config hash on rerun, failed status on incomplete manifest.

## 2. Deliverable — Pipeline card for a SUHI-style job

Using Units 4.3–4.5 as the **science** (not re-derived here):

| Stage | Your specification |
|-------|-------------------|
| Question / protocol | e.g. matched-date SUHII |
| Collection / product IDs | |
| Date window & AOI | |
| Scale / CRS | |
| Mask rules | |
| Platform choice | GEE-style vs local/STAC + why |
| Quota / licence note | verify current EE terms |
| Log fields | parameters, versions, hash, status |
| Validation gate | independent metric check |
| What success does **not** prove | |

## 3. Failure injection

List two failures (missing scale, wrong collection ID, getInfo on a huge collection) and the log evidence you would expect.

## 4. Limits

- No credentials in git.  
- TOC quota tier figures are planning cues — verify operational EE documentation.  
- Synthetic zonal mean ≠ production Landsat reducer at continental scale.
