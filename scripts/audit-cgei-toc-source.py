#!/usr/bin/env python3
"""Extract and check the pinned CGEI TOC baseline.

This script never edits the source DOCX or the app registry. It writes a normalized
source-row CSV to an explicitly supplied path and can compare Subject 5's existing
leaf crosswalk with the source rows by ID, exact title, and order.

Requires: python-docx
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import re
import sys
from collections import Counter
from pathlib import Path

from docx import Document

SUBJECT_RE = re.compile(r"^(\d+)\.\s+(.+)$")
UNIT_RE = re.compile(r"^Unit\s+(\d+\.\d+)\s*[—-]\s*(.*?)\s*·\s*(Core|Support|Optional)\s*$")
TOPIC_RE = re.compile(r"^(\d+\.\d+\.\d+)\s{2,}(.+)$")
LEAF_RE = re.compile(r"^(\d+\.\d+\.\d+\.\d+)\t(.+)$")
EXPECTED = {"subject": 14, "unit": 130, "topic": 567, "subtopic": 2052}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def extract_rows(docx_path: Path) -> list[dict[str, str | int]]:
    doc = Document(docx_path)
    rows: list[dict[str, str | int]] = []
    current_subject = ""
    current_unit = ""
    current_priority = ""
    counts: Counter[str] = Counter()
    source_order = 0

    for paragraph_index, paragraph in enumerate(doc.paragraphs):
        text = paragraph.text.strip()
        if not text:
            continue

        # Subject headings are distinguished by the document's Heading 1 style.
        if getattr(paragraph.style, "name", None) == "Heading 1":
            match = SUBJECT_RE.match(text)
            if match and 1 <= int(match.group(1)) <= 14:
                source_id, title = match.groups()
                current_subject = source_id
                current_unit = ""
                current_priority = ""
                kind = "subject"
                parent_id = ""
            else:
                continue
        else:
            match = UNIT_RE.match(text)
            if match:
                current_unit, title, current_priority = match.groups()
                kind = "unit"
                source_id = current_unit
                parent_id = current_subject
            else:
                match = LEAF_RE.match(text)
                if match:
                    source_id, title = match.groups()
                    kind = "subtopic"
                    parent_id = source_id.rsplit(".", 1)[0]
                else:
                    match = TOPIC_RE.match(text)
                    if not match:
                        continue
                    source_id, title = match.groups()
                    kind = "topic"
                    parent_id = source_id.rsplit(".", 1)[0]

        source_order += 1
        counts[kind] += 1
        rows.append({
            "source_order": source_order,
            "source_paragraph_index": paragraph_index,
            "node_type": kind,
            "source_id": source_id,
            "parent_id": parent_id,
            "title": title.strip(),
            "priority": current_priority if kind != "subject" else "",
        })

    observed = {
        "subject": counts["subject"],
        "unit": counts["unit"],
        "topic": counts["topic"],
        "subtopic": counts["subtopic"],
    }
    if observed != EXPECTED:
        raise ValueError(
            f"Source counts differ from the pinned expected baseline. "
            f"Expected {EXPECTED}; extracted {observed}. Review the parser/source "
            f"version rather than silently accepting a denominator change."
        )

    ids = [str(row["source_id"]) for row in rows]
    duplicates = sorted(source_id for source_id, n in Counter(ids).items() if n > 1)
    if duplicates:
        raise ValueError(f"Duplicate source IDs found: {duplicates[:20]}")

    return rows


def compare_subject5(rows: list[dict[str, str | int]], crosswalk_path: Path) -> list[str]:
    source = [
        (str(row["source_id"]), str(row["title"]))
        for row in rows
        if row["node_type"] == "subtopic" and str(row["source_id"]).startswith("5.")
    ]
    with crosswalk_path.open("r", encoding="utf-8-sig", newline="") as stream:
        crosswalk = list(csv.DictReader(stream))

    required = {"leaf_id", "toc_title"}
    if not crosswalk or not required.issubset(crosswalk[0]):
        raise ValueError(
            f"{crosswalk_path} must have columns {sorted(required)}; "
            f"found {list(crosswalk[0]) if crosswalk else []}"
        )
    mapped = [(row["leaf_id"].strip(), row["toc_title"].strip()) for row in crosswalk]
    messages: list[str] = []
    source_ids = [item[0] for item in source]
    mapped_ids = [item[0] for item in mapped]
    source_by_id = dict(source)
    mapped_by_id = dict(mapped)

    missing = [source_id for source_id in source_ids if source_id not in mapped_by_id]
    extra = [source_id for source_id in mapped_ids if source_id not in source_by_id]
    title_mismatches = [
        (source_id, source_by_id[source_id], mapped_by_id[source_id])
        for source_id in source_ids
        if source_id in mapped_by_id and source_by_id[source_id] != mapped_by_id[source_id]
    ]
    if source_ids != mapped_ids:
        messages.append("Subject 5 row order/ID sequence differs from the source baseline.")
    if missing:
        messages.append(f"Missing source IDs in crosswalk ({len(missing)}): {missing[:30]}")
    if extra:
        messages.append(f"Non-source IDs in crosswalk ({len(extra)}): {extra[:30]}")
    if title_mismatches:
        messages.append(
            f"Exact title mismatches ({len(title_mismatches)}): "
            f"{title_mismatches[:20]}"
        )
    if not messages:
        messages.append(
            "Subject 5 leaf IDs, exact TOC titles, row count, and order match the baseline. "
            "This does not verify app-content semantics or readiness."
        )
    return messages


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--toc", type=Path, required=True, help="Pinned original DOCX")
    parser.add_argument("--output", type=Path, required=True, help="Output source-row CSV")
    parser.add_argument(
        "--subject5-crosswalk",
        type=Path,
        help="Optional path to subject-5-canonical-leaf-inventory.csv",
    )
    parser.add_argument(
        "--expected-sha256",
        default="3480f590c548d71abd5a5519eaa678ee1629831363a33b4c664b7d73e9318ebb",
        help="Expected source DOCX SHA-256; use an explicit override only for a reviewed new baseline",
    )
    args = parser.parse_args()

    actual_hash = sha256(args.toc)
    if args.expected_sha256 and actual_hash.lower() != args.expected_sha256.lower():
        print(
            f"ERROR: source fingerprint mismatch. Expected {args.expected_sha256}; "
            f"found {actual_hash}. Do not silently replace the baseline.",
            file=sys.stderr,
        )
        return 2

    try:
        rows = extract_rows(args.toc)
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    args.output.parent.mkdir(parents=True, exist_ok=True)
    columns = [
        "source_order", "source_paragraph_index", "node_type", "source_id",
        "parent_id", "title", "priority",
    ]
    with args.output.open("w", encoding="utf-8", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=columns)
        writer.writeheader()
        writer.writerows(rows)

    counts = Counter(str(row["node_type"]) for row in rows)
    print(f"Source: {args.toc}")
    print(f"SHA-256: {actual_hash}")
    print(f"Rows written: {len(rows)} to {args.output}")
    print(
        "Counts: "
        + ", ".join(
            f"{kind}={counts[kind]}"
            for kind in ("subject", "unit", "topic", "subtopic")
        )
    )

    if args.subject5_crosswalk:
        try:
            for message in compare_subject5(rows, args.subject5_crosswalk):
                print(f"Subject 5 crosswalk: {message}")
        except Exception as exc:
            print(f"ERROR comparing Subject 5 crosswalk: {exc}", file=sys.stderr)
            return 2

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
