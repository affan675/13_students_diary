(() => {
  const select = document.getElementById('doc-select');
  const viewer = document.getElementById('viewer-content');
  const progressFill = document.getElementById('scroll-progress');
  const viewerContainer = document.querySelector('.document-viewer');
  const searchInput = document.getElementById('search-input');
  let currentContent = '';

  const populateSelect = () => {
    const diary = window.getDiaryEntries();
    const notes = window.getNotes();
    select.innerHTML = '<option value="">-- Select --</option>';
    diary.forEach(e => {
      const opt = document.createElement('option');
      opt.value = `diary-${e.id}`;
      opt.textContent = `📅 ${e.date} - ${e.mood}`;
      select.appendChild(opt);
    });
    notes.forEach(n => {
      const opt = document.createElement('option');
      opt.value = `note-${n.id}`;
      opt.textContent = `📝 ${n.title}`;
      select.appendChild(opt);
    });
  };

  const displayContent = (type, id) => {
    if (type === 'diary') {
      const entry = window.getDiaryEntries().find(e => e.id === id);
      if (entry) {
        currentContent = `Date: ${entry.date}\nMood: ${entry.mood}\n\n${entry.content}`;
      }
    } else if (type === 'note') {
      const note = window.getNotes().find(n => n.id === id);
      if (note) {
        currentContent = `Title: ${note.title}\nCreated: ${new Date(note.createdAt).toLocaleString()}\n\n${note.content}`;
      }
    }
    viewer.textContent = currentContent;
    highlightSearch();
  };

  const loadFromHash = () => {
    const hash = window.location.hash.substring(1); // remove '#'
    if (!hash) return;
    const [type, id] = hash.split('-');
    if (type && id) {
      // Find the option that matches
      const optionValue = `${type}-${id}`;
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === optionValue) {
          select.selectedIndex = i;
          displayContent(type, id);
          break;
        }
      }
    }
  };

  select.addEventListener('change', () => {
    const val = select.value;
    if (!val) { viewer.textContent = ''; currentContent = ''; return; }
    const [type, id] = val.split('-');
    displayContent(type, id);
  });

  viewerContainer.addEventListener('scroll', () => {
    const scrollTop = viewerContainer.scrollTop;
    const scrollHeight = viewerContainer.scrollHeight - viewerContainer.clientHeight;
    const progress = scrollHeight ? (scrollTop / scrollHeight) * 100 : 0;
    progressFill.style.width = progress + '%';
  });

  document.getElementById('font-increase').addEventListener('click', () => {
    const currentSize = parseFloat(getComputedStyle(viewer).fontSize);
    viewer.style.fontSize = (currentSize + 2) + 'px';
  });
  document.getElementById('font-decrease').addEventListener('click', () => {
    const currentSize = parseFloat(getComputedStyle(viewer).fontSize);
    viewer.style.fontSize = Math.max(10, currentSize - 2) + 'px';
  });

  const highlightSearch = () => {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
      viewer.innerHTML = currentContent;
      return;
    }
    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    viewer.innerHTML = currentContent.replace(regex, '<mark class="search-highlight">$1</mark>');
  };
  searchInput.addEventListener('input', highlightSearch);

  document.getElementById('export-txt').addEventListener('click', () => {
    const blob = new Blob([currentContent], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'export.txt'; a.click();
    URL.revokeObjectURL(url);
  });
  document.getElementById('export-json').addEventListener('click', () => {
    const data = { diary: window.getDiaryEntries(), notes: window.getNotes() };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'data.json'; a.click();
    URL.revokeObjectURL(url);
  });

  populateSelect();
  loadFromHash();
})();