# ADR-0001 — Hébergement et domaine du site trigenys.com

- **Statut** : accepté (2026-11-06), application en deux phases ; mise en ligne publique différée tant que les éléments
  « à confirmer » du site ne sont pas renseignés.
- **Contexte** : site statique (`site/dist`, ~130 Ko de HTML + 18 assets, aucune dépendance), budget Lighthouse mobile
  LCP 2 500 ms tenu de justesse (~2 100 ms) : l'hébergeur doit servir en brotli depuis un point de présence proche du
  Cameroun. Le domaine `trigenys.com` est chez Spaceship (NS `launch1/launch2.spaceship.net`), avec une messagerie
  Spacemail (MX `mx1/mx2.spacemail.com`) et cinq sous-domaines déjà en service (`atelier`, `precis-translator` sur AWS
  eu-west-3 ; `seo`, `cleanroute`, `simsmodhealth` en CNAME vers `*.pages.dev`). L'apex et `www` n'ont aucun enregistrement.

## Options étudiées (reuse-first)
| Option | Pour | Contre |
|---|---|---|
| **Cloudflare Pages** (retenu) | Déjà utilisé par l'organisation (13 projets, dont la bêta Commerce Factory, PoP Douala) ; gratuit ; brotli ; `_headers` versionné ; aperçus par branche | L'apex personnalisé exige que la zone DNS soit sur Cloudflare (migration des NS) |
| GitHub Pages | Zéro compte supplémentaire | Pas de PoP africain, pas d'en-têtes personnalisés (CSP impossible), cache non réglable |
| Netlify | `_headers` compatible | Compte supplémentaire, pas d'usage existant, quotas de bande passante |
| S3 + CloudFront (AWS) | Compte déjà utilisé pour deux produits | Coût et maintenance (certificat, invalidations, IAM) disproportionnés pour une page |

Décision : **Adopt** Cloudflare Pages, projet `trigenys-website`, upload direct depuis GitHub Actions (`deploy.yml`)
plutôt qu'intégration Git Cloudflare : la publication reste explicite (`workflow_dispatch`), passe par les mêmes
contrats que la CI, et aucune application tierce n'écrit dans le dépôt. Un projet « upload direct » ne peut pas être
converti ensuite en intégration Git : choix assumé.

## Domaine : deux phases
1. **Phase 1 — `www.trigenys.com` canonique, DNS inchangé chez Spaceship.** CNAME `www` → `trigenys-website.pages.dev`,
   redirection d'URL de l'apex vers `https://www.trigenys.com` (fonction de redirection du registrar). La messagerie,
   les enregistrements SPF/DKIM et les cinq sous-domaines ne sont pas touchés. Le canonical et `og:url` du site pointent
   sur `https://www.trigenys.com/`.
2. **Phase 2 (optionnelle) — zone sur Cloudflare** pour servir aussi l'apex sans redirection externe : export complet de
   la zone Spaceship (MX, TXT SPF/DKIM/DMARC, les cinq sous-domaines) → plan → revue → bascule des NS → vérification
   e-mail et sous-domaines. Jamais sans export préalable et fenêtre de vérification.

## En-têtes servis (`site/src/_headers`)
CSP `default-src 'self'` (scripts et styles inline autorisés : le site n'a qu'un bloc de chaque, pas de script externe),
`frame-ancestors 'none'`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, cache : HTML revalidé, assets 1 jour +
`stale-while-revalidate`, polices 1 an immuables. Le serveur d'aperçu applique le même fichier ; la CI mesure donc le
site tel qu'il sera servi. Contrats dans `scripts/check.mjs`.

## Conséquences
- À fournir par un admin : secrets `CLOUDFLARE_API_TOKEN` (jeton limité à « Cloudflare Pages : Edit ») et
  `CLOUDFLARE_ACCOUNT_ID` ; environnements GitHub `preview` et `production` (protection par relecteur sur `production`).
- Le projet Pages est créé une fois (`wrangler pages project create trigenys-website --production-branch main`) ; les
  déploiements sont idempotents (même `dist` = même hash, aucun changement visible).
- Le lieu d'hébergement (Cloudflare, données servies depuis le réseau mondial, aucune donnée client collectée par le site)
  pourra remplacer la mention « à confirmer » de la carte Hébergement et conformité.

## Addendum 2026-11-06 — mécanisme de déploiement : brique AppFactory

Le `deploy.yml` local n'exécute plus wrangler lui-même : il appelle le workflow réutilisable
`reusable-pages-deploy.yml` de `EagleFox31/appfactory-project-automation` (PR #145), épinglé par SHA revu.
Reuse-first : aucune brique Pages n'existait dans AppFactory (seul `broker/` utilise Workers Builds) → **Build** d'une
brique générique (contrat de validation + `cloudflare/wrangler-action` épinglé en Adopt), consommée ici comme premier
projet. Apports : mode `plan` sans secret, validation de `dist` avant lecture des secrets, branche de production
découverte, un seul endroit à corriger pour tous les sites statiques Trigenys. L'épinglage pointe sur la tête de la PR
tant qu'elle n'est pas fusionnée ; il sera remplacé par le SHA fusionné (changement de version explicite).
PR #145 fusionnée (squash) le 2026-11-06 : `deploy.yml` épinglé sur `d86c14fcb365aa7a5d0246908a27523a2b31ab00`.

## Addendum 2026-11-06 — révision : provisionnement par `Trigenys/appfactory` (appfactory-api)

L'addendum précédent est remplacé. La brique `reusable-pages-deploy.yml` réintroduisait des identifiants Cloudflare par
dépôt, contraire au principe AppFactory (issue appfactory-project-automation #45, PR appfactory #56/#59/#63/#94).
Décision : le site consomme `POST /infrastructure/pages` d'`appfactory-api` depuis le workflow canonique
`.github/workflows/appfactory-infrastructure.yml` (OIDC GitHub, audience `appfactory-api`), contrat `.appfactory/pages.json`.
AppFactory crée un projet Pages **connecté Git** et garde seul les identifiants Cloudflare ; `deploy.yml` est supprimé.
Publication humaine conservée par une branche `production` dédiée (PR depuis `main`, CI exigée) ; `main` et les autres
branches ne produisent que des aperçus `*.pages.dev`. Domaine custom différé tant que les éléments « à confirmer »
restent ouverts. Écarts assumés : pas de mode `plan` côté API (premier appel = provisionnement + déploiement de
`production`), build exécuté par Cloudflare hors des gates Lighthouse (compensé par la protection de `production`),
Node épinglé par `.node-version` faute de paramètre API. Extension proposée côté appfactory-api : `dryRun`.
