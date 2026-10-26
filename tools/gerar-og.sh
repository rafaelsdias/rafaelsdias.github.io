#!/usr/bin/env bash
# Gera as imagens de compartilhamento (1200x630): tools/og.html -> assets/img/og.jpg e tools/og-en.html -> assets/img/og-en.jpg.
# O Edge devolve o controle antes de gravar a captura, então o script espera o arquivo aparecer.
cd "$(dirname "$0")/.."
E="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
FF=/c/Users/diasr/AppData/Local/Microsoft/WinGet/Links/ffmpeg.exe
TMP="$(cygpath -w "${TMPDIR:-/tmp}")"; TMPU="$(cygpath -u "$TMP")"
gera() {
  rm -f "$TMPU/$1.png"
  "$E" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$TMP/edge-$1" --window-size=1200,630 --virtual-time-budget=5000 \
    --screenshot="$TMP/$1.png" "file:///$(cygpath -m "$PWD/tools/$1.html")" >/dev/null 2>&1
  for i in $(seq 1 40); do [ -s "$TMPU/$1.png" ] && sleep 1 && break; sleep 0.5; done
  "$FF" -y -v error -i "$TMPU/$1.png" -vf "crop=1200:630:0:0" -q:v 2 "assets/img/$1.jpg" && echo "assets/img/$1.jpg ok"
}
gera og
gera og-en
