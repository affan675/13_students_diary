(() => {
  const helpModal = document.createElement('div');
  helpModal.id = 'help-modal';
  helpModal.style.cssText = 'display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:var(--bg-card); border:1px solid var(--border); padding:2rem; z-index:10002; border-radius:12px; max-width:400px; width:90%;';
  helpModal.innerHTML = `
    <h3>Keyboard Shortcuts</h3>
    <ul>
      <li><strong>T</strong> - Toggle theme</li>
      <li><strong>D</strong> - Dashboard</li>
      <li><strong>I</strong> - Diary</li>
      <li><strong>N</strong> - Notes</li>
      <li><strong>O</strong> - Output</li>
      <li><strong>S</strong> - Settings</li>
      <li><strong>C</strong> - Creator</li>
      <li><strong>E</strong> - Export data (settings)</li>
      <li><strong>Ctrl+H</strong> - Show this help</li>
      <li><strong>Esc</strong> - Close modals</li>
    </ul>
    <button id="close-help" class="btn primary-btn">Close</button>
  `;
  document.body.appendChild(helpModal);
  document.getElementById('close-help').addEventListener('click', () => helpModal.style.display='none');

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
    const key = e.key.toLowerCase();
    if (e.ctrlKey && key === 'h') {
      e.preventDefault();
      helpModal.style.display = 'block';
      return;
    }
    if (key === 'escape') {
      helpModal.style.display = 'none';
      return;
    }
    if (key === 't') {
      const current = localStorage.getItem('affan_theme');
      localStorage.setItem('affan_theme', current==='dark'?'light':'dark');
      document.body.classList.remove('light','dark');
      document.body.classList.add(localStorage.getItem('affan_theme'));
      if (localStorage.getItem('affan_theme')==='dark') startParticles(); else stopParticles();
    }
    else if (key === 'd') window.location.href = 'index.html';
    else if (key === 'i') window.location.href = 'diary.html';
    else if (key === 'n') window.location.href = 'notes.html';
    else if (key === 'o') window.location.href = 'output.html';
    else if (key === 's') window.location.href = 'settings.html';
    else if (key === 'c') window.location.href = 'creator.html';
    else if (key === 'e') {
      if (window.location.pathname.includes('settings')) {
        document.getElementById('export-data')?.click();
      }
    }
  });
})();