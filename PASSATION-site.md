
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
