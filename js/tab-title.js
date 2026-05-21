(() => {
  let originalTitle = document.title;
  let wasAway = false;
  let awayTimer = null;

  function showWelcomeToast() {
    if (window.showToast) {
      const messages = [
        'Welcome back! ✨',
        'Missed you! 📖',
        'Ready to continue? 🚀',
        'Glad you\'re back! 💫',
        'Let\'s pick up where we left off! 🌟'
      ];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      window.showToast(msg);
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = 'Come back! 📖';
      wasAway = true;
      if (awayTimer) clearTimeout(awayTimer);
    } else {
      if (wasAway) {
        document.title = originalTitle;
        showWelcomeToast();
        wasAway = false;
      }
    }
  });

  // Also handle window blur/focus for non-visibility change (e.g., alt+tab in some browsers)
  window.addEventListener('blur', () => {
    document.title = 'Come back! 📖';
    wasAway = true;
  });

  window.addEventListener('focus', () => {
    if (wasAway) {
      document.title = originalTitle;
      showWelcomeToast();
      wasAway = false;
    }
  });
})();