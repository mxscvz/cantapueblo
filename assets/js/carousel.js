(function () {
  var wraps = document.querySelectorAll('.carousel-wrap');

  wraps.forEach(function (wrap) {
    var carousel = wrap.querySelector('.carousel');
    var prev = wrap.querySelector('.carousel-arrow.prev');
    var next = wrap.querySelector('.carousel-arrow.next');
    var track = wrap.querySelector('.track-line');
    var fill = wrap.querySelector('.track-fill');
    if (!carousel) return;

    function update() {
      var max = carousel.scrollWidth - carousel.clientWidth;
      var ratio = max > 0 ? carousel.scrollLeft / max : 0;
      if (fill) fill.style.width = (ratio * 100) + '%';
    }

    function scrollByAmount(dir) {
      carousel.scrollBy({ left: dir * carousel.clientWidth * 0.85, behavior: 'smooth' });
    }

    if (prev) prev.addEventListener('click', function () { scrollByAmount(-1); });
    if (next) next.addEventListener('click', function () { scrollByAmount(1); });

    if (track) {
      track.addEventListener('click', function (e) {
        var rect = track.getBoundingClientRect();
        var ratio = (e.clientX - rect.left) / rect.width;
        var max = carousel.scrollWidth - carousel.clientWidth;
        carousel.scrollTo({ left: ratio * max, behavior: 'smooth' });
      });
    }

    var ticking = false;
    carousel.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () { update(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });

    update();
  });
})();
