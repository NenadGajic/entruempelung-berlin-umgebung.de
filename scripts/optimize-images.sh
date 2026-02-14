#!/usr/bin/env bash
set -euo pipefail

# In-place JPEG optimization policy for this project:
# - keep existing filenames/paths
# - quality target: 80
# - no WebP conversion in this phase

FILES=(
  "source/assets/img/umzug.jpg"
  "source/assets/img/entruempelung.jpg"
  "source/assets/img/transport.jpg"
  "source/assets/img/entsorgung.jpg"
  "source/assets/img/entruempelung-1.jpg"
  "source/assets/img/bueroaufloesung.jpeg"
  "source/assets/img/berlin-brandenburg.jpg"
)

for f in "${FILES[@]}"; do
  old=$(stat -f%z "$f")
  tmp=$(mktemp /tmp/imgopt.XXXXXX.jpg)

  djpeg "$f" | cjpeg -quality 80 -optimize -progressive > "$tmp"
  new=$(stat -f%z "$tmp")

  if [ "$new" -lt "$old" ]; then
    mv "$tmp" "$f"
    printf "optimized %s: %d -> %d bytes\n" "$f" "$old" "$new"
  else
    rm -f "$tmp"
    printf "kept %s: %d bytes (no smaller output)\n" "$f" "$old"
  fi
done
