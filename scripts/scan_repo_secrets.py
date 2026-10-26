#!/usr/bin/env python3
"""Lightweight tracked-file secret pattern scan (not a substitute for full security review)."""
from __future__ import annotations
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATTERNS = [
    (re.compile(r"ghp_[A-Za-z0-9]{20,}"), "github_pat"),
    (re.compile(r"sk-[A-Za-z0-9]{20,}"), "openai_sk"),
    (re.compile(r"-----BEGIN (RSA |OPENSSH )?PRIVATE KEY-----"), "private_key"),
    (re.compile(r"AWS_SECRET_ACCESS_KEY\s*=\s*['\"]?[A-Za-z0-9/+=]{20,}"), "aws_secret"),
    (re.compile(r"supabase.*service.?role.*['\"][A-Za-z0-9._-]{20,}['\"]", re.I), "supabase_service_role"),
]
ALLOW = {
    "scripts/scan_repo_secrets.py",
}


def tracked_files() -> list[Path]:
    out = subprocess.check_output(["git", "ls-files"], cwd=ROOT, text=True)
    return [ROOT / line for line in out.splitlines() if line]


def main() -> int:
    findings = []
    for path in tracked_files():
        rel = str(path.relative_to(ROOT))
        if rel in ALLOW or rel.startswith("node_modules/"):
            continue
        if path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".woff", ".woff2", ".pdf"}:
            continue
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        for rx, label in PATTERNS:
            if rx.search(text):
                findings.append(f"{rel}: possible {label}")
    if findings:
        print("SECRET SCAN FINDINGS:")
        for f in findings[:50]:
            print(" ", f)
        return 1
    print("Secret pattern scan: OK (no high-confidence patterns in tracked text files).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
