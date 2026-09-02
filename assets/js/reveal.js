(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    window.CantaReveal = {
      observe: function (el) { el.classList.add('is-visible'); }
    };
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  window.CantaReveal = {
    observe: function (el) { observer.observe(el); }
  };

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();
