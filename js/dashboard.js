(() => {
  const renderDashboard = () => {
    const diaryEntries = window.getDiaryEntries().slice().sort((a,b)=> new Date(b.date) - new Date(a.date));
    const notes = window.getNotes().slice().sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
    document.getElementById('diary-count').textContent = diaryEntries.length;
    document.getElementById('notes-count').textContent = notes.length;

    const recentDiary = diaryEntries.slice(0,5);
    const diaryContainer = document.getElementById('recent-diary');
    diaryContainer.innerHTML = recentDiary.map(e => `
      <div class="recent-item">
        <div class="meta">${e.date} · ${e.mood}</div>
        <div>${e.content.substring(0,50)}${e.content.length>50?'...':''}</div>
        <a href="output.html#diary-${e.id}" class="btn read-btn">Read</a>
      </div>
    `).join('') || '<p>No entries yet.</p>';

    const recentNotes = notes.slice(0,5);
    const notesContainer = document.getElementById('recent-notes');
    notesContainer.innerHTML = recentNotes.map(n => `
      <div class="recent-item">
        <div class="meta">${new Date(n.createdAt).toLocaleDateString()}</div>
        <div><strong>${n.title}</strong> - ${n.content.substring(0,50)}${n.content.length>50?'...':''}</div>
        <a href="output.html#note-${n.id}" class="btn read-btn">Read</a>
      </div>
    `).join('') || '<p>No notes yet.</p>';
  };

  if (document.getElementById('recent-diary')) {
    renderDashboard();
    window.addEventListener('storage', renderDashboard);
  }
})();