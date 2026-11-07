// Contrôle HTTP des fondations SEO : statuts et types de contenu servis.
// Usage : node scripts/http-check.mjs              (démarre scripts/serve.mjs sur dist/)
//         node scripts/http-check.mjs --base URL   (vérifie un site déployé, ex. https://www.trigenys.com)
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const i = args.indexOf("--base");
let base = i >= 0 ? args[i + 1].replace(/\/$/, "") : null;
let server = null;
if (!base) {
  const port = 4300 + Math.floor(Math.random() * 500);
  server = spawn(process.execPath, [path.join(root, "scripts", "serve.mjs"), "--port", String(port)], { stdio: ["ignore", "pipe", "inherit"] });
  await new Promise((ok, ko) => { server.stdout.once("data", ok); server.once("exit", (c) => ko(new Error(`serveur arrêté (${c})`))); });
  base = `http://127.0.0.1:${port}`;
}

const site = JSON.parse(await readFile(path.join(root, "src", "site.json"), "utf8"));
const fails = [];
const get = (p) => fetch(base + p, { redirect: "manual" });
async function expect(p, status, type) {
  const r = await get(p).catch((e) => ({ status: 0, headers: new Headers(), err: e }));
  const ct = r.headers.get("content-type") || "";
  if (r.status !== status) fails.push(`${p} : statut ${r.status}, attendu ${status}`);
  else if (type && !ct.startsWith(type)) fails.push(`${p} : content-type « ${ct} », attendu ${type}`);
  return r;
}

await expect("/", 200, "text/html");
await expect("/en/", 200, "text/html");
await expect("/robots.txt", 200, "text/plain");
await expect("/llms.txt", 200, "text/plain");
const sm = await expect("/sitemap.xml", 200, "application/xml");
const nf = await expect("/page-qui-n-existe-pas-" + Date.now(), 404, "text/html");
if (nf.status === 404 && !/<meta name="robots" content="noindex">/.test(await nf.text())) fails.push("404 : la page servie n'est pas la page 404 noindex");
await expect("/produits/atelier-maitre", 308);
// Chaque URL du sitemap doit répondre 200 (vérifiée sur la base testée, pas sur l'origine de production).
const locs = sm.ok ? [...(await sm.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].slice(site.origin.length)) : [];
for (const p of locs) await expect(p, 200, "text/html");

server?.kill();
if (fails.length) { console.error(`ÉCHEC HTTP (${base})\n- ` + fails.join("\n- ")); process.exit(1); }
console.log(`OK HTTP (${base}) : robots, sitemap, llms, 404 et ${locs.length} URL du sitemap`);
