/* Reveal-on-scroll for [data-reveal] elements (matches the homepage behavior),
   so homepage sections grafted onto content pages animate in instead of staying hidden. */
(function () {
  function run() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (e) { io.observe(e); });
    // anything already in view on load
    setTimeout(function () {
      els.forEach(function (e) {
        var r = e.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) e.classList.add('in');
      });
    }, 60);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
