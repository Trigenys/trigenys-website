// Génère dist/ depuis src/ : accueil FR (/) et EN (/en/), pages secondaires, 404, robots.txt, sitemap.xml, llms.txt.
// Source des métadonnées et du JSON-LD : src/site.json. Déterministe (graine fixe) : deux builds produisent le même dist/.
import { readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "src");
const dist = path.join(root, "dist");
const T = 7.0; // secondes par tour d'hélice

// Générateur pseudo-aléatoire déterministe (mulberry32)
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const bit = (r) => (r() < 0.5 ? "0" : "1");

function helix(r, cls, n, step, amp, size, c1, c2) {
  const w = (n - 1) * step + size * 2;
  const h = amp * 2 + size * 2;
  const cy = h / 2;
  const out = [`<svg class="hx ${cls}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true" style="--a:${amp}px">`];
  for (const [col, off] of [[c1, 0], [c2, T / 2]]) {
    for (let i = 0; i < n; i++) {
      const x = size + i * step;
      const d = -(i * T / 12 + off);
      out.push(`<text x="${x}" y="${cy}" fill="${col}" font-size="${size}" style="animation-delay:${d.toFixed(2)}s">${bit(r)}</text>`);
    }
  }
  out.push("</svg>");
  return out.join("");
}

function orbits(seed) {
  const r = rng(1000 + seed);
  const rings = [[340, 130, 54, "a"], [300, 190, 40, "b"], [230, 250, 30, "c"]];
  const out = ['<svg class="orb" viewBox="0 0 760 760" aria-hidden="true"><defs>'];
  for (const [rx, ry, , nm] of rings) out.push(`<path id="o${seed}${nm}" d="M${380 - rx},380a${rx},${ry} 0 1,0 ${2 * rx},0a${rx},${ry} 0 1,0 -${2 * rx},0"/>`);
  out.push("</defs>");
  rings.forEach(([rx, ry, d, nm], i) => {
    const per = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
    let txt = "";
    for (let k = 0; k < Math.floor(per / 11); k++) txt += bit(r);
    out.push(`<g class="${i % 2 ? "r" : ""}" style="--d:${d}s"><text fill="#fff" font-size="11"><textPath href="#o${seed}${nm}">${txt}</textPath></text></g>`);
  });
  out.push("</svg>");
  return out.join("");
}

// --- Outils HTML / JSON-LD ---------------------------------------------------------------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const encText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0" };
const dec = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
  e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : ENT[e] ?? m);
const plain = (h) => dec(h.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const fill = (s, rep) => Object.entries(rep).reduce((acc, [k, v]) => acc.split(k).join(v), s);
// Chemins d'assets absolus : les mêmes fragments servent à /, /en/, /produits/… et à la 404 (servie à n'importe quelle profondeur).
const absAssets = (h) => h.replace(/(=")assets\//g, "$1/assets/").replace(/url\(assets\//g, "url(/assets/");
const jsonld = (graph) => `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>`;

// Traduction FR → EN au build, sur les nœuds texte du <body> (hors script, style, svg) : même algorithme que
// l'ancien moteur client (clé = texte normalisé ; sinon première clé de plus de 12 caractères contenue dans le texte).
// Les attributs alt et aria-label sont traduits quand leur valeur exacte figure au dictionnaire.
function translate(html, I) {
  const keys = Object.keys(I).filter((k) => k.length > 12);
  const b = html.indexOf("<body"), e = html.lastIndexOf("</body>");
  const parts = html.slice(b, e).split(/(<!--[\s\S]*?-->|<[^>]+>)/);
  let skip = 0, n = 0;
  const tr = (raw) => {
    const k = raw.replace(/\s+/g, " ").trim();
    if (!k) return null;
    let en = I[k];
    if (!en) for (const key of keys) if (k.includes(key)) { en = k.split(key).join(I[key]); break; }
    return en ? raw.match(/^\s*/)[0] + en + raw.match(/\s*$/)[0] : null;
  };
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (i % 2) {
      const t = p.match(/^<(\/?)(script|style|svg)\b/i);
      if (t) { if (!p.endsWith("/>")) skip += t[1] ? -1 : 1; continue; }
      if (!skip && /^<[a-z]/i.test(p)) parts[i] = p.replace(/\s(alt|aria-label)="([^"]*)"/g, (m, a, v) => { const en = I[dec(v).trim()]; return en ? ` ${a}="${esc(en)}"` : m; });
      continue;
    }
    if (skip) continue;
    const en = tr(dec(p));
    if (en !== null) { parts[i] = encText(en); n++; }
  }
  return { html: html.slice(0, b) + parts.join("") + html.slice(e), n };
}

// --- Données -------------------------------------------------------------------------------
const read = (f) => readFile(path.join(src, f), "utf8");
const site = JSON.parse(await read("site.json"));
const i18n = JSON.parse(await read("i18n.json"));
const O = site.origin;
const abs = (p) => O + p;
const ORG = site.organization["@id"];
const js = `${await read("car.js")}\n${await read("fx.js")}`;
const webPage = (p, title, description, lang, extra = {}) => ({
  "@type": "WebPage", "@id": abs(p) + "#webpage", url: abs(p), name: title, description, inLanguage: lang,
  isPartOf: { "@id": abs("/") + "#website" }, publisher: { "@id": ORG }, ...extra,
});

// --- Accueil FR / EN ------------------------------------------------------------------------
let tpl = await read("index.tpl.html");
const r = rng(7);
const deco = {
  "@@HX_HERO@@": helix(r, "hxh", 34, 17, 46, 16, "#7F2044", "#138F8D"),
  "@@HX_DIV@@": helix(r, "hxd", 80, 17, 22, 12, "#7F2044", "#138F8D"),
  "@@HX_NEXT@@": helix(r, "hxn", 24, 20, 52, 18, "#7F2044", "#138F8D"),
  "@@HX_CTA@@": helix(r, "hxc", 40, 19, 70, 18, "rgba(255,255,255,.9)", "#E7A2B6"),
  "@@HX_FOOT@@": helix(r, "hxf", 60, 17, 18, 12, "#7F2044", "#138F8D"),
};
tpl = fill(tpl, deco);
for (let i = 1; i <= 4; i++) tpl = tpl.replace("@@ORB@@", orbits(i));
tpl = absAssets(tpl.replace("@@FX@@", () => js));

const hreflang = ["fr", "en"].map((l) => `<link rel="alternate" hreflang="${l}" href="${abs(site.home[l].path)}">`)
  .concat(`<link rel="alternate" hreflang="x-default" href="${abs(site.home.fr.path)}">`).join("\n");
let translated = 0;
function home(lang) {
  const m = site.home[lang], other = lang === "fr" ? "en" : "fr", o = site.home[other];
  const graph = [site.organization, ...site.graph, webPage(m.path, m.title, m.description, lang, { about: { "@id": ORG } })];
  let h = fill(tpl, {
    "@@LANG@@": lang, "@@TITLE@@": esc(m.title), "@@DESC@@": esc(m.description), "@@OG_DESC@@": esc(m.ogDescription),
    "@@OG_LOCALE@@": m.ogLocale, "@@CANONICAL@@": abs(m.path), "@@ORIGIN@@": O,
    "@@HEAD_SEO@@": `${hreflang}\n<meta property="og:locale:alternate" content="${o.ogLocale}">\n${jsonld(graph)}`,
    "@@ALT_HREF@@": o.path, "@@ALT_LANG@@": other, "@@ALT_LABEL@@": esc(m.switchLabel), "@@HOME@@": m.path,
  });
  if (lang === "en") ({ html: h, n: translated } = translate(h, i18n));
  return h;
}
const out = new Map([["index.html", home("fr")], ["en/index.html", home("en")]]);

// --- Pages secondaires : en-tête, contact et pied de page repris de l'accueil FR ----------
const fr = out.get("index.html");
const pick = (re, what) => { const m = fr.match(re); if (!m) throw new Error(`Accueil : bloc introuvable (${what})`); return m[0]; };
const toHome = (h) => h.replace(/href="#(?!contact")/g, 'href="/#'); // ancres de l'accueil, sauf le contact présent sur chaque page
const shell = {
  "@@CSS@@": pick(/<style>[\s\S]*?<\/style>/, "style").slice(7, -8),
  "@@HEADER@@": toHome(pick(/<header class="nav">[\s\S]*?<\/header>/, "header")),
  "@@CONTACT@@": pick(/<section class="fin" id="contact">[\s\S]*?<\/section>/, "contact"),
  "@@FOOTER@@": toHome(pick(/<footer>[\s\S]*?<\/footer>/, "footer")),
  "@@FX@@": js,
};
const ptpl = await read("page.tpl.html");
const legal = site.legal.fields.filter((f) => f.value).map((f) => `    <dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd>`).join("\n");
const legalMissing = site.legal.fields.filter((f) => !f.value).map((f) => f.label);

for (const pg of site.pages) {
  const url = abs(pg.path);
  let body = (await read(pg.src)).replace("@@LEGAL@@", () => legal);
  const crumbs = pg.noindex ? [] : [["Accueil", "/"], ...(pg.section ? [[pg.section, pg.sectionHref]] : []), [pg.h, pg.path]];
  const bc = crumbs.length ? `<nav class="bc" aria-label="Fil d'Ariane">${crumbs.map(([n, h], i) =>
    i === crumbs.length - 1 ? `<span aria-current="page">${esc(n)}</span>` : `<a href="${h}">${esc(n)}</a>`).join(' <span aria-hidden="true">/</span> ')}</nav>` : "";
  const graph = [site.organization];
  if (!pg.noindex) {
    const main = pg.jsonld?.[0]?.["@id"];
    graph.push(webPage(pg.path, pg.title, pg.description, "fr", {
      breadcrumb: { "@id": url + "#breadcrumb" }, about: { "@id": main || ORG },
      ...(pg.image ? { primaryImageOfPage: abs(pg.image) } : {}),
    }));
    graph.push({ "@type": "BreadcrumbList", "@id": url + "#breadcrumb",
      itemListElement: crumbs.map(([n, h], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: abs(h) })) });
    graph.push(...(pg.jsonld || []));
    const faq = [...body.matchAll(/<details class="fq"><summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)];
    if (faq.length) graph.push({ "@type": "FAQPage", "@id": url + "#faq", mainEntity: faq.map((m) =>
      ({ "@type": "Question", name: plain(m[1]), acceptedAnswer: { "@type": "Answer", text: plain(m[2]) } })) });
  }
  const img = abs(pg.image || "/assets/og.png");
  const head = [
    `<title>${esc(pg.title)}</title>`,
    `<meta name="description" content="${esc(pg.description)}">`,
    pg.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`,
    `<meta property="og:title" content="${esc(pg.title)}">`,
    `<meta property="og:description" content="${esc(pg.description)}">`,
    '<meta property="og:locale" content="fr_FR">',
    `<meta property="og:type" content="${pg.jsonld?.[0]?.["@type"] === "Article" ? "article" : "website"}">`,
    ...(pg.noindex ? [] : [`<meta property="og:url" content="${url}">`]),
    `<meta property="og:image" content="${img}">`,
    ...(pg.image ? [`<link rel="preload" as="image" href="${pg.image}" fetchpriority="high">`] : []),
    jsonld(graph),
  ].join("\n");
  const html = fill(ptpl, { ...shell, "@@HEAD@@": head, "@@BREADCRUMB@@": bc, "@@CONTENT@@": body.trim() });
  out.set(pg.path.endsWith("/") ? pg.path.slice(1) + "index.html" : pg.path.slice(1), html);
}

// --- robots.txt, sitemap.xml, llms.txt (dérivés de site.json) -----------------------------
const indexable = [
  { path: site.home.fr.path, h: `${site.name} (français)`, description: site.home.fr.description, llms: "Accueil", alt: true },
  { path: site.home.en.path, h: `${site.name} (English)`, description: site.home.en.description, llms: "Accueil", alt: true },
  ...site.pages.filter((p) => !p.noindex),
];
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${abs("/sitemap.xml")}\n`;
const alts = ["fr", "en"].map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(site.home[l].path)}"/>`)
  .concat(`<xhtml:link rel="alternate" hreflang="x-default" href="${abs(site.home.fr.path)}"/>`).join("");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${
  indexable.map((p) => `<url><loc>${abs(p.path)}</loc>${p.alt ? alts : ""}</url>`).join("\n")}\n</urlset>\n`;
const groups = new Map();
for (const p of indexable) if (p.llms) groups.set(p.llms, [...(groups.get(p.llms) || []), p]);
const apps = site.pages.flatMap((p) => (p.jsonld || []).filter((j) => j["@type"] === "SoftwareApplication").map((j) => ({ h: j.name, url: j.url })));
const llms = [
  `# ${site.name}`, "", `> ${site.summary}`, "", site.contactLine, "",
  ...[...groups].flatMap(([g, ps]) => [`## ${g}`, "", ...ps.map((p) => `- [${p.h}](${abs(p.path)}): ${p.description}`), ""]),
  "## Applications", "", ...apps.map((a) => `- [${a.h}](${a.url})`), "",
  "## Liens", "", ...site.graph.filter((g) => g["@type"] === "Blog").map((g) => `- [${g.name}](${g.url}): blog du groupe`),
  ...site.organization.sameAs.map((u) => `- [${new URL(u).hostname}](${u})`), "",
].join("\n");

// --- Écriture -------------------------------------------------------------------------------
const left = [...out.values()].join("").match(/@@[A-Z_]+@@/g);
if (left) throw new Error(`Placeholders non remplacés : ${[...new Set(left)].join(", ")}`);

await rm(dist, { recursive: true, force: true });
for (const [f, html] of [...out, ["robots.txt", robots], ["sitemap.xml", sitemap], ["llms.txt", llms]]) {
  await mkdir(path.dirname(path.join(dist, f)), { recursive: true });
  await writeFile(path.join(dist, f), html);
}
await cp(path.join(src, "assets"), path.join(dist, "assets"), { recursive: true });
await cp(path.join(src, "_headers"), path.join(dist, "_headers")); // en-têtes HTTP de l'hébergeur (voir docs/decisions/adr-0001-hebergement.md)
console.log(`dist/ : ${out.size} pages HTML, ${indexable.length} URL au sitemap, ${translated} textes traduits pour /en/`);
if (legalMissing.length) console.warn(`À compléter dans src/site.json (mentions légales) : ${legalMissing.join(", ")}`);
