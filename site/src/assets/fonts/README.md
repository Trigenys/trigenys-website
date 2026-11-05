# Polices auto-hébergées

Sous-ensembles latin de Source Serif 4, IBM Plex Sans et IBM Plex Mono (licence SIL OFL 1.1), téléchargés
depuis Google Fonts puis réduits au jeu de caractères du site (ASCII, Latin-1, Œ/œ, ponctuation typographique,
€, →, −), sans hinting :

```
python -m fontTools.subset <police>.woff2 --flavor=woff2 --output-file=<police>.woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF,U+0152-0153,U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+2039-203A,U+20AC,U+2192,U+2212" \
  --layout-features="kern,liga" --no-hinting --desubroutinize
```

Les polices variables sont ensuite restreintes à la plage de graisses utilisée (`fontTools.varLib.instancer`, `wght=400:700` pour Plex Sans, `wght=500:600` pour Source Serif 4 romain), un seul fichier par famille et style. Un caractère hors de ce jeu s'affiche avec la police de
repli calibrée déclarée dans `index.tpl.html` ; étendre le jeu et régénérer avant d'ajouter une langue.
