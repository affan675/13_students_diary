(() => {
  const form = document.getElementById('note-form');
  const titleInput = document.getElementById('note-title');
  const contentInput = document.getElementById('note-content');
  const editId = document.getElementById('edit-note-id');
  const cancelBtn = document.getElementById('cancel-note-edit');
  const container = document.getElementById('notes-container');
  let notes = window.getNotes();

  const renderNotes = () => {
    notes.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    container.innerHTML = notes.map(n => `
      <div class="note-card" data-id="${n.id}">
        <div class="note-title">${n.title}</div>
        <div class="note-date">${new Date(n.createdAt).toLocaleString()}</div>
        <div class="note-actions">
          <a href="output.html#note-${n.id}" class="btn read-btn">Read</a>
          <button class="edit-note btn secondary-btn" data-id="${n.id}">Edit</button>
          <button class="delete-note btn danger-btn" data-id="${n.id}">Delete</button>
        </div>
      </div>
    `).join('');
    attachNoteEvents();
    window.saveNotes(notes);
  };

  const attachNoteEvents = () => {
    document.querySelectorAll('.edit-note').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.target.dataset.id;
        const note = notes.find(n => n.id === id);
        if (note) {
          editId.value = note.id;
          titleInput.value = note.title;
          contentInput.value = note.content;
          cancelBtn.style.display = 'inline-block';
          form.querySelector('button[type="submit"]').textContent = 'Update Note';
        }
      });
    });
    document.querySelectorAll('.delete-note').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete this note?')) {
          const id = e.target.dataset.id;
          notes = notes.filter(n => n.id !== id);
          renderNotes();
        }
      });
    });
    document.querySelectorAll('.note-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't expand if clicking a button or the Read link
        if (e.target.closest('button, a')) return;
        const id = card.dataset.id;
        const note = notes.find(n => n.id === id);
        if (note) {
          alert(`Title: ${note.title}\n\n${note.content}`);
        }
      });
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title || !content) return;
    if (editId.value) {
      const note = notes.find(n => n.id === editId.value);
      if (note) {
        note.title = title;
        note.content = content;
      }
      editId.value = '';
      cancelBtn.style.display = 'none';
      form.querySelector('button[type="submit"]').textContent = 'Save Note';
    } else {
      notes.push({ id: Date.now().toString(), title, content, createdAt: new Date().toISOString() });
    }
    renderNotes();
    form.reset();
  });

  cancelBtn.addEventListener('click', () => {
    editId.value = '';
    cancelBtn.style.display = 'none';
    form.querySelector('button[type="submit"]').textContent = 'Save Note';
    form.reset();
  });

  renderNotes();
})();