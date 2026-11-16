# Site Trigenys Group — code de production

Site statique généré depuis `src/` par un build Node sans dépendance npm : accueil FR (`/`) et EN (`/en/`),
pages produits, réalisation XEPTION, mentions légales, page 404, `robots.txt`, `sitemap.xml` et `llms.txt`.

```text
src/site.json       (source unique SEO : origine, Organization #org, titres, descriptions, JSON-LD, pages, mentions légales)
src/index.tpl.html  (accueil : structure, styles, placeholders @@…@@)
src/page.tpl.html   (gabarit des pages secondaires : reprend en-tête, styles, contact et pied de page de l'accueil)
src/pages/*.html    (contenu des pages secondaires ; FAQ en <details class="fq"> → FAQPage JSON-LD automatique)
src/i18n.json       (dictionnaire FR → EN appliqué au build pour /en/, clé = texte français d'un nœud)
src/car.js, fx.js   (carrousel du hero, moteur de défilement : parallax, rail, apparitions)
src/assets/         (logos et captures réelles des produits)
        ↓  node scripts/build.mjs   (déterministe : graine fixe, deux builds identiques)
dist/  (index.html, en/, produits/…, realisations/…, mentions-legales/, 404.html, robots.txt, sitemap.xml, llms.txt)
        ↓  node scripts/check.mjs       (contrats du build et SEO, sans réseau)
        ↓  node scripts/http-check.mjs  (statuts et types servis : 404 réelle, text/plain, XML, URL du sitemap en 200)
```

## Commandes

```bash
npm run build       # génère dist/ puis exécute les contrôles
npm run check:http  # sert dist/ et vérifie les réponses HTTP ; --base https://www.trigenys.com pour la production
npm run preview     # sert dist/ sur http://127.0.0.1:4173/ (404 et redirections comme Cloudflare Pages)
```

Node ≥ 20, aucune installation de paquet nécessaire.

## SEO
- **404** : `dist/404.html` doit exister. Sans lui, Cloudflare Pages sert l'accueil en 200 pour toute URL (soft 404).
- **Ajouter une page** : créer `src/pages/<nom>.html`, la déclarer dans `site.json > pages` (chemin, titre ≤ 70
  caractères, description 50–200, JSON-LD) ; sitemap, llms.txt, fil d'Ariane et BreadcrumbList suivent seuls.
- **Mentions légales** : renseigner `site.json > legal.fields` (valeurs `null` = non publiées, signalées au build).
  Ne jamais inventer un identifiant légal.
- **Version anglaise** : `/en/` est traduite au build depuis `i18n.json` ; un texte français du dictionnaire resté
  dans `/en/` fait échouer `check.mjs`. Les pages secondaires sont en français uniquement.

## Règles de contenu
- Seuls les produits `publicationStatus: published` du registre apparaissent ; stade réel affiché (production / bêta).
- Aucune statistique, tarif ou témoignage non sourcé : les emplacements sont marqués « à fournir / à confirmer ».
- Ajouter ou modifier un texte de l'accueil : éditer le template **et** la clé correspondante dans `i18n.json` (la clé est le texte français normalisé, espaces réduits).

## Qualité (CI, `.github/workflows/ci.yml`)
- Analyse d'impact (`.github/appfactory-impact.json`) : les surfaces `site/**` déclenchent `site-build` et `visual-qa` ; docs et maquettes ne déclenchent rien.
- `site-build` : build + contrôles + preuve d'idempotence (`diff -r` de deux builds) + contrôle HTTP (`check:http`).
- `visual-qa` : workflow réutilisable AppFactory (captures 1440×900 et 390×844, axe, Lighthouse, reduced-motion, aucune image externe, CTA principal `a[data-cta='primary']`) sur `/`, `/en/` et `/produits/atelier-maitre/`.

## Hébergement (décision : `docs/decisions/adr-0001-hebergement.md`)
Cible : **Cloudflare Pages**, projet `trigenys-website`, canonical `https://www.trigenys.com/` (domaine personnalisé
déclaré dans `.appfactory/pages.json`). Le bloc « L'équipe » reste volontairement sans photo ni noms (visuel généré,
signature collective) ; Commerce Factory garde son adresse de bêta tant que son domaine n'est pas arrêté.
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
