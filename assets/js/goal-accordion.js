// Acordeón horizontal simple: un tab activo, un panel visible a la vez.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.goal-accordion').forEach(function (accordion) {
    var tabs = accordion.querySelectorAll('.goal-tab');
    var panels = accordion.querySelectorAll('.goal-panel');
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        panels.forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        panels[i].classList.add('active');
      });
    });
  });
});
