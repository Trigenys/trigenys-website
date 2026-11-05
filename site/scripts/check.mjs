// Contrôles de non-régression sur dist/ (sans navigateur) : contrats que le build doit toujours tenir.
import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const html = await readFile(path.join(dist, "index.html"), "utf8");
const i18n = JSON.parse(await readFile(path.join(root, "src", "i18n.json"), "utf8"));
const fails = [];
const must = (cond, msg) => { if (!cond) fails.push(msg); };

must(!/@@[A-Z_]+@@/.test(html), "placeholder @@…@@ résiduel");
must(!html.includes("/_blob/"), "référence /_blob/ du canevas résiduelle");
must(!html.includes("support.js") && !html.includes("<x-dc>") && !html.includes("<helmet>"), "balisage du canevas résiduel");
must(html.includes("var I18N="), "dictionnaire I18N absent");
must(html.includes("function v7fx(") && html.includes("function v7lang("), "moteur ou bascule de langue absents");
must(html.includes("function v7car(") && html.includes("v7car(r)"), "carrousel du hero absent ou non initialisé");
must((html.match(/class="sl[^"]*" data-name=/g) || []).length === 4 && html.includes('class="dots" role="tablist"'), "carrousel : quatre diapos et une barre de points attendues");
must(html.includes('DOMContentLoaded", v7init'), "amorçage v7init absent");
must(/<html lang="fr">/.test(html), "lang racine");
must(/<meta name="viewport"/.test(html), "meta viewport");
must(/<meta name="description"/.test(html), "meta description");
must((html.match(/class="lng/g) || []).length === 2, "deux boutons de langue attendus (desktop + mobile)");
must((html.match(/<svg class="orb"/g) || []).length === 4, "4 orbites attendues");
must((html.match(/<svg class="hx /g) || []).length === 5, "5 hélices attendues");
must(!/<img[^>]+src="https?:/.test(html), "image externe interdite (visual-qa)");
must(!/fonts\.(googleapis|gstatic)\.com/.test(html), "police externe interdite : auto-hébergement attendu");
for (const [k, v] of Object.entries(i18n)) {
  must(typeof v === "string" && v.trim(), `traduction vide pour « ${k} »`);
  must(v !== k || /^[A-Z0-9 /·&]+$|^(Garages|SAV|WhatsApp)/.test(k), `traduction identique au français pour « ${k} »`);
}
const refs = [...html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)].map((m) => m[1]);
for (const r of new Set(refs)) await access(path.join(dist, r)).catch(() => fails.push(`asset manquant : ${r}`));

if (fails.length) { console.error("ÉCHEC\n- " + fails.join("\n- ")); process.exit(1); }
console.log(`OK : ${new Set(refs).size} assets, ${Object.keys(i18n).length} chaînes, contrats du build respectés`);
