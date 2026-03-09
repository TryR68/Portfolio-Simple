/**
 * Canvas de fond — particules reliées, s'adapte au thème (clair/sombre)
 */
(function () {
  var canvas = document.getElementById('canvas-background');
  if (!canvas) return;
  document.body.classList.add('has-canvas');

  var ctx = canvas.getContext('2d');
  var particles = [];
  var particleCount = 60;
  var connectionDistance = 120;
  var mouse = { x: null, y: null, radius: 150 };

  function getThemeColors() {
    var root = document.documentElement;
    var bg = getComputedStyle(root).getPropertyValue('--background-color').trim() || '#1c1c1c';
    var accent = getComputedStyle(root).getPropertyValue('--accent-color').trim() || '#DDA15E';
    return { bg: bg, accent: accent };
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    for (var i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5
      });
    }
  }

  function draw() {
    var colors = getThemeColors();
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.accent;
      ctx.globalAlpha = 0.6;
      ctx.fill();
      ctx.globalAlpha = 1;

      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x;
        var dy = p.y - q.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = colors.accent;
          ctx.globalAlpha = 0.15 * (1 - dist / connectionDistance);
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();
