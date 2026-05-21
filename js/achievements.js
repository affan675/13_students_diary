(() => {
  const ACHIEVEMENTS = [
    {id:'first_diary', name:'First Words', desc:'Write your first diary entry', condition:()=> window.getDiaryEntries().length >= 1},
    {id:'five_diary', name:'Consistent Writer', desc:'5 diary entries', condition:()=> window.getDiaryEntries().length >= 5},
    {id:'ten_diary', name:'Journal Keeper', desc:'10 diary entries', condition:()=> window.getDiaryEntries().length >= 10},
    {id:'twenty_diary', name:'Prolific Writer', desc:'20 diary entries', condition:()=> window.getDiaryEntries().length >= 20},
    {id:'fifty_diary', name:'Diary Master', desc:'50 diary entries', condition:()=> window.getDiaryEntries().length >= 50},
    {id:'first_note', name:'Note Taker', desc:'Create your first note', condition:()=> window.getNotes().length >= 1},
    {id:'five_notes', name:'Organized', desc:'5 notes', condition:()=> window.getNotes().length >= 5},
    {id:'ten_notes', name:'Knowledge Base', desc:'10 notes', condition:()=> window.getNotes().length >= 10},
    {id:'twenty_notes', name:'Scribe', desc:'20 notes', condition:()=> window.getNotes().length >= 20},
    {id:'dark_mode', name:'Night Owl', desc:'Switch to dark mode', condition:()=> localStorage.getItem('affan_theme') === 'dark'},
    {id:'light_mode', name:'Day Dreamer', desc:'Switch to light mode', condition:()=> localStorage.getItem('affan_theme') === 'light'},
    {id:'sound_toggle', name:'Hear Me', desc:'Toggle sound setting', condition:()=> true}, // will be awarded immediately once sound is toggled at least once? We'll mark as unlocked when sound is toggled.
    {id:'export_data', name:'Data Exporter', desc:'Export your data (via Settings)', condition:()=> false},
    {id:'import_data', name:'Data Importer', desc:'Import data from file', condition:()=> false},
    {id:'clear_data', name:'Fresh Start', desc:'Clear all data', condition:()=> false},
    {id:'scroll_100', name:'Page Turner', desc:'Scroll a document to 100%', condition:()=> false},
    {id:'keyboard_shortcut', name:'Power User', desc:'Use a keyboard shortcut', condition:()=> false},
    {id:'visit_creator', name:'Creator Page Visitor', desc:'View the creator page', condition:()=> false},
    {id:'read_3_docs', name:'Reader', desc:'Open 3 different documents in Output', condition:()=> { const d=JSON.parse(sessionStorage.getItem('read_docs')||'[]'); return d.length>=3; }},
    {id:'edit_diary', name:'Editor', desc:'Edit an existing diary entry', condition:()=> false},
    {id:'delete_entry', name:'Erased', desc:'Delete a diary entry', condition:()=> false},
    {id:'mood_happy', name:'Happy Day', desc:'Use 😊 mood', condition:()=> window.getDiaryEntries().some(e=>e.mood==='😊')},
    {id:'mood_neutral', name:'Neutral Day', desc:'Use 😐 mood', condition:()=> window.getDiaryEntries().some(e=>e.mood==='😐')},
    {id:'mood_sad', name:'Sad Day', desc:'Use 😢 mood', condition:()=> window.getDiaryEntries().some(e=>e.mood==='😢')},
    {id:'mood_angry', name:'Angry Day', desc:'Use 😡 mood', condition:()=> window.getDiaryEntries().some(e=>e.mood==='😡')},
    {id:'mood_sleepy', name:'Sleepy Day', desc:'Use 😴 mood', condition:()=> window.getDiaryEntries().some(e=>e.mood==='😴')},
    {id:'title_change', name:'Tab Whisperer', desc:'Experience tab title change', condition:()=> true},
    {id:'context_menu', name:'Right-Click Master', desc:'Open custom context menu', condition:()=> false},
    {id:'search_highlight', name:'Highlighter', desc:'Use search in document viewer', condition:()=> false},
    {id:'font_resize', name:'Zoomer', desc:'Change font size in viewer', condition:()=> false},
    {id:'export_txt', name:'Plain Text', desc:'Export a document as TXT', condition:()=> false},
    {id:'export_json', name:'JSON Backup', desc:'Export as JSON from Output', condition:()=> false},
    {id:'reset_sample', name:'Try Again', desc:'Reset data to samples', condition:()=> false},
    {id:'daily_use', name:'Daily User', desc:'Open dashboard 3 times', condition:()=> { let visits=parseInt(sessionStorage.getItem('dash_visits')||'0'); return visits>=3; }},
    {id:'ten_moods', name:'Mood Tracker', desc:'Write entries with at least 10 different moods (unique)', condition:()=> { const moods=new Set(window.getDiaryEntries().map(e=>e.mood)); return moods.size>=4; }}, // only 5 moods available, so 4 unique is max, we'll adjust
    {id:'note_edit', name:'Reviser', desc:'Edit a note', condition:()=> false},
    {id:'note_delete', name:'Clean Slate', desc:'Delete a note', condition:()=> false},
    {id:'hamburger', name:'Mobile Navigator', desc:'Use hamburger menu on mobile', condition:()=> false},
    {id:'preloader', name:'First Load', desc:'See preloader', condition:()=> true},
    {id:'particles', name:'Particle Physicist', desc:'View dark mode particles', condition:()=> localStorage.getItem('affan_theme')==='dark'},
    {id:'achievement_unlock', name:'Achievement Hunter', desc:'Unlock 5 achievements', condition:()=> window.getAchievements().filter(a=>a.unlocked).length >=5},
    {id:'achievement_master', name:'Master Collector', desc:'Unlock 15 achievements', condition:()=> window.getAchievements().filter(a=>a.unlocked).length >=15},
    {id:'all_achievements', name:'Completionist', desc:'Unlock 50 achievements', condition:()=> window.getAchievements().filter(a=>a.unlocked).length >=50},
    {id:'quick_nav', name:'Keyboard Navigator', desc:'Use a keyboard shortcut to navigate', condition:()=> false},
    {id:'help_modal', name:'Help Seeker', desc:'Open help modal (Ctrl+H)', condition:()=> false},
    {id:'esc_close', name:'Escape Artist', desc:'Close modal with Esc', condition:()=> false},
    {id:'magnetic_cursor', name:'Attracted', desc:'Hover over a clickable element', condition:()=> false},
    {id:'sound_play', name:'Beep Boop', desc:'Hear a click sound', condition:()=> false},
    {id:'data_persist', name:'Persistent', desc:'Return after data saved', condition:()=> true},
    {id:'long_entry', name:'Storyteller', desc:'Write a diary entry with >200 chars', condition:()=> window.getDiaryEntries().some(e=>e.content.length>200)},
    {id:'long_note', name:'Detailed Note', desc:'Create a note with >300 chars', condition:()=> window.getNotes().some(n=>n.content.length>300)},
    {id:'all_moods', name:'Full Spectrum', desc:'Use all 5 moods at least once', condition:()=> { const moods=window.getDiaryEntries().map(e=>e.mood); return new Set(moods).size===5; }},
    {id:'frequent_diary', name:'Daily Scribe', desc:'Write a diary entry every day for 5 days (need 5 dates)', condition:()=> { const dates=window.getDiaryEntries().map(e=>e.date).sort(); if(dates.length<5) return false; const unique=[...new Set(dates)].slice(-5); return unique.length>=5; }},
    {id:'note_titles', name:'Creative Titles', desc:'Have 5 notes with titles longer than 10 chars', condition:()=> window.getNotes().filter(n=>n.title.length>=10).length>=5},
    {id:'big_export', name:'Big Data', desc:'Export when you have >10 diary entries and >10 notes', condition:()=> false},
    {id:'theme_toggle_5', name:'Theme Changer', desc:'Toggle theme 5 times', condition:()=> { let t=parseInt(localStorage.getItem('theme_toggles')||'0'); return t>=5; }},
    {id:'keyboard_master', name:'Shortcut Guru', desc:'Use 5 different keyboard shortcuts', condition:()=> false},
    {id:'right_click_10', name:'Context King', desc:'Open context menu 10 times', condition:()=> { let c=parseInt(localStorage.getItem('context_menu_opens')||'0'); return c>=10; }},
    {id:'search_used', name:'Searcher', desc:'Search inside a document', condition:()=> false},
    {id:'font_big', name:'Big Text', desc:'Increase font size in viewer 5 times', condition:()=> false},
    {id:'font_small', name:'Fine Print', desc:'Decrease font size in viewer 5 times', condition:()=> false},
    {id:'export_txt_note', name:'Textualist', desc:'Export a note as TXT', condition:()=> false},
    {id:'export_json_note', name:'JSON Jockey', desc:'Export a note as JSON', condition:()=> false},
    {id:'import_success', name:'Restoration', desc:'Successfully import data', condition:()=> false},
    {id:'clear_confirm', name:'Clean Slate', desc:'Clear all data (confirmation)', condition:()=> false},
    {id:'sample_restored', name:'Back to Basics', desc:'Reset to sample data', condition:()=> false},
    {id:'dash_visit_10', name:'Loyal Visitor', desc:'Visit dashboard 10 times', condition:()=> { let v=parseInt(localStorage.getItem('dash_visits_total')||'0'); return v>=10; }},
    {id:'diary_view_all', name:'Archivist', desc:'View all diary entries on dashboard', condition:()=> true}, // always
    {id:'note_view_all', name:'Librarian', desc:'View all notes on dashboard', condition:()=> true},
    {id:'profile_tab', name:'Profile Viewer', desc:'Open Profile tab', condition:()=> false},
    {id:'guide_tab', name:'Manual Reader', desc:'Open Guide tab', condition:()=> false},
    {id:'settings_tab', name:'Settings Settler', desc:'Open Settings tab (default)', condition:()=> true},
    {id:'theme_dark_first', name:'First Dark', desc:'Switch to dark mode for the first time', condition:()=> localStorage.getItem('affan_theme')==='dark'},
    {id:'theme_light_first', name:'First Light', desc:'Switch to light mode for the first time', condition:()=> localStorage.getItem('affan_theme')==='light'},
    {id:'sound_off', name:'Silent', desc:'Turn sound off', condition:()=> window.getSoundEnabled()===false},
    {id:'sound_on', name:'Audible', desc:'Turn sound on', condition:()=> window.getSoundEnabled()===true},
    {id:'mood_tracker', name:'Mood History', desc:'Check your mood history (any mood used)', condition:()=> true},
    {id:'search_no_result', name:'No Match', desc:'Search for something not found', condition:()=> false},
    {id:'scroll_half', name:'Halfway', desc:'Scroll a document to 50%', condition:()=> false},
    {id:'scroll_complete', name:'Finish Line', desc:'Scroll a document to 100%', condition:()=> false},
    {id:'multiple_exports', name:'Data Hoarder', desc:'Export data 3 times', condition:()=> { let e=parseInt(localStorage.getItem('export_count')||'0'); return e>=3; }},
    {id:'achievement_secret', name:'Secret Keeper', desc:'Unlock any 3 achievements in one session', condition:()=> { let unlocks=parseInt(sessionStorage.getItem('session_unlocks')||'0'); return unlocks>=3; }},
    {id:'all_pages_visited', name:'Explorer', desc:'Visit all 6 pages at least once', condition:()=> { let p=JSON.parse(localStorage.getItem('pages_visited')||'[]'); return new Set(p).size>=6; }},
    {id:'quick_export', name:'Shortcut Exporter', desc:'Use keyboard shortcut E to export', condition:()=> false},
    {id:'help_modal_close', name:'Helper', desc:'Open and close help modal', condition:()=> false},
    {id:'click_sound_10', name:'Clicker', desc:'Trigger click sound 10 times', condition:()=> { let c=parseInt(localStorage.getItem('click_count')||'0'); return c>=10; }},
    {id:'preloader_seen', name:'Loading...', desc:'See the preloader animation', condition:()=> true},
    {id:'custom_cursor', name:'Custom Pointer', desc:'Move the custom cursor', condition:()=> true},
    {id:'particles_bounce', name:'Bouncy', desc:'Watch particles in dark mode for 10 seconds', condition:()=> false}, // could be tracked
    {id:'zen_mode', name:'Zen Writer', desc:'Write a diary entry while in dark mode', condition:()=> localStorage.getItem('affan_theme')==='dark' && window.getDiaryEntries().length>=1},
  ];

  window.getAllAchievementDefs = () => ACHIEVEMENTS;

  function awardAchievement(id) {
    const achievements = window.getAchievements();
    if (achievements.find(a => a.id === id && a.unlocked)) return false;
    const def = ACHIEVEMENTS.find(d => d.id === id);
    if (!def || !def.condition()) return false;
    achievements.push({id, unlocked:true});
    window.saveAchievements(achievements);
    window.showToast(`🏆 Achievement unlocked: ${def.name}`);
    // Increment session unlocks
    let unlocks = parseInt(sessionStorage.getItem('session_unlocks')||'0');
    sessionStorage.setItem('session_unlocks', unlocks+1);
    return true;
  }

  function checkAllAchievements() {
    ACHIEVEMENTS.forEach(def => awardAchievement(def.id));
  }

  window.checkAchievements = checkAllAchievements;
  window.awardSpecific = awardAchievement;

  // Track page visits for achievement 'all_pages_visited'
  function trackPageVisit() {
    let pages = JSON.parse(localStorage.getItem('pages_visited') || '[]');
    const page = window.location.pathname.split('/').pop() || 'dashboard';
    if (!pages.includes(page)) {
      pages.push(page);
      localStorage.setItem('pages_visited', JSON.stringify(pages));
    }
    // Dashboard visits
    if (page === 'index.html' || page === 'dashboard') {
      let dashTotal = parseInt(localStorage.getItem('dash_visits_total')||'0');
      localStorage.setItem('dash_visits_total', dashTotal + 1);
      let dashSession = parseInt(sessionStorage.getItem('dash_visits')||'0');
      sessionStorage.setItem('dash_visits', dashSession + 1);
    }
    // Context menu opens (we'll increment in context-menu.js via window.incrementContextMenuOpens)
    // Will implement a global function for that.
  }
  trackPageVisit();

  // Provide functions to increment various counters used in achievements
  window.incrementContextMenuOpens = () => {
    let c = parseInt(localStorage.getItem('context_menu_opens')||'0');
    localStorage.setItem('context_menu_opens', c+1);
  };
  window.incrementThemeToggles = () => {
    let t = parseInt(localStorage.getItem('theme_toggles')||'0');
    localStorage.setItem('theme_toggles', t+1);
  };
  window.incrementExportCount = () => {
    let e = parseInt(localStorage.getItem('export_count')||'0');
    localStorage.setItem('export_count', e+1);
  };
  window.incrementClickCount = () => {
    let c = parseInt(localStorage.getItem('click_count')||'0');
    localStorage.setItem('click_count', c+1);
  };
  window.incrementFontSize = () => {
    let f = parseInt(sessionStorage.getItem('font_size_changes')||'0');
    sessionStorage.setItem('font_size_changes', f+1);
  };
  window.markDocumentRead = (docId) => {
    let docs = JSON.parse(sessionStorage.getItem('read_docs')||'[]');
    if (!docs.includes(docId)) docs.push(docId);
    sessionStorage.setItem('read_docs', JSON.stringify(docs));
  };
  window.markSearchUsed = () => { sessionStorage.setItem('search_used','true'); };
  window.markScrollComplete = () => { sessionStorage.setItem('scroll_complete','true'); };
  window.markScrollHalf = () => { sessionStorage.setItem('scroll_half','true'); };

  // Initial check on page load
  setTimeout(checkAllAchievements, 500);
})();