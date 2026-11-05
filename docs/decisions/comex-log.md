# Trigenys — Journal du comex

Ajout seulement : chaque décision est une nouvelle entrée ; une révision référence l'entrée d'origine.

## 2026-11-05 — Positionnement du site vitrine Trigenys

- **Options** : A. groupe multi-marques · B. offre de services sur mesure · C. éditeur de logiciels (Commerce Factory, Atelier Maître, Précis Translator ; Insight, RAIDER, open source en preuves).
- **Faits** : profil GitHub Trigenys ; Plan commercial multi-produit v4 (28.10.26) : 3 produits, 90 j, 1–3 clients payants.
- **Recommandation** : C. Accueil = aiguillage vers 3 produits ; 3 pages produit avec démo + CTA WhatsApp. Plus tard : À propos, Insight, Réalisations. AgenStudio garde son site. Construction via OpenPage / AppFactory.
- **Objection retenue** : prospects (garages, commerçants) arrivent par Meta → WhatsApp, pas par le site corporate.
- **Garde-fou** : chaque page produit tient seule comme landing pub ; site corporate minimal.
- **Choix du fondateur** : C validée.
- **Prochaine action** : maquettes accueil + page Commerce Factory, 2 pistes visuelles depuis le Design System V4.
- **Révision** : à 90 j, si les demandes portent surtout sur du sur-mesure.

## 2026-11-05 — Site corporate : direction v1 proposée (en attente de validation)
- Contexte : précision du fondateur — Trigenys est éditeur **et** prestataire (ingénierie, maintenance, intégration, conseil) ; complète la décision « option C » ci-dessus sans l'annuler.
- Proposé : site hybride Logiciels + Services ; DA groupe éditoriale (piste A) + bandes produits immersives (piste B) sous le DS V4 ; maturité affichée par produit.
- Corrigé : grille tarifaire Commerce Factory retirée (bêta gratuite, aucun tarif fixé — source docs/pricing-transparency.md).
- Dossier : docs/site/strategie-site-v1.md. Statut : **non validé**.

## 2026-11-05 — Correction de positionnement : groupe éditeur à portefeuille
- Contexte : retour du fondateur — le site laissait croire que Trigenys n'a et n'aura que 3 produits ; style V3 jugé « AI slop ».
- Correction : les 3 produits (Atelier Maître, Commerce Factory, Précis Translator) sont une **première vague de lancement**, pas l'offre entière. Le site présente un **portefeuille par métiers** (source : `EagleFox31/project-registry`, `registry/projects.json`) avec le stade réel de chaque produit.
- Direction visuelle V4 : éditoriale, sobre, capture produit réelle (données d'exemple), index du portefeuille ; suppression des auroras, bordures lumineuses, pastilles pulsantes, cartes glass.
- À trancher par le fondateur : produits non publiés (stade idée/prototype) affichables publiquement ou non ; relation de marque AgenStudio / Trigenys sur le site.
- Statut : maquette V4 **à valider**.

## 2026-11-05 — Site : direction « studio produit coloré » (V5)
- Choix du fondateur après rejet de V4 (trop plat, structure, textes) : chaque produit a son univers et sa couleur ; grille de produits très visuelle.
- Couleurs produit : proposition de maquette, à valider avant toute charte produit.
- Statut : maquette V5 **à valider**.

## 2026-11-05 — Benchmark des sites comparables
Référence : `docs/site/benchmark-sites.md`. À utiliser comme grille de revue de l'accueil (promesse, preuve, hiérarchie 3 phares + grille, axe métier, CTA WhatsApp, prix FCFA, humains).

## 2026-11-05 — Accueil : V6 construite sur le benchmark
Décision fondateur : nouvelle version plutôt que retouche de V5. Règle appliquée : seuls les faits vérifiables sont affichés, tout le reste est un emplacement marqué « à fournir ». Maquette : `design/maquettes/V6-Accueil.dc.html`.

## 2026-11-05 — Accueil V7 : règles de publication et expérience de défilement
- **Décision** : la page d'accueil ne présente que les produits dont le registre porte `publicationStatus: published` ; les projets non publiés ne sont ni nommés ni décrits (un seul panneau générique « d'autres outils sont en construction »).
- **Décision** : les produits sont montrés avec leurs captures, logos et liens réels (pas de maquettes génériques) ; chaque lien affiche son stade réel (production / bêta).
- **Décision** : l'identité du groupe est portée par le logo et son motif binaire, animés au défilement ; l'expérience de défilement (parallax, rail horizontal) fait partie de la proposition de valeur du site.
- **Réserves** : domaine définitif de Commerce Factory, couleurs produits, coordonnées de contact et témoignages restent à confirmer ; V7 non validée.

## 2026-11-05 — Accueil V7 validée par le fondateur
- **Décision** : la maquette d'accueil V7 (`design/maquettes/V7-Accueil.dc.html`, canvas v23) est **validée** : logo vivant, rail horizontal des produits, section « Par métier » épinglée avec orbites binaires, bilingue FR / EN à bascule par drapeaux.
- **Portée** : valide la structure, les textes FR et l'expérience ; les traductions EN restent à relire. Les éléments marqués « à fournir / à confirmer » (domaine Commerce Factory, coordonnées, logos clients, témoignages, photo équipe) ne sont pas levés.
- **Conséquence** : fin de la phase maquette pour l'accueil ; la phase suivante (construction du site de production, puis pages produit) peut démarrer. Aucun déploiement public tant que les éléments « à confirmer » ne sont pas renseignés.
