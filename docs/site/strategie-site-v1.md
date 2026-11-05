# Site corporate Trigenys Group — dossier de direction v1

Statut : **proposition, non validée** (2026-11-05). Aucune refonte définitive ni déploiement avant validation.
Maquettes : https://claude.ai/artifact/2p1BMQjNdoikZaX4d4RxcF (boards « V2 · Accueil corporate »).

---

## 1. Synthèse de la recherche

### 1.1 Concurrents (pages lues le 2026-11-05 ; visuels non vérifiés, lecture textuelle)

| Acteur | Sources | Ce qu'on retient |
|---|---|---|
| Divalto (éditeur ERP/CRM, FR) | divalto.com, divalto.com/logiciel-crm/ | Menu Solutions / Métiers / Tarifs / Références bien séparé. Un CTA principal unique, « démo ». Fiche produit : bénéfices, groupes de fonctionnalités, tarifs publics, cas clients, FAQ. Défaut : deux fourchettes de prix contradictoires. |
| Odoo (éditeur SaaS, BE) | odoo.com/fr_FR, odoo.com/fr_FR/app/crm | Prix et essai gratuit dès le hero. Une fonctionnalité par bloc texte + visuel. Bandeau d'événement localisé (Douala). Rendez-vous conseiller qualifié par taille d'entreprise. Les services passent au second plan. |
| Inetum (ESN, FR/international) | inetum.com, …/services/application-services.html | Pas de produits propres. Les services sont exposés en modèles d'engagement (« build and run / build only / run only »). Défauts : 4 libellés de CTA différents, cas clients sans métriques. |
| Gainde 2000 (Sénégal) | gainde2000.com, …/solutions-et-services/ | Formulaire qui qualifie la demande par produit. Certifications ISO et partenaires institutionnels. Défauts : produits sans page dédiée, coquilles et texte de test visibles. |
| Maviance (Cameroun) | maviance.com, …/solutions/smobilpay/ | Navigation Solutions / Services / Marchés claire. Défauts : liens « # », aucune preuve ni CTA démo. |
| Andela (services tech, origine Afrique) | andela.com, andela.com/case-study-github | Un seul CTA, « discovery call ». Études de cas exemplaires : fiche résumé avec KPI, puis défi → solution → impact. |
| Neurotech, Cellulant, ICCSOFT | — | **Non lus** (sites injoignables). |

### 1.2 Bonnes pratiques retenues (sans reprise de textes ni de designs)
1. Deux portes d'entrée visibles dès l'accueil : **Logiciels** et **Services**.
2. Un gabarit commun à toutes les fiches produit : promesse, cible, fonctionnalités réelles, maturité, CTA, FAQ, preuve.
3. **Un CTA par type d'offre**, avec un libellé constant :
   - produit en production : « Demander une démonstration » ;
   - bêta : « Rejoindre la bêta » ou « Proposer un pilote » ;
   - services : « Décrire mon projet ».
4. Un formulaire de contact qui qualifie la demande : produit ou service visé, taille de l'organisation, canal préféré.
5. Les services présentés en modèles d'engagement (projet, intégration, maintenance).
6. Des études de cas structurées, avec des chiffres seulement lorsqu'ils sont vérifiés et autorisés par le client.
7. Les partenaires et les clients présentés séparément.
8. Un ancrage local visible : FR/EN, WhatsApp, FCFA, paiements mobiles.
9. Des signaux de sérieux SaaS : statut du service, documentation, portail client (à prévoir quand ils existeront).

### 1.3 Anti-patterns à éviter
Produits cachés, liens morts, coquilles, chiffres contradictoires, pages produit sans preuve ni CTA, logiciels et prestations mélangés.

### 1.4 Sources internes (lues le 2026-11-05)
- **Dépôts** :
  - `Trigenys/trigenys-commerce-factory` (README, `docs/pricing-transparency.md`) ;
  - `EagleFox31/atelier2026` (README, releases) ;
  - `EagleFox31/Precis-Translation` (README) ;
  - `EagleFox31/xeption237`, `Trigenys/payment-orchestrator`, `trigenys-notify`, `trigenys-storage`, `appfactory`, `trigenys-engineering-os` (descriptions).
- **Drive** : « Trigenys_Plan_Prospection_Design_System_V3 » (plan commercial multi-produit du 28/10/2026).

---

## 2. Positionnement de Trigenys

**Ce que Trigenys est** : une entreprise technologique camerounaise **hybride**, éditeur de logiciels **et** partenaire d'ingénierie. Les produits démontrent le savoir-faire ; les services le monétisent sur les besoins spécifiques.

### Activités : exercées vs à développer (selon les preuves trouvées)

| Pilier | Statut | Preuve |
|---|---|---|
| Édition de logiciels / SaaS | **Exercé** | 3 produits, dont un en production |
| Ingénierie logicielle (web, mobile, métier) | **Exercé** | Atelier Maître (« projet réellement livré »), plateforme e-commerce Xeption, cleanroute (Android) |
| Support & maintenance applicative | **Exercé** (sur ses produits et projets) | Atelier : 18 versions, releases semver, phase de durcissement production |
| Automatisation & intégration (API, paiements, notifications) | **Exercé, en interne** | payment-orchestrator, trigenys-notify (Telegram/WhatsApp), trigenys-storage, AppFactory |
| IA appliquée | **En construction** | briques open source (agentshield-ai, editorial-os) ; pas de mission client trouvée |
| Conseil & accompagnement technique | **À développer** | aucune mission de conseil externe trouvée |

**À confirmer par toi** :
- Atelier Maître : le client livré est-il nommable ?
- Xeption : client ou projet maison ?
- Existe-t-il des contrats de maintenance actifs ?

### Portefeuille produits (aucune fonctionnalité, maturité ni tarif inventés)

| Produit | Cible | Ce qu'il fait réellement | Maturité | Tarif |
|---|---|---|---|---|
| **Atelier Maître** | Garages, centres auto | Réception, ordres de travail, planning, clients et véhicules, stock de pièces, devis, factures, caisse, rôles, reporting | **Production** (v1.18.0, atelier.trigenys.com) | non publié |
| **Commerce Factory** | Marchands actifs sur Instagram, Facebook, WhatsApp (cosmétique, mode, accessoires, électronique) | Boutique partageable, variantes, panier, demande de commande vers WhatsApp, suivi privé de la demande, espace marchand, rôles staff | **Bêta** ; pilotes marchands non encore établis | **Bêta gratuite** ; aucune offre payante fixée |
| **Précis Translator** | Cabinets, entreprises bilingues | Traduction PDF numérique, DOCX, PPTX et XLSX avec préservation de la mise en page, aperçu progressif | **Bêta** ; l'OCR des scans n'est **pas** livré | non publié |
| Trigenys Insight | Lecteurs (média) | Publication éditoriale indépendante, insight.trigenys.com | — | **Ce n'est ni un SaaS ni un service** |

Hors périmètre du site : AgenStudio (site propre) et les projets internes non commercialisés.

---

## 3. Proposition de valeur

> **Trigenys Group conçoit des logiciels métiers qui tiennent dans la durée, les siens et ceux de ses clients, pensés pour les réalités africaines et prêts pour l'international.**

Différenciation défendable, chaque point étant prouvable :
1. **Éditeur et intégrateur à la fois** : nous exploitons nos propres produits en production, nous savons donc maintenir ce que nous livrons.
2. **Transparence de maturité** : chaque produit affiche son stade (production, bêta, pilote). C'est rare, et crédible face aux sites qui surpromettent.
3. **Ingénierie documentée (RAIDER)** : versions tracées, tests, décisions écrites. Le client ne dépend pas d'une seule personne.
4. **Ancrage local réel** : WhatsApp comme canal de vente, paiements mobiles, FCFA, FR/EN.

Messages à proscrire :
- chiffres non vérifiés (clients, utilisateurs, satisfaction) ;
- « leader », « révolutionnaire » ;
- « IA » comme argument de façade.

---

## 4. Architecture du site

```
/                      Accueil (groupe)
/logiciels             Portefeuille, avec la maturité affichée
  /atelier-maitre      Fiche produit + démo
  /commerce-factory    Fiche produit, autonome comme landing pub
  /precis-translator   Fiche produit + pilote
/services              Vue d'ensemble, modèles d'engagement
  /ingenierie          Applications web, mobiles, métier
  /integration         API, paiements, notifications, automatisation
  /maintenance         Support, correctifs, évolutions
  (cadrage & architecture : étape d'entrée des projets, pas de page tant que l'offre n'est pas exercée)
/realisations          Études de cas (clients avec accord) + open source
/methode               RAIDER expliqué simplement
/a-propos              Équipe, ancrage, valeurs
/contact               Formulaire qualifiant : démo / projet / support
Insight → lien sortant vers insight.trigenys.com (pas de copie du contenu)
/en/...                Version anglaise (même arborescence)
Footer : mentions légales, confidentialité, GitHub, statut (plus tard)
```

Navigation principale : Logiciels · Services · Réalisations · Méthode · Insight · FR/EN · **Nous contacter**.

---

## 5. Présentation des produits et services

**Gabarit fiche produit** (commun, avec une bande immersive sombre en tête) :
1. promesse ;
2. cible ;
3. badge de maturité ;
4. parcours démo réel, en 4 étapes ;
5. fonctionnalités réelles ;
6. limites honnêtes ;
7. tarif (ou « bêta gratuite » / « sur devis ») ;
8. FAQ ;
9. CTA unique ;
10. WhatsApp.

Chaque fiche doit fonctionner seule comme landing page publicitaire : en-tête allégé, aucune sortie obligatoire.

| Produit | CTA | Preuve à montrer |
|---|---|---|
| Atelier Maître | Demander une démonstration | Captures réelles (dans le dépôt), parcours réception → facture |
| Commerce Factory | Rejoindre la bêta | Vraie vitrine de démo et message WhatsApp reçu |
| Précis Translator | Proposer un pilote (document non sensible) | Avant/après d'un document |

**Services** : 3 modèles d'engagement.
- **Projet sur mesure** : cadrage → livraison versionnée.
- **Intégration** : API, paiements, notifications.
- **Maintenance** : correctifs, évolutions, suivi.

CTA unique : « Décrire mon projet ». Preuve : réalisations et méthode.

---

## 6. Direction artistique — recommandation

**Recommandation : un hybride sous un seul design system**, et non un choix entre A et B.

- **Groupe** (accueil, services, méthode, à propos) : piste A, éditoriale et corporate.
  - Fond crème, Source Serif 4 pour les titres, IBM Plex Sans pour le texte.
  - Raison : crédibilité institutionnelle, lisible par une PME comme par un acheteur international.
- **Produits** (bandeau logiciels de l'accueil, en-têtes de fiches) : piste B, immersive.
  - Fond encre, motif binaire turquoise discret, badges de maturité.
  - Raison : signale « éditeur tech » sans basculer tout le site en esthétique startup.
- **Invariants** (déjà validés) :
  - logo V2/V4 ;
  - palette Bordeaux #7F2044, Prune #55162F, Turquoise #138F8D (#0E6E6C pour le petit texte sur crème), Rose #E7A2B6, Encre #251C2A, Crème #FCFAFB ;
  - typographies Source Serif 4, IBM Plex Sans et Plex Mono ;
  - boutons pilule, cibles de 44 px minimum.
- **Écarts corrigés** :
  - Space Grotesk (piste B) est abandonnée, pour revenir au DS V4.
  - Les cartes de « notifications » décoratives de la piste A sont remplacées par un panneau portefeuille informatif.
- **Illustrations** : uniquement de vraies captures produit. Pas d'illustration générique.

---

## 7. Maquette d'accueil améliorée

Boards `V2-Accueil.dc.html` (desktop, 1440) et `V2-Accueil-Mobile.dc.html` (390) dans le canevas. Sections, dans l'ordre :
1. Hero « logiciels métiers, les nôtres et les vôtres » + panneau portefeuille avec la maturité.
2. Double porte Logiciels / Services.
3. Bandeau produits immersif.
4. Services (4 piliers).
5. Réalisations (avec contenus à valider).
6. Méthode RAIDER.
7. Ancrage Cameroun / international.
8. Insight, en lien sortant.
9. Contact à 3 routes (démo, projet, support).
10. Pied de page.

Correction faite sur la maquette Commerce Factory : la grille de prix Essentiel / Pro / Business, inventée, est remplacée par « bêta gratuite ».

---

## Questions ouvertes (non bloquantes pour la maquette)
- Clients nommables (Atelier, Xeption) et autorisation de citer.
- Numéro WhatsApp et e-mail commerciaux.
- Ville affichée (Douala / Yaoundé ?), raison sociale exacte pour les mentions légales.
- Emplacement du dépôt du site : il n'en existe pas encore, voir le journal de décisions.
