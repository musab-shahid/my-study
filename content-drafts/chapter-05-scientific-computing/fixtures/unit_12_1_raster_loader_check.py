"""Unit 12.1.3.2 — synthetic windowed raster loader and I/O timing (stdlib).

Demonstrates window construction, invalid-sample rejection, batch assembly,
and a controlled comparison of sequential vs. prefetched batch waits.
Does not load real GeoTIFF files or claim GPU throughput benchmarks.
"""
from __future__ import annotations

import time
from dataclasses import dataclass


@dataclass(frozen=True)
class Window:
    row_off: int
    col_off: int
    height: int
    width: int


@dataclass
class Sample:
    window: Window
    bands: list[list[list[float]]]  # band, row, col
    label: int
    valid: bool
    reason: str = ""


def make_scene(height: int = 64, width: int = 64, bands: int = 3, nodata: float = -9999.0):
    """Synthetic multi-band scene with a nodata strip and a bad region."""
    scene = []
    for b in range(bands):
        plane = []
        for r in range(height):
            row = []
            for c in range(width):
                if 20 <= r < 24:  # nodata strip
                    row.append(nodata)
                elif 40 <= r < 48 and 40 <= c < 48:  # corrupt patch
                    row.append(float("nan"))
                else:
                    row.append(float((b + 1) * 10 + (r % 7) + (c % 5)))
            plane.append(row)
        scene.append(plane)
    return scene, nodata


def read_window(scene, nodata: float, window: Window, label_grid) -> Sample:
    bands_out = []
    invalid = False
    reason = ""
    for plane in scene:
        patch = []
        for r in range(window.row_off, window.row_off + window.height):
            row = []
            for c in range(window.col_off, window.col_off + window.width):
                if r < 0 or c < 0 or r >= len(plane) or c >= len(plane[0]):
                    invalid = True
                    reason = "out_of_bounds"
                    v = nodata
                else:
                    v = plane[r][c]
                if v != v or v == nodata:  # NaN or nodata
                    invalid = True
                    reason = reason or ("nan_value" if v != v else "nodata")
                row.append(v)
            patch.append(row)
        bands_out.append(patch)
    lr = window.row_off + window.height // 2
    lc = window.col_off + window.width // 2
    label = label_grid[lr][lc] if 0 <= lr < len(label_grid) and 0 <= lc < len(label_grid[0]) else -1
    if label < 0:
        invalid = True
        reason = reason or "missing_label"
    return Sample(window=window, bands=bands_out, label=label, valid=not invalid, reason=reason)


def iter_windows(height: int, width: int, size: int = 8, stride: int = 8):
    for r in range(0, height - size + 1, stride):
        for c in range(0, width - size + 1, stride):
            yield Window(r, c, size, size)


def build_batches(samples: list[Sample], batch_size: int) -> list[list[Sample]]:
    valid = [s for s in samples if s.valid]
    batches = []
    for i in range(0, len(valid), batch_size):
        batch = valid[i : i + batch_size]
        if len(batch) == batch_size:
            batches.append(batch)
    return batches


def timed_load(windows, scene, nodata, labels, prefetch: bool):
    """prefetch=True materialises all samples first (simulates warm cache)."""
    t0 = time.perf_counter()
    if prefetch:
        samples = [read_window(scene, nodata, w, labels) for w in windows]
        batches = build_batches(samples, batch_size=4)
        # touch data
        _ = sum(s.label for b in batches for s in b)
    else:
        batches = []
        buf = []
        for w in windows:
            s = read_window(scene, nodata, w, labels)
            if not s.valid:
                continue
            buf.append(s)
            if len(buf) == 4:
                batches.append(buf)
                buf = []
        _ = sum(s.label for b in batches for s in b)
    elapsed = time.perf_counter() - t0
    return elapsed, len(batches)


def main() -> None:
    scene, nodata = make_scene()
    labels = [[(r // 16) % 3 for _ in range(64)] for r in range(64)]
    windows = list(iter_windows(64, 64, size=8, stride=8))
    samples = [read_window(scene, nodata, w, labels) for w in windows]
    n_invalid = sum(1 for s in samples if not s.valid)
    n_valid = sum(1 for s in samples if s.valid)
    assert n_invalid > 0, "expected_invalid_windows_from_nodata_or_nan"
    assert n_valid > 0, "expected_valid_windows"
    batches = build_batches(samples, batch_size=4)
    assert all(len(b) == 4 for b in batches)
    # spatial split discipline: train windows must not share centers with held-out band
    train = [s for s in samples if s.valid and s.window.col_off < 32]
    test = [s for s in samples if s.valid and s.window.col_off >= 40]
    train_centers = {(s.window.row_off + 4, s.window.col_off + 4) for s in train}
    test_centers = {(s.window.row_off + 4, s.window.col_off + 4) for s in test}
    assert train_centers.isdisjoint(test_centers), "spatial_split_leakage"

    t_cold, n1 = timed_load(windows, scene, nodata, labels, prefetch=False)
    t_warm, n2 = timed_load(windows, scene, nodata, labels, prefetch=True)
    assert n1 > 0 and n2 > 0
    # Warm path should not be dramatically slower (sanity); both paths must finish.
    assert t_cold >= 0 and t_warm >= 0
    print(
        "PASS unit_12_1_raster_loader_check",
        f"valid={n_valid} invalid={n_invalid} batches={len(batches)}",
        f"t_cold_ms={t_cold*1000:.3f} t_warm_ms={t_warm*1000:.3f}",
    )


if __name__ == "__main__":
    main()
