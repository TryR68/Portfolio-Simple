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

  /* Explorateur Projets : dossiers pliables + affichage détail */
  (function initExplorer() {
    var folderBtns = document.querySelectorAll('.explorer-folder-btn');
    var fileBtns = document.querySelectorAll('.explorer-file');
    var placeholder = document.getElementById('explorer-placeholder');
    var content = document.getElementById('explorer-content');
    var titleEl = document.getElementById('explorer-preview-title');
    var metaEl = document.getElementById('explorer-preview-meta');
    var descEl = document.getElementById('explorer-preview-desc');
    var linkEl = document.getElementById('explorer-preview-link');

    var projects = {
      1: { title: 'Site vitrine', meta: 'HTML / CSS / JS', desc: 'Site vitrine responsive pour un client ou projet personnel.', url: '#' },
      2: { title: 'App React', meta: 'React / JSX', desc: 'Application web moderne avec React.', url: '#' },
      3: { title: 'Portfolio MMI', meta: 'CSS / Intégration', desc: 'Maquette et intégration d’un portfolio étudiant.', url: '#' },
      4: { title: 'Projet école', meta: 'PDF / Design', desc: 'Rendu de projet en design ou communication.', url: '#' }
    };

    folderBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var folder = btn.closest('.explorer-folder');
        folder.classList.toggle('is-open');
      });
    });

    function showProject(id) {
      var p = projects[id];
      if (!p) return;
      if (placeholder) placeholder.classList.add('hidden');
      if (content) content.classList.remove('hidden');
      if (titleEl) titleEl.textContent = p.title;
      if (metaEl) metaEl.textContent = p.meta;
      if (descEl) descEl.textContent = p.desc;
      if (linkEl) linkEl.href = p.url;
    }

    fileBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-project');
        fileBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        showProject(id);
      });
    });

    var activeFile = document.querySelector('.explorer-file.is-active');
    if (activeFile) showProject(activeFile.getAttribute('data-project'));
  })();
})();
