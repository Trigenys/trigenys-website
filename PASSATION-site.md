
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
