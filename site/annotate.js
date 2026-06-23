/* Generation Faraday — review overlay.
   Logged-in users (see /login.html) drop pins, write notes, and comment on each
   other's notes. The Notes panel lists notes across ALL pages; clicking one jumps
   to its page and opens it. State is per-user via /api/app. */
(function () {
  if (window.__gfA) return; window.__gfA = true;
  var PAGE = location.pathname.replace(/index\.html$/, '') || '/';
  var me = null, notes = [], comments = [], mode = false;

  function api(action, body) {
    return fetch('/api/app?action=' + action, {
      method: body ? 'POST' : 'GET',
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
    }).then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); });
  }
  function esc(s) { return (s || '').replace(/[&<>]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]; }); }
  function when(s) { try { return new Date(s).toLocaleString(); } catch (e) { return ''; } }
  function $(id) { return document.getElementById(id); }
  function docH() { var d = document.documentElement, b = document.body; return Math.max(d.scrollHeight, b.scrollHeight, d.offsetHeight); }
  function docW() { return document.documentElement.clientWidth; }
  function onPage(n) { return (n.page || '/') === PAGE; }
  function commentsOf(id) { return comments.filter(function (c) { return c.noteId === id; }).sort(function (a, b) { return a.created < b.created ? -1 : 1; }); }
  function canEdit(o) { return me && (o.authorId === me.id || me.role === 'admin'); }
  function prettyPage(p) { if (p === '/') return 'Home'; return p.replace(/^\//, '').replace(/\.html$/, '').replace(/\/$/, '') || 'Home'; }

  // ---------- styles ----------
  var css = document.createElement('style');
  css.textContent = `
  #gfbar{position:fixed;top:0;left:0;right:0;height:46px;background:#0E0E0E;color:#fff;display:flex;align-items:center;gap:12px;padding:0 14px;z-index:2147483000;font:600 13px/1 "Poppins",system-ui,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.25)}
  #gfbar .gf-logo{font-weight:800}
  #gfbar .gf-tag{background:#E04A2C;color:#fff;font-size:10px;padding:3px 7px;border-radius:999px;text-transform:uppercase;letter-spacing:.08em}
  #gfbar button,#gfbar a.b{font:600 13px "Poppins";cursor:pointer;border:0;border-radius:7px;padding:8px 12px;color:#fff;background:#2a2a2a;text-decoration:none;display:inline-block}
  #gfbar button:hover,#gfbar a.b:hover{background:#3a3a3a}
  #gfbar button.on{background:#E04A2C}
  #gfbar .gf-sp{margin-left:auto;display:flex;gap:10px;align-items:center}
  #gfbar .gf-count{color:#bdbdbd}
  #gfbar .gf-me{color:#fff;font-weight:700}#gfbar .gf-me small{color:#8f8f8f;font-weight:600}
  body.gf-push{padding-top:46px!important}
  body.gf-annotate, body.gf-annotate *{cursor:crosshair!important}
  #gflayer{position:absolute;top:0;left:0;width:100%;z-index:2147482000;pointer-events:none}
  .gfpin{position:absolute;transform:translate(-50%,-100%);pointer-events:auto;cursor:pointer;width:28px;height:28px;border-radius:50% 50% 50% 2px;background:#E04A2C;color:#fff;display:flex;align-items:center;justify-content:center;font:700 13px "Poppins";box-shadow:0 3px 8px rgba(0,0,0,.35);border:2px solid #fff;rotate:45deg}
  .gfpin span{rotate:-45deg}.gfpin.done{background:#3a9d4b}.gfpin.flash{animation:gff 1.2s ease 2}
  @keyframes gff{0%,100%{box-shadow:0 3px 8px rgba(0,0,0,.35)}50%{box-shadow:0 0 0 7px rgba(224,74,44,.45)}}
  #gfpanel{position:fixed;top:46px;right:0;width:360px;max-width:92vw;bottom:0;background:#fff;z-index:2147482500;box-shadow:-6px 0 24px rgba(0,0,0,.18);transform:translateX(100%);transition:transform .2s;display:flex;flex-direction:column;font-family:"Poppins",system-ui,sans-serif}
  #gfpanel.open{transform:none}
  #gfpanel header{padding:14px 16px;border-bottom:1px solid #eee;font-weight:800;display:flex;align-items:center;color:#0E0E0E}
  #gfpanel header button{margin-left:auto;background:none;border:0;font-size:20px;cursor:pointer;color:#888}
  #gflist{overflow:auto;padding:8px;flex:1}
  .gfgroup{font:700 11px "Poppins";text-transform:uppercase;letter-spacing:.06em;color:#999;margin:14px 6px 4px}
  .gfgroup.cur{color:#E04A2C}
  .gfcard{border:1px solid #eee;border-radius:10px;padding:11px 12px;margin:6px 4px;font-size:13px;color:#333;cursor:pointer}
  .gfcard:hover{border-color:#E04A2C}.gfcard.done{opacity:.55}
  .gfcard .num{display:inline-block;background:#E04A2C;color:#fff;width:20px;height:20px;border-radius:50%;text-align:center;line-height:20px;font-weight:700;font-size:11px;margin-right:6px}
  .gfcard.done .num{background:#3a9d4b}
  .gfcard .meta{color:#999;font-size:11px;margin-top:6px}.gfcard .meta b{color:#E04A2C}
  .gfcard .cc{color:#bbb;font-size:11px;margin-left:6px}
  .gfempty{color:#999;font-size:13px;text-align:center;padding:30px 16px}
  #gfpop{position:absolute;z-index:2147483600;width:270px;background:#fff;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.28);padding:14px;font-family:"Poppins",system-ui,sans-serif;display:none}
  #gfpop textarea{width:100%;height:74px;border:1px solid #ddd;border-radius:8px;padding:8px;font:13px "Poppins";resize:vertical;box-sizing:border-box}
  #gfpop .who{font:700 12px "Poppins";color:#E04A2C;margin-bottom:8px}
  #gfpop .pr{display:flex;gap:8px;justify-content:flex-end;margin-top:10px}
  #gfpop button{font:600 12px "Poppins";border:0;border-radius:7px;padding:8px 13px;cursor:pointer}
  #gfpop .save{background:#E04A2C;color:#fff}#gfpop .cancel{background:#eee;color:#444}
  #gfmodal{position:fixed;inset:0;background:rgba(14,14,14,.55);z-index:2147483600;display:none;align-items:center;justify-content:center;padding:24px}
  #gfmodal.open{display:flex}
  .gfm{background:#fff;border-radius:16px;width:440px;max-width:94vw;max-height:86vh;display:flex;flex-direction:column;overflow:hidden;font-family:"Poppins",system-ui,sans-serif}
  .gfm .h{padding:16px 18px;border-bottom:1px solid #eee;display:flex;align-items:flex-start;gap:10px}
  .gfm .h .num{background:#E04A2C;color:#fff;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:700 13px "Poppins";flex:0 0 auto}
  .gfm .h.done .num{background:#3a9d4b}
  .gfm .h .x{margin-left:auto;background:none;border:0;font-size:22px;cursor:pointer;color:#999;line-height:1}
  .gfm .note-txt{font-size:15px;color:#1a1a1a;white-space:pre-wrap}
  .gfm .meta{color:#999;font-size:12px;margin-top:4px}.gfm .meta b{color:#E04A2C}
  .gfm .body{padding:14px 18px;overflow:auto}
  .gfm .cwrap{margin-top:8px}
  .gfm .ctitle{font:700 11px "Poppins";text-transform:uppercase;letter-spacing:.06em;color:#999;margin:6px 0 8px}
  .gfm .cmt{padding:9px 0;border-top:1px solid #f0f0f0}
  .gfm .cmt .cm{font-size:11px;color:#999;margin-bottom:2px}.gfm .cmt .cm b{color:#1a1a1a}
  .gfm .cmt .ct{font-size:14px;color:#222;white-space:pre-wrap}
  .gfm .cmt .cdel{font-size:11px;color:#c0392b;cursor:pointer;background:none;border:0;padding:0;margin-top:3px}
  .gfm .foot{padding:12px 18px;border-top:1px solid #eee;display:flex;flex-direction:column;gap:8px}
  .gfm .foot textarea{width:100%;height:54px;border:1px solid #ddd;border-radius:9px;padding:9px;font:13px "Poppins";resize:vertical;box-sizing:border-box}
  .gfm .frow{display:flex;gap:8px;align-items:center}
  .gfm .frow .sp{margin-left:auto;display:flex;gap:8px}
  .gfm button.act{font:600 12px "Poppins";border:0;border-radius:8px;padding:9px 14px;cursor:pointer}
  .gfm .send{background:#E04A2C;color:#fff}.gfm .resolve{background:#eef;color:#3a4ea3}.gfm .del{background:#fdecec;color:#c0392b}
  `;
  document.head.appendChild(css);

  // ---------- bar ----------
  var bar = document.createElement('div'); bar.id = 'gfbar';
  document.body.appendChild(bar);
  document.body.classList.add('gf-push');
  var layer = document.createElement('div'); layer.id = 'gflayer'; document.body.appendChild(layer);
  var panel = document.createElement('div'); panel.id = 'gfpanel';
  panel.innerHTML = '<header>All notes<button id="gfclose">×</button></header><div id="gflist"></div>';
  document.body.appendChild(panel);
  var pop = document.createElement('div'); pop.id = 'gfpop'; document.body.appendChild(pop);
  var modal = document.createElement('div'); modal.id = 'gfmodal'; document.body.appendChild(modal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  function renderBar() {
    var admin = me && me.role === 'admin' ? '<a class="b" href="/admin.html">Admin</a>' : '';
    bar.innerHTML = '<span class="gf-logo">Generation Faraday</span><span class="gf-tag">Review</span>'
      + '<button id="gftoggle">📍 Annotate</button>'
      + '<div class="gf-sp"><span class="gf-count" id="gfcount"></span>'
      + '<button id="gflistbtn">Notes</button>' + admin
      + '<span class="gf-me">' + esc(me ? me.name : '') + (me && me.role === 'admin' ? ' <small>admin</small>' : '') + '</span>'
      + '<button id="gfout">Logout</button></div>';
    $('gftoggle').onclick = function () {
      mode = !mode; this.classList.toggle('on', mode);
      document.body.classList.toggle('gf-annotate', mode);
      this.textContent = mode ? '📍 Click to place…' : '📍 Annotate';
    };
    $('gflistbtn').onclick = function () { panel.classList.toggle('open'); };
    $('gfout').onclick = function () { api('logout', { x: 1 }).then(function () { location.href = '/login.html'; }); };
  }

  // ---------- render pins + counts ----------
  function render() {
    layer.style.height = docH() + 'px';
    layer.innerHTML = '';
    var here = notes.filter(onPage);
    here.forEach(function (a, i) {
      var pin = document.createElement('div');
      pin.className = 'gfpin' + (a.done ? ' done' : '');
      pin.id = 'gfpin-' + a.id;
      pin.style.left = (a.x * docW()) + 'px';
      pin.style.top = (a.y * docH()) + 'px';
      pin.innerHTML = '<span>' + (i + 1) + '</span>';
      pin.title = a.authorName + (a.note ? ': ' + a.note : '');
      pin.onclick = function (e) { e.stopPropagation(); openNote(a); };
      layer.appendChild(pin);
    });
    var open = here.filter(function (a) { return !a.done; }).length;
    if ($('gfcount')) $('gfcount').textContent = here.length ? (open + ' open here / ' + notes.length + ' total') : (notes.length + ' total');
    renderPanel();
  }

  function renderPanel() {
    var box = $('gflist'); if (!box) return;
    if (!notes.length) { box.innerHTML = '<div class="gfempty">No notes yet.<br>Click <b>Annotate</b>, then click anywhere to add one.</div>'; return; }
    // group by page, current page first
    var pages = {}; notes.forEach(function (n) { (pages[n.page || '/'] = pages[n.page || '/'] || []).push(n); });
    var order = Object.keys(pages).sort(function (a, b) { return a === PAGE ? -1 : b === PAGE ? 1 : a < b ? -1 : 1; });
    box.innerHTML = '';
    order.forEach(function (pg) {
      var g = document.createElement('div'); g.className = 'gfgroup' + (pg === PAGE ? ' cur' : '');
      g.textContent = prettyPage(pg) + (pg === PAGE ? ' · this page' : '');
      box.appendChild(g);
      pages[pg].forEach(function (a, i) {
        var nc = commentsOf(a.id).length;
        var c = document.createElement('div'); c.className = 'gfcard' + (a.done ? ' done' : '');
        c.innerHTML = '<div><span class="num">' + (i + 1) + '</span>' + esc(a.note || '(no text)') + '</div>'
          + '<div class="meta">👤 <b>' + esc(a.authorName || 'Unknown') + '</b> · ' + when(a.created)
          + (nc ? '<span class="cc">💬 ' + nc + '</span>' : '') + '</div>';
        c.onclick = function () { goToNote(a); };
        box.appendChild(c);
      });
    });
  }

  // ---------- navigate to a note (maybe another page) ----------
  function goToNote(a) {
    if (!onPage(a)) { location.href = (a.page || '/') + '#note-' + a.id; return; }
    panel.classList.remove('open');
    var pin = $('gfpin-' + a.id);
    if (pin) { window.scrollTo({ top: parseFloat(pin.style.top) - 160, behavior: 'smooth' }); pin.classList.add('flash'); setTimeout(function () { pin.classList.remove('flash'); }, 2600); }
    openNote(a);
  }

  // ---------- new note ----------
  var draft = null;
  function startDraft(px, py) {
    draft = { x: px / docW(), y: py / docH() };
    pop.style.left = Math.min(px + 14, docW() - 286) + 'px';
    pop.style.top = (py + 6) + 'px';
    pop.innerHTML = '<div class="who">Adding as ' + esc(me.name) + '</div>'
      + '<textarea id="gftext" placeholder="What needs to change here? e.g. swap this photo"></textarea>'
      + '<div class="pr"><button class="cancel" id="gfx">Cancel</button><button class="save" id="gfsave">Save</button></div>';
    $('gfx').onclick = function () { pop.style.display = 'none'; draft = null; };
    $('gfsave').onclick = function () {
      var note = ($('gftext').value || '').trim();
      api('add-note', { page: PAGE, x: draft.x, y: draft.y, note: note }).then(function (x) {
        if (x.ok && x.d.id) notes.push(x.d); pop.style.display = 'none'; draft = null; render();
      });
    };
    pop.style.display = 'block';
    setTimeout(function () { $('gftext').focus(); }, 30);
  }

  // ---------- note modal (view + comments) ----------
  var openId = null;
  function openNote(a) {
    openId = a.id;
    var cs = commentsOf(a.id);
    var clist = cs.map(function (c) {
      return '<div class="cmt"><div class="cm">👤 <b>' + esc(c.authorName) + '</b> · ' + when(c.created) + '</div>'
        + '<div class="ct">' + esc(c.text) + '</div>'
        + (canEdit(c) ? '<button class="cdel" data-c="' + c.id + '">delete</button>' : '') + '</div>';
    }).join('');
    modal.innerHTML = '<div class="gfm"><div class="h' + (a.done ? ' done' : '') + '"><div class="num">' + (a.done ? '✓' : '!') + '</div>'
      + '<div><div class="note-txt">' + esc(a.note || '(no text)') + '</div>'
      + '<div class="meta">👤 <b>' + esc(a.authorName || 'Unknown') + '</b> · ' + when(a.created) + ' · ' + esc(prettyPage(a.page)) + '</div></div>'
      + '<button class="x" id="gfmx">×</button></div>'
      + '<div class="body"><div class="cwrap"><div class="ctitle">Comments (' + cs.length + ')</div>' + (clist || '<div style="color:#aaa;font-size:13px">No comments yet.</div>') + '</div></div>'
      + '<div class="foot"><textarea id="gfctext" placeholder="Reply to this note…"></textarea>'
      + '<div class="frow">'
      + (canEdit(a) ? '<button class="act del" id="gfdel">Delete note</button>' : '')
      + '<div class="sp"><button class="act resolve" id="gfres">' + (a.done ? 'Reopen' : 'Resolve') + '</button>'
      + '<button class="act send" id="gfsend">Comment</button></div></div></div></div>';
    modal.classList.add('open');
    $('gfmx').onclick = closeModal;
    $('gfsend').onclick = function () {
      var t = ($('gfctext').value || '').trim(); if (!t) return;
      api('add-comment', { noteId: a.id, text: t }).then(function (x) { if (x.ok && x.d.id) comments.push(x.d); openNote(a); render(); });
    };
    $('gfres').onclick = function () { api('update-note', { id: a.id, done: !a.done }).then(function (x) { if (x.ok) { a.done = x.d.done; openNote(a); render(); } }); };
    if ($('gfdel')) $('gfdel').onclick = function () { if (!confirm('Delete this note and its comments?')) return; api('delete-note', { id: a.id }).then(function () { notes = notes.filter(function (n) { return n.id !== a.id; }); comments = comments.filter(function (c) { return c.noteId !== a.id; }); closeModal(); render(); }); };
    Array.prototype.forEach.call(modal.querySelectorAll('.cdel'), function (b) {
      b.onclick = function () { var id = b.getAttribute('data-c'); api('delete-comment', { id: id }).then(function () { comments = comments.filter(function (c) { return c.id !== id; }); openNote(a); render(); }); };
    });
  }
  function closeModal() { modal.classList.remove('open'); openId = null; }

  // ---------- click-to-place ----------
  document.addEventListener('click', function (e) {
    if (!mode) return;
    if (e.target.closest('#gfbar,#gfpanel,#gfpop,#gfmodal,.gfpin')) return;
    e.preventDefault(); startDraft(e.pageX, e.pageY);
  }, true);
  window.addEventListener('resize', function () { clearTimeout(window.__gfr); window.__gfr = setTimeout(render, 150); });

  // ---------- boot ----------
  api('bootstrap').then(function (x) {
    if (!x.d.user) { location.href = '/login.html?next=' + encodeURIComponent(location.pathname); return; }
    me = x.d.user; notes = x.d.notes || []; comments = x.d.comments || [];
    renderBar(); render();
    var h = location.hash.match(/^#note-(.+)$/);
    if (h) { var a = notes.find(function (n) { return n.id === h[1]; }); if (a && onPage(a)) setTimeout(function () { goToNote(a); }, 500); }
  }).catch(function () { renderBar(); });
})();
