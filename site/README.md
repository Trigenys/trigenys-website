# Site Trigenys Group — code de production

Page d'accueil statique bilingue (FR / EN), générée depuis `src/` par un build Node sans dépendance npm.

```text
src/index.tpl.html  (structure, styles, placeholders @@HX_*@@ / @@ORB@@ / @@FX@@)
src/i18n.json       (dictionnaire FR → EN, clé = texte français d'un nœud)
src/lang.js         (bascule de langue, drapeaux, mémorisation du choix)
src/fx.js           (moteur de défilement : parallax, rail horizontal, section métiers épinglée)
src/assets/         (logos et captures réelles des produits)
        ↓  node scripts/build.mjs   (déterministe : graine fixe)
dist/index.html + dist/assets/
        ↓  node scripts/check.mjs   (contrats du build)
```

## Commandes

```bash
npm run build      # génère dist/ puis exécute les contrôles
npm run preview    # sert dist/ sur http://127.0.0.1:4173/
```

Node ≥ 20, aucune installation de paquet nécessaire.

## Règles de contenu
- Seuls les produits `publicationStatus: published` du registre apparaissent ; stade réel affiché (production / bêta).
- Aucune statistique, tarif ou témoignage non sourcé : les emplacements sont marqués « à fournir / à confirmer ».
- Ajouter ou modifier un texte : éditer le template **et** la clé correspondante dans `i18n.json` (la clé est le texte français normalisé, espaces réduits).

## Qualité (CI, `.github/workflows/ci.yml`)
- Analyse d'impact (`.github/appfactory-impact.json`) : les surfaces `site/**` déclenchent `site-build` et `visual-qa` ; docs et maquettes ne déclenchent rien.
- `site-build` : build + contrôles + preuve d'idempotence (deux builds identiques).
- `visual-qa` : workflow réutilisable AppFactory (captures 1440×900 et 390×844, axe, Lighthouse, reduced-motion, aucune image externe, CTA principal `a[data-cta='primary']`).

## Hébergement (décision : `docs/decisions/adr-0001-hebergement.md`)
Cible : **Cloudflare Pages**, projet `trigenys-website`, canonical `https://www.trigenys.com/`. Non déployé tant que les
éléments « à confirmer » (domaine Commerce Factory, mention hébergement/conformité) ne sont pas renseignés. Le bloc
« L'équipe » reste volontairement sans photo ni noms (visuel généré, signature collective).
- `src/_headers` : CSP, en-têtes de sécurité et cache, copié dans `dist/` par le build et appliqué par `npm run preview`.
- `.github/workflows/appfactory-infrastructure.yml` + `.appfactory/pages.json` : le dépôt s'authentifie par OIDC GitHub
  auprès d'AppFactory (`Trigenys/appfactory`, `POST /infrastructure/pages`), qui crée/réconcilie le projet Pages
  **connecté Git** avec ses propres identifiants Cloudflare. Aucun secret Cloudflare dans ce dépôt.
- Branches : `production` = branche de production Pages (publication humaine par PR `main → production`, CI verte
  exigée) ; toute autre branche (dont `main`) donne un aperçu `<branche>.trigenys-website.pages.dev`.
- Build Cloudflare : racine `site`, `npm run build` (contrats inclus), sortie `dist`, Node épinglé par `site/.node-version`.
- Marqueur de propriété commité par AppFactory : `.appfactory/pages-infrastructure.json` (ne pas éditer à la main).

### Runbook de mise en ligne
1. Modifier le contrat `.appfactory/pages.json` si besoin, pousser sur `main` : le workflow réconcilie le projet
   (relance manuelle : `gh workflow run appfactory-infrastructure.yml --ref main`).
2. Aperçu : chaque push sur `main` est construit par Cloudflare → `main.trigenys-website.pages.dev`
   (en-têtes : `curl -sI <url> | grep -i content-security`).
3. Production : ouvrir une PR `main → production`, attendre la CI, fusionner ; Cloudflare construit `production`.
4. Domaine (quand les éléments « à confirmer » sont renseignés) : ajouter `"customDomain": "www.trigenys.com"` au contrat,
   pousser ; appliquer ensuite chez Spaceship le `CNAME www → trigenys-website.pages.dev` renvoyé par AppFactory, et
   une redirection d'URL de l'apex `trigenys.com` vers `https://www.trigenys.com`. Rien d'autre ne change (MX Spacemail).
5. Phase 2 (optionnelle, apex natif) : exporter toute la zone Spaceship (MX Spacemail, SPF/DKIM/DMARC, `atelier`,
   `precis-translator`, `seo`, `cleanroute`, `simsmodhealth`) avant toute bascule des NS ; plan → revue → apply.
