(() => {
  // Initialize default data if missing
  if (!localStorage.getItem('affan_diary_entries')) {
    localStorage.setItem('affan_diary_entries', JSON.stringify([
      {id: '1', date: new Date().toISOString().split('T')[0], mood: '😊', content: 'First day using Student Diary! Feeling excited about the future.'},
      {id: '2', date: new Date(Date.now()-86400000).toISOString().split('T')[0], mood: '😐', content: 'Regular school day, studied math.'}
    ]));
  }
  if (!localStorage.getItem('affan_notes')) {
    localStorage.setItem('affan_notes', JSON.stringify([
      {id: '1', title: 'Math Formulas', content: 'Area of circle: πr²', createdAt: new Date().toISOString()},
      {id: '2', title: 'Project Ideas', content: 'Jute bag design, eco bricks research', createdAt: new Date(Date.now()-86400000).toISOString()}
    ]));
  }
  if (!localStorage.getItem('affan_theme')) localStorage.setItem('affan_theme', 'light');
  if (!localStorage.getItem('affan_sound_enabled')) localStorage.setItem('affan_sound_enabled', 'true');
  if (!localStorage.getItem('affan_achievements')) {
    // will be initialized by achievements.js, but ensure array exists
    localStorage.setItem('affan_achievements', JSON.stringify([]));
  }

  // Apply theme
  const theme = localStorage.getItem('affan_theme');
  document.body.classList.add(theme);
  document.body.classList.remove(theme === 'dark' ? 'light' : 'dark');

  // Hamburger toggle
  document.querySelector('.nav-toggle')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
  });

  // Expose global helpers
  window.getDiaryEntries = () => JSON.parse(localStorage.getItem('affan_diary_entries') || '[]');
  window.saveDiaryEntries = (entries) => localStorage.setItem('affan_diary_entries', JSON.stringify(entries));
  window.getNotes = () => JSON.parse(localStorage.getItem('affan_notes') || '[]');
  window.saveNotes = (notes) => localStorage.setItem('affan_notes', JSON.stringify(notes));
  window.getAchievements = () => JSON.parse(localStorage.getItem('affan_achievements') || '[]');
  window.saveAchievements = (achs) => localStorage.setItem('affan_achievements', JSON.stringify(achs));
  window.getSoundEnabled = () => localStorage.getItem('affan_sound_enabled') === 'true';
  window.setSoundEnabled = (val) => localStorage.setItem('affan_sound_enabled', val);

  window.showToast = (msg) => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };
})();