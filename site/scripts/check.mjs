// Contrôles de non-régression sur dist/ (sans navigateur) : contrats que le build doit toujours tenir,
// y compris les fondations SEO (canonical, hreflang, JSON-LD, sitemap, robots, llms.txt, 404).
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const site = JSON.parse(await readFile(path.join(root, "src", "site.json"), "utf8"));
const i18n = JSON.parse(await readFile(path.join(root, "src", "i18n.json"), "utf8"));
const rd = (f) => readFile(path.join(dist, f), "utf8").catch(() => "");
const exists = (f) => access(path.join(dist, f)).then(() => true, () => false);
const O = site.origin;
const fails = [];
const must = (cond, msg) => { if (!cond) fails.push(msg); };

const walk = async (d) => (await readdir(d, { withFileTypes: true })).flatMap((e) => e.isDirectory() ? [] : [path.join(d, e.name)])
  .concat(...await Promise.all((await readdir(d, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => walk(path.join(d, e.name)))));
const pages = (await walk(dist)).filter((f) => f.endsWith(".html")).map((f) => path.relative(dist, f).split(path.sep).join("/"));
const urlOf = (f) => "/" + f.replace(/(^|\/)index\.html$/, "$1");
const fileOf = (u) => { const p = u.replace(/[#?].*$/, ""); return p.endsWith("/") ? p.slice(1) + "index.html" : p.slice(1); };
const ldOf = (h) => [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch { return null; } });
const nodes = (h) => ldOf(h).filter(Boolean).flatMap((j) => j["@graph"] || [j]);
// Nœuds texte du <body>, hors script, style et svg (mêmes règles que le traducteur du build).
function texts(h) {
  const b = h.slice(h.indexOf("<body"), h.lastIndexOf("</body>")).split(/(<!--[\s\S]*?-->|<[^>]+>)/);
  const out = []; let skip = 0;
  b.forEach((p, i) => {
    if (i % 2) { const t = p.match(/^<(\/?)(script|style|svg)\b/i); if (t && !p.endsWith("/>")) skip += t[1] ? -1 : 1; return; }
    const k = p.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    if (!skip && k) out.push(k);
  });
  return out;
}

const homes = { fr: "index.html", en: "en/index.html" };
const indexable = [];
for (const f of pages) {
  const h = await rd(f);
  const u = urlOf(f);
  const noindex = /<meta name="robots" content="noindex">/.test(h);
  must(!/@@[A-Z_]+@@/.test(h), `${u} : placeholder @@…@@ résiduel`);
  must(!h.includes("/_blob/") && !h.includes("support.js") && !h.includes("<x-dc>") && !h.includes("<helmet>"), `${u} : balisage du canevas résiduel`);
  must(!h.includes("var I18N=") && !h.includes("function v7lang("), `${u} : ancien dictionnaire client présent (la traduction se fait au build)`);
  must(/^<!doctype html>/i.test(h.trimStart()) && /<html lang="(fr|en)">/.test(h), `${u} : doctype ou lang racine`);
  must(/<meta name="viewport"/.test(h), `${u} : meta viewport`);
  must(/<title>[^<]{10,70}<\/title>/.test(h), `${u} : <title> de 10 à 70 caractères attendu`);
  const d = h.match(/<meta name="description" content="([^"]*)">/);
  must(d && d[1].length >= 50 && d[1].length <= 200, `${u} : meta description de 50 à 200 caractères attendue`);
  must((h.match(/<h1[\s>]/g) || []).length === 1, `${u} : un seul <h1> attendu`);
  must(h.includes('DOMContentLoaded", v7init') && h.includes("function v7fx("), `${u} : amorçage v7init absent`);
  must(!/href="#"/.test(h), `${u} : lien vide href="#"`);
  must(!/<img[^>]+src="https?:/.test(h), `${u} : image externe interdite (visual-qa)`);
  must(!/fonts\.(googleapis|gstatic)\.com/.test(h), `${u} : police externe interdite`);
  must(!/<script[^>]+src=|<link[^>]+rel="(?:stylesheet|preload|modulepreload)"[^>]+href="https?:/.test(h), `${u} : ressource externe interdite par la CSP`);
  must(!/\son[a-z]+="/.test(h), `${u} : gestionnaire inline on*= interdit par la CSP`);
  const lds = ldOf(h);
  must(lds.length >= 1 && lds.every(Boolean), `${u} : JSON-LD absent ou invalide`);
  const g = nodes(h);
  must(g.some((n) => n["@type"] === "Organization" && n["@id"] === `${O}/#org`), `${u} : JSON-LD Organization #org absent`);
  const can = h.match(/<link rel="canonical" href="([^"]+)">/);
  if (noindex) must(!can, `${u} : une page noindex ne doit pas déclarer de canonical`);
  else {
    must(can && can[1] === O + u, `${u} : canonical absolue attendue (${O + u})`);
    must(h.includes(`<meta property="og:url" content="${O + u}">`), `${u} : og:url attendue`);
    indexable.push(u);
  }
  must(/property="og:image" content="https:\/\/[^"]+\/assets\/[^"]+"/.test(h), `${u} : og:image absolue attendue`);
  // Liens internes et assets : chaque cible doit exister dans dist/.
  for (const [, ref] of h.matchAll(/(?:src|href|data-src)="(\/[^"/][^"]*|\/)"/g)) {
    if (ref.startsWith("//")) continue;
    const t = fileOf(ref);
    must(await exists(t), `${u} : lien interne cassé ${ref}`);
  }
  for (const [, a] of h.matchAll(/property="og:image" content="https:\/\/[^"]+?(\/assets\/[^"]+)"/g)) must(await exists(a.slice(1)), `${u} : og:image manquante ${a}`);
  must(!/(?:src|href|data-src)="assets\//.test(h), `${u} : chemin d'asset relatif (attendu /assets/…)`);
}

// Accueils FR / EN : contrats visuels historiques et alternance de langue.
for (const [lang, f] of Object.entries(homes)) {
  const h = await rd(f);
  must(h, `${f} absent`);
  must(h.includes(`<html lang="${lang}">`), `${f} : lang="${lang}" attendu`);
  must(h.includes("function v7car(") && h.includes("v7car(r)"), `${f} : carrousel du hero absent`);
  must((h.match(/class="sl[^"]*" data-name=/g) || []).length === 4 && h.includes('class="dots" role="tablist"'), `${f} : quatre diapos et une barre de points attendues`);
  must((h.match(/class="lng/g) || []).length === 2, `${f} : deux liens de langue attendus (desktop + mobile)`);
  must((h.match(/<svg class="orb"/g) || []).length === 4, `${f} : 4 orbites attendues`);
  must((h.match(/<svg class="hx /g) || []).length === 5, `${f} : 5 hélices attendues`);
  for (const [l, p] of [["fr", "/"], ["en", "/en/"], ["x-default", "/"]]) must(h.includes(`<link rel="alternate" hreflang="${l}" href="${O + p}">`), `${f} : hreflang ${l} attendu`);
  must(nodes(h).some((n) => n["@type"] === "WebSite"), `${f} : JSON-LD WebSite attendu`);
}
const fr = await rd(homes.fr), en = await rd(homes.en);
must(fr.match(/<h1[\s\S]*?<\/h1>/)?.[0] !== en.match(/<h1[\s\S]*?<\/h1>/)?.[0], "/en/ : h1 identique au français");
const pending = new Set(Object.entries(i18n).filter(([k, v]) => k !== v).map(([k]) => k));
const leftFr = [...new Set(texts(en).filter((t) => pending.has(t)))];
must(!leftFr.length, `/en/ : textes non traduits : ${leftFr.slice(0, 5).join(" | ")}`);

// Pages déclarées dans site.json : produits, réalisation, mentions légales, 404.
for (const pg of site.pages) {
  const f = fileOf(pg.path), h = await rd(f);
  must(h, `${pg.path} : page non générée`);
  if (pg.path.startsWith("/produits/")) {
    const app = nodes(h).find((n) => n["@type"] === "SoftwareApplication");
    must(app && app.publisher?.["@id"] === `${O}/#org` && app.name && app.applicationCategory, `${pg.path} : SoftwareApplication (publisher #org) attendu`);
    must(nodes(h).some((n) => n["@type"] === "FAQPage" && n.mainEntity?.length >= 3), `${pg.path} : FAQPage (3 questions ou plus) attendue`);
  }
  if (pg.sectionHref) {
    must(h.includes('data-cta="primary"') && h.includes('id="contact"'), `${pg.path} : CTA primaire et section #contact attendus (visual-qa)`);
    must(nodes(h).some((n) => n["@type"] === "BreadcrumbList"), `${pg.path} : BreadcrumbList attendu`);
  }
}
const nf = await rd("404.html");
must(nf && /<meta name="robots" content="noindex">/.test(nf), "404.html : page 404 noindex attendue (sinon l'hébergeur sert l'accueil en 200 pour toute URL)");

// robots.txt, sitemap.xml, llms.txt
const robots = await rd("robots.txt");
must(/^User-agent: \*$/m.test(robots) && robots.includes(`Sitemap: ${O}/sitemap.xml`), "robots.txt : User-agent et ligne Sitemap attendus");
must(!/^Disallow: \/$/m.test(robots), "robots.txt : le site entier ne doit pas être bloqué");
const sm = await rd("sitemap.xml");
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
must(sm.startsWith('<?xml version="1.0" encoding="UTF-8"?>') && locs.length, "sitemap.xml : XML et URL attendus");
for (const l of locs) must(l.startsWith(O) && indexable.includes(l.slice(O.length)), `sitemap.xml : ${l} ne correspond à aucune page indexable`);
for (const u of indexable) must(locs.includes(O + u), `sitemap.xml : page indexable absente ${u}`);
const llms = await rd("llms.txt");
must(llms.startsWith(`# ${site.name}\n`) && /^> .+/m.test(llms), "llms.txt : titre et résumé attendus");
for (const pg of site.pages.filter((p) => p.path.startsWith("/produits/"))) must(llms.includes(O + pg.path), `llms.txt : ${pg.path} absent`);

// En-têtes de l'hébergeur et dictionnaire
const headersFile = await rd("_headers");
must(/^\/\*\n(  [A-Za-z-]+: .+\n)*  Content-Security-Policy: default-src 'self'/m.test(headersFile), "_headers : CSP default-src 'self' attendue sur /*");
must(/^\/assets\/fonts\/\*\n(  .+\n)*  Cache-Control: public, max-age=31536000, immutable/m.test(headersFile), "_headers : cache long attendu sur les polices");
for (const [k, v] of Object.entries(i18n)) {
  must(typeof v === "string" && v.trim(), `traduction vide pour « ${k} »`);
  must(v !== k || /^[A-Z0-9 /·&]+$|^(Garages|SAV|WhatsApp)/.test(k), `traduction identique au français pour « ${k} »`);
}

if (fails.length) { console.error("ÉCHEC\n- " + fails.join("\n- ")); process.exit(1); }
console.log(`OK : ${pages.length} pages HTML, ${locs.length} URL au sitemap, ${Object.keys(i18n).length} chaînes, contrats du build et SEO respectés`);
