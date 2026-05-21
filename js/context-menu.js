(() => {
  const menu = document.getElementById('context-menu');
  if (!menu) return;

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (window.incrementContextMenuOpens) window.incrementContextMenuOpens();
    menu.style.display = 'block';
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
    buildMenuItems();
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
      menu.style.display = 'none';
    }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') menu.style.display = 'none'; });

  function buildMenuItems() {
    menu.innerHTML = `
      <div class="context-menu-item" data-action="nav-dashboard">📊 Dashboard</div>
      <div class="context-menu-item" data-action="nav-diary">📔 Diary</div>
      <div class="context-menu-item" data-action="nav-notes">📝 Notes</div>
      <div class="context-menu-item" data-action="nav-output">📄 Output</div>
      <div class="context-menu-item" data-action="nav-settings">⚙️ Settings</div>
      <div class="context-menu-item" data-action="nav-creator">👤 Creator</div>
      <div class="context-menu-separator"></div>
      <div class="context-menu-item" data-action="toggle-theme">🌓 Toggle Theme</div>
      <div class="context-menu-item" data-action="view-achievements">🏆 View Achievements</div>
      <div class="context-menu-item" data-action="export-data">💾 Export Data</div>
      <div class="context-menu-item" data-action="clear-data">🗑️ Clear Data</div>
      <div class="context-menu-separator"></div>
      <div class="context-menu-item" data-action="back">⬅️ Back</div>
      <div class="context-menu-item" data-action="forward">➡️ Forward</div>
      <div class="context-menu-item" data-action="refresh">🔄 Refresh</div>
      <div class="context-menu-item" data-action="copy">📋 Copy</div>
    `;
    menu.querySelectorAll('.context-menu-item').forEach(item => {
      item.addEventListener('click', handleAction);
    });
  }

  function toggleThemeDirectly() {
    const current = localStorage.getItem('affan_theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('affan_theme', newTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);

    // Update button text if on settings page
    const themeBtn = document.getElementById('toggle-theme');
    if (themeBtn) {
      themeBtn.textContent = newTheme === 'dark' ? 'Switch to Light' : 'Switch to Dark';
    }

    // Handle particles
    if (newTheme === 'dark') {
      if (window.startParticles) window.startParticles();
    } else {
      if (window.stopParticles) window.stopParticles();
    }

    // Track for achievements
    if (window.incrementThemeToggles) window.incrementThemeToggles();

    if (window.showToast) {
      window.showToast(`Theme: ${newTheme}`);
    }
  }

  function handleAction(e) {
    const action = e.target.dataset.action;
    menu.style.display = 'none';
    switch(action) {
      case 'nav-dashboard': window.location.href = 'index.html'; break;
      case 'nav-diary': window.location.href = 'diary.html'; break;
      case 'nav-notes': window.location.href = 'notes.html'; break;
      case 'nav-output': window.location.href = 'output.html'; break;
      case 'nav-settings': window.location.href = 'settings.html'; break;
      case 'nav-creator': window.location.href = 'creator.html'; break;
      case 'toggle-theme': toggleThemeDirectly(); break;
      case 'view-achievements': window.location.href = 'settings.html'; break;
      case 'export-data': {
        const exportBtn = document.getElementById('export-data');
        if (exportBtn) exportBtn.click();
        else window.location.href = 'settings.html';
        break;
      }
      case 'clear-data': {
        const clearBtn = document.getElementById('clear-data');
        if (clearBtn) clearBtn.click();
        else {
          if (confirm('Clear all data? This cannot be undone.')) {
            localStorage.clear();
            window.showToast('All data cleared.');
            location.reload();
          }
        }
        break;
      }
      case 'back': history.back(); break;
      case 'forward': history.forward(); break;
      case 'refresh': location.reload(); break;
      case 'copy': {
        const selected = window.getSelection().toString();
        if (selected) {
          navigator.clipboard.writeText(selected).then(() => window.showToast('Copied!'));
        } else {
          window.showToast('Nothing selected to copy');
        }
        break;
      }
    }
  }
})();