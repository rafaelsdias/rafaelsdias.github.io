#!/usr/bin/env bash
# Gera versões web (WebP) a partir da pasta de originais, sem alterar os originais.
# Cada pasta de origem vai para UMA pasta de destino (nada se mistura).
# Saída: <destino>/NN.webp (grande) + <destino>/NN-t.webp (miniatura) e uma linha em tools/imagens.tsv
set -u
FF=/c/Users/diasr/AppData/Local/Microsoft/WinGet/Links/ffmpeg.exe
FP=/c/Users/diasr/AppData/Local/Microsoft/WinGet/Links/ffprobe.exe
SRC=/c/Users/diasr/Projetos/Portifolio
SITE=/c/Users/diasr/Projetos/rafaelsdias.github.io
IMG=$SITE/assets/img
LOG=$SITE/tools/imagens.tsv
: > "$LOG"

# pasta_origem | pasta_destino | lado_maior_grande | lado_maior_miniatura | qualidade
processa() {
  local from="$1" to="$2" big="$3" thumb="$4" q="$5" i=0
  mkdir -p "$IMG/$to"
  while IFS= read -r f; do
    i=$((i+1)); local n; n=$(printf "%02d" $i)
    "$FF" -y -v error -i "$f" -vf "scale='min($big,iw)':'min($big,ih)':force_original_aspect_ratio=decrease" -c:v libwebp -quality "$q" "$IMG/$to/$n.webp"
    "$FF" -y -v error -i "$f" -vf "scale='min($thumb,iw)':'min($thumb,ih)':force_original_aspect_ratio=decrease" -c:v libwebp -quality 78 "$IMG/$to/$n-t.webp"
    local wh; wh=$("$FP" -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$IMG/$to/$n.webp")
    printf "%s\t%s\t%s\n" "$to/$n" "$wh" "${f#$SRC/}" >> "$LOG"
  done < <(find "$SRC/$from" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | sort -V)
  echo "$from -> $to : $i"
}

processa "Manual de Marca - BlueBank/JPEG"               bluebank/manual          1920 720 82
processa "A Casa Ink/Manual de Marca/JPEG"               casa-ink/manual          1920 720 82
processa "A Casa Ink/Redes Sociais - Carrossel 01"       casa-ink/carrossel-01    1080 540 85
processa "A Casa Ink/Redes Sociais - Carrossel 02"       casa-ink/carrossel-02    1080 540 85
for d in "$SRC/Posts - Instagram"/*/; do
  b=$(basename "$d"); processa "Posts - Instagram/$b"    instagram/$b             1080 540 85
done
processa "Thumbnails - Youtube"                          youtube                  1280 400 90
processa "Fotografia - Don Marco Pizzaria"               foto/don-marco           2000 800 80
processa "Fotografia - All In Burger"                    foto/all-in-burger       2000 800 80
processa "Fotografia - Outros Trabalhos"                 foto/outros              2000 800 80

# Foto do Sobre: camadas com transparência
mkdir -p "$IMG/sobre"
for p in "Rosto:rosto" "Nuvens Superiores:nuvens-frente" "Nuvens Inferiores:nuvens-tras"; do
  "$FF" -y -v error -i "$SRC/Foto Nuvens/${p%%:*}.png" -vf scale=1200:-2 -c:v libwebp -quality 85 -pix_fmt yuva420p "$IMG/sobre/${p##*:}.webp"
done
echo "sobre ok"
