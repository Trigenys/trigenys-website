import random, re, sys, pathlib
random.seed(7)
ROOT = pathlib.Path(__file__).parent
T = 7.0  # seconds per helix turn
def helix(cls, n, step, amp, size, c1, c2, w=None, h=None):
    w = w or (n - 1) * step + size * 2
    h = h or amp * 2 + size * 2
    cy = h / 2
    out = [f'<svg class="hx {cls}" viewBox="0 0 {w} {h}" width="{w}" height="{h}" aria-hidden="true" style="--a:{amp}px">']
    for s, (col, off) in enumerate(((c1, 0), (c2, T / 2))):
        for i in range(n):
            x = size + i * step
            d = -(i * T / 12 + off)
            ch = random.choice('01')
            out.append(f'<text x="{x}" y="{cy}" fill="{col}" font-size="{size}" style="animation-delay:{d:.2f}s">{ch}</text>')
    out.append('</svg>')
    return ''.join(out)

src = (ROOT / 'v7.tpl.html').read_text(encoding='utf-8')
rep = {
    '@@HX_HERO@@': helix('hxh', 34, 17, 46, 16, '#7F2044', '#138F8D'),
    '@@HX_DIV@@': helix('hxd', 80, 17, 22, 12, '#7F2044', '#138F8D'),
    '@@HX_NEXT@@': helix('hxn', 24, 20, 52, 18, '#7F2044', '#138F8D'),
    '@@HX_CTA@@': helix('hxc', 40, 19, 70, 18, 'rgba(255,255,255,.9)', '#E7A2B6'),
    '@@HX_FOOT@@': helix('hxf', 60, 17, 18, 12, '#7F2044', '#138F8D'),
}
for k, v in rep.items():
    src = src.replace(k, v)
src = src.replace('@@FX@@', (ROOT / 'fx.js').read_text(encoding='utf-8'))

# vh units -> container-aware variable (set by the engine; falls back to the viewport)
head, sep, tail = src.partition('</helmet>')
head = re.sub(r'(\d+(?:\.\d+)?)vh\b', lambda m: f'calc(var(--vh,100vh)*{m.group(1)}/100)', head)
# mobile rules also apply when the root is narrow (.m), whatever the viewport
mm = re.search(r'@media \(max-width:900px\)\{(.*?)\n\}', head, flags=re.S)
if mm:
    rules = re.findall(r'([^{}]+)\{([^{}]*)\}', mm.group(1))
    def pre(sel):
        sel = sel.strip()
        if sel.startswith('.t.js '): return '.t.m.js ' + sel[6:]
        if sel.startswith('.t '): return '.t.m ' + sel[3:]
        if sel.startswith('.t'): return sel.replace('.t', '.t.m', 1)
        return '.t.m ' + sel
    dup = ''.join(','.join(pre(s) for s in sel.split(',')) + '{' + body + '}' for sel, body in rules)
    head = head.replace(mm.group(0), mm.group(0) + '\n' + dup)
src = head + sep + tail
(ROOT / 'project' / 'V7-Accueil.dc.html').write_text(src, encoding='utf-8')

# Static "déroulé" variant: no sticky rail, no scroll-driven motion, panels stacked.
static_css = '<style>.rail{height:auto!important}.rail .stick{position:static!important;height:auto!important}.rail .track{width:auto!important;flex-direction:column!important;animation:none!important}.rail .pnl{width:100%!important;height:900px!important}.ly,.rv{animation:none!important;opacity:1!important;transform:none!important}.nav{position:static!important}</style>'
no_fx = src.replace('componentDidMount() { v7init(); }', '')
(ROOT / 'project' / 'V7-Accueil-Deroule.dc.html').write_text(
    no_fx.replace('</helmet>', static_css + '</helmet>').replace('Accueil v7</title>', 'Accueil v7 (déroulé)</title>').replace('"$preview":{"width":1440,"height":900}','"$preview":{"width":1440,"height":9900}'), encoding='utf-8')

# Local preview copies with local assets
blobs = {
 'c781a3c7cdb9dead380c3e5ee4a45665': 'am-dashboard.png', 'c043b31dc19fa837a895879e4077cd4b': 'am-workshop.png',
 '6e5d9049cec46e6bc087515b935c333c': 'am-mobile.jpg', '0bec717c0481dfc4fde4a4f311337f47': 'am-icon.png',
 'c008d8533ff08d2ffe7041fc19c21921': 'cf-logo.png', 'efa917b83a1b16dff22402eb191a46c5': 'cf-04.webp',
 '5c4d92171378f4a0241f823c0bc483b1': 'cf-theme.webp', '5e0d338552fa0ba154620eebc04b339f': 'pt-logo.png',
 '38e2db0eb567289d61a0abe278f35dd0': 'pt-share.png', '9cb8472360e8e3fd892929d7358a03fa': 'logo.png',
 'bc607b87c6b4dbe4fe5cd7ddbabb885e': 'logo-inv.png'}
def preview(s):
    s = s.replace('<script src="./support.js"></script>', '<meta name="viewport" content="width=device-width,initial-scale=1">')
    s = re.sub(r'</?x-dc>|</?helmet>', '', s)
    s = re.sub(r'<script type="text/x-dc"[^>]*>(.*?)class Component extends DCLogic.*?</script>',
               lambda m: '<script>' + m.group(1) + ('document.addEventListener("DOMContentLoaded", v7init);' if 'v7init' in m.group(0) else '') + '</script>', s, flags=re.S)
    for b, f in blobs.items():
        s = s.replace(f'/_blob/{b}', f'dl/{f}')
    return s
pv = preview(src)
(ROOT / 'preview' / 'v7.html').write_text(pv, encoding='utf-8')
(ROOT / 'preview' / 'v7d.html').write_text(preview(no_fx.replace('</helmet>', static_css + '</helmet>')), encoding='utf-8')

# Container mode test: the page inlined inside fixed-size scrolling boxes (like the canvas boards)
body = re.search(r'(<div class="t">.*</div>)\s*<script>', pv, flags=re.S).group(1)
styles = ''.join(re.findall(r'<style>.*?</style>', pv, flags=re.S))
script = [s for s in re.findall(r'<script>.*?</script>', pv, flags=re.S) if 'v7fx' in s][0]
fonts = ''.join(re.findall(r'<link[^>]+>', pv))
(ROOT / 'preview' / 'w7.html').write_text('<!doctype html><meta charset="utf-8"><title>w7</title>' + fonts + styles +
 '<style>html,body{margin:0;background:#ddd}.box{overflow:auto;position:relative;background:#FCFAFB;margin:40px;outline:1px solid #999}</style>'
 + '<div class="box" id="d" style="width:1440px;height:900px">' + body + '</div>'
 + '<div class="box" id="m" style="width:390px;height:844px">' + body + '</div>' + script, encoding='utf-8')
print('ok', len(src))
