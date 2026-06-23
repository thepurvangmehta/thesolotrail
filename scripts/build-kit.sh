#!/bin/bash
# Build a trail kit zip ready to upload to Gumroad.
# Usage: ./scripts/build-kit.sh <trail-id>
# Example: ./scripts/build-kit.sh abc
#
# Expects these files to already exist:
#   downloads/<trail-id>-trail-kit-print.html   → becomes the PDF
#   downloads/<trail-id>.gpx                    → included as-is
#
# Outputs: dist/kits/<trail-id>-trail-kit.zip

set -e

TRAIL_ID="${1}"
if [[ -z "$TRAIL_ID" ]]; then
  echo "Usage: ./scripts/build-kit.sh <trail-id>"
  echo "Example: ./scripts/build-kit.sh abc"
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DOWNLOADS="$REPO_ROOT/downloads"
DIST="$REPO_ROOT/dist/kits"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

PRINT_HTML="$DOWNLOADS/${TRAIL_ID}-trail-kit-print.html"
GPX_FILE="$DOWNLOADS/${TRAIL_ID}.gpx"
PDF_FILE="$DIST/${TRAIL_ID}-trail-kit.pdf"
ZIP_FILE="$DIST/${TRAIL_ID}-trail-kit.zip"

# ── Preflight checks ─────────────────────────────────────────
if [[ ! -f "$PRINT_HTML" ]]; then
  echo "ERROR: Print HTML not found at $PRINT_HTML"
  exit 1
fi

if [[ ! -f "$GPX_FILE" ]]; then
  echo "ERROR: GPX file not found at $GPX_FILE"
  exit 1
fi

if [[ ! -f "$CHROME" ]]; then
  echo "ERROR: Google Chrome not found at expected path"
  exit 1
fi

mkdir -p "$DIST"

# ── Step 1: Generate PDF from HTML ──────────────────────────
echo "→ Generating PDF from ${TRAIL_ID}-trail-kit-print.html..."

"$CHROME" \
  --headless=new \
  --no-sandbox \
  --disable-gpu \
  --print-to-pdf="$PDF_FILE" \
  --no-pdf-header-footer \
  --print-to-pdf-no-header \
  "file://$PRINT_HTML" \
  2>/dev/null

if [[ ! -f "$PDF_FILE" ]]; then
  echo "ERROR: PDF generation failed"
  exit 1
fi

PDF_SIZE=$(du -sh "$PDF_FILE" | cut -f1)
echo "  ✓ PDF created ($PDF_SIZE) → dist/kits/${TRAIL_ID}-trail-kit.pdf"

# ── Step 2: Write the README ─────────────────────────────────
README_FILE="$DIST/README.txt"
cat > "$README_FILE" << 'READMEEOF'
THE SOLO TRAIL — TRAIL KIT
thesolotrail.com

What's in this kit
──────────────────
Trail Guide (PDF)       Open on any phone, tablet, or laptop.
                        Print a copy if you prefer paper.

GPX Waypoints (.gpx)    Load into OsmAnd (Android/iOS), Gaia GPS,
                        or any GPS app that supports GPX format.
                        Works fully offline once loaded.

How to load the GPX
────────────────────
OsmAnd:   Menu → My Places → Tracks → + → select the .gpx file
Gaia GPS: Files → Import → select the .gpx file
Garmin:   Copy .gpx to the GPX folder on your device via USB

Questions or corrections
────────────────────────
hello@thesolotrail.com
READMEEOF

echo "  ✓ README written"

# ── Step 3: Create the zip ───────────────────────────────────
echo "→ Creating zip archive..."

cd "$DIST"
rm -f "$ZIP_FILE"
zip -j "$ZIP_FILE" \
  "${TRAIL_ID}-trail-kit.pdf" \
  "$GPX_FILE" \
  "README.txt" \
  2>/dev/null

ZIP_SIZE=$(du -sh "$ZIP_FILE" | cut -f1)
echo "  ✓ Zip created ($ZIP_SIZE) → dist/kits/${TRAIL_ID}-trail-kit.zip"

# ── Done ─────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Trail kit ready:  dist/kits/${TRAIL_ID}-trail-kit.zip"
echo "  Upload this file to Gumroad."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
