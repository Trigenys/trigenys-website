# Leçons apprises — trigenys-website

Mémoire des erreurs et quasi-incidents (standard RAIDER, « failure memory »). Ajout seulement.

## 2026-11-05 — CTA principal invisible sur mobile (quasi-incident, catégorie : tests / UX)
- **Contexte** : configuration du gate `visual-qa` avec le bouton « Parler à un expert » de la barre de navigation comme CTA principal.
- **Symptôme** : le contrôle local Playwright à 390×844 renvoie `cta visible: False` ; la barre `.rt` est masquée sous 900 px.
- **Cause racine** : le sélecteur visait un élément dépendant du point de rupture, pas le CTA du hero.
- **Résolution** : attribut stable `data-cta="primary"` sur le bouton du hero, visible aux deux viewports ; le sélecteur de la config QA ne dépend plus d'une classe de mise en page.
- **Prévention** : le gate `visual-qa` (desktop + mobile) échouerait en CI ; `scripts/check.mjs` vérifie la présence du marqueur dans le build.
- **Leçon générale** : un sélecteur de test cible un rôle (`data-*`), jamais une classe de style ou de layout.

## 2026-11-05 — Scripts Python écrits par heredoc avec séquences d'échappement (process)
- **Symptôme** : `gen7.py` généré par un heredoc contenant `'\n'` a produit des sauts de ligne réels dans une chaîne → `SyntaxError`, deux fois.
- **Cause racine** : le shell interprète les séquences avant Python.
- **Résolution** : écrire les fichiers de script avec un outil d'écriture de fichier, ou utiliser `chr(10)` ; le build de production est en Node (`scripts/build.mjs`), sans génération par heredoc.
- **Leçon générale** : pas de code source produit via heredoc dès qu'il contient `\n`, `\d` ou des guillemets imbriqués.
