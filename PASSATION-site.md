
## 2026-11-05 13:22 — Site corporate Trigenys : dossier de direction v1
- État : recherche concurrentielle + inventaire produits faits ; dossier docs/site/strategie-site-v1.md ; maquettes V2 accueil (desktop + mobile 390) publiées sur https://claude.ai/artifact/2p1BMQjNdoikZaX4d4RxcF (sources : scratchpad/site/project).
- Décisions validées : option C (éditeur), logo/couleurs/typo DS V4. En attente : direction v1 (hybride A+B, archi, proposition de valeur).
- Pas de dépôt site encore ; journal dans docs/decisions/comex-log.md (dossier de session, non versionné).
- Prochaine étape : validation fondateur → créer le dépôt du site, y verser docs/, puis fiches Atelier et Précis.

## 2026-11-05 13:48 — Dépôt du site créé
- Dépôt privé https://github.com/Trigenys/trigenys-website (branche main) : README, docs/site/strategie-site-v1.md, docs/decisions/comex-log.md, design/maquettes/ (sources canevas), cette passation.
- Corrige l'entrée précédente : « pas de dépôt site » n'est plus vrai.
- Direction v1 toujours en attente de validation fondateur ; aucun code de production.
- Prochaine étape : validation → fiches Atelier Maître et Précis, puis adoption AppFactory (board, impact CI).

## 2026-11-05 13:53 — Accueil V3 immersive
- Retour fondateur : V2 « trop légère » ; attendu moderne, dynamique, immersif, sans excès, inspirant confiance, fluide.
- V3 (design/maquettes/V3-Accueil*.dc.html, canevas versions 9–11) : hero sombre à halos animés lents, console produits auto-défilante (données d'exemple étiquetées), bandeau de repères vérifiables, cartes à bordure animée au survol, frise méthode. Respecte prefers-reduced-motion. V2 conservée pour comparaison.
- Contenu inchangé (aucune fonctionnalité, statistique ni tarif ajouté ; seule donnée produit : Atelier Maître v1.18 en production).
- Prochaine étape : retour fondateur sur la V3, puis pages produits au même niveau.

## 2026-11-05 14:01 — Accueil V4 : groupe à portefeuille
- Retour fondateur : V3 = « AI slop » ; positionnement faux (3 produits ≠ toute l'offre).
- Fait : `design/maquettes/V4-Accueil.dc.html` (+ `-Mobile`), boards V4 sur le canvas (y=21000). Hero éditorial + capture Atelier Maître (données d'exemple), lancement 3 produits, index portefeuille 7 métiers avec stades issus du registry, services, réalisations (XEPTION, Atelier Maître), méthode RAIDER, contact.
- Vérifié : 1440 → 6960 px, 390 → 10359 px, aucun débordement horizontal.
- Ouvert : quels produits non publiés afficher ; place d'AgenStudio ; contacts réels (placeholders).
- Suite : retour fondateur sur V4, puis pages produit.

## 2026-11-05 15:05 — Accueil V5 : studio produits coloré
- Retour fondateur sur V4 : « j'aime pas » — trop plat, structure et textes à revoir ; direction choisie : **studio produit coloré**.
- Fait : `design/maquettes/V5-Accueil.dc.html` (+ `-Mobile`), boards V5 sur le canvas (y=32000). Couleur propre à chaque produit (proposition, non validée), mur de produits animé, 3 produits de lancement en panneaux empilés (sticky), bento du portefeuille (13 produits, stades du registry), services, réalisations, CTA.
- Vérifié : 1440 → 7873 px, 390 → 10157 px, aucun débordement ; contraste bouton corrigé.
- Ouvert : couleurs produit à valider ; produits non publiés affichables ou non ; contacts réels.

## 2026-11-05 15:08 — Benchmark des sites du domaine (en cours)
- Demande fondateur : rechercher les sites des acteurs de notre domaine.
- En cours : benchmark (multi-produits type Zoho/Odoo/37signals, SaaS B2B africains, concurrents directs atelier auto / commerce WhatsApp / traduction). Sortie prévue : `docs/site/benchmark-sites.md`.
- État : V5 publiée sur le canvas et poussée (f9b0919), non validée. Aucun verrou.
- Prochaine étape : verser le benchmark au dépôt, en tirer des correctifs pour l'accueil.

## 2026-11-05 15:17 — Benchmark des sites du domaine (livré)
- Rapport versé : `docs/site/benchmark-sites.md` (3 familles : multi-produits, B2B africains, concurrents directs ; synthèse a-e ; 10 recommandations priorisées pour l'accueil).
- Points saillants : promesse client en une phrase, preuve chiffrée réelle au 2e écran, 3 phares + grille « voir tout », second axe « par métier », CTA WhatsApp primaire (rare chez les concurrents), prix en FCFA, bloc fondateur/équipe. Anti-exemples : placeholders en prod, métriques inexpliquées, isométrique/3D/dégradés, TLS cassé.
- État : V5 (f9b0919) toujours non validée. Aucun verrou.
- Prochaine étape : décider avec le fondateur si V5 est retouchée selon les recommandations 1-5 ou si une V6 part du benchmark. Toujours en attente : couleurs produits, produits non publiés visibles ou non, lien AgenStudio, contacts réels.

## 2026-11-05 15:25 — Accueil V6 : issue du benchmark
- Fondateur a choisi « Faire une V6 » plutôt que retoucher V5.
- V6 publiée sur le canvas (boards y=43000, desktop 1440×7260, mobile 390×12100) et versée dans `design/maquettes/V6-Accueil*.dc.html`. Vérifiée localement : 7 225 px / 12 062 px, aucun débordement horizontal.
- Structure : hero promesse client + CTA WhatsApp « Parler à un expert » ; bande de preuves limitée aux faits vérifiables du registre (13 logiciels, 2 prod + 4 bêta, XEPTION) ; 3 phares en cartes riches + grille des 10 autres + « Voir les 13 produits » ; onglets « Par métier » (6 cibles, CSS pur) ; ingénierie en 4 étapes + XEPTION ; confiance (stades, témoignages, ancrage) ; bloc équipe ; tarifs FCFA sans montant ; CTA final.
- Emplacements « à fournir » explicitement marqués : logos clients, témoignages nommés, adresse/numéro/hébergement/conformité, photo équipe, signataire, montants des abonnements.
- Couleurs produits = proposition V5 reprise, toujours non validée. V5 et V6 coexistent sur le canvas, aucune supprimée.
- Prochaine étape : retour fondateur sur V6 ; si validée, collecter les éléments « à fournir » puis passer en pages produit.

## 2026-11-05 15:50 — Accueil V7 : expérience de défilement
- Retour fondateur sur V6 : logo à faire « vivre » dans la page, vraies captures / logos / liens produits, ne pas parler des projets non publiés, plus de profondeur au scroll (parallax, scroll horizontal immersif).
- V7 publiée sur le canvas (y=54000) en trois boards : `V7-Accueil-Deroule` (statique 1440×9900, toutes sections), `V7-Accueil-Fenetre` (iframe 1440×900 à faire défiler : parallax + rail horizontal), `V7-Accueil-Mobile` (iframe 390×844). Versées dans `design/maquettes/`.
- Technique : CSS pur, animations pilotées par le défilement (`animation-timeline: view()`), rail produits sticky 420vh avec translation horizontale ; repli scroll-snap horizontal si non supporté ; mobile = panneaux empilés. Aucun JS.
- Logo vivant : hélice de chiffres binaires générée (SVG, `gen7.py` en scratchpad) dans hero, séparateur, panneau « et la suite », CTA final, pied de page ; filigrane du logo inversé en section ingénierie.
- Règle appliquée : seuls les produits `publicationStatus: published` apparaissent (Atelier Maître v1.18 prod, Commerce Factory bêta, Précis Translator bêta pilotes) ; les autres = un panneau « d'autres outils sont en construction » sans nom.
- Assets réels : captures Atelier Maître (dashboard, atelier, mobile), icône AM ; logo + visuels Commerce Factory ; logo + visuel de partage Précis. Liens réels : atelier.trigenys.com, trigenys-commerce-factory.pages.dev (marqué « domaine définitif à confirmer »), precis-translator.trigenys.com, xeptionetwork.shop, insight.trigenys.com, github.com/Trigenys.
- Vérifié en Playwright headless (le navigateur intégré n'exécute pas les animations de défilement quand le volet est masqué) : desktop 1440×900 hauteur 10 042 px, sticky actif, translation du rail −1134 → −4320 px, barre de progression animée ; mobile 390×844 hauteur 12 580 px ; aucun débordement horizontal ni image cassée.
- Toujours à fournir / confirmer : couleurs produits (proposition), domaine Commerce Factory, numéro WhatsApp / e-mail / ville, logos clients et témoignages.
- Prochaine étape : retour fondateur sur V7 (à ouvrir les boards « Fenêtre » et « Mobile » et faire défiler).

## 2026-11-05 16:05 — V7 : moteur de profondeur JS
- Retour fondateur : « ça commence à venir mais pas de scroll parallax ». Cause : parallax CSS trop faible (−30 à −110 px) et dépendant du support navigateur des animations pilotées par le défilement (absent → repli sans aucun mouvement).
- Ajout d'un moteur JS léger (`<script id="fx">`, ~80 lignes, rAF + IntersectionObserver, transforms uniquement) qui prend le relais dès qu'il tourne (`html.js`) : hero (texte et scène à vitesses opposées, fondu), rail horizontal collant piloté en JS (plus de dépendance `animation-timeline`), parallax par couche sur toutes les captures et nappes binaires (amplitude ≈ ±0,38 vh × coefficient), parallax horizontal dans les panneaux du rail, filigrane logo ±256 px, lignes qui se tracent, apparitions échelonnées. `prefers-reduced-motion` respecté. Le CSS pur reste en repli sans JS ; la variante « déroulé » n'embarque pas le script.
- Vérifié Playwright : desktop 10 402 px, mobile 12 580 px, aucun débordement ; translations mesurées (captures hero −192/−85 px, filigrane +256 → −256 px, rail −4320 px).

## 2026-11-05 16:20 — V7 : boards « Fenêtre » et « Mobile » affichaient « not found »
- Cause : iframe en chemin relatif `V7-Accueil.dc.html` non résolu depuis le canvas. Correctif : le wrapper teste plusieurs chemins (`V7-Accueil.dc.html`, `project/…`, chemin absolu dérivé de `location`) et charge le premier qui répond avec un `<x-dc>`. Republié ; à confirmer côté fondateur après rechargement.

## 2026-11-05 16:17 — V7 : moteur de défilement dans le runtime du canvas (boards Fenêtre/Mobile vides)
- Cause des boards vides puis sans animation : dans le canvas, seul le code de la classe DCLogic s'exécute ; les `<script>` hors de cette classe (iframe loader, moteur parallax) sont ignorés, et un `<iframe src>` relatif ne se résout pas.
- Correctif : moteur `fx.js` injecté dans le script dc et lancé par `componentDidMount` ; il détecte le conteneur défilant parent (sinon la fenêtre), pose `--vh` (toutes les unités `vh` du CSS passent par `calc(var(--vh,100vh)*N/100)`), bascule `.m` (règles mobile dupliquées hors media query) sous 900 px de large. Boards Fenêtre/Mobile = `dc-import` de V7-Accueil dans un div `overflow:auto`, `is_interactive` (bouton Play puis défiler). Déroulé = même fichier sans `componentDidMount`.
- Preuves Playwright (local, `preview/w7.html` = page dans des boîtes 1440×900 et 390×844) : classe js posée, `--vh` 900/844 px, rail translate3d jusqu'à −4960 px, barre 0→1, parallax calques, 27/27 et 26/27 apparitions, 0 erreur console, pas de débordement horizontal. Page entière 1440 et 390 : inchangée (10 402 / 12 496 px).
- Sources dans `design/maquettes/` : `v7.tpl.html`, `fx.js`, `gen7.py` + sorties. À confirmer côté fondateur après rechargement du canvas (version 21).

## 2026-11-05 16:24 — V7 : section « Par métier » épinglée, un métier par cran, orbites binaires
- Demande fondateur : bloquer la vue de droite et passer de métier en métier au défilement avant de continuer ; ellipses de 0/1 derrière le panneau.
- Fait (desktop, js) : `.met` haute de 340 vh, `.stick` collant 100 vh ; le moteur coche la radio `m1..m4` selon la progression (4 crans), compteur « Faites défiler · n / 4 », barre sous l'onglet actif ; clic sur un onglet = défilement vers son cran ; panneaux superposés en fondu. Mobile / sans js : onglets classiques inchangés. Orbites : 3 ellipses de 0/1 en `textPath` tournant lentement (`.orb`), dans chaque panneau, `gen7.py` → `orbits()`.
- Preuves Playwright (boîte 1440×900) : radios 0→1→2→3 aux crans 0 / 30 / 55 / 80 %, panneau actif opacité 1 les autres 0, stick top constant pendant l'épinglage, 4 orbites, 0 erreur ; mobile : `.met` non épinglée.
- Publié (canvas v22), copié dans `design/maquettes/`. À valider côté fondateur.

## 2026-11-05 16:34 — V7 : bilingue FR / EN avec bascule à drapeaux
- Demande fondateur : la page doit être bilingue, avec un toggle à drapeaux.
- Fait : dictionnaire `i18n.json` (129 chaînes FR→EN, noms de produits et URLs non traduits), `lang.js` (`v7lang`/`v7langInit` : parcours des nœuds texte, original mémorisé sur le nœud, bascule sans rechargement, `lang` posé sur la racine et sur `<html>`, choix mémorisé en localStorage `tg-lang`). Bouton `.lng` : deux drapeaux SVG inline (tricolore, Union Jack) + FR / EN, drapeau actif en pilule sombre ; présent dans `.rt` (desktop) et à côté du burger (mobile, `.lng.lm`). `gen7.py` injecte `var I18N=…` + lang.js avant fx.js.
- Preuves Playwright (boîtes 1440×900 et 390×844) : clic → h1, nav, compteur « Scroll · 1 / 4 », tout le texte en anglais (seuls « Précis » restent, nom de produit), retour FR au second clic, choix conservé après rechargement, 0 erreur ; régression défilement/rail/parallax inchangée.
- Limite : la variante « déroulé » (sans moteur) reste FR, bouton inerte. Traductions à relire par le fondateur.
- Publié (canvas v23), copié dans `design/maquettes/`.

## 2026-11-05 16:36 — V7 bilingue : approuvée par le fondateur
- Retour fondateur sur la bascule FR/EN à drapeaux : « ok j'aime ». Le toggle et le mécanisme sont retenus pour la suite.
- État : canvas v23, commit e12524b poussé, aucune PR ouverte, aucun verrou.
- Reste à faire : relecture des traductions par le fondateur ; variante « déroulé » toujours FR ; éléments « à confirmer » inchangés (domaine Commerce Factory, WhatsApp / e-mail / ville, logos clients, témoignages, photo équipe). Prochaine étape : attendre la prochaine demande d'ajustement V7 ou la validation globale avant tout déploiement.

## 2026-11-05 16:49 — Validation V7 consignée, suite à cadrer
- Fondateur : « j'ai validé, on peut continuer ». Consigné dans `docs/decisions/comex-log.md` et statut README mis à jour.
- Prochaine étape à trancher avec le fondateur : construire l'accueil de production (site statique depuis le template V7) ou maquetter d'abord la page produit Commerce Factory (action prévue au comex). Question posée.

## 2026-11-05 17:02 — Site de production : `site/` créé depuis le template V7
- Décision fondateur : construire le site de production avant les pages produit (consigné au comex-log).
- Fait : `site/src` (template nettoyé du canevas, assets locaux, `fx.js`, `lang.js`, `i18n.json`), `scripts/build.mjs` (port Node de gen7, déterministe), `scripts/check.mjs` (contrats), `scripts/serve.mjs` ; CI `.github/workflows/ci.yml` : impact → `site-build` (+ preuve d'idempotence) et `visual-qa` réutilisable AppFactory @a6ad4b4b. CTA principal marqué `data-cta="primary"` (hero). Mémoire d'erreurs `docs/engineering/lessons-learned.md`.
- Preuves locales : build ×2 identiques ; Playwright sur dist (1440×900, 390×844) : rail actif, bascule EN, 0 erreur console, 0 image externe, pas de débordement, CTA visible ; reduced-motion : page statique lisible.
- Prochaine étape : vérifier le premier run CI sur GitHub (gates impact/visual-qa), puis décider hébergeur + domaine ; pas de déploiement avant les « à confirmer ».

## 2026-11-05 17:15 — Blocage : GitHub Actions n'enregistre pas le workflow
- Poussé sur main : 6def792 (site + CI), 529eebc (sonde) ; PR brouillon #1 (branche `ci-probe`) pour tester le déclenchement `pull_request`.
- Constat API : 0 workflow enregistré, 0 run, aucun check Actions sur les commits ; l'API Events du dépôt ne montre plus aucun push depuis 12:53 UTC alors que les refs avancent et que d'autres dépôts de l'org ont des runs aujourd'hui. Actions activées au niveau dépôt (`enabled: true`). Une suite de checks `cloudflare-workers-and-pages` apparaît (queued, sans run ni déploiement) : l'app Cloudflare voit le dépôt, aucun déploiement public n'a eu lieu.
- À faire par le propriétaire de l'org : ouvrir github.com/Trigenys/trigenys-website/actions (bandeau éventuel : politique org, facturation, verrou) ; une fois le workflow visible, `gh workflow run ci.yml` puis `gh run watch`. Fermer la PR #1 sans fusion après le test.

## 2026-11-05 17:27 — Cause du blocage CI identifiée
- Fondateur : dépôt créé **privé** et quota Actions de l'org épuisé ce mois → aucun run possible. Leçon consignée dans `docs/engineering/lessons-learned.md`.
- Décision en attente : passer le dépôt en public (expose `docs/site/strategie-site-v1.md`, `benchmark-sites.md`, `comex-log.md`, maquettes) ou attendre le reset mensuel ; alternative : sortir les docs internes vers `project-registry` avant publication. Aucun secret dans le dépôt (scan git grep vide).
- Verrous : PR #1 (`ci-probe`) à fermer sans fusion après le premier run réussi.

## 2026-11-05 17:38 — Dépôt public ; carrousel du hero
- Dépôt passé en **public** sur décision fondateur (quota Actions privé épuisé) ; note ajoutée au README racine.
- Hero : montage fixe remplacé par un carrousel à points (`site/src/car.js`, `.car/.sl/.dots`) : Atelier Maître → Commerce Factory → Précis Translator → « Le vôtre » (carte sombre + CTA vers #contact). Auto-défilement 5,2 s, pause au survol/focus/hors écran, flèches clavier, balayage tactile, aucun auto-défilement en reduced-motion. 6 chaînes i18n ajoutées (135). `check.mjs` exige 4 diapos + barre de points.
- Preuves : build + contrôles OK ; Playwright desktop/mobile : 4 points, avance auto, clic point 4 affiche « Le vôtre » et son CTA, flèche →, 0 erreur ; régression pwdist inchangée (CTA visible, 0 débordement, bascule EN).
- Non fait : le canevas Design (maquette V7) n'a pas le carrousel ; la référence est désormais `site/`. CI : workflow toujours non enregistré côté GitHub (flux d'événements en retard d'environ 2 h) ; PR sonde #1 ouverte.

## 2026-11-05 17:50 — Maquette V7 : carrousel du hero
- Canevas Design (https://claude.ai/artifact/2p1BMQjNdoikZaX4d4RxcF, v26) aligné sur `site/` : même balisage `.car/.sl/.dots`, même CSS, `car.js` injecté par `gen7.py` (images en `/_blob/`, mappées par texte alternatif).
- Preuves : Playwright sur l'aperçu généré (desktop/mobile) : 4 points, avance auto après 5,6 s, clic point 4 → « Le vôtre » + CTA, flèche →, 0 erreur, pas de débordement ; reduced-motion sans auto-défilement ; régression conteneur (boards fenêtre/mobile) inchangée.
- `design/maquettes/` mis à jour (sources du générateur + boards V7 + canvas.json).
- CI : workflow toujours non enregistré côté GitHub ; PR sonde #1 ouverte.

## 2026-11-05 18:02 — CI enregistrée, visual-qa à corriger dans la brique
- Workflow enfin enregistré après retouche de `ci.yml` (commit abe37d4). Run 42069201342 : `impact` ✓, `site-build` ✓, `visual-qa` ✗ (contrat : `#contact` refusé comme `expectedCtaHref`).
- Correctif prêt dans la brique `EagleFox31/appfactory-project-automation` : branche locale `feat/visual-qa-fragment-cta`, commit 75eeb2b (contrat + runner + tests 11/11 + doc). Clone : `C:\Users\lawry\AppData\Local\Temp\claude\997c1f4e48e0ce77\ca149fcb-9fd7-443a-9153-43247e06545c\scratchpad\apa` ; patch : `…\scratchpad\visual-qa-fragment.patch`. Push/PR à faire par le fondateur (refusés à l'agent).
- **Suite, après fusion** : (1) `.github/appfactory-visual-qa.json` → `"expectedCtaHref": "/#contact"` ; (2) réépingler les deux `uses:` de `ci.yml` sur le SHA fusionné ; (3) `gh workflow run ci.yml` puis `gh run watch` ; (4) fermer la PR sonde #1 sans fusion et supprimer `ci-probe`.
- Leçons ajoutées : réindexation du workflow ; contrat visual-qa et sites une page.

## 2026-11-05 18:50 — CI verte : LCP mobile ramené de 8,6 s à 2,26 s
- Run 42078031269 (commit df57267) : `impact` ✓, `site-build` ✓, `visual-qa` ✓. Mobile : LCP 2 261 ms (budget 2 500), CLS 0,078 (budget 0,1), TBT 15 ms ; desktop LCP 979 ms. Budgets inchangés.
- Commits e668c5d + df57267 : assets WebP à la taille d'affichage (1,1 Mo → 290 Ko, favicon dédié), première diapo en preload/fetchpriority, lazy ailleurs ; Google Fonts en preload+onload (repli noscript) ; décor animé en pause jusqu'au `load` et hors écran (`.go`/`.off` dans fx.js) ; hélices/orbites en monospace système ; `@font-face` de repli calibrées (Times ×102 %, Arial ×100,73 %).
- Mêmes modifications dans `design/maquettes/` (fx.js, v7.tpl.html) ; **canvas non republié** (v26 montre encore l'ancien décor Plex Mono) : régénérer via gen7.py et republier si besoin.
- PR sonde #1 fermée sans fusion, branche `ci-probe` supprimée. Leçon ajoutée (LCP mobile, trois causes).
- Marges minces : LCP à 240 ms du budget, CLS à 0,02. Si la CI rechute : vérifier l'élément du CLS restant dans l'artefact Lighthouse (`gh run download <run>`), puis envisager l'auto-hébergement des polices (woff2 en `assets/`, supprime le détour fonts.googleapis) avant toute autre mesure.
- Reste « à confirmer » par le fondateur inchangé (domaine Commerce Factory, couleurs produits, WhatsApp/e-mail/ville, logos clients, témoignages, photo équipe, relecture EN).

## 2026-11-05 18:54 — Retours fondateur : Xeption sans visuel, textes « nous » à réécrire
- Demande : ajouter image + logo Xeption ; réécrire les sections qui parlent de Trigenys (trop génériques). En cours.

## 2026-11-05 19:04 — Xeption illustrée, textes « nous » réécrits
- Cas XEPTION : carte en deux colonnes (texte + capture réelle de xeptionetwork.shop du jour, `assets/xe-shop.webp` 70 Ko) et logo (`assets/xe-logo.webp`, depuis le favicon 192 px du dépôt `EagleFox31/xeption237` : le logo Cloudinary du site Xeption répond 401, il est cassé sur leur propre site). Logo repris dans l'onglet « Par métier ». Tags : Orange Money · MoMo, Troc, SAV.
- Réécriture FR+EN : en-tête et 4 étapes d'ingénierie, carte « La prochaine capture d'écran est à vous », bloc « Vérifiez-nous » (3 cartes), paragraphe équipe. Faits utilisés : 18 versions d'Atelier Maître, Yaoundé/OM/MoMo/troc/SAV lus sur le site Xeption. Les cadres « à confirmer » (témoignages, adresse, signataire, photo) sont conservés.
- Miroir dans `design/maquettes/v7.tpl.html` ; canvas toujours non republié. Build + check OK (14 assets, 138 chaînes), Playwright : images chargées, pas de débordement, bascule EN vérifiée.

## 2026-11-05 19:16 — Polices auto-hébergées (correction LCP mobile), anomalies CI
- CI lancée à la main après `1414f9c` (run 42081020839) : rouge, LCP mobile 4 717 ms (CLS 0,046, TBT 0, desktop 649 ms)
  alors que le run précédent était vert à 2 261 ms sans changement du premier écran. Diagnostic : chaîne Google Fonts
  sur le chemin de l'élément LCP (`h1`), mesure bistable. Leçon ajoutée à `docs/engineering/lessons-learned.md`.
- Correctif : 16 sous-ensembles woff2 (latin, latin-ext) dans `site/src/assets/fonts/` (900 Ko ; nommage
  `{ss4|plex|plexmono}-{r|i}{graisse}-{sous-ensemble}.woff2`), `@font-face` avec `unicode-range` et `font-display:swap`,
  trois préchargements (Source Serif 4 500 droit et italique, IBM Plex Sans 400). Liens Google Fonts, preconnect et
  `noscript` supprimés. Miroir `design/maquettes/v7.tpl.html`. `check.mjs` : nouveau contrat « police externe interdite ».
  Build + check OK (17 assets, 138 chaînes) ; Playwright : 9 faces chargées, aucune ressource externe, aucun 4xx,
  console vide, mobile et desktop.
- Anomalie CI à faire vérifier par un admin de l'organisation Trigenys : les événements `push` et `pull_request` ne
  déclenchent pas `ci.yml` (seuls les `workflow_dispatch` existent) ; GitHub ne crée aucune check suite github-actions
  sur les pushes, mais une suite `cloudflare-workers-and-pages` en file d'attente : une application Cloudflare Pages
  est connectée au dépôt (risque de déploiement automatique alors que des « à confirmer » restent). EagleFox31 n'est
  pas admin de l'organisation ; l'e-mail des commits n'est lié à aucun compte GitHub. Lancer la CI : `gh workflow run ci.yml --ref main`.
- Suite : commit + push, dispatch CI, lire l'artefact `appfactory-visual-qa` (LCP mobile < 2 500 attendu). Canvas non republié.

## 2026-11-05 19:45 — CI : LCP mobile ramené à 2 115 ms, gate media corrigé, Xeption illustré
- Commits depuis `1414f9c` : `25191ea` (h1 sans animation d'opacité), `d2b88bc` (aperçu compressé, 4 polices
  variables sous-ensemblées, images cachées différées), puis axe `opsz` épinglé + favicon 64 px, puis pixel
  transparent en `src` des images différées (gate `media`). Détail et causes : `docs/engineering/lessons-learned.md`.
- Runs manuels : 42082790972 (4 895 ms), 42083757004 (5 110), 42085624683 (2 635), 42086662603 (2 115 ms, CLS 0,
  TBT 97, desktop 486 ms) : seul le gate `media` restait rouge (deux `<img data-src>` sans `src`) ; corrigé,
  nouveau run lancé après cette entrée. Budgets inchangés.
- Polices : `site/src/assets/fonts/` = 4 fichiers (73 Ko) ; Source Serif 4 est instanciée à `opsz=60` : ne pas
  l'employer pour du texte courant sans ré-instancier (voir README du dossier).
- Lighthouse local (machine lente) n'est pas prédictif du LCP CI ; lire l'artefact `appfactory-visual-qa`
  (`gh run download <id> -n appfactory-visual-qa`). Ancien serveur d'aperçu sur 4173 (ancien serve.mjs) non tué ; 4174 à jour.
- Restent : anomalies CI (push/PR sans déclenchement, app Cloudflare Pages connectée) à faire vérifier par un admin
  de l'organisation ; « à confirmer » du contenu ; canvas non republié ; miroir `design/maquettes/v7.tpl.html` sans
  les `data-src` (pas d'images de diapos dans la maquette).

## 2026-11-05 22:40 — Coordonnées de contact réelles intégrées
- Fournies par le fondateur : WhatsApp +237 670 75 43 72 (`https://wa.me/237670754372`), business@trigenys.com,
  Douala et Yaoundé. Pied de page (`#contact`) : bouton WhatsApp et « Écrire un e-mail » (mailto) réels, ligne de
  coordonnées cliquable ; carte « Joignables là où vous êtes déjà » : texte mis à jour, placeholder réduit à
  « Hébergement et conformité … à confirmer ». FR/EN vérifiés par Playwright (138 chaînes). Miroir maquette à jour.
- Reste « à confirmer » : nom et fonction du signataire, domaine définitif de Commerce Factory, hébergement/conformité,
  hébergeur + domaine du site ; anomalies CI/Cloudflare pour un admin de l'organisation.
- CI lancée (run 42113018651) après le commit « Contact : … » ; vérifier son résultat si cette entrée est la dernière.

## 2026-11-06 09:36 — Signature collective, pas de fondateur nommé
- Décision du fondateur (consignée dans `docs/decisions/comex-log.md`) : aucun nom ni fonction sur le site. Le mot de
  l'équipe est signé « — L'équipe Trigenys · Douala & Yaoundé » (FR/EN) ; placeholder photo réduit à « Photo réelle de
  l'équipe — à fournir ». Miroir maquette aligné, 138 chaînes, build OK, Playwright FR/EN OK.
- Reste « à confirmer » : photo d'équipe, domaine définitif Commerce Factory, hébergement/conformité, hébergeur + domaine
  du site ; anomalies CI/Cloudflare pour un admin. CI lancée après cette entrée : vérifier le run le plus récent.

## 2026-11-06 10:08 — Hébergement : décision et préparation (commit 7c04234)
- ADR `docs/decisions/adr-0001-hebergement.md` : Cloudflare Pages (projet `trigenys-website`), upload direct depuis
  `.github/workflows/deploy.yml` (manuel, preview/production, wrangler-action épinglé v4.1.3). Domaine en deux phases :
  phase 1 `www.trigenys.com` en CNAME chez Spaceship + redirection de l'apex (DNS et Spacemail inchangés) ; phase 2
  optionnelle : zone sur Cloudflare après export complet.
- `site/src/_headers` (CSP default-src 'self', sécurité, cache) copié dans dist, appliqué par `serve.mjs` ; contrats
  ajoutés dans `check.mjs` (CSP, cache polices, canonical/og:url absolus, og:image existante, pas de on*=). Canonical
  `https://www.trigenys.com/`, `og.png` 1200×630 généré depuis le logo (l'ancien og:image pointait sur un fichier absent).
- Preuves : build idempotent, Playwright : CSP servie, zéro erreur console, bascule EN OK. CI dispatchée (run 42192721027).
- Rien n'est déployé ni créé côté Cloudflare. Pour publier : runbook dans `site/README.md` (projet Pages, secrets
  `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID`, environnements GitHub, DNS Spaceship). Reste « à confirmer » : photo
  d'équipe, domaine Commerce Factory, mention hébergement/conformité (la carte peut maintenant citer Cloudflare).
- Note : identité git non configurée dans cette session (commit fait avec `-c user.name/user.email` = auteur des
  commits précédents).

## 2026-11-06 10:23 — CI : TBT mobile instable, relance verte
- Run push 42192721027 sur 7c04234 : échec visual-qa (TBT 211 ms / budget 200, LCP 2 186 OK) ; dispatch sur le même SHA
  vert (TBT 157) ; relance du job échoué verte. Leçon consignée dans `docs/engineering/lessons-learned.md` (marge TBT à
  dégager : tâche dédiée, pas de budget assoupli). Les événements `push` déclenchent désormais la CI (nouveau).
- Prochaine étape : décision humaine de publier (runbook `site/README.md`) ; sinon tâche « marge TBT » (alléger le
  travail à DOMContentLoaded) et les trois éléments « à confirmer ».

## 2026-11-06 10:42 — Déploiement via la brique AppFactory (PR appfactory #145)
- Redirection utilisateur : garder Cloudflare Pages, mais déployer avec un workflow réutilisable d'`appfactory-project-automation`
  au lieu d'un `deploy.yml` local. Fait : PR https://github.com/EagleFox31/appfactory-project-automation/pull/145
  (`reusable-pages-deploy.yml`, `scripts/pages-deploy/contract.mjs`, tests 5/5, doc, exemple, README). Le `npm test`
  complet y a 15 échecs préexistants sous Windows, identiques sur `main` : la CI ubuntu fait foi.
- Site : `.github/workflows/deploy.yml` appelle la brique (modes `plan` / `preview` / `production`), épinglée sur le SHA
  de tête de la PR `c4f029add7441a0ca64ca56cc8c970ce06c29108` ; à remplacer par le SHA fusionné après merge. ADR : addendum ;
  README : runbook mis à jour (`-f mode=…`).
- Côté Cloudflare : rien de créé (`wrangler pages project create` exige un dossier en wrangler 4 ; le premier
  `pages deploy` crée le projet). Aperçu `*.pages.dev` toujours en attente des secrets `CLOUDFLARE_API_TOKEN` /
  `CLOUDFLARE_ACCOUNT_ID` sur le dépôt (admin) ; `mode=plan` est exécutable sans secret dès maintenant.
- Prochaine étape : fusionner la PR #145 (relecture humaine), ré-épingler, `plan` puis `preview`, vérifier les en-têtes.

## 2026-11-06 11:05 — Brique validée en mode plan, CI relancée verte
- `gh workflow run deploy.yml -f mode=plan` sur 397edaa : run 42199225000 vert (build, contrats, validation de `dist`,
  aucun secret lu, upload sauté). La brique appfactory est fonctionnelle depuis le site ; CI de la PR #145 verte.
- CI push 42199187513 : visual-qa mobile TBT 234 ms (même instabilité connue, commit sans changement du site) ;
  relance du job → vert. La tâche « marge TBT » reste à faire.
- `gh secret list` vide : aucun secret Cloudflare sur le dépôt. Bloquants pour `preview` : admin crée
  `CLOUDFLARE_API_TOKEN` (Pages : Edit) + `CLOUDFLARE_ACCOUNT_ID` (environnements `preview`/`production`), puis
  `-f mode=preview` crée le projet au premier upload. Après merge de #145 : ré-épingler le SHA fusionné dans `deploy.yml`.

## 2026-11-06 11:20 — PR #145 fusionnée, brique épinglée sur le SHA fusionné
- appfactory-project-automation : PR #145 squashée sur main → `d86c14fcb365aa7a5d0246908a27523a2b31ab00`.
  `deploy.yml` du site ré-épinglé dessus (commit fe4340d), note dans l'ADR. Run `mode=plan` 42200516797 vert ;
  CI push 42200508426 verte du premier coup (visual-qa inclus).
- Reste bloquant pour l'aperçu `*.pages.dev` : secrets `CLOUDFLARE_API_TOKEN` (Pages : Edit) et `CLOUDFLARE_ACCOUNT_ID`
  à créer par un admin sur le dépôt (environnements `preview` / `production`), puis `gh workflow run deploy.yml --ref main -f mode=preview`
  (crée le projet `trigenys-website` au premier upload) et vérification `curl -sI <url> | grep -i content-security`.
- Toujours « à confirmer » : photo d'équipe, domaine Commerce Factory, mention hébergement/conformité ; tâche « marge TBT ».

## 2026-11-06 11:35 — Aperçu suspendu : question des identifiants Cloudflare
- Aucun secret sur le dépôt ni environnement (vérifié) ; l'utilisateur n'en a pas créé et demande si appfactory ne les
  fournit pas. Constat : le broker appfactory n'émet que des jetons GitHub (OIDC → user token), jamais d'identifiant
  Cloudflare ; appfactory déploie son propre Worker via l'intégration Git Cloudflare (Workers Builds), sans jeton dans GitHub.
- Options posées : (A) intégration Git Cloudflare Pages, zéro secret, même schéma que le broker, mais Cloudflare construit
  et publie sur push (branche de production dédiée pour garder la décision humaine) ; (B) garder la brique + un secret
  d'organisation Trigenys créé par un admin ; (C) étendre le broker pour émettre des jetons Cloudflare (hors périmètre).
- En attente de la décision ; rien lancé en preview.

## 2026-11-06 11:50 — Analyse appfactory : la brique contredit la décision #45
- Vérifié sur `main` d'appfactory (seule branche) : aucun identifiant Cloudflare, aucun échange OIDC→Cloudflare
  (OIDC utilisé seulement pour GitHub via le broker et pour AWS via `configure-aws-credentials`). Issue #45 (fermée) :
  voie canonique = intégration Git Cloudflare (Workers Builds + GitHub App), « sans réintroduire d'identifiants Cloudflare
  gérés à la main dans GitHub », remplaçant un design GitHub Actions + `CLOUDFLARE_API_TOKEN`.
- Conséquence : la brique `reusable-pages-deploy.yml` (fusionnée, épinglée dans `deploy.yml`) réintroduit ce design ;
  leçon consignée dans `docs/engineering/lessons-learned.md`. Aucun secret créé, rien déployé.
- Proposition : site → intégration Git Cloudflare Pages (projet connecté au dépôt, branche de production dédiée pour
  garder la publication humaine, build `cd site && npm run build`, sortie `site/dist`, `_headers` conservé) ; côté
  appfactory, PR de recadrage de la brique (mode `plan` conservé comme gate sans secret, upload documenté comme
  exception, doc corrigée) ; ADR-0001 à réviser. En attente de la décision.

## 2026-11-06 11:48 — Analyse `Trigenys/appfactory` (appfactory-api) : `POST /infrastructure/pages`
- Correctif d'horodatage : l'entrée « 11:50 » ci-dessus a été écrite à 11:39 (heure réelle).
- Le bon dépôt AppFactory pour Cloudflare est `Trigenys/appfactory` (Worker `appfactory-api`, HEAD ec5a717), pas
  `appfactory-project-automation`. Lu : `src/index.ts`, `src/auth.ts`, `src/brownfield-pages.ts`, `src/cloudflare.ts`,
  `src/deployment-idempotency.ts`, `docs/brownfield-pages.md`, PR #94 ; consommateur réel : `Trigenys/cleanroute`
  (`.github/workflows/appfactory-infrastructure.yml` + `.appfactory/pages.json`, run vert du 2026-10-05, marqueur présent).
- Existant : OIDC GitHub (audience `appfactory-api`), dépôt `Trigenys/*`, workflow exactement
  `<repo>/.github/workflows/appfactory-infrastructure.yml@refs/heads/main`. L'API crée/réconcilie un projet Pages
  **connecté Git** (source GitHub, `production_branch`, `build_config`, previews « all »), domaine custom optionnel
  (réponse = consigne CNAME pour DNS externe → compatible Spaceship), marqueur `.appfactory/pages-infrastructure.json`
  commité dans le dépôt appelant, puis réutilise ou déclenche un déploiement de production. Nom de projet imposé :
  `<repo>` ou `<repo>-…` → `trigenys-website`. Identifiants Cloudflare uniquement côté AppFactory
  (`CLOUDFLARE_PAGES_D1_TOKEN`). App GitHub `cloudflare-workers-and-pages` déjà installée sur l'org Trigenys.
- Éligibilité du site : oui (org Trigenys, branche par défaut `main`, dépôt public sans importance). Rien à ajouter
  côté secrets. `main` n'est pas protégée (le marqueur sera commité directement).
- Écarts : (1) pas de mode `plan`/dry-run : le premier appel provisionne et déploie ; (2) Cloudflare construit hors de
  nos gates CI (Lighthouse) → à compenser par une branche de production dédiée protégée ; (3) version Node non
  exposée par l'API → `.node-version` dans le dépôt ; (4) previews publics sur toutes les branches (non réglable).
- Chemin recommandé (en attente de validation, rien modifié, rien déployé) : brique project-automation à retirer de
  `deploy.yml` ; site → `appfactory-infrastructure.yml` + `.appfactory/pages.json` (projet `trigenys-website`,
  branche de production dédiée, build `cd site && npm run build`, sortie `site/dist`, sans `customDomain` tant que
  les points « à confirmer » restent ouverts) ; proposition d'extension appfactory-api : `dryRun`.

## 2026-11-06 12:51 — Bascule validée : site → appfactory-api (OIDC), deploy.yml supprimé
- Ajouté `.github/workflows/appfactory-infrastructure.yml` (OIDC audience `appfactory-api`, POST vers
  `appfactory-api.lawrynnjennifer.workers.dev/infrastructure/pages`), `.appfactory/pages.json` (projet `trigenys-website`,
  branche de production `production`, racine `site`, `npm run build`, sortie `dist`, sans domaine), `.node-version` (20)
  à la racine et dans `site/`. Supprimé `deploy.yml` (brique project-automation). README « Hébergement » et ADR-0001 révisés.
- Branche `production` créée depuis `main` et protégée (CI exigée) ; le push sur `main` déclenche le premier
  provisionnement (déploie `production` sur `trigenys-website.pages.dev`, pas de domaine). Suivre le run, vérifier
  l'URL et les en-têtes ; AppFactory commitera `.appfactory/pages-infrastructure.json` sur `main` (faire `git pull`).
- Reste : recadrage de la brique côté project-automation (doc, mode plan), proposition `dryRun` côté appfactory-api,
  éléments « à confirmer » avant domaine.

## 2026-11-06 12:55 — Site en ligne sur trigenys-website.pages.dev via appfactory-api
- Run `AppFactory Infrastructure` 42213237931 vert : `PROVISIONED`, projet `trigenys-website`, déploiement
  58c0963c (branche `production`). AppFactory a commité le marqueur `.appfactory/pages-infrastructure.json` (f695d79,
  récupéré par `git pull`). `https://trigenys-website.pages.dev/` répond 200 avec CSP et `X-Frame-Options: DENY`.
- Branche `production` protégée (checks `site-build`, `visual-qa`, strict, admins inclus). Aucun secret Cloudflare
  dans le dépôt ; aucun domaine custom (différé).
- CI : fbc768c vert ; f695d79 (marqueur seul) échec `visual-qa` = erreur runtime Lighthouse (trace mobile), pas un
  budget → relance du job en cours. Si l'échec persiste sur un commit sans impact frontend, consigner une leçon
  (gate Lighthouse à rendre tolérant à l'erreur runtime, budgets inchangés).
- Prochaines étapes : (1) PR de recadrage de `reusable-pages-deploy.yml` côté project-automation (doc « rejected »
  fausse, brique = exception documentée) ; (2) issue/PR appfactory-api : `dryRun` pour `/infrastructure/pages` ;
  (3) éléments « à confirmer » puis `customDomain` + CNAME Spaceship.

## 2026-11-06 13:08 — PR de recadrage de la brique project-automation ouverte
- `EagleFox31/appfactory-project-automation` PR #146 (branche `docs/pages-deploy-canonical-path`) : doc, README,
  exemple et en-tête du workflow présentent `reusable-pages-deploy.yml` comme exception documentée à la voie canonique
  (`Trigenys/appfactory`, `POST /infrastructure/pages`, OIDC) ; affirmation « Git integration rejected » retirée ;
  test de garde ajouté (6/6 verts localement). Aucun changement de comportement du workflow. En attente de revue/fusion.
- Site : inchangé depuis 12:55 (en ligne sur trigenys-website.pages.dev, CI verte).
- Reste : issue/PR `dryRun` côté appfactory-api ; éléments « à confirmer » puis `customDomain` + CNAME Spaceship.

## 2026-11-06 13:11 — PR #146 fusionnée (project-automation)
- Squash sur `main` : `31b4c54ed2b72778920e413459a463a994df43fd`, branche supprimée. Documentation de la brique
  alignée sur la voie canonique ; aucun impact sur le site (plus de consommateur de la brique ici).
- Reste : issue/PR `dryRun` côté appfactory-api ; éléments « à confirmer » puis `customDomain` + CNAME Spaceship.

## 2026-11-06 13:31 — Issue dryRun ouverte sur Trigenys/appfactory
- `Trigenys/appfactory` issue #189 : champ optionnel `dryRun` pour les endpoints brownfield (d'abord
  `/infrastructure/pages`) → `status: PLANNED` + diff (projet, domaine, marqueur, déploiement), zéro écriture, erreurs
  d'auth identiques, replay convergé = `noop`. Critères d'acceptation et non-objectifs dans l'issue.
- Chantier déploiement du site clos côté dépôt. Reste : éléments « à confirmer » (photo d'équipe, domaine Commerce
  Factory, mention hébergement/conformité) puis `customDomain: www.trigenys.com` + CNAME Spaceship ; marge TBT mobile.

## 2026-11-06 16:22 — Bloc équipe : pas de photo, décision actée
- Décision du fondateur : le bloc « L'équipe » reste sans photo ni noms (visuel généré « bits », signature collective
  « — L'équipe Trigenys · Douala & Yaoundé »). Placeholder « Photo réelle de l'équipe — à fournir » retiré
  (`site/src/index.tpl.html`, chaîne i18n supprimée, README hébergement mis à jour). Build + contrats OK (137 chaînes).
- Reste « à confirmer » : domaine définitif Commerce Factory, mention hébergement/conformité (carte « Ancrage local »).
  Ensuite `customDomain: www.trigenys.com` + CNAME Spaceship, PR main→production.

## 2026-11-06 16:34 — Partenaires : logos Xeption et Love Ink
- Bloc « Ils travaillent avec nous » (section preuves) : placeholder « logos à fournir » remplacé par deux liens
  icône + nom : XEPTION (`assets/xe-logo.webp`, déjà présent) → xeptionetwork.shop, Love Ink (`assets/li-logo.svg`,
  favicon du dépôt `Trigenys/loveink`) → loveink.site. Style `.proof .lg .pa`. Chaîne i18n du placeholder supprimée.
- Build + contrats OK (19 assets, 136 chaînes) ; vérifié dans le navigateur (images chargées, rendu desktop).
- `.claude/launch.json` (ignoré par git) : config « site » = http.server 8766 sur `site/dist`.
- Reste « à confirmer » : domaine Commerce Factory, mention hébergement/conformité ; puis customDomain + CNAME.

## 2026-11-06 16:41 — Section preuves : rangée de chiffres retirée
- Décision du fondateur : les quatre cellules « 3 produits publics / v1.18 / 1 plateforme client / CM » sont retirées
  de la section `.proof` ; seule la ligne « Ils travaillent avec nous » (Xeption, Love Ink) reste. 4 chaînes i18n
  supprimées (132 restantes), marge haute de `.proof .lg` ramenée à 0. Build + contrats OK, vérifié dans le navigateur.
- Reste « à confirmer » : domaine Commerce Factory, mention hébergement/conformité ; puis customDomain + CNAME.

## 2026-11-06 16:58 — Mise en ligne : contenu final, domaine déclaré, PR 2 prête à fusionner
- Commit 756b9f6 (main) : derniers cadres « à confirmer » levés (témoignages, hébergement/conformité, mention domaine
  Commerce Factory → « adresse de bêta »), carte « Ancrage local » précise « hébergé sur Cloudflare Pages, aucune
  donnée client collectée », `customDomain: www.trigenys.com` dans `.appfactory/pages.json`. 130 chaînes, 19 assets.
- Run appfactory-infrastructure 42246925236 : PROVISIONED, customDomain `www.trigenys.com` statut `initializing`,
  DNS attendu `CNAME www.trigenys.com → trigenys-website.pages.dev` (managedByAppFactory=false → à poser chez
  Spaceship). AppFactory a poussé 90454ca (marqueur réconcilié) sur main.
- PR Trigenys/trigenys-website#2 main→production ouverte, CI verte sur 90454ca après relance de `visual-qa`
  (TBT mobile 231 ms > 200 ms au premier passage ; flake connu, pas de régression). Fusion refusée par le
  classifieur de permissions (« merge sans revue ») : à fusionner par le fondateur (bouton GitHub ou
  `gh pr merge 2 --repo Trigenys/trigenys-website --merge`). La fusion déclenche le déploiement production.
- Ensuite : CNAME chez Spaceship, attendre `customDomain.status = active`, vérifier https://www.trigenys.com ;
  redirection apex `trigenys.com` → `https://www.trigenys.com` côté Spaceship. Tâche « marge TBT mobile » toujours ouverte.

## 2026-11-06 17:15 — Site en production sur https://www.trigenys.com
- PR #2 fusionnée par le fondateur (15:59 UTC) → déploiement production Pages ; `trigenys-website.pages.dev` sert le
  contenu final (Love Ink, « adresse de bêta », mention hébergement).
- Spaceship : `CNAME www → trigenys-website.pages.dev` posé par le fondateur (TTL 5 min), reste de la zone intact.
  Certificat Cloudflare émis ~5 min après ; `https://www.trigenys.com/` → 200, CSP et `X-Frame-Options: DENY` présents,
  canonical `https://www.trigenys.com/`. HTTP → 301 HTTPS.
- Reste : redirection apex `trigenys.com` → `https://www.trigenys.com` côté Spaceship si absente ; domaine définitif
  Commerce Factory (CTA en « adresse de bêta ») ; marge TBT mobile (flake visual-qa, relance verte à chaque fois :
  si ça se reproduit, consigner une leçon et ajuster le gate sans toucher aux budgets).

## 2026-11-06 17:21 — Vérification apex trigenys.com
- Le fondateur annonce la redirection apex posée côté Spaceship. Vérifié sur le serveur autoritaire
  (launch1.spaceship.net) : aucun A/AAAA/CNAME pour `trigenys.com`, http et https → pas de réponse (000).
  La redirection n'est donc pas (encore) effective : soit propagation, soit l'entrée de forwarding n'a pas créé
  d'enregistrement pour `@`. À revérifier : `nslookup trigenys.com launch1.spaceship.net` puis
  `curl -I http://trigenys.com/` (attendu : 301 vers https://www.trigenys.com/).
- `https://www.trigenys.com/` reste pleinement en ligne (200, CSP, canonical).
- Scratchpad de session nettoyé (79 Mo → 1 Mo) à la demande d'une autre session ; dépôt intact.

## 2026-11-06 17:28 — Redirection apex trigenys.com active
- Le fondateur a créé chez Spaceship une « URL redirect » sur `trigenys.com` vers `https://www.trigenys.com`, type 301
  (permanent). Spaceship publie un A `@ → 15.197.162.184` (serveur urlredirect + certificat FreeSSL) ; MX et CNAME
  `www` intacts.
- Vérifié : `http://trigenys.com/` → 301 et `https://trigenys.com/` → 301 vers `https://www.trigenys.com/`
  (certificat prêt ~4 min après) ; `https://www.trigenys.com/` → 200.
- Note poste Windows : dans PowerShell, `curl` est un alias d'Invoke-WebRequest → utiliser `curl.exe`. Un
  « Could not resolve host » juste après un ajout DNS = cache négatif local, se résorbe seul.
- Reste : domaine définitif Commerce Factory (CTA en « adresse de bêta ») ; marge TBT mobile si le flake revient.

## 2026-11-07 04:38 — Fondations SEO (P0/P1), branche feat/seo-fondations
- Demande de la session expert-seo-geo : P0 (robots, sitemap, llms.txt, 404 réelle, JSON-LD Organization/WebSite,
  mentions légales) puis P1 (pages produits, réalisation XEPTION, /en/ + hreflang, test SEO en CI) ; P2 en issues.
- Fait : `src/site.json` source unique ; `build.mjs` génère 8 pages, robots, sitemap, llms.txt ; /en/ statique traduite
  au build (lang.js et dictionnaire client supprimés) ; `check.mjs` étendu à toutes les pages ; `http-check.mjs`
  (`npm run check:http`) ajouté à la CI ; visual-qa sur /, /en/, /produits/atelier-maitre/.
- Preuves locales : `npm run build` OK (contrats SEO), `check:http` OK (URL inconnue 404, robots text/plain, sitemap
  XML, 7 URL en 200), contre-test sans 404.html en échec, build idempotent (`diff -r`), mesures 390/1024 px sans
  débordement.
- À fournir avant fusion : identité légale (`site.json > legal.fields`, aujourd'hui non publiée), URL LinkedIn,
  chiffres de la réalisation XEPTION, domaine définitif Commerce Factory, relecture produit des textes.
- Après déploiement : `npm run check:http -- --base https://www.trigenys.com`, Rich Results Test sur les URL produits.
