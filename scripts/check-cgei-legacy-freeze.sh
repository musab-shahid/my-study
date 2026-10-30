#!/usr/bin/env bash
# Phase E4: CGEI legacy/ folders are retired.
# Fail if any src/data/cgei/*/legacy/ path is reintroduced.
set -euo pipefail

hits=()
while IFS= read -r line; do
  hits+=("$line")
done < <(find src/data/cgei -type d -name legacy 2>/dev/null || true)

if ((${#hits[@]} > 0)); then
  echo "ERROR: CGEI legacy/ directories were retired in Phase E4."
  echo "Use quiz-topics-*.ts or roadmap-topics.ts instead."
  printf '%s\n' "${hits[@]}"
  exit 1
fi

echo "OK: no CGEI legacy/ directories present"
