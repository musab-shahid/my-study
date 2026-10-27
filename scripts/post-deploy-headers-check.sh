#!/usr/bin/env bash
# Post-deploy smoke: CSP and cache-control on a live site URL.
# Usage: SITE_URL=https://example.com ./scripts/post-deploy-headers-check.sh
set -euo pipefail
SITE_URL="${SITE_URL:-}"
if [[ -z "$SITE_URL" ]]; then
  echo "Set SITE_URL to the deployed origin (e.g. https://app.example.com)" >&2
  exit 2
fi
SITE_URL="${SITE_URL%/}"
fail=0
check() {
  local path="$1" header="$2" expect="${3:-}"
  local url="${SITE_URL}${path}"
  local line
  line=$(curl -sI "$url" | tr -d '\r' | grep -i "^${header}:" || true)
  if [[ -z "$line" ]]; then
    echo "MISSING ${header} on ${path}"
    fail=1
    return
  fi
  echo "OK ${path}: ${line}"
  if [[ -n "$expect" ]] && ! grep -qi "$expect" <<<"$line"; then
    echo "  expected to match: $expect"
    fail=1
  fi
}
check "/" "content-security-policy"
check "/sw.js" "cache-control" "no-cache"
check "/" "x-content-type-options" "nosniff"
exit $fail
