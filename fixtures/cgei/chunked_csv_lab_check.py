"""Deterministic chunked-CSV lab: equivalence checks and per-process peak RSS.

This is a small synthetic fixture, not a claim that one chunk size is universally
fastest. Each chunk-size run gets a fresh process so ru_maxrss is comparable as a
process peak (Linux reports KiB). Timing and memory are observational, not CI
performance thresholds.
"""
from __future__ import annotations

import csv
import json
import os
import resource
import subprocess
import sys
import tempfile
import time
from collections import defaultdict
from pathlib import Path

import pandas as pd

CHUNK_SIZES = (1_000, 5_000, 12_000)
ROWS = 36_000
START = pd.Timestamp("2024-01-01")
COLUMNS = ("station_id", "date", "precip_mm")


def write_fixture(path: Path) -> None:
    """Write repeatable integer-valued daily observations to a temporary CSV."""
    with path.open("w", newline="", encoding="utf-8") as stream:
        writer = csv.writer(stream)
        writer.writerow(COLUMNS)
        for i in range(ROWS):
            writer.writerow(
                (
                    f"S{i % 37:02d}",
                    (START + pd.Timedelta(days=i % 240)).date().isoformat(),
                    (i * 17) % 101,
                )
            )


def worker(path: Path, chunk_size: int) -> dict[str, object]:
    started = time.perf_counter()
    grouped: dict[str, list[int]] = defaultdict(lambda: [0, 0])
    rows_in_period = 0
    for frame in pd.read_csv(path, chunksize=chunk_size, parse_dates=["date"]):
        selected = frame.loc[
            (frame["date"] >= "2024-06-01") & (frame["date"] < "2024-07-01")
        ]
        rows_in_period += len(selected)
        partial = selected.groupby("station_id", sort=True)["precip_mm"].agg(["sum", "count"])
        for station, values in partial.iterrows():
            grouped[str(station)][0] += int(values["sum"])
            grouped[str(station)][1] += int(values["count"])

    result = {
        station: {"precip_mm_sum": values[0], "observation_count": values[1]}
        for station, values in sorted(grouped.items())
    }
    return {
        "chunk_size": chunk_size,
        "rows_in_period": rows_in_period,
        "station_count": len(result),
        "summary": result,
        "elapsed_seconds": round(time.perf_counter() - started, 6),
        # Linux ru_maxrss is KiB. This process is spawned fresh for each run.
        "peak_rss_kib": int(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss),
    }


def main() -> None:
    if len(sys.argv) == 4 and sys.argv[1] == "--worker":
        print(json.dumps(worker(Path(sys.argv[2]), int(sys.argv[3])), sort_keys=True))
        return

    with tempfile.TemporaryDirectory(prefix="cgei-chunk-lab-") as tmp:
        fixture = Path(tmp) / "synthetic_station_daily.csv"
        write_fixture(fixture)
        results = []
        for chunk_size in CHUNK_SIZES:
            completed = subprocess.run(
                [sys.executable, str(Path(__file__).resolve()), "--worker", str(fixture), str(chunk_size)],
                check=True,
                capture_output=True,
                text=True,
                env={**os.environ, "PYTHONHASHSEED": "0"},
            )
            results.append(json.loads(completed.stdout))

    baseline = results[0]["summary"]
    for result in results[1:]:
        assert result["summary"] == baseline, (
            f"Chunk size {result['chunk_size']} changed aggregated output"
        )
        assert result["rows_in_period"] == results[0]["rows_in_period"]
        assert result["station_count"] == results[0]["station_count"]
    assert results[0]["rows_in_period"] > 0
    assert results[0]["station_count"] > 1
    assert all(result["peak_rss_kib"] > 0 for result in results)

    print("Chunked CSV lab passed: outputs equivalent across chunk sizes.")
    for result in results:
        print(
            f"chunk_size={result['chunk_size']:>6} "
            f"rows_in_period={result['rows_in_period']:>5} "
            f"stations={result['station_count']:>2} "
            f"elapsed_s={result['elapsed_seconds']:.4f} "
            f"peak_rss_kib={result['peak_rss_kib']}"
        )


if __name__ == "__main__":
    main()
