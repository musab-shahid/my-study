#!/usr/bin/env python3
"""Discover and run every unit_*_check.py under fixtures/cgei (Phase E5).

Falls back to content-drafts/ if fixtures/cgei is missing (compat).
CI and local must use this entrypoint instead of listing fixtures by hand.
"""
from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--root",
        type=Path,
        default=None,
        help="Root directory to search (default: fixtures/cgei, else content-drafts)",
    )
    parser.add_argument(
        "--pattern",
        default="unit_*_check.py",
        help="Glob relative to each tree (default: unit_*_check.py)",
    )
    args = parser.parse_args()
    if args.root is not None:
        root = args.root
    elif Path("fixtures/cgei").is_dir():
        root = Path("fixtures/cgei")
    else:
        root = Path("content-drafts")
    if not root.is_dir():
        print(f"ERROR: fixture root not found: {root}", file=sys.stderr)
        return 2

    fixtures = sorted(root.rglob(args.pattern))
    if not fixtures:
        print(f"ERROR: no fixtures matching {args.pattern!r} under {root}", file=sys.stderr)
        return 2

    print(f"Running {len(fixtures)} fixture(s) under {root}/")
    failures: list[str] = []
    for fixture in fixtures:
        print(f"\n▶ {fixture}")
        proc = subprocess.run([sys.executable, str(fixture)], check=False)
        if proc.returncode != 0:
            failures.append(f"{fixture} (exit {proc.returncode})")
            print(f"✖ failed: {fixture}", file=sys.stderr)

    if failures:
        print(f"\nFAIL: {len(failures)}/{len(fixtures)} fixture(s) failed:", file=sys.stderr)
        for item in failures:
            print(f"  - {item}", file=sys.stderr)
        return 1

    print(f"\nOK: {len(fixtures)} fixture(s) passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
