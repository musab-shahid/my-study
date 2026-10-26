# C.65 — Close three verified curriculum gaps

## Baseline
- Start: `4ebef115ba459774fb503119374bdd662eb81ee7`
- Leaves: 12.1.3.2, 12.2.3.2, 13.2.3.3 (were unmapped)

## Implementations

### 12.1.3.2 Raster loaders / batching / I/O
- Lesson: `cgei-ai-lesson-12-1-1`
- Blocks: `cgei-ai-121-1-loader`, `121-1-batch`, `121-1-loader-lab`
- Activity: `cgei-ai-a-121-loader`
- Fixture: `unit_12_1_raster_loader_check.py`
- Disposition: **mapped_partial** (synthetic windows; not production GeoTIFF/GDAL)

### 12.2.3.2 Prediction→vector + topology
- Lesson: `cgei-ai-lesson-12-2-1`
- Blocks: `cgei-ai-122-1-vector`, `122-1-topology`, `122-1-vector-lab`
- Activity: `cgei-ai-a-122-vector`
- Fixture: `unit_12_2_vector_postprocess_check.py`
- Disposition: **mapped_partial** (grid cell polygons; validity ≠ accuracy)

### 13.2.3.3 External feedback / revision tracking
- Lesson: `cgei-cap-lesson-13-2-1` (content lives in 13.2; packet/fixture shared with 13.6)
- Blocks: `cgei-cap-132-1-feedback`, `132-1-revision`, `132-1-feedback-lab`
- Activity: `cgei-cap-a-132-feedback`
- Fixture: existing `unit_13_external_review_check.py`
- Decision: teach checkpoint logging in 13.2; deeper release packet remains Unit 13.6
- Disposition: **mapped_partial**

## Global
| Disposition | Before | After |
|-------------|-------:|------:|
| mapped | 6 | 6 |
| mapped_partial | 884 | **887** |
| deferred | 122 | 122 |
| unmapped | 3 | **0** |
| stale | 0 | 0 |

Strict gate: expected OK (0 unmapped).
