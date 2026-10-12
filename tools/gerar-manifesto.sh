#!/usr/bin/env bash
# Lê tools/imagens.tsv e gera assets/js/imagens.js: { "pasta": [[largura, altura], ...] } na ordem dos arquivos 01, 02...
cd "$(dirname "$0")/.."
awk -F'\t' '
{ n=split($1,a,"/"); dir=a[1]; for(i=2;i<n;i++) dir=dir "/" a[i]; split($2,wh,"x");
  if(!(dir in seen)){ seen[dir]=1; order[++k]=dir }
  list[dir]=list[dir] (list[dir]?",":"") "[" wh[1] "," wh[2] "]" }
END { printf "// Gerado por tools/gerar-manifesto.sh, não editar à mão.\nwindow.IMAGENS = {\n";
  for(i=1;i<=k;i++) printf "  \"%s\": [%s]%s\n", order[i], list[order[i]], (i<k?",":"");
  print "};" }' tools/imagens.tsv > assets/js/imagens.js
