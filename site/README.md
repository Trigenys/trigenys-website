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

## Hébergement
Non déployé. Cible prévue : hébergement statique de `site/dist` (la bêta Commerce Factory est déjà sur Cloudflare Pages). Aucune mise en ligne tant que les éléments « à confirmer » (coordonnées, domaine Commerce Factory, logos clients, témoignages, photo) ne sont pas renseignés.


