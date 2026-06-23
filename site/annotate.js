/* Generation Faraday — review/annotation overlay.
   Shows a top bar; toggle "Annotate" then click anywhere to drop a numbered pin
   with a note. Pins are saved server-side (/api/annotations) so anyone who logs
   in sees them. The whole site sits behind Basic Auth, so all viewers are trusted. */
(function () {
  if (window.__gfAnnotate) return; window.__gfAnnotate = true;
  var PAGE = location.pathname.replace(/index\.html$/, '') || '/';
  var API = '/api/annotations';
  var items = [];
  var mode = false;
  var author = localStorage.getItem('gf_author') || '';

  // ---------- styles ----------
  var css = document.createElement('style');
  css.textContent = `
  #gfbar{position:fixed;top:0;left:0;right:0;height:46px;background:#0E0E0E;color:#fff;
    display:flex;align-items:center;gap:14px;padding:0 16px;z-index:2147483000;
    font:600 13px/1 "Poppins",system-ui,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.25)}
  #gfbar .gf-logo{font-weight:800;letter-spacing:-.01em}
  #gfbar .gf-tag{background:#E04A2C;color:#fff;font-size:10px;padding:3px 7px;border-radius:999px;text-transform:uppercase;letter-spacing:.08em}
  #gfbar button{font:inherit;cursor:pointer;border:0;border-radius:7px;padding:8px 12px;color:#fff;background:#2a2a2a}
  #gfbar button:hover{background:#3a3a3a}
  #gfbar button.on{background:#E04A2C}
  #gfbar .gf-sp{margin-left:auto;display:flex;gap:10px;align-items:center}
  #gfbar .gf-count{color:#bdbdbd;font-weight:600}
  body.gf-push{padding-top:46px!important}
  body.gf-annotate, body.gf-annotate *{cursor:crosshair!important}
  #gflayer{position:absolute;top:0;left:0;width:100%;z-index:2147482000;pointer-events:none}
  .gfpin{position:absolute;transform:translate(-50%,-100%);pointer-events:auto;cursor:pointer;
    width:28px;height:28px;border-radius:50% 50% 50% 2px;background:#E04A2C;color:#fff;
    display:flex;align-items:center;justify-content:center;font:700 13px "Poppins",sans-serif;
    box-shadow:0 3px 8px rgba(0,0,0,.35);border:2px solid #fff;rotate:45deg}
  .gfpin span{rotate:-45deg}
  .gfpin.done{background:#3a9d4b}
  #gfpanel{position:fixed;top:46px;right:0;width:330px;max-width:90vw;bottom:0;background:#fff;
    z-index:2147482500;box-shadow:-6px 0 24px rgba(0,0,0,.18);transform:translateX(100%);
    transition:transform .2s;display:flex;flex-direction:column;font-family:"Poppins",system-ui,sans-serif}
  #gfpanel.open{transform:none}
  #gfpanel header{padding:14px 16px;border-bottom:1px solid #eee;font-weight:800;display:flex;align-items:center;color:#0E0E0E}
  #gfpanel header button{margin-left:auto;background:none;border:0;font-size:20px;cursor:pointer;color:#888}
  #gflist{overflow:auto;padding:8px;flex:1}
  .gfcard{border:1px solid #eee;border-radius:10px;padding:11px 12px;margin:8px 4px;font-size:13px;color:#333}
  .gfcard.done{opacity:.55}
  .gfcard .num{display:inline-block;background:#E04A2C;color:#fff;width:20px;height:20px;border-radius:50%;text-align:center;line-height:20px;font-weight:700;font-size:11px;margin-right:6px}
  .gfcard.done .num{background:#3a9d4b}
  .gfcard .meta{color:#999;font-size:11px;margin:6px 0}
  .gfcard .row{display:flex;gap:8px;margin-top:6px}
  .gfcard .row button{font:600 11px "Poppins";border:0;border-radius:6px;padding:5px 9px;cursor:pointer;background:#f0f0f0;color:#333}
  .gfcard .row button.del{background:#fdecec;color:#c0392b}
  .gfempty{color:#999;font-size:13px;text-align:center;padding:30px 16px}
  #gfpop{position:absolute;z-index:2147483600;width:260px;background:#fff;border-radius:12px;
    box-shadow:0 12px 40px rgba(0,0,0,.28);padding:14px;font-family:"Poppins",system-ui,sans-serif;display:none}
  #gfpop textarea{width:100%;height:74px;border:1px solid #ddd;border-radius:8px;padding:8px;font:13px "Poppins";resize:vertical;box-sizing:border-box}
  #gfpop .pr{display:flex;gap:8px;justify-content:flex-end;margin-top:10px}
  #gfpop button{font:600 12px "Poppins";border:0;border-radius:7px;padding:8px 13px;cursor:pointer}
  #gfpop .save{background:#E04A2C;color:#fff}
  #gfpop .cancel{background:#eee;color:#444}
  `;
  document.head.appendChild(css);

  // ---------- bar ----------
  var bar = document.createElement('div'); bar.id = 'gfbar';
  bar.innerHTML = '<span class="gf-logo">Generation Faraday</span><span class="gf-tag">Review</span>'
    + '<button id="gftoggle">📍 Annotate</button>'
    + '<div class="gf-sp"><span class="gf-count" id="gfcount"></span>'
    + '<button id="gfwho"></button><button id="gflistbtn">Notes</button></div>';
  document.body.appendChild(bar);
  document.body.classList.add('gf-push');

  var layer = document.createElement('div'); layer.id = 'gflayer'; document.body.appendChild(layer);
  var panel = document.createElement('div'); panel.id = 'gfpanel';
  panel.innerHTML = '<header>Page notes<button id="gfclose">×</button></header><div id="gflist"></div>';
  document.body.appendChild(panel);
  var pop = document.createElement('div'); pop.id = 'gfpop'; document.body.appendChild(pop);

  var $ = function (id) { return document.getElementById(id); };
  function docH() { var d = document.documentElement, b = document.body; return Math.max(d.scrollHeight, b.scrollHeight, d.offsetHeight); }
  function docW() { return document.documentElement.clientWidth; }
  function setWho() { $('gfwho').textContent = author ? ('👤 ' + author) : 'Set name'; }

  function api(method, body) {
    return fetch(API, { method: method, headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined }).then(function (r) { return r.json(); });
  }
  function mine() { return items.filter(function (a) { return (a.page || '/') === PAGE; }); }

  // ---------- render ----------
  function render() {
    layer.style.height = docH() + 'px';
    layer.innerHTML = '';
    var list = mine();
    list.forEach(function (a, i) {
      var pin = document.createElement('div');
      pin.className = 'gfpin' + (a.done ? ' done' : '');
      pin.style.left = (a.x * docW()) + 'px';
      pin.style.top = (a.y * docH()) + 'px';
      pin.innerHTML = '<span>' + (i + 1) + '</span>';
      pin.onclick = function (e) { e.stopPropagation(); openPop(pin.style.left, pin.style.top, a); };
      layer.appendChild(pin);
    });
    var open = list.filter(function (a) { return !a.done; }).length;
    $('gfcount').textContent = list.length ? (open + ' open / ' + list.length + ' on this page') : 'No notes yet';
    renderPanel(list);
  }
  function renderPanel(list) {
    var box = $('gflist');
    if (!list.length) { box.innerHTML = '<div class="gfempty">No notes on this page.<br>Click <b>Annotate</b>, then click anywhere to add one.</div>'; return; }
    box.innerHTML = '';
    list.forEach(function (a, i) {
      var c = document.createElement('div'); c.className = 'gfcard' + (a.done ? ' done' : '');
      c.innerHTML = '<div><span class="num">' + (i + 1) + '</span>' + esc(a.note || '(no text)') + '</div>'
        + '<div class="meta">' + (a.author ? esc(a.author) + ' · ' : '') + when(a.created) + '</div>'
        + '<div class="row"><button data-a="done">' + (a.done ? 'Reopen' : 'Resolve') + '</button>'
        + '<button data-a="del" class="del">Delete</button></div>';
      c.querySelector('[data-a=done]').onclick = function () { toggle(a); };
      c.querySelector('[data-a=del]').onclick = function () { del(a); };
      box.appendChild(c);
    });
  }
  function esc(s) { return (s || '').replace(/[&<>]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]; }); }
  function when(s) { try { return new Date(s).toLocaleString(); } catch (e) { return ''; } }

  // ---------- popup (new + view) ----------
  var pending = null;
  function openPop(left, top, existing) {
    pending = existing || null;
    pop.style.left = (parseFloat(left) + 16) + 'px';
    pop.style.top = (parseFloat(top) + window.scrollY * 0) + 'px';
    // position popup near pin using page coords
    pop.style.left = Math.min(parseFloat(left) + 16, docW() - 280) + 'px';
    pop.style.top = (parseFloat(top) + 6) + 'px';
    if (existing) {
      pop.innerHTML = '<div style="font-size:12px;color:#999;margin-bottom:6px">'
        + (existing.author ? esc(existing.author) + ' · ' : '') + when(existing.created) + '</div>'
        + '<div style="font-size:14px;color:#222;white-space:pre-wrap">' + esc(existing.note || '(no text)') + '</div>'
        + '<div class="pr"><button class="cancel" id="gfx">Close</button>'
        + '<button class="save" id="gfres">' + (existing.done ? 'Reopen' : 'Resolve') + '</button></div>';
      $('gfx').onclick = hidePop; $('gfres').onclick = function () { toggle(existing); hidePop(); };
    } else {
      pop.innerHTML = '<textarea id="gftext" placeholder="What needs to change here? e.g. swap this photo"></textarea>'
        + '<div class="pr"><button class="cancel" id="gfx">Cancel</button><button class="save" id="gfsave">Save</button></div>';
      $('gfx').onclick = function () { hidePop(); cancelDraft(); };
      $('gfsave').onclick = saveDraft;
      setTimeout(function () { $('gftext').focus(); }, 30);
    }
    pop.style.display = 'block';
  }
  function hidePop() { pop.style.display = 'none'; }

  var draft = null;
  function startDraft(pageX, pageY) {
    draft = { x: pageX / docW(), y: pageY / docH() };
    openPop(pageX + 'px', pageY + 'px', null);
  }
  function cancelDraft() { draft = null; render(); }
  function saveDraft() {
    if (!draft) return;
    var note = ($('gftext') && $('gftext').value || '').trim();
    api('POST', { page: PAGE, x: draft.x, y: draft.y, note: note, author: author })
      .then(function (it) { if (it && it.id) items.push(it); draft = null; hidePop(); render(); });
  }
  function toggle(a) { api('PATCH', { id: a.id, done: !a.done }).then(function () { a.done = !a.done; render(); }); }
  function del(a) { if (!confirm('Delete this note?')) return; api('DELETE', { id: a.id }).then(function () { items = items.filter(function (x) { return x.id !== a.id; }); render(); }); }

  // ---------- events ----------
  $('gftoggle').onclick = function () {
    mode = !mode; this.classList.toggle('on', mode);
    document.body.classList.toggle('gf-annotate', mode);
    this.textContent = mode ? '📍 Click to place…' : '📍 Annotate';
  };
  $('gfwho').onclick = function () {
    var n = prompt('Your name (shown on notes you add):', author || '');
    if (n !== null) { author = n.trim(); localStorage.setItem('gf_author', author); setWho(); }
  };
  $('gflistbtn').onclick = function () { panel.classList.toggle('open'); };
  $('gfclose').onclick = function () { panel.classList.remove('open'); };

  document.addEventListener('click', function (e) {
    if (!mode) return;
    if (e.target.closest('#gfbar,#gfpanel,#gfpop,.gfpin')) return;
    if (!author) { var n = prompt('Your name (shown on notes):', ''); if (n) { author = n.trim(); localStorage.setItem('gf_author', author); setWho(); } }
    e.preventDefault();
    startDraft(e.pageX, e.pageY);
  }, true);

  window.addEventListener('resize', function () { clearTimeout(window.__gfr); window.__gfr = setTimeout(render, 150); });
  window.addEventListener('load', function () { setTimeout(render, 300); });

  // ---------- boot ----------
  setWho();
  api('GET').then(function (data) { items = Array.isArray(data) ? data : []; render(); })
    .catch(function () { $('gfcount').textContent = 'offline'; });
})();
