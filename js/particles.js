(() => {
  let canvas, ctx, particles = [], animationId;
  const PARTICLE_COUNT = 120;
  let mouseX = -1000, mouseY = -1000;

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 3 + 1,
    };
  }

  function initCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);
    ctx = canvas.getContext('2d');
    resizeCanvas();
    particles = Array.from({length: PARTICLE_COUNT}, createParticle);
    window.addEventListener('resize', resizeCanvas);
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.forEach(p => {
      p.x = Math.min(p.x, canvas.width);
      p.y = Math.min(p.y, canvas.height);
    });
  }

  function animate() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if (dist < 100) {
        const angle = Math.atan2(dy, dx);
        p.x -= Math.cos(angle) * 1.5;
        p.y -= Math.sin(angle) * 1.5;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(56,189,248,0.6)';
      ctx.fill();
    });
    animationId = requestAnimationFrame(animate);
  }

  window.startParticles = () => {
    if (!canvas) initCanvas();
    if (!animationId) animate();
  };
  window.stopParticles = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    if (canvas) {
      canvas.remove();
      canvas = null;
      ctx = null;
    }
  };

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  if (localStorage.getItem('affan_theme') === 'dark') {
    window.startParticles();
  }
})();