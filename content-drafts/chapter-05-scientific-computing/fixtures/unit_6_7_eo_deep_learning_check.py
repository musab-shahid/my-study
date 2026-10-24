"""Unit 6.7 EO deep-learning prep checks (stdlib, synthetic).

Validates tensor-like patch stacks, spatial tile splits without leakage from
overlapping patches, majority baseline on patches, and IoU-style overlap on a
tiny mask pair. Does NOT train a CNN and does not require PyTorch.
"""
from __future__ import annotations

from math import isclose


def make_synthetic_scene(h: int = 8, w: int = 8, bands: int = 3) -> list[list[list[float]]]:
    """Return scene[band][row][col] with a simple spatial pattern."""
    scene = []
    for b in range(bands):
        band = []
        for i in range(h):
            row = []
            for j in range(w):
                # band 0 ~ "LST-like" increases to the right
                # band 1 ~ "NDVI-like" higher on left
                # band 2 ~ constant texture
                if b == 0:
                    v = j / max(w - 1, 1)
                elif b == 1:
                    v = 1.0 - j / max(w - 1, 1)
                else:
                    v = ((i + j) % 3) / 2.0
                row.append(v)
            band.append(row)
        scene.append(band)
    return scene


def make_label_mask(h: int = 8, w: int = 8) -> list[list[int]]:
    """Binary mask: right half positive (synthetic land-cover style)."""
    return [[1 if j >= w // 2 else 0 for j in range(w)] for _ in range(h)]


def extract_patches(scene, labels, patch: int = 2, stride: int = 2):
    """Extract non-overlapping patches by default (stride == patch)."""
    bands, h, w = len(scene), len(scene[0]), len(scene[0][0])
    patches = []
    for i in range(0, h - patch + 1, stride):
        for j in range(0, w - patch + 1, stride):
            cube = []
            for b in range(bands):
                tile = [scene[b][i + di][j : j + patch] for di in range(patch)]
                cube.append(tile)
            # patch label = majority of label pixels
            lab_vals = [labels[i + di][j + dj] for di in range(patch) for dj in range(patch)]
            maj = 1 if sum(lab_vals) >= (len(lab_vals) / 2) else 0
            patches.append({"row": i, "col": j, "x": cube, "y": maj})
    return patches


def spatial_block_split(patches, mid_col: int):
    """Train on left tiles, test on right tiles by patch origin column."""
    train = [p for p in patches if p["col"] < mid_col]
    test = [p for p in patches if p["col"] >= mid_col]
    return train, test


def overlapping_split_leaks(patches_overlap, mid_col: int) -> bool:
    """True if any test patch spatially overlaps a train patch window."""
    train = [p for p in patches_overlap if p["col"] < mid_col]
    test = [p for p in patches_overlap if p["col"] >= mid_col]
    for t in test:
        for tr in train:
            # axis-aligned overlap of 2x2 windows
            if not (t["col"] + 2 <= tr["col"] or tr["col"] + 2 <= t["col"] or
                    t["row"] + 2 <= tr["row"] or tr["row"] + 2 <= t["row"]):
                return True
    return False


def majority_baseline(train, test):
    ones = sum(p["y"] for p in train)
    pred = 1 if ones >= len(train) - ones else 0
    return [pred] * len(test)


def iou(y_true: list[int], y_pred: list[int]) -> float:
    if len(y_true) != len(y_pred):
        raise ValueError(f"length mismatch: {len(y_true)} != {len(y_pred)}")
    inter = sum(1 for a, b in zip(y_true, y_pred) if a == 1 and b == 1)
    union = sum(1 for a, b in zip(y_true, y_pred) if a == 1 or b == 1)
    return inter / union if union else 1.0


def main() -> None:
    scene = make_synthetic_scene()
    labels = make_label_mask()
    assert len(scene) == 3 and len(scene[0]) == 8

    # Non-overlapping patches: safe spatial block split
    patches = extract_patches(scene, labels, patch=2, stride=2)
    train, test = spatial_block_split(patches, mid_col=4)
    assert train and test
    assert all(p["col"] < 4 for p in train)
    assert all(p["col"] >= 4 for p in test)

    # Overlapping stride-1 patches can leak across the cut
    patches_ov = extract_patches(scene, labels, patch=2, stride=1)
    assert overlapping_split_leaks(patches_ov, mid_col=4)

    # Baseline on non-overlapping split
    y_true = [p["y"] for p in test]
    y_pred = majority_baseline(train, test)
    acc = sum(1 for a, b in zip(y_true, y_pred) if a == b) / len(y_true)
    assert 0.0 <= acc <= 1.0

    # Pixel IoU on full mask vs thresholded band0 (illustrative)
    pred_mask = [[1 if scene[0][i][j] >= 0.5 else 0 for j in range(8)] for i in range(8)]
    yt = [labels[i][j] for i in range(8) for j in range(8)]
    yp = [pred_mask[i][j] for i in range(8) for j in range(8)]
    score = iou(yt, yp)
    assert 0.0 <= score <= 1.0

    # Tensor shape contract: (bands, patch, patch)
    assert len(patches[0]["x"]) == 3
    assert len(patches[0]["x"][0]) == 2

    print(
        "Unit 6.7 EO deep-learning prep checks passed "
        f"(n_patches={len(patches)}, train={len(train)}, test={len(test)}, "
        f"overlap_leaks={True}, iou={score:.2f}, base_acc={acc:.2f})."
    )


if __name__ == "__main__":
    main()
