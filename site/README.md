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
éléments « à confirmer » (photo d'équipe, domaine Commerce Factory, mention hébergement/conformité) ne sont pas renseignés.
- `src/_headers` : CSP, en-têtes de sécurité et cache, copié dans `dist/` par le build et appliqué par `npm run preview`.
- `.github/workflows/deploy.yml` : déploiement manuel (`preview` → URL `*.pages.dev` de branche, `production` → branche
  de production), après build + contrats. Secrets requis : `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

### Runbook de mise en ligne
1. Créer le projet une fois : `npx wrangler pages project create trigenys-website --production-branch main`.
2. Secrets GitHub (`Settings → Secrets → Actions`) : jeton API limité à « Cloudflare Pages : Edit » + identifiant du compte ;
   créer les environnements `preview` et `production` (relecteur obligatoire sur `production`).
3. Aperçu : `gh workflow run deploy.yml --ref main -f target=preview`, puis vérifier l'URL `preview-main.trigenys-website.pages.dev`
   (en-têtes : `curl -sI <url> | grep -i content-security`).
4. DNS chez Spaceship (phase 1, rien d'autre ne change) : `CNAME www → trigenys-website.pages.dev` ; redirection d'URL de
   l'apex `trigenys.com` vers `https://www.trigenys.com` ; dans Cloudflare Pages → Custom domains, ajouter `www.trigenys.com`.
5. Production : `gh workflow run deploy.yml --ref main -f target=production`, puis contrôle Lighthouse sur l'URL publique.
6. Phase 2 (optionnelle, apex natif) : exporter toute la zone Spaceship (MX Spacemail, SPF/DKIM/DMARC, `atelier`,
   `precis-translator`, `seo`, `cleanroute`, `simsmodhealth`) avant toute bascule des NS ; plan → revue → apply.
