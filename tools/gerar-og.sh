#!/usr/bin/env bash
# Gera assets/img/og.jpg (imagem de compartilhamento, 1200x630) a partir de tools/og.html.
cd "$(dirname "$0")/.."
E="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
FF=/c/Users/diasr/AppData/Local/Microsoft/WinGet/Links/ffmpeg.exe
TMP="$(cygpath -w "${TMPDIR:-/tmp}")"
"$E" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$TMP\edge-og" --window-size=1200,630 --virtual-time-budget=5000 \
  --screenshot="$TMP\og.png" "file:///$(cygpath -m "$PWD/tools/og.html")" >/dev/null 2>&1
"$FF" -y -v error -i "$(cygpath -u "$TMP")/og.png" -vf "crop=1200:630:0:0" -q:v 2 assets/img/og.jpg && ls -la assets/img/og.jpg
