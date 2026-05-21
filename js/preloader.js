(() => {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloader-fill');
  const percentSpan = document.getElementById('preloader-percent');
  const mainContent = document.getElementById('main-content');
  if (!preloader || !fill || !percentSpan || !mainContent) return;

  const penEl = document.querySelector('.emoji.pen');
  const pageEl = document.querySelector('.emoji.page');

  let progress = 0;
  const duration = Math.random() * 400 + 800; // 0.8-1.2s
  const stepTime = 30;
  const steps = duration / stepTime;
  let step = 0;

  function updateEmojiPositions() {
    const t = Date.now() / 800;
    if (penEl) {
      penEl.style.transform = `translateY(${Math.sin(t) * 12}px) rotate(${Math.sin(t * 0.7) * 10}deg)`;
    }
    if (pageEl) {
      pageEl.style.transform = `translateY(${Math.cos(t) * 12}px) rotate(${Math.cos(t * 0.7) * 8}deg)`;
    }
  }

  const emojiInterval = setInterval(updateEmojiPositions, 30);

  const interval = setInterval(() => {
    step++;
    progress = Math.min(100, Math.round((step / steps) * 100));
    fill.style.width = progress + '%';
    percentSpan.textContent = progress;

    if (progress >= 100) {
      clearInterval(interval);
      clearInterval(emojiInterval);
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
          mainContent.classList.add('visible');
        }, 500);
      }, 200);
    }
  }, stepTime);
})();