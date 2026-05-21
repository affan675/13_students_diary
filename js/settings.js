(() => {
  // Tab switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tabContents.forEach(section => {
        section.classList.remove('active');
        if (section.id === `tab-${target}`) section.classList.add('active');
      });
    });
  });

  // Theme & Sound buttons
  const themeBtn = document.getElementById('toggle-theme');
  const soundBtn = document.getElementById('toggle-sound');

  const updateThemeButton = () => {
    const theme = localStorage.getItem('affan_theme');
    themeBtn.textContent = theme === 'dark' ? 'Switch to Light' : 'Switch to Dark';
  };
  const updateSoundButton = () => {
    soundBtn.textContent = window.getSoundEnabled() ? 'Sound ON' : 'Sound OFF';
  };

  themeBtn.addEventListener('click', () => {
    const current = localStorage.getItem('affan_theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('affan_theme', newTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);
    updateThemeButton();
    if (newTheme === 'dark') startParticles(); else stopParticles();
    window.showToast(`Theme: ${newTheme}`);
  });

  soundBtn.addEventListener('click', () => {
    const enabled = window.getSoundEnabled();
    window.setSoundEnabled(!enabled);
    updateSoundButton();
    window.showToast(`Sound ${!enabled ? 'ON' : 'OFF'}`);
  });

  // Data management
  const exportBtn = document.getElementById('export-data');
  const importBtn = document.getElementById('import-data');
  const importFile = document.getElementById('import-file');
  const clearBtn = document.getElementById('clear-data');
  const resetBtn = document.getElementById('reset-sample');

  exportBtn.addEventListener('click', () => {
    const data = { diary: window.getDiaryEntries(), notes: window.getNotes(), achievements: window.getAchievements() };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'student_diary_backup.json'; a.click();
    URL.revokeObjectURL(url);
    window.showToast('Data exported!');
  });

  importBtn.addEventListener('click', () => importFile.click());
  importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.diary) window.saveDiaryEntries(data.diary);
        if (data.notes) window.saveNotes(data.notes);
        if (data.achievements) window.saveAchievements(data.achievements);
        window.showToast('Data imported successfully!');
        location.reload();
      } catch (ex) { alert('Invalid JSON file.'); }
    };
    reader.readAsText(file);
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete ALL data?')) {
      localStorage.clear();
      window.showToast('Data cleared.');
      location.reload();
    }
  });

  resetBtn.addEventListener('click', () => {
    if (confirm('Reset to sample data? This will overwrite current data.')) {
      localStorage.setItem('affan_diary_entries', JSON.stringify([
        {id:'s1', date: new Date().toISOString().split('T')[0], mood:'😊', content:'Excited about my new diary!'},
        {id:'s2', date: new Date(Date.now()-86400000).toISOString().split('T')[0], mood:'😐', content:'Normal day at school.'}
      ]));
      localStorage.setItem('affan_notes', JSON.stringify([
        {id:'sn1', title:'Sample Note', content:'This is a sample note. Edit or delete it.', createdAt: new Date().toISOString()}
      ]));
      localStorage.setItem('affan_achievements', JSON.stringify([]));
      window.showToast('Sample data restored.');
      location.reload();
    }
  });

  // Profile - Achievements rendering
  function renderAchievements() {
    const list = document.getElementById('achievements-list');
    if (!list) return;
    const defs = window.getAllAchievementDefs ? window.getAllAchievementDefs() : [];
    const achieved = window.getAchievements();
    list.innerHTML = defs.map(def => {
      const unlocked = achieved.some(a => a.id === def.id && a.unlocked);
      return `<div class="achievement-badge ${unlocked ? '' : 'locked'}">
        <span>${unlocked ? '🏆' : '🔒'}</span> ${def.name}
      </div>`;
    }).join('');
  }

  // Initial render
  updateThemeButton();
  updateSoundButton();
  renderAchievements();

  // Re-render achievements if data changes
  window.addEventListener('storage', renderAchievements);
  // Expose for external updates
  window.renderAchievements = renderAchievements;
})();