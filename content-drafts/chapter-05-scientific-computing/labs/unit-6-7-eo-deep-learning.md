# Unit 6.7 — Deep learning for spatial / EO data (lab)

## Path A — Required offline (CI)

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_6_7_eo_deep_learning_check.py
```

You will:
1. Build a synthetic 3×8×8 stack and binary mask.
2. Extract 2×2 patches with stride 2 (non-overlapping) and split left/right by origin column.
3. Show that stride-1 overlapping patches **leak** across the spatial cut.
4. Score a majority baseline and pixel IoU for a simple threshold map.

## Path B — Optional model training (not in CI)

Install only if you choose to experiment locally:

```bash
pip install torch --index-url https://download.pytorch.org/whl/cpu
```

Train a tiny CNN on the synthetic patches if desired. **Do not** treat toy accuracy as EO performance. Compare against Unit 6.3 classical baselines before claiming deep learning is needed.

## Model-card bullets

- Intended use: teach tile leakage and EO tensor shapes  
- Out of scope: operational land-cover mapping; Multan products  
- Data: synthetic  
- Evaluation: spatial block split; overlapping patches disallowed across cut  
