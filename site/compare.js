/* Floating "Compare with old site" launcher. Opens /compare.html for the current
   page (side-by-side new vs old). Hidden inside the compare iframes themselves. */
(function () {
  if (window.top !== window.self) return;            // not inside the compare panes
  if (location.pathname === '/compare.html') return;
  if (document.getElementById('gfcmp')) return;
  function add() {
    var b = document.createElement('button');
    b.id = 'gfcmp';
    b.type = 'button';
    b.innerHTML = '&#8646; Compare with old site';
    b.style.cssText = 'position:fixed;left:14px;bottom:14px;z-index:2147481000;background:#0E0E0E;color:#fff;border:0;'
      + 'border-radius:11px;padding:11px 16px;font:700 13px Poppins,system-ui,sans-serif;'
      + 'box-shadow:0 6px 20px rgba(0,0,0,.32);cursor:pointer;transition:background .15s';
    b.onmouseover = function () { b.style.background = '#E04A2C'; };
    b.onmouseout = function () { b.style.background = '#0E0E0E'; };
    b.onclick = function () {
      location.href = '/compare.html?p=' + encodeURIComponent(location.pathname + location.search);
    };
    document.body.appendChild(b);
  }
  if (document.body) add(); else window.addEventListener('DOMContentLoaded', add);
})();
