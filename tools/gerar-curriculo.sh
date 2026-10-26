#!/usr/bin/env bash
# Gera os currículos em PDF a partir de tools/curriculo.html (PT) e tools/curriculo-en.html (EN) usando o Edge em modo headless.
# O Edge devolve o controle antes de terminar de gravar, então o script espera cada PDF aparecer.
cd "$(dirname "$0")/.."
E="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
TMP="$(cygpath -w "${TMPDIR:-/tmp}")"
gera() {
  local src="$1" out="assets/cv/$2"
  rm -f "$out"
  "$E" --headless=new --disable-gpu --user-data-dir="$TMP\edge-cv-$2" --no-pdf-header-footer --virtual-time-budget=5000 \
    --print-to-pdf="$(cygpath -w "$PWD/$out")" "file:///$(cygpath -m "$PWD/tools/$src")" >/dev/null 2>&1
  for i in $(seq 1 40); do [ -s "$out" ] && sleep 1 && echo "$out ok" && return; sleep 0.5; done; echo "$out FALHOU"
}
gera curriculo.html rafael-dias-curriculo.pdf
gera curriculo-en.html rafael-dias-cv.pdf
