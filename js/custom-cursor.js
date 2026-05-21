(() => {
  // Create cursor elements
  const dot = document.createElement('div');
  dot.classList.add('cursor-dot');
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.classList.add('cursor-ring');
  document.body.appendChild(ring);

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let targetX = 0;
  let targetY = 0;
  let isMagnetic = false;
  let currentMagneticEl = null;

  // Update mouse position instantly for the dot
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Determine hovered magnetic elements
  const magneticSelector = 'button, a, .clickable, .note-card, .entry-card, .nav-links a, .btn, .mood-selector label';

  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest(magneticSelector);
    if (el) {
      isMagnetic = true;
      currentMagneticEl = el;
      ring.classList.add('magnetic');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const el = e.target.closest(magneticSelector);
    if (el && !e.relatedTarget?.closest(magneticSelector)) {
      isMagnetic = false;
      currentMagneticEl = null;
      ring.classList.remove('magnetic');
    }
  });

  function updateMagneticTarget() {
    if (isMagnetic && currentMagneticEl) {
      const rect = currentMagneticEl.getBoundingClientRect();
      // Clamp to viewport to avoid ring disappearing
      targetX = Math.min(window.innerWidth, Math.max(0, rect.left + rect.width / 2));
      targetY = Math.min(window.innerHeight, Math.max(0, rect.top + rect.height / 2));
    } else {
      targetX = mouseX;
      targetY = mouseY;
    }
  }

  function animateRing() {
    updateMagneticTarget();

    // Smooth follow with lerp
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;

    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    requestAnimationFrame(animateRing);
  }

  // Initialize ring position
  ringX = mouseX;
  ringY = mouseY;
  ring.style.left = mouseX + 'px';
  ring.style.top = mouseY + 'px';
  animateRing();
})();