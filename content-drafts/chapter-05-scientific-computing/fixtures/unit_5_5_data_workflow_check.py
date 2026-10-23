"""Unit 5.5 data workflow teaching checks (stdlib).

Manifest required fields and fail-closed secret loading — synthetic only.
"""
from __future__ import annotations

REQUIRED_MANIFEST = ("url", "version", "extent", "date", "licence", "checksum")


def validate_manifest(m: dict) -> list[str]:
    return [k for k in REQUIRED_MANIFEST if not m.get(k)]


def load_secret(env: dict, key: str = "API_KEY") -> str:
    val = env.get(key)
    if not val:
        raise RuntimeError(f"missing secret {key}")
    if val.startswith("CHANGE_ME"):
        raise RuntimeError("template secret not replaced")
    return val


def main() -> None:
    good = {
        "url": "https://example.invalid/data",
        "version": "v1",
        "extent": "bbox:0,0,1,1",
        "date": "2026-01-01",
        "licence": "CC-BY-4.0",
        "checksum": "sha256:abc",
    }
    assert validate_manifest(good) == []
    assert "checksum" in validate_manifest({k: good[k] for k in good if k != "checksum"})

    assert load_secret({"API_KEY": "secret-value"}) == "secret-value"
    try:
        load_secret({})
        raise AssertionError("expected missing secret")
    except RuntimeError:
        pass
    try:
        load_secret({"API_KEY": "CHANGE_ME_NOW"})
        raise AssertionError("expected template rejection")
    except RuntimeError:
        pass

    print("Unit 5.5 data workflow checks passed (manifest fields, fail-closed secrets).")


if __name__ == "__main__":
    main()
