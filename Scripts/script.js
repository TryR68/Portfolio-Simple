(function () {
  var overlay = document.getElementById('drawer-overlay');
  var drawer = document.getElementById('drawer-menu');
  var burger = document.querySelector('.header-burger');
  var drawerLinks = document.querySelectorAll('.drawer-nav-list a');

  /* Typing effect sur le titre hero */
  (function initTyping() {
    var el = document.getElementById('typing-title');
    var cursor = document.querySelector('.typing-cursor');
    var text = 'DÉVELOPPEUR WEB';
    var index = 0;
    var delay = 120;

    if (!el || !cursor) return;

    function type() {
      if (index < text.length) {
        el.textContent += text[index];
        index++;
        setTimeout(type, delay);
      } else {
        cursor.classList.add('done');
      }
    }

    setTimeout(type, 400);
  })();

  function openDrawer() {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    if (burger) burger.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    if (burger) burger.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (burger) {
    burger.addEventListener('click', function () {
      if (drawer.classList.contains('is-open')) closeDrawer();
      else openDrawer();
    });
  }
  if (overlay) overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });
})();
