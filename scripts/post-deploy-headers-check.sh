#!/usr/bin/env bash
# My Study — post-deploy header smoke check.
# Run after every deploy:  SITE_URL=https://my-study.example.com ./scripts/post-deploy-headers-check.sh
set -euo pipefail

: "${SITE_URL:?SITE_URL must be set to the deployed site origin, e.g. https://my-study.example.com}"

fail=0
check() { local label="$1"; shift; local expect="$1"; shift; local actual; actual="$(curl -sI "$@" "$SITE_URL" | tr -d '\r')"; if ! printf '%s' "$actual" | grep -iq "$expect"; then echo "FAIL: $label — expected /$expect/i"; printf '%s\n' "$actual" | head -20; fail=1; else echo "ok: $label"; fi; }

check "CSP on /"         '^content-security-policy:' /
check "nosniff on /"     'x-content-type-objects: nosniff' /
check "sw.js no-cache"   'cache-control:.*no-cache' /sw.js
check "assets immutable" 'cache-control:.*immutable' /assets/

exit "$fail"
