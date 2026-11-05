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

## 2026-11-05 — CI muette : dépôt privé et quota GitHub Actions de l'organisation épuisé (infra / coût)
- **Symptôme** : workflow poussé sur `main`, 0 workflow enregistré, 0 run, aucun check sur la PR sonde ; aucun message d'erreur côté API.
- **Cause racine** : le dépôt a été créé **privé** ; les minutes Actions du forfait gratuit de l'org étaient consommées pour le mois. Sur un dépôt privé sans minutes, GitHub ne crée simplement pas de run.
- **Résolution** : décision fondateur sur la visibilité (public = minutes illimitées, mais docs internes exposées) ou attente du reset mensuel ; en attendant, les gates se jouent en local (`npm run build`, Playwright `pwdist.py`).
- **Prévention** : avant de brancher une CI, vérifier visibilité du dépôt et quota (`gh api orgs/<org>/settings/billing/usage` par un admin) ; consigner la visibilité choisie dans le README du dépôt.
- **Leçon générale** : « aucun run » sans erreur = d'abord regarder facturation et visibilité, pas le YAML.

## 2026-11-05 — Workflow invisible tant que le fichier n'est pas retouché (infra)
- **Symptôme** : dépôt passé public, pushs successifs, toujours 0 workflow enregistré pendant ~1 h.
- **Cause racine** : GitHub n'indexe un workflow qu'au traitement d'un événement touchant `.github/workflows/` ; les événements émis pendant la période « privé sans minutes » ont été ignorés et les pushs suivants ne modifiaient pas le fichier.
- **Résolution** : commit modifiant `ci.yml` (en-tête de commentaire) → workflow enregistré en moins d'une minute, premier run obtenu par `gh workflow run`.
- **Leçon générale** : après un changement de visibilité ou de facturation, retoucher le fichier de workflow pour forcer la réindexation.

## 2026-11-05 — Gate visual-qa : le contrat refusait un CTA vers une ancre de la même page (contrat de brique)
- **Symptôme** : premier run CI, job `visual-qa` en échec immédiat : `routes[0].expectedCtaHref must be a safe local path` pour `#contact`.
- **Cause racine** : `contract.mjs` de `appfactory-project-automation` interdit tout `#` dans `expectedCtaHref` et `run.mjs` compare l'attribut `href` brut ; un site une page ne pouvait jamais passer. Le contrôle local (`check.mjs`, Playwright) ne rejoue pas le contrat de la brique.
- **Résolution** : adaptation de la brique (Adapt) : `expectedCtaHref` accepte `<chemin local>#<fragment>` borné, et le `href` rendu est normalisé contre la route (`#contact` sur `/` = `/#contact`). Tests + doc dans la brique ; commit local `75eeb2b` sur la branche `feat/visual-qa-fragment-cta` à pousser par le fondateur (push et PR refusés à l'agent sur ce dépôt).
- **Prévention** : avant de brancher une brique partagée, exécuter sa validation de config en local (`node -e` sur `contract.mjs`) sur la config réelle du projet ; à ajouter au `npm run build` quand la brique exposera un point d'entrée stable.
- **Leçon générale** : un contrat « sécuritaire » qui exclut un cas légitime fréquent (site une page) doit être élargi dans la brique, pas contourné dans le projet (pas de page `/contact` factice ni de sélecteur alternatif).

## 2026-11-05 — Gate visual-qa : LCP mobile à 8,6 s (performance / site statique)
- **Symptôme** : `route0:mobile:performance FAIL lcp=8641 ms` (budget 2 500 ms), desktop vert, CLS 0, TBT 0.
- **Cause racine** (trois couches, mesurées avec Lighthouse local puis l'artefact Lighthouse de la CI) :
  (1) ~1,1 Mo d'images PNG à 2–4× la taille d'affichage, toutes chargées d'emblée (≈ 5,5 s sur la 4G simulée) ;
  (2) feuille Google Fonts bloquante (~1,1 s avant le premier rendu) ;
  (3) 500 glyphes SVG décoratifs (hélices, orbites) en IBM Plex Mono : à l'arrivée de la police, re-layout massif
  qui occupe le CPU (×4) au moment où le titre doit se peindre ; le swap du titre (serif de repli → Source Serif 4)
  provoquait aussi un CLS de 0,09.
- **Résolution** : WebP à la taille d'affichage (290 Ko au total), première diapo en `preload`/`fetchpriority`, le
  reste en `loading="lazy"` ; feuille de polices en `preload as=style` + `onload` (repli `noscript`) ; décor animé en
  pause jusqu'au `load` et hors écran ; police monospace système pour les SVG décoratifs ; `@font-face` de repli
  calibrées (`size-adjust`, `ascent/descent-override` mesurés dans le navigateur) pour le titre et le corps.
  Premier palier mesuré en CI : LCP 2 857 ms, CLS 0,092 ; second palier (run 42078031269, vert) : LCP 2 261 ms, CLS 0,078, TBT 15 ms ; desktop LCP 979 ms. Marge mince (≈ 240 ms) : surveiller.
- **Prévention** : le build refuse déjà les images externes ; ajouter au `check.mjs` un plafond de poids par image
  référencée et un contrôle « première image du hero avec `fetchpriority`/dimensions » si la régression se reproduit.
  Mesurer sur l'artefact Lighthouse de la CI (`gh run download`), pas sur un poste chargé : les mesures locales
  variaient du simple au double.
- **Leçon générale** : les budgets ne se négocient pas ; on cherche l'élément LCP et ses phases (ici « render delay »)
  avant de toucher aux assets au hasard. Une décoration SVG massive doit utiliser une police locale ou être montée
  après le chargement.
