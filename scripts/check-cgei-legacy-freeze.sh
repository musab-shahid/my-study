#!/usr/bin/env bash
# Phase E4: CGEI legacy/ folders are retired.
# Fail if any src/data/cgei/*/legacy directory is reintroduced.
set -euo pipefail

found=0
while IFS= read -r line; do
  if [ -n "$line" ]; then
    if [ "$found" -eq 0 ]; then
      echo "ERROR: CGEI legacy/ directories were retired in Phase E4."
      echo "Use quiz-topics-*.ts or roadmap-topics.ts instead."
    fi
    echo "$line"
    found=1
  fi
done <<FIND
$(find src/data/cgei -type d -name legacy 2>/dev/null || true)
FIND

if [ "$found" -ne 0 ]; then
  exit 1
fi

echo "OK: no CGEI legacy/ directories present"
