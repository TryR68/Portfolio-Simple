(function () {
  var overlay = document.getElementById('drawer-overlay');
  var drawer = document.getElementById('drawer-menu');
  var burger = document.querySelector('.header-burger');
  var drawerLinks = document.querySelectorAll('.drawer-nav-list a');

  /* Thème clair / sombre */
  var THEME_KEY = 'portfolio-theme';
  var root = document.documentElement;

  function getTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || 'dark';
    } catch (e) {
      return 'dark';
    }
  }

  function setTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }

  function toggleTheme() {
    var current = getTheme();
    var next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
  }

  setTheme(getTheme());

  var themeToggleHeader = document.getElementById('theme-toggle-header');
  var themeToggleDrawer = document.getElementById('theme-toggle-drawer');
  if (themeToggleHeader) themeToggleHeader.addEventListener('click', toggleTheme);
  if (themeToggleDrawer) themeToggleDrawer.addEventListener('click', toggleTheme);

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

  /* Explorateur Projets : dossiers pliables + filtre par type + affichage détail */
  (function initExplorer() {
    var folderBtns = document.querySelectorAll('.explorer-folder-btn');
    var fileBtns = document.querySelectorAll('.explorer-file');
    var filterSelect = document.getElementById('explorer-filter-type');
    var placeholder = document.getElementById('explorer-placeholder');
    var content = document.getElementById('explorer-content');
    var galleryEl = document.getElementById('explorer-preview-gallery');
    var galleryImgEl = document.getElementById('explorer-gallery-img');
    var galleryDotsEl = document.getElementById('explorer-gallery-dots');
    var galleryPrevBtn = document.getElementById('explorer-gallery-prev');
    var galleryNextBtn = document.getElementById('explorer-gallery-next');
    var titleEl = document.getElementById('explorer-preview-title');
    var metaEl = document.getElementById('explorer-preview-meta');
    var descEl = document.getElementById('explorer-preview-desc');
    var linkSiteEl = document.getElementById('explorer-preview-link-site');
    var linkGithubEl = document.getElementById('explorer-preview-link-github');

    var currentGalleryIndex = 0;
    var currentGalleryImages = [];

    var projects = {
      1: {
        title: 'SAE Datavisualisation',
        meta: 'HTML / CSS / JavaScript',
        desc: 'Projet de datavisualisation (SAE 2026) : prise en main d\'un fichier JSON de mon choix et mise en valeur des données en animant des SVG via une interface web en HTML, CSS et JavaScript.',
        images: ['Images/projects/datavisualisation1.png', 'Images/projects/datavisualisation2.png', ],
        siteUrl: 'https://tryr68.github.io/SAE-303/',
        githubUrl: 'https://github.com/TryR68/SAE-303',
        type: 'developpement-web'
      },
      2: {
        title: 'Ruches connectées',
        meta: 'HTML / CSS / JavaScript / PHP / SQL (MVC)',
        desc: 'Projet fictif full-stack pour des ruches connectées en groupe : application web en architecture MVC avec base de données, permettant aux apiculteurs de consulter et gérer les données de leurs ruches (température, humidité, etc.).',
        images: ['Images/projects/ruche1.png', 'Images/projects/ruche2.png', 'Images/projects/ruche3.png', 'Images/projects/ruche4.png'],
        githubUrl: 'https://github.com/TryR68/SiteRucheSAE',
        type: 'developpement-web'
      },
      3: {
        title: 'Carte de vœux — Préfecture de Colmar',
        meta: 'Design / Communication',
        desc: 'Création de la carte de vœux pour la préfecture de Colmar, adoptée officiellement.',
        images: ['Images/projects/Carte_de_voeux.png'],
        type: 'design'
      },
      4: {
        title: 'Maquette site Resort',
        meta: 'Webdesign / Figma',
        desc: 'Maquette d\'un site web pour un resort : structure, pages et design d\'interface.',
        images: ['Images/projects/resort-bay1.png', 'Images/projects/resort-bay2.png'],
        type: 'webdesign'
      },
      5: {
        title: 'Newsletter JBL',
        meta: 'Design / Newsletter',
        desc: 'Design d\'une newsletter pour la marque JBL : mise en page, visuels et contenu éditorial.',
        images: ['Images/projects/newsletter-jbl1.png', 'Images/projects/newsletter-jbl2.png'],
        type: 'design'
      },
      6: {
        title: 'Système de réservation de livres',
        meta: 'HTML / CSS / PHP / SQL',
        desc: 'Site dynamique avec base de données sur le sujet de mon choix : système de réservation de livres pour gérer les emprunts et le catalogue.',
        images: ['Images/projects/SAE202-1.png', 'Images/projects/SAE202-2.png', 'Images/projects/SAE202-3.png'],
        githubUrl: 'https://github.com/TryR68/SAE203',
        type: 'developpement-web'
      },
      7: {
        title: 'Portfolio (ancienne version)',
        meta: 'HTML / CSS / JavaScript',
        desc: 'Mon premier portfolio, réalisé en 2024.',
        images: ['Images/projects/portfolio1.png', 'Images/projects/portfolio2.png', 'Images/projects/portfolio3.png'],
        siteUrl: 'https://tryr68.github.io/Portfolio_Trystan/',
        githubUrl: 'https://github.com/TryR68/Portfolio_Trystan',
        type: 'developpement-web'
      }
    };

    folderBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var folder = btn.closest('.explorer-folder');
        folder.classList.toggle('is-open');
      });
    });

    function applyFilter() {
      var type = filterSelect ? filterSelect.value : '';
      fileBtns.forEach(function (btn) {
        var projectType = btn.getAttribute('data-type');
        var match = !type || projectType === type;
        btn.classList.toggle('hidden', !match);
      });
      var visibleFiles = document.querySelectorAll('.explorer-file:not(.hidden)');
      var activeFile = document.querySelector('.explorer-file.is-active');
      if (activeFile && activeFile.classList.contains('hidden') && visibleFiles.length) {
        visibleFiles[0].click();
      } else if (visibleFiles.length === 0 && content && placeholder) {
        content.classList.add('hidden');
        placeholder.classList.remove('hidden');
      }
    }

    if (filterSelect) {
      filterSelect.addEventListener('change', applyFilter);
    }

    function getProjectImages(p) {
      if (p.images && p.images.length) return p.images;
      if (p.image) return [p.image];
      return [];
    }

    function setGalleryImage(index) {
      currentGalleryIndex = index;
      if (!galleryImgEl) return;
      if (!currentGalleryImages.length) {
        galleryImgEl.style.display = 'none';
        return;
      }
      galleryImgEl.src = currentGalleryImages[index];
      galleryImgEl.alt = 'Capture ' + (index + 1) + ' — ' + (titleEl ? titleEl.textContent : '');
      galleryImgEl.onerror = function () { galleryImgEl.style.display = 'none'; };
      galleryImgEl.style.display = '';
      if (galleryDotsEl) {
        var dots = galleryDotsEl.querySelectorAll('.explorer-gallery-dot');
        dots.forEach(function (d, i) { d.classList.toggle('is-active', i === index); });
      }
      if (galleryPrevBtn) galleryPrevBtn.style.visibility = currentGalleryImages.length > 1 ? 'visible' : 'hidden';
      if (galleryNextBtn) galleryNextBtn.style.visibility = currentGalleryImages.length > 1 ? 'visible' : 'hidden';
    }

    function showProject(id) {
      var p = projects[id];
      if (!p) return;
      if (placeholder) placeholder.classList.add('hidden');
      if (content) content.classList.remove('hidden');
      if (titleEl) titleEl.textContent = p.title;
      if (metaEl) metaEl.textContent = p.meta;
      if (descEl) descEl.textContent = p.desc;
      if (linkSiteEl) {
        linkSiteEl.href = p.siteUrl || '#';
        linkSiteEl.style.display = p.siteUrl ? '' : 'none';
      }
      if (linkGithubEl) {
        linkGithubEl.href = p.githubUrl || '#';
        linkGithubEl.style.display = p.githubUrl ? '' : 'none';
      }

      currentGalleryImages = getProjectImages(p);
      if (galleryEl) galleryEl.style.display = currentGalleryImages.length ? '' : 'none';
      if (galleryDotsEl) {
        galleryDotsEl.innerHTML = '';
        currentGalleryImages.forEach(function (_, i) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'explorer-gallery-dot' + (i === 0 ? ' is-active' : '');
          dot.setAttribute('aria-label', 'Image ' + (i + 1));
          dot.addEventListener('click', function () { setGalleryImage(i); });
          galleryDotsEl.appendChild(dot);
        });
      }
      setGalleryImage(0);
    }

    if (galleryPrevBtn) {
      galleryPrevBtn.addEventListener('click', function () {
        if (currentGalleryImages.length < 2) return;
        var prev = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        setGalleryImage(prev);
      });
    }
    if (galleryNextBtn) {
      galleryNextBtn.addEventListener('click', function () {
        if (currentGalleryImages.length < 2) return;
        var next = (currentGalleryIndex + 1) % currentGalleryImages.length;
        setGalleryImage(next);
      });
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

  /* Skills : bulles qui rebondissent + répulsion souris */
  (function initSkillsBounce() {
    var arena = document.getElementById('skills-arena');
    if (!arena) return;

    var bubbles = [];
    var mouseX = -9999;
    var mouseY = -9999;
    var repulsionRadius = 120;
    var repulsionForce = 0.8;

    function getArenaRect() {
      var r = arena.getBoundingClientRect();
      return { left: r.left, top: r.top, width: r.width, height: r.height };
    }

    arena.addEventListener('mousemove', function (e) {
      var r = getArenaRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    });
    arena.addEventListener('mouseleave', function () {
      mouseX = -9999;
      mouseY = -9999;
    });

    var items = arena.querySelectorAll('.skill-bubble');
    var padding = 8;
    var w = arena.offsetWidth;
    var h = arena.offsetHeight;

    items.forEach(function (el, i) {
      var bw = el.offsetWidth;
      var bh = el.offsetHeight;
      var x = padding + Math.random() * (w - bw - 2 * padding);
      var y = padding + Math.random() * (h - bh - 2 * padding);
      var vx = (Math.random() - 0.5) * 1.2;
      var vy = (Math.random() - 0.5) * 1.2;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      bubbles.push({ el: el, x: x, y: y, vx: vx, vy: vy, w: bw, h: bh });
    });

    function step() {
      w = arena.offsetWidth;
      h = arena.offsetHeight;

      bubbles.forEach(function (b) {
        var bx = b.x + b.w / 2;
        var by = b.y + b.h / 2;
        if (mouseX >= 0 && mouseY >= 0) {
          var dx = bx - mouseX;
          var dy = by - mouseY;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < repulsionRadius && dist > 0) {
            var f = (1 - dist / repulsionRadius) * repulsionForce;
            var nx = dx / dist;
            var ny = dy / dist;
            b.vx += nx * f;
            b.vy += ny * f;
          }
        }

        b.vx *= 0.99;
        b.vy *= 0.99;
        b.x += b.vx;
        b.y += b.vy;

        if (b.x <= 0) { b.x = 0; b.vx = Math.abs(b.vx) * 0.9; }
        if (b.y <= 0) { b.y = 0; b.vy = Math.abs(b.vy) * 0.9; }
        if (b.x >= w - b.w) { b.x = w - b.w; b.vx = -Math.abs(b.vx) * 0.9; }
        if (b.y >= h - b.h) { b.y = h - b.h; b.vy = -Math.abs(b.vy) * 0.9; }

        b.el.style.left = b.x + 'px';
        b.el.style.top = b.y + 'px';
      });

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  })();
})();
