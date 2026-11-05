// Génère dist/ depuis src/ : hélices binaires, orbites, dictionnaire FR/EN et moteur injectés dans le template.
// Déterministe (graine fixe) : deux builds successifs produisent le même dist/.
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

const read = (f) => readFile(path.join(src, f), "utf8");
let html = await read("index.tpl.html");
const r = rng(7);
const rep = {
  "@@HX_HERO@@": helix(r, "hxh", 34, 17, 46, 16, "#7F2044", "#138F8D"),
  "@@HX_DIV@@": helix(r, "hxd", 80, 17, 22, 12, "#7F2044", "#138F8D"),
  "@@HX_NEXT@@": helix(r, "hxn", 24, 20, 52, 18, "#7F2044", "#138F8D"),
  "@@HX_CTA@@": helix(r, "hxc", 40, 19, 70, 18, "rgba(255,255,255,.9)", "#E7A2B6"),
  "@@HX_FOOT@@": helix(r, "hxf", 60, 17, 18, 12, "#7F2044", "#138F8D"),
};
for (const [k, v] of Object.entries(rep)) html = html.split(k).join(v);
for (let i = 1; i <= 4; i++) html = html.replace("@@ORB@@", orbits(i));

const i18n = JSON.parse(await read("i18n.json"));
const js = `var I18N=${JSON.stringify(i18n)};\n${await read("lang.js")}\n${await read("car.js")}\n${await read("fx.js")}`;
html = html.replace("@@FX@@", () => js);

const left = html.match(/@@[A-Z_]+@@/g);
if (left) throw new Error(`Placeholders non remplacés : ${[...new Set(left)].join(", ")}`);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await writeFile(path.join(dist, "index.html"), html);
await cp(path.join(src, "assets"), path.join(dist, "assets"), { recursive: true });
console.log(`dist/index.html : ${html.length} caractères, ${Object.keys(i18n).length} chaînes FR/EN`);
