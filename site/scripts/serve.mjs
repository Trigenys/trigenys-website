// Serveur statique minimal pour dist/ (aperçu local et CI). Usage : node scripts/serve.mjs [--host H] [--port P]
// Les réponses texte sont compressées (brotli, sinon gzip) comme le fera l'hébergeur : les mesures
// Lighthouse de la CI portent ainsi sur les octets réellement transférés en production.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { brotliCompressSync, gzipSync, constants } from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const host = opt("--host", "127.0.0.1");
const port = Number(opt("--port", "4173"));
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".txt": "text/plain",
  ".woff2": "font/woff2", ".woff": "font/woff", ".xml": "application/xml", ".webmanifest": "application/manifest+json" };
const compressible = new Set([".html", ".js", ".css", ".json", ".svg", ".txt", ".xml", ".webmanifest"]);

// Lecture de dist/_headers (format Cloudflare Pages) : règles « /motif » suivies de lignes « En-tête: valeur » ;
// « ! En-tête » retire la valeur héritée des règles précédentes. Motifs : « * » (tout), « :nom » (un segment).
function parseHeaderRules(text) {
  const rules = []; let cur = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trimEnd();
    if (!line.trim()) continue;
    if (!/^\s/.test(line)) {
      const re = new RegExp("^" + line.trim().replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/:[a-z]+/g, "[^/]+") + "$");
      cur = { re, set: [] }; rules.push(cur);
    } else if (cur) {
      const m = line.trim().match(/^(!?)\s*([A-Za-z0-9-]+)(?::\s*(.*))?$/);
      if (m) cur.set.push({ unset: m[1] === "!", name: m[2].toLowerCase(), value: m[3] ?? "" });
    }
  }
  return rules;
}
const headerRules = parseHeaderRules(await readFile(path.join(dist, "_headers"), "utf8").catch(() => ""));
function hostHeaders(p) {
  const out = {};
  for (const r of headerRules) if (r.re.test(p)) for (const h of r.set) {
    if (h.unset) delete out[h.name]; else out[h.name] = out[h.name] ? `${out[h.name]}, ${h.value}` : h.value;
  }
  return out;
}

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const file = path.join(dist, path.normalize(p));
    if (!file.startsWith(dist)) { res.writeHead(403); return res.end(); }
    const s = await stat(file).catch(() => null);
    if (!s || !s.isFile()) { res.writeHead(404, { "content-type": "text/plain" }); return res.end("404"); }
    const ext = path.extname(file);
    const headers = { "content-type": types[ext] || "application/octet-stream", "cache-control": "no-cache", "vary": "accept-encoding", ...hostHeaders(p) };
    let body = await readFile(file);
    const accept = String(req.headers["accept-encoding"] || "");
    if (compressible.has(ext) && body.length > 1024) {
      if (/\bbr\b/.test(accept)) { body = brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 5 } }); headers["content-encoding"] = "br"; }
      else if (/\bgzip\b/.test(accept)) { body = gzipSync(body, { level: 6 }); headers["content-encoding"] = "gzip"; }
    }
    headers["content-length"] = body.length;
    res.writeHead(200, headers);
    res.end(body);
  } catch (e) { res.writeHead(500); res.end(String(e)); }
}).listen(port, host, () => console.log(`http://${host}:${port}/`));
