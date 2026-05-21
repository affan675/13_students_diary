(() => {
  const form = document.getElementById('diary-form');
  const dateInput = document.getElementById('entry-date');
  const contentInput = document.getElementById('entry-content');
  const editId = document.getElementById('edit-id');
  const cancelBtn = document.getElementById('cancel-edit');
  const container = document.getElementById('entries-container');
  let entries = window.getDiaryEntries();

  dateInput.value = new Date().toISOString().split('T')[0];

  const renderEntries = () => {
    entries.sort((a,b) => new Date(b.date) - new Date(a.date));
    container.innerHTML = entries.map(e => `
      <div class="entry-card">
        <div class="entry-info">
          <span class="entry-mood">${e.mood}</span>
          <span class="entry-date">${e.date}</span>
          <p>${e.content.substring(0,50)}${e.content.length>50?'...':''}</p>
        </div>
        <div class="entry-actions">
          <a href="output.html#diary-${e.id}" class="btn read-btn">Read</a>
          <button class="edit-entry btn secondary-btn" data-id="${e.id}">Edit</button>
          <button class="delete-entry btn danger-btn" data-id="${e.id}">Delete</button>
        </div>
      </div>
    `).join('');
    attachEntryEvents();
    window.saveDiaryEntries(entries);
  };

  const attachEntryEvents = () => {
    document.querySelectorAll('.edit-entry').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const entry = entries.find(en => en.id === id);
        if (entry) {
          editId.value = entry.id;
          dateInput.value = entry.date;
          contentInput.value = entry.content;
          document.querySelector(`input[name="mood"][value="${entry.mood}"]`).checked = true;
          cancelBtn.style.display = 'inline-block';
          form.querySelector('button[type="submit"]').textContent = 'Update Entry';
        }
      });
    });
    document.querySelectorAll('.delete-entry').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (confirm('Delete this entry?')) {
          const id = e.target.dataset.id;
          entries = entries.filter(en => en.id !== id);
          renderEntries();
        }
      });
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const mood = document.querySelector('input[name="mood"]:checked').value;
    const date = dateInput.value;
    const content = contentInput.value.trim();
    if (!content) return;
    if (editId.value) {
      const entry = entries.find(en => en.id === editId.value);
      if (entry) {
        entry.date = date;
        entry.mood = mood;
        entry.content = content;
      }
      editId.value = '';
      cancelBtn.style.display = 'none';
      form.querySelector('button[type="submit"]').textContent = 'Save Entry';
    } else {
      entries.push({ id: Date.now().toString(), date, mood, content });
    }
    renderEntries();
    form.reset();
    dateInput.value = new Date().toISOString().split('T')[0];
    document.getElementById('mood-happy').checked = true;
  });

  cancelBtn.addEventListener('click', () => {
    editId.value = '';
    cancelBtn.style.display = 'none';
    form.querySelector('button[type="submit"]').textContent = 'Save Entry';
    form.reset();
    dateInput.value = new Date().toISOString().split('T')[0];
    document.getElementById('mood-happy').checked = true;
  });

  renderEntries();
})();