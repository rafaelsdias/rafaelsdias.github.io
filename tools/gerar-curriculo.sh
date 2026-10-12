#!/usr/bin/env bash
# Gera assets/cv/rafael-dias-curriculo.pdf a partir de tools/curriculo.html usando o Edge em modo headless.
cd "$(dirname "$0")/.."
E="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
SRC="file:///$(cygpath -m "$PWD/tools/curriculo.html")"
OUT="$(cygpath -w "$PWD/assets/cv/rafael-dias-curriculo.pdf")"
TMP="$(cygpath -w "${TMPDIR:-/tmp}")\edge-cv"
"$E" --headless=new --disable-gpu --user-data-dir="$TMP" --no-pdf-header-footer --virtual-time-budget=5000 --print-to-pdf="$OUT" "$SRC" 2>&1 | grep -i written
