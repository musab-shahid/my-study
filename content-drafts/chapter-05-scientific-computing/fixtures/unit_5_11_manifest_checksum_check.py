"""Unit 5.11 manifest and checksum integrity checks (stdlib).

Verifies required provenance fields and SHA-256 byte integrity for a small
in-repo synthetic input. Does not prove authenticity, licensing permission
for redistribution of third-party data, or scientific quality.
"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent / "repro_lab"
REQUIRED = (
    "schema_version",
    "dataset_id",
    "source",
    "retrieval_date",
    "licence",
    "relative_path",
    "sha256",
)


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    h.update(path.read_bytes())
    return h.hexdigest()


def load_manifest(path: Path) -> dict:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("manifest must be a JSON object")
    return data


def validate_manifest(manifest: dict, data_path: Path) -> None:
    missing = [k for k in REQUIRED if not str(manifest.get(k, "")).strip()]
    if missing:
        raise ValueError(f"missing required manifest fields: {', '.join(missing)}")
    rel = Path(str(manifest["relative_path"]))
    if rel.is_absolute() or ".." in rel.parts:
        raise ValueError("relative_path must be a safe relative path")
    if data_path.name != rel.name:
        raise ValueError("relative_path does not match the validated file name")
    expected = str(manifest["sha256"]).lower()
    actual = sha256_file(data_path)
    if actual != expected:
        raise ValueError(f"checksum mismatch: expected {expected}, got {actual}")


def main() -> None:
    manifest_path = ROOT / "manifest.json"
    data_path = ROOT / "input.csv"
    manifest = load_manifest(manifest_path)
    validate_manifest(manifest, data_path)

    # Tamper detection
    tampered = data_path.read_bytes() + b"\n"
    assert sha256_file(data_path) != hashlib.sha256(tampered).hexdigest()

    # Missing field detection
    broken = dict(manifest)
    broken.pop("licence")
    try:
        validate_manifest(broken, data_path)
        raise AssertionError("expected missing-field failure")
    except ValueError as exc:
        assert "licence" in str(exc)

    # Wrong checksum detection
    broken2 = dict(manifest)
    broken2["sha256"] = "0" * 64
    try:
        validate_manifest(broken2, data_path)
        raise AssertionError("expected checksum failure")
    except ValueError as exc:
        assert "checksum mismatch" in str(exc)

    print("Unit 5.11 manifest/checksum checks passed.")


if __name__ == "__main__":
    main()
