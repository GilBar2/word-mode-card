(function(){
const root = document.getElementById('wm-root');
root.innerHTML = "<style>\n.wm{--c:#1c1c1c;--i:#e4e4e4;--m:#8a8a86;--l:#3a3a3a;--k:#2a2a2a;--h:#f2f2f2;--b:#85B7EB;--g:#97C459;--y:#FAC775;--r:#F09595;font-family:var(--font-mono);font-size:13px;line-height:1.8;color:var(--i)}\n.wm.lt{--c:#ffffff;--i:#1d1c1a;--m:#6f6c66;--l:#e4e1da;--k:#f1efea;--h:#111110;--b:#185FA5;--g:#3B6D11;--y:#854F0B;--r:#A32D2D}\n.wm .pn{background:var(--c);border:1px solid var(--l);border-radius:14px;padding:14px 18px}\n.wm .b{color:var(--b)}.wm .g{color:var(--g)}.wm .y{color:var(--y)}.wm .r{color:var(--r)}.wm .m{color:var(--m)}.wm .w{font-weight:500;color:var(--h)}\n.wm .ln{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.wm .lb{width:92px;flex:none}\n.wm .t{color:var(--m);padding-left:8px}\n.wm .k{background:none;border:0;padding:0;height:auto;font:inherit;color:inherit;cursor:pointer}.wm .k:hover{text-decoration:underline}\n.wm .st{background:var(--c);border:1px solid var(--l);border-radius:6px;padding:0 7px;height:22px;font:inherit;color:var(--i);cursor:pointer}\n.wm input[type=number]{width:56px;height:22px;background:var(--k);border:1px solid var(--l);border-radius:6px;color:var(--b);font:inherit;text-align:center;padding:0}\n.wm .bar{display:inline-block;width:100px;height:10px;background:repeating-linear-gradient(90deg,var(--l) 0 3px,var(--k) 3px 5px);position:relative;vertical-align:-1px}\n.wm .bar i{position:absolute;left:0;top:0;bottom:0}\n.wm .hr{border-top:1px solid var(--l);margin:8px 0}\n.wm .bt{border:1px solid var(--l);border-radius:8px;padding:5px 16px;font-family:var(--font-sans);font-size:13px;color:var(--i);background:var(--c);cursor:pointer;height:auto}\n</style>\n<div class=\"wm\" id=\"wm\">\n<div class=\"pn\">\n  <div id=\"ft\"></div>\n  <div style=\"height:8px\"></div>\n  <div class=\"ln\"><span class=\"lb\">caveman</span><button class=\"k\" role=\"switch\" id=\"cm\" aria-label=\"Caveman\"></button><span class=\"m\" id=\"cmv\"></span></div>\n  <div class=\"t\">├─ short, no-fluff replies · this chat: <span id=\"cmp\"></span></div>\n  <div class=\"t\"><span class=\"y\">└─ turning caveman on or off only affects new chats</span></div>\n  <div class=\"ln\"><span class=\"lb\">word limit</span><button class=\"k\" role=\"switch\" id=\"wl\" aria-label=\"Word limit\"></button>\n    <span id=\"wlo\" style=\"display:inline-flex;gap:6px;align-items:center\"><button class=\"st\" id=\"dn\" aria-label=\"10 fewer words\">−</button><input type=\"number\" id=\"n\" min=\"10\" max=\"500\" step=\"1\" aria-label=\"Words\"><button class=\"st\" id=\"up\" aria-label=\"10 more words\">+</button><span>words</span><span class=\"bar\"><i id=\"wbr\" style=\"background:var(--b)\"></i></span></span></div>\n  <div class=\"t\" id=\"st\">├─ strategy &nbsp;<button class=\"k\" data-v=\"middle\"></button> &nbsp;<button class=\"k\" data-v=\"hard\"></button></div>\n  <div class=\"t\">├─ middle aims for 80%, rewrites once · hard rewrites up to 3 times</div>\n  <div class=\"t\">└─ default for new chats · 10 to 500</div>\n  <div class=\"r\" id=\"err\" style=\"font-size:12px;padding-left:8px\"></div>\n  <div class=\"ln\"><span class=\"lb\">mode</span><span class=\"y\" id=\"mdn\"></span><span class=\"m\" id=\"mdd\"></span></div>\n  <div class=\"t\" id=\"md\">├─ <button class=\"k\" data-v=\"auto\" title=\"Claude handles permission decisions\"></button> &nbsp;<button class=\"k\" data-v=\"default\" title=\"Always ask before making changes\"></button> &nbsp;<button class=\"k\" data-v=\"acceptEdits\" title=\"Automatically accept all file edits\"></button> &nbsp;<button class=\"k\" data-v=\"plan\" title=\"Create a plan before making changes\"></button> &nbsp;<button class=\"k\" data-v=\"bypassPermissions\" title=\"Accepts all permissions\"></button></div>\n  <div class=\"t\">└─ this chat, right away</div>\n  <div class=\"ln\"><span class=\"lb\">agent cap</span><span id=\"acs\"></span><span class=\"bar\" id=\"acb\"><i id=\"acf\" style=\"background:var(--b)\"></i></span></div>\n  <div class=\"t\" id=\"act\"></div>\n  <div class=\"hr\"></div>\n  <div class=\"m\"><span class=\"g\">▶ on</span> <span class=\"r\">○ off</span> ● picked · opened <span id=\"at\"></span> UTC</div>\n  <div id=\"fb\" style=\"display:none;margin-top:8px;border:1px solid var(--l);border-radius:8px;padding:8px 10px\">\n    <div class=\"m\" style=\"font-size:12px\" id=\"fbm\">If nothing was sent, copy this and send it as a message:</div>\n    <div style=\"display:flex;gap:8px;align-items:center\"><code id=\"cmd\" class=\"b\" style=\"flex:1;font-size:12px;user-select:all;word-break:break-all\"></code>\n      <button class=\"bt\" id=\"cp\" style=\"padding:2px 10px\">Copy</button></div>\n  </div>\n</div>\n<div style=\"display:flex;gap:10px;margin-top:10px\"><button class=\"bt\" id=\"ap\">Apply &#8599;</button><button class=\"bt\" id=\"th\">Light</button></div>\n</div>";
const S = window.WM_STATE;
const $ = id => document.getElementById(id);
const st = { cm: S.caveman === 'on', wl: S.wordLimit === 'on', n: S.limit, s: S.strategy, md: S.mode };
const names = { auto: 'auto', default: 'manual', acceptEdits: 'accept edits', plan: 'plan', bypassPermissions: 'bypass' };
const descs = { auto: 'Claude decides', default: 'Always asks', acceptEdits: 'Edits auto-OK', plan: 'Plan first', bypassPermissions: 'No prompts' };
const AC = S.agentcap || { state: 'none' };
const onoff = (on, c) => on ? '<span class="' + c + '">▶ on</span>' : '<span class="r">○ off</span>';
function capLine() {
  if (AC.state === 'on') return '<span class="b">' + AC.spent + '/' + AC.cap + '</span>';
  if (AC.state === 'legacy') return '<span class="r">old cap ' + AC.spent + '/' + AC.cap + '</span>';
  if (AC.state === 'broken') return '<span class="r">broken cap file</span>';
  return '<span class="m">no cap</span>';
}
function drawCap() {
  const on = AC.state === 'on' || AC.state === 'legacy';
  $('acs').innerHTML = AC.state === 'on' ? '<span class="b">▶ ' + AC.spent + '/' + AC.cap + '</span>' : AC.state === 'legacy' ? '<span class="r">▶ ' + AC.spent + '/' + AC.cap + ' old</span>' : AC.state === 'broken' ? '<span class="r">✗ broken</span>' : '<span class="r">○ off</span>';
  $('acb').style.display = on ? 'inline-block' : 'none';
  if (on) { $('acf').style.width = Math.min(100, Math.round(100 * AC.spent / Math.max(1, AC.cap))) + '%'; $('acf').style.background = AC.state === 'legacy' || AC.spent >= AC.cap ? 'var(--r)' : 'var(--b)'; }
  $('act').innerHTML = AC.state === 'legacy' ? '<span class="r">└─ blocks agents in every session · say "end the cap" to clear it</span>' : AC.state === 'broken' ? '<span class="r">└─ blocks all agents · say "end the cap" to clear it</span>' : AC.state === 'on' ? '└─ this session · status only' : '└─ type /agent-cap N to set one · status only';
}
function draw() {
  $('cm').setAttribute('aria-checked', st.cm); $('cm').innerHTML = onoff(st.cm, 'g');
  $('cmv').textContent = S.cavemanVersion ? 'v' + S.cavemanVersion : '';
  $('cmp').innerHTML = S.cavemanThisChat === 'none' ? '<span class="m">not running</span>' : '<span class="g">' + S.cavemanThisChat + '</span>';
  $('wl').setAttribute('aria-checked', st.wl); $('wl').innerHTML = onoff(st.wl, 'b');
  $('wlo').style.opacity = st.wl ? 1 : .45;
  if (document.activeElement !== $('n')) $('n').value = Number.isFinite(st.n) ? st.n : '';
  $('wbr').style.width = (Number.isFinite(st.n) ? Math.max(0, Math.min(100, Math.round(st.n / 5))) : 0) + '%';
  document.querySelectorAll('#st button').forEach(b => { const p = b.dataset.v === st.s; b.setAttribute('aria-pressed', p); b.innerHTML = p ? '<span class="b">● ' + b.dataset.v + '</span>' : '○ ' + b.dataset.v; });
  document.querySelectorAll('#md button').forEach(b => { const p = b.dataset.v === st.md; b.setAttribute('aria-pressed', p); b.innerHTML = p ? '<span class="y">● ' + names[b.dataset.v] + '</span>' : '○ ' + names[b.dataset.v]; });
  $('mdn').textContent = '▶ ' + names[st.md]; $('mdd').textContent = descs[st.md] || '';
  $('ft').innerHTML = '<span class="w">word-mode</span>&nbsp; <span class="' + (st.cm ? 'g' : 'r') + '">caveman ' + (st.cm ? 'on' : 'off') + '</span> <span class="m">·</span> <span class="b">limit ' + (st.wl ? st.n + ' ' + st.s : 'off') + '</span> <span class="m">·</span> <span class="y">mode ' + names[st.md] + '</span> <span class="m">·</span> ' + capLine();
}
const bump = d => { const b = Number.isFinite(st.n) ? st.n : S.limit; st.n = Math.max(10, Math.min(500, Math.round(b / 10) * 10 + d)); st.wl = true; $('err').textContent = ''; draw(); };
$('cm').onclick = () => { st.cm = !st.cm; draw(); };
$('wl').onclick = () => { st.wl = !st.wl; draw(); };
$('n').oninput = () => { st.n = Math.round(Number($('n').value)); st.wl = true; $('err').textContent = ''; draw(); };
$('dn').onclick = () => bump(-10);
$('up').onclick = () => bump(10);
document.querySelectorAll('#st button').forEach(b => b.onclick = () => { st.s = b.dataset.v; st.wl = true; draw(); });
document.querySelectorAll('#md button').forEach(b => b.onclick = () => { st.md = b.dataset.v; draw(); });
$('th').onclick = () => { const l = $('wm').classList.toggle('lt'); $('th').textContent = l ? 'Dark' : 'Light'; };
$('ap').onclick = () => {
  if (st.wl && !(st.n >= 10 && st.n <= 500)) { $('err').textContent = 'Enter a limit from 10 to 500'; return; }
  const c = 'word-mode apply caveman=' + (st.cm ? 'on' : 'off') + ' wordlimit=' + (st.wl ? 'on' : 'off') + ' limit=' + st.n + ' strategy=' + st.s + ' mode=' + st.md;
  $('cmd').textContent = c;
  try { if (typeof sendPrompt !== 'function') throw 0; sendPrompt(c); } catch (e) { $('fb').style.display = 'block'; $('fbm').textContent = 'Auto-send is not available here. Copy this and send it as a message:'; }
};
$('cp').onclick = () => {
  const c = $('cmd').textContent;
  const ok = () => { $('cp').textContent = 'Copied'; };
  const sel = () => { const r = document.createRange(); r.selectNodeContents($('cmd')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); try { document.execCommand('copy'); ok(); } catch (e) { $('cp').textContent = 'Press Cmd+C'; } };
  if (navigator.clipboard) navigator.clipboard.writeText(c).then(ok, sel); else sel();
};
$('at').textContent = new Date().toISOString().slice(11, 19);
drawCap();
draw();
})();
