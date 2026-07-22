/* Heading balancer.
 *
 * Chrome/Firefox and Safari 17.5+ handle this natively with `text-wrap: balance`,
 * which the stylesheet already sets. Older Safari ignores it and falls back to
 * greedy wrapping, which strands the last word of a heading on its own line
 * ("...are just the / beginning."). This script only runs when the browser
 * lacks native support.
 *
 * Method: keep the heading's natural line count, then binary-search the
 * narrowest width that still produces that count. That is what evens the lines.
 */
(function () {
  'use strict';

  if (window.CSS && CSS.supports && CSS.supports('text-wrap', 'balance')) return;

  var SEL = 'h1, h2, h3, .proof-quote, .tf-quote';

  function lineCount(el, lh) {
    return Math.max(1, Math.round(el.getBoundingClientRect().height / lh));
  }

  function balance(el) {
    el.style.maxWidth = '';
    var cs = getComputedStyle(el);
    var lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
    var full = el.getBoundingClientRect().width;
    if (!full) return;

    var target = lineCount(el, lh);
    if (target < 2) return;

    // Never go below an even split, never above the natural width.
    var lo = full / target, hi = full, best = full;
    for (var i = 0; i < 12 && hi - lo > 1; i++) {
      var mid = (lo + hi) / 2;
      el.style.maxWidth = mid + 'px';
      if (lineCount(el, lh) <= target) { best = mid; hi = mid; }
      else { lo = mid; }
    }
    el.style.maxWidth = Math.ceil(best) + 'px';

    // A centred heading must stay centred once it is width-constrained.
    if (cs.textAlign === 'center') {
      el.style.marginLeft = 'auto';
      el.style.marginRight = 'auto';
    }
  }

  function run() {
    var els = document.querySelectorAll(SEL);
    for (var i = 0; i < els.length; i++) balance(els[i]);
  }

  function start() {
    // Archivo changes the metrics, so balance after webfonts settle.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
    else run();

    var t;
    addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(run, 150);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
