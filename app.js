/**
 * RAW — CAMPUS UNFILTERED
 * Interactive Prototype & Application Logic
 * LBS Institute of Technology for Women, Poojappura, Thiruvananthapuram
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. CONSTANTS & EVENT DATA STORE
     ========================================================================== */

  // The 7 official events
  const INITIAL_EVENTS = [
    {
      id: 'codestorm',
      num: '01',
      name: 'CodeStorm',
      category: 'TECH',
      badgeClass: 'cat-tech',
      dateTime: '15 Mar 2026 • 9:00 AM',
      venue: 'Computer Lab Block (Labs 4 & 5)',
      description: 'A 6-hour coding showdown. Logic. Speed. Glory. Algorithms, debugging, and competitive hack sprint.',
      totalSeats: 60,
      initialSeats: 32,
      artThumb: 'assets/thumb_codestorm.png',
      fallbackIcon: '💻',
      mascotSticker: 'assets/miso_code_trans.png'
    },
    {
      id: 'carpe-dictum',
      num: '02',
      name: 'Carpe Dictum',
      category: 'LITERARY',
      badgeClass: 'cat-literary',
      dateTime: '15 Mar 2026 • 11:00 AM',
      venue: 'Seminar Hall (Admin Block)',
      description: 'Words have power. Use yours. Elite parliamentary debate, slam poetry, and creative storytelling arena.',
      totalSeats: 50,
      initialSeats: 28,
      artThumb: 'assets/event_carpe_card.png',
      fallbackIcon: '🎙️',
      mascotSticker: 'assets/miso_vibing_trans.png'
    },
    {
      id: 'dionysia',
      num: '03',
      name: 'Dionysia',
      category: 'CULTURAL',
      badgeClass: 'cat-cultural',
      dateTime: '16 Mar 2026 • 4:00 PM',
      venue: 'Main Stage (Open Amphitheatre)',
      description: 'The grand cultural showcase. Dance, drama, fashion runway & theatrical magic under the spotlights.',
      totalSeats: 200,
      initialSeats: 120,
      artThumb: 'assets/event_dionysia_card.png',
      fallbackIcon: '🎭',
      mascotSticker: 'assets/miso_chill_trans.png'
    },
    {
      id: 'neon-rave',
      num: '04',
      name: 'Neon Rave',
      category: 'MUSIC',
      badgeClass: 'cat-music',
      dateTime: '16 Mar 2026 • 8:00 PM',
      venue: 'Open Arena & DJ Dome',
      description: 'Lights. Beats. Lose yourself. Underground synthwave, live student bands, electronic drops & neon chaos.',
      totalSeats: 250,
      initialSeats: 150,
      artThumb: 'assets/event_neonrave_card.png',
      fallbackIcon: '⚡',
      mascotSticker: 'assets/miso_music_trans.png'
    },
    {
      id: 'robowar',
      num: '05',
      name: 'RoboWar',
      category: 'TECH',
      badgeClass: 'cat-tech',
      dateTime: '17 Mar 2026 • 10:00 AM',
      venue: 'Workshop Area (Mechanical Bay)',
      description: 'Build. Battle. Dominate. Heavyweight combat bots clash in a 360-degree steel and polycarbonate arena!',
      totalSeats: 40,
      initialSeats: 18,
      artThumb: 'assets/thumb_robowar.png',
      fallbackIcon: '🤖',
      mascotSticker: 'assets/sticker_chaos_trans.png'
    },
    {
      id: 'canvasclash',
      num: '06',
      name: 'CanvasClash',
      category: 'ART & DESIGN',
      badgeClass: 'cat-art',
      dateTime: '17 Mar 2026 • 1:00 PM',
      venue: 'Design Studio & Courtyard',
      description: 'Create in chaos. Art is the weapon. Speed spray graffiti, digital illustration, and live neo-mural duel.',
      totalSeats: 45,
      initialSeats: 24,
      artThumb: 'assets/thumb_canvasclash.png',
      fallbackIcon: '🎨',
      mascotSticker: 'assets/miso_camera_trans.png'
    },
    {
      id: 'syncra',
      num: '07',
      name: 'Syncra',
      category: 'DANCE',
      badgeClass: 'cat-dance',
      dateTime: '17 Mar 2026 • 5:00 PM',
      venue: 'Auditorium Main Stage',
      description: 'Sync your moves. Feel the beat. Western, hip-hop, contemporary and street-style crew battles.',
      totalSeats: 80,
      initialSeats: 42,
      artThumb: 'assets/event_syncra_card.png',
      fallbackIcon: '🕺',
      mascotSticker: 'assets/miso_dance_trans.png'
    }
  ];

  // Storage Keys
  const STORAGE_KEYS = {
    THEME: 'raw_fest_theme',
    SEATS: 'raw_fest_seats_v1',
    REGISTRATIONS: 'raw_fest_registrations_v1',
    AUDIO_ENABLED: 'raw_fest_audio_pref',
    MASCOT_DISMISSED: 'raw_fest_mascot_dismissed'
  };

  // State Management
  const state = {
    events: [],
    seats: {},
    registrations: [],
    currentTheme: 'dark',
    activeCategory: 'ALL',
    searchQuery: '',
    selectedEventForReg: null,
    pendingCancelRegId: null,
    isAudioPlaying: false
  };

  /* ==========================================================================
     2. LOCAL STORAGE & DATA INITIALIZATION
     ========================================================================== */
  function initStorageAndState() {
    // 1. Theme
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      state.currentTheme = savedTheme;
    } else {
      // Default to dark mode as requested by RAW aesthetic
      state.currentTheme = 'dark';
    }
    applyTheme(state.currentTheme, false);

    // 2. Seats
    try {
      const savedSeats = JSON.parse(localStorage.getItem(STORAGE_KEYS.SEATS));
      if (savedSeats && typeof savedSeats === 'object') {
        state.seats = savedSeats;
      } else {
        INITIAL_EVENTS.forEach(ev => {
          state.seats[ev.id] = ev.initialSeats;
        });
        saveSeats();
      }
    } catch (e) {
      INITIAL_EVENTS.forEach(ev => {
        state.seats[ev.id] = ev.initialSeats;
      });
      saveSeats();
    }

    // 3. Registrations
    try {
      const savedRegs = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS));
      if (Array.isArray(savedRegs)) {
        state.registrations = savedRegs;
      } else {
        // Pre-populate with 1 sample confirmed registration to demonstrate My Events out of the box!
        state.registrations = [
          {
            id: 'reg-sample-1',
            eventId: 'codestorm',
            eventName: 'CodeStorm',
            category: 'TECH',
            dateTime: '15 Mar 2026 • 9:00 AM',
            venue: 'Computer Lab Block (Labs 4 & 5)',
            studentName: 'Riya Nair',
            email: 'riya.nair@example.com',
            phone: '9876543210',
            ticketId: 'RAW-2026-CS-4921',
            timestamp: new Date().toISOString()
          }
        ];
        saveRegistrations();
      }
    } catch (e) {
      state.registrations = [];
      saveRegistrations();
    }

    state.events = [...INITIAL_EVENTS];
  }

  function saveSeats() {
    try {
      localStorage.setItem(STORAGE_KEYS.SEATS, JSON.stringify(state.seats));
    } catch (e) {
      console.warn('LocalStorage error saving seats:', e);
    }
  }

  function saveRegistrations() {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(state.registrations));
    } catch (e) {
      console.warn('LocalStorage error saving registrations:', e);
    }
  }

  /* ==========================================================================
     3. THEME TOGGLE (DISCO LIGHT VS AFTER DARK)
     ========================================================================== */
  function applyTheme(theme, animateMiso = true) {
    state.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);

    // Update Header and Footer labels
    const themeLabel = document.getElementById('themeModeLabel');
    const footerLabel = document.getElementById('footerThemeIndicator');
    const toggleBtn = document.getElementById('themeToggleBtn');

    if (theme === 'light') {
      if (themeLabel) themeLabel.textContent = 'DISCO LIGHT';
      if (footerLabel) footerLabel.textContent = 'Mode: DISCO LIGHT';
      if (toggleBtn) toggleBtn.setAttribute('aria-checked', 'true');
    } else {
      if (themeLabel) themeLabel.textContent = 'AFTER DARK';
      if (footerLabel) footerLabel.textContent = 'Mode: AFTER DARK';
      if (toggleBtn) toggleBtn.setAttribute('aria-checked', 'false');
    }

    // Trigger Miso disco reaction if user initiated toggle
    if (animateMiso) {
      triggerMisoThemeDance();
    }
  }

  function toggleTheme() {
    const nextTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
    showToast(nextTheme === 'light' ? 'Switched to Disco Light Mode 🪩' : 'Entered After Dark Mode ⚡');
  }

  function triggerMisoThemeDance() {
    const heroMiso = document.getElementById('heroMisoImg');
    const bubble = document.getElementById('heroMisoBubble');
    if (heroMiso) {
      heroMiso.style.transform = 'scale(1.2) rotate(360deg)';
      setTimeout(() => {
        heroMiso.style.transform = '';
      }, 600);
    }
    if (bubble) {
      bubble.innerHTML = state.currentTheme === 'light' 
        ? '<span>DISCO LIGHTS ON! 🪩✨</span>' 
        : '<span>AFTER DARK MODE! ⚡🖤</span>';
    }
  }

  /* ==========================================================================
     4. COUNTDOWN TIMER
     ========================================================================== */
  function initCountdown() {
    // Fest target date: March 15, 2026, 09:00:00 IST
    const festDate = new Date('2026-03-15T09:00:00+05:30').getTime();

    const elDays = document.getElementById('countDays');
    const elHours = document.getElementById('countHours');
    const elMins = document.getElementById('countMins');
    const elSecs = document.getElementById('countSecs');

    function update() {
      const now = new Date().getTime();
      const distance = festDate - now;

      if (distance <= 0) {
        if (elDays) elDays.textContent = '00';
        if (elHours) elHours.textContent = '00';
        if (elMins) elMins.textContent = '00';
        if (elSecs) elSecs.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (elDays) elDays.textContent = String(days).padStart(2, '0');
      if (elHours) elHours.textContent = String(hours).padStart(2, '0');
      if (elMins) elMins.textContent = String(minutes).padStart(2, '0');
      if (elSecs) elSecs.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  /* ==========================================================================
     5. DISCO BALL 3D CANVAS RENDERER & INTERACTION
     ========================================================================== */
  function initDiscoBallCanvas() {
    const canvas = document.getElementById('discoBallCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2 - 15;
    const radius = 80;

    let rotY = 0;
    let rotX = 0.2;
    let speed = 0.015;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let flareIntensity = 0;

    // Disco ball mirror facets grid
    const rings = 14;
    const facetsPerRing = 26;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Hanging string
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, centerY - radius);
      ctx.strokeStyle = state.currentTheme === 'light' ? '#191919' : '#AAAAAA';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Ambient ball base glow
      const baseGrad = ctx.createRadialGradient(
        centerX - radius * 0.3, centerY - radius * 0.3, 5,
        centerX, centerY, radius * 1.3
      );
      if (state.currentTheme === 'light') {
        baseGrad.addColorStop(0, '#FFFFFF');
        baseGrad.addColorStop(0.5, '#D5CEFA');
        baseGrad.addColorStop(1, '#8A7BE0');
      } else {
        baseGrad.addColorStop(0, '#FFFFFF');
        baseGrad.addColorStop(0.4, '#7655F7');
        baseGrad.addColorStop(1, '#1A1233');
      }
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = baseGrad;
      ctx.fill();

      // Draw reflective facets
      for (let r = 0; r < rings; r++) {
        const phi = (r / rings) * Math.PI - Math.PI / 2;
        const ringRadius = radius * Math.cos(phi);
        const yPos = centerY + radius * Math.sin(phi);

        for (let f = 0; f < facetsPerRing; f++) {
          const theta = (f / facetsPerRing) * Math.PI * 2 + rotY;

          // 3D coordinates on sphere
          const x3d = ringRadius * Math.sin(theta);
          const z3d = ringRadius * Math.cos(theta);

          // Only draw front-facing facets
          if (z3d > 0) {
            const xPos = centerX + x3d;
            const facetWidth = (Math.PI * 2 * ringRadius / facetsPerRing) * 0.92;
            const facetHeight = (radius * Math.PI / rings) * 0.92;

            // Specular reflection factor
            const normalZ = z3d / radius;
            const lightDist = Math.sin(theta * 2 + rotY * 3);
            const specular = Math.pow(Math.max(0, normalZ * (0.6 + 0.4 * lightDist)), 2);

            // Shading color
            ctx.save();
            ctx.translate(xPos, yPos);
            ctx.beginPath();
            ctx.rect(-facetWidth / 2, -facetHeight / 2, facetWidth, facetHeight);

            if (specular > 0.7 || Math.random() < (0.02 + flareIntensity * 0.1)) {
              // Bright reflection glint
              ctx.fillStyle = '#FFFFFF';
            } else if (specular > 0.4) {
              ctx.fillStyle = '#D7FF64'; // Acid lime accent reflection
            } else {
              const shade = Math.floor(140 + normalZ * 100);
              ctx.fillStyle = `rgb(${shade}, ${shade - 20}, ${shade + 30})`;
            }
            ctx.fill();

            // Facet border
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Specular flare if triggered
      if (flareIntensity > 0) {
        ctx.save();
        const flareGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius * 1.8);
        flareGrad.addColorStop(0, `rgba(255, 255, 255, ${flareIntensity * 0.9})`);
        flareGrad.addColorStop(0.3, `rgba(215, 255, 100, ${flareIntensity * 0.6})`);
        flareGrad.addColorStop(0.7, `rgba(118, 85, 247, ${flareIntensity * 0.4})`);
        flareGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = flareGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        flareIntensity = Math.max(0, flareIntensity - 0.02);
      }

      // Natural idle rotation
      if (!isDragging) {
        rotY += speed;
      }

      requestAnimationFrame(draw);
    }

    draw();

    // Mouse / Touch Dragging
    function startDrag(e) {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      lastMouseX = clientX;
      lastMouseY = clientY;
    }

    function doDrag(e) {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - lastMouseX;
      rotY += deltaX * 0.015;
      speed = deltaX * 0.005;
      lastMouseX = clientX;
    }

    function endDrag() {
      isDragging = false;
      // normalize idle speed
      if (Math.abs(speed) > 0.05) {
        speed = Math.sign(speed) * 0.03;
      } else if (Math.abs(speed) < 0.01) {
        speed = 0.015;
      }
    }

    canvas.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', endDrag);

    canvas.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchmove', doDrag, { passive: true });
    window.addEventListener('touchend', endDrag);

    // Flash flare button
    const flashBtn = document.getElementById('discoFlashBtn');
    if (flashBtn) {
      flashBtn.addEventListener('click', () => {
        flareIntensity = 1.0;
        speed = 0.06;
        showToast('Disco lights spotlight triggered! ✨');
      });
    }
  }

  /* ==========================================================================
     6. WEB AUDIO API SYNTHESIZER (DISCO BEAT PLAYER)
     ========================================================================== */
  let audioCtx = null;
  let beatTimer = null;
  let step = 0;

  function initAudioSynth() {
    const audioBtn = document.getElementById('audioBeatToggle');
    if (!audioBtn) return;

    audioBtn.addEventListener('click', toggleDiscoBeat);
  }

  function toggleDiscoBeat() {
    const audioBtn = document.getElementById('audioBeatToggle');
    const audioText = audioBtn.querySelector('.audio-text');

    if (state.isAudioPlaying) {
      // Stop
      stopDiscoBeat();
      state.isAudioPlaying = false;
      audioBtn.classList.remove('playing');
      if (audioText) audioText.textContent = 'BEAT: OFF';
      showToast('Disco synth paused ⏸️');
    } else {
      // Start
      startDiscoBeat();
      state.isAudioPlaying = true;
      audioBtn.classList.add('playing');
      if (audioText) audioText.textContent = 'BEAT: ON';
      showToast('Grooving to RAW Disco Beat! 🪩⚡');
    }
  }

  function startDiscoBeat() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    step = 0;
    const tempo = 124; // Standard disco BPM
    const stepDurationMs = (60 / tempo / 4) * 1000; // 16th note

    // Funk Bassline notes frequencies (F, G#, Bb, C)
    const bassNotes = [
      87.31, 0, 87.31, 0,
      103.83, 0, 116.54, 0,
      87.31, 0, 87.31, 130.81,
      116.54, 0, 103.83, 0
    ];

    beatTimer = setInterval(() => {
      const time = audioCtx.currentTime;

      // 1. Kick on every quarter note (step 0, 4, 8, 12)
      if (step % 4 === 0) {
        playKick(time);
      }

      // 2. Hi-Hat on off-beats (step 2, 6, 10, 14)
      if (step % 2 === 0) {
        playHiHat(time, step % 4 !== 0);
      }

      // 3. Disco Bassline
      const noteFreq = bassNotes[step % 16];
      if (noteFreq > 0) {
        playBassNote(time, noteFreq);
      }

      step = (step + 1) % 16;
    }, stepDurationMs);
  }

  function stopDiscoBeat() {
    if (beatTimer) {
      clearInterval(beatTimer);
      beatTimer = null;
    }
  }

  function playKick(time) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + 0.15);
  }

  function playHiHat(time, isOpen) {
    if (!audioCtx) return;
    // White noise buffer for hi-hat
    const bufferSize = audioCtx.sampleRate * (isOpen ? 0.08 : 0.03);
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    // Highpass filter for crispness
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7500;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(isOpen ? 0.35 : 0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + (isOpen ? 0.08 : 0.03));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    noise.start(time);
  }

  function playBassNote(time, freq) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, time);
    filter.frequency.exponentialRampToValueAtTime(150, time + 0.18);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.28, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + 0.18);
  }

  /* ==========================================================================
     7. EVENT DISCOVERY & FILTERING ENGINE
     ========================================================================== */
  function initEventDiscovery() {
    const searchInput = document.getElementById('eventSearchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const categoryPills = document.querySelectorAll('.category-pill');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    const emptyResetBtn = document.getElementById('emptyResetBtn');

    // Search Input Event
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        if (clearBtn) {
          clearBtn.style.display = state.searchQuery ? 'flex' : 'none';
        }
        renderEventsGrid();
      });
    }

    // Clear Search Button
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        state.searchQuery = '';
        clearBtn.style.display = 'none';
        renderEventsGrid();
      });
    }

    // Category Filter Pills
    categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        categoryPills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
        state.activeCategory = pill.getAttribute('data-category');
        renderEventsGrid();
      });
    });

    // Reset Filters
    function resetAllFilters() {
      state.searchQuery = '';
      state.activeCategory = 'ALL';
      if (searchInput) searchInput.value = '';
      if (clearBtn) clearBtn.style.display = 'none';
      categoryPills.forEach(p => {
        const isAll = p.getAttribute('data-category') === 'ALL';
        p.classList.toggle('active', isAll);
        p.setAttribute('aria-selected', isAll ? 'true' : 'false');
      });
      renderEventsGrid();
    }

    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetAllFilters);
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAllFilters);

    // Initial render
    renderEventsGrid();
  }

  function getFilteredEvents() {
    return state.events.filter(ev => {
      // Category match
      const matchesCategory = (state.activeCategory === 'ALL') || 
        (state.activeCategory === ev.category) ||
        (state.activeCategory === 'TECH' && ev.category === 'TECH');

      // Search query match (by name, venue, category, or description)
      const matchesSearch = !state.searchQuery || 
        ev.name.toLowerCase().includes(state.searchQuery) ||
        ev.venue.toLowerCase().includes(state.searchQuery) ||
        ev.category.toLowerCase().includes(state.searchQuery) ||
        ev.description.toLowerCase().includes(state.searchQuery);

      return matchesCategory && matchesSearch;
    });
  }

  function renderEventsGrid() {
    const grid = document.getElementById('eventsGrid');
    const emptyState = document.getElementById('emptySearchState');
    const statusBar = document.getElementById('filterStatusBar');
    const statusText = document.getElementById('filterStatusText');

    if (!grid) return;

    const filtered = getFilteredEvents();

    // Update filter status bar
    const isFiltered = state.activeCategory !== 'ALL' || state.searchQuery.length > 0;
    if (statusBar) {
      statusBar.style.display = isFiltered ? 'flex' : 'none';
      if (statusText) {
        statusText.textContent = `Showing ${filtered.length} of ${state.events.length} events (Filtered)`;
      }
    }

    // Handle Empty State
    if (filtered.length === 0) {
      grid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    } else {
      grid.style.display = 'grid';
      if (emptyState) emptyState.style.display = 'none';
    }

    // Build Cards HTML
    grid.innerHTML = filtered.map(ev => {
      const seatsLeft = state.seats[ev.id] !== undefined ? state.seats[ev.id] : ev.initialSeats;
      const isFull = seatsLeft <= 0;
      const isRegistered = state.registrations.some(r => r.eventId === ev.id);
      const capacityPercent = Math.min(100, Math.max(0, ((ev.totalSeats - seatsLeft) / ev.totalSeats) * 100));

      return `
        <article class="event-card ${ev.badgeClass} ${isFull ? 'event-full' : ''}" data-event-id="${ev.id}">
          
          <!-- Card Header -->
          <div class="card-top-row">
            <div class="card-header-tags">
              <span class="card-num-badge">${ev.num}</span>
              <span class="card-cat-badge">${ev.category}</span>
            </div>
            
            <img 
              src="${ev.mascotSticker}" 
              alt="${ev.name} mascot sticker" 
              class="card-art-thumb" 
              title="Official Mascot for ${ev.name}"
            />
          </div>

          <!-- Title & Description -->
          <div class="card-title-group">
            <h3 class="card-event-name">${ev.name}</h3>
            <p class="card-description">${ev.description}</p>
          </div>

          <!-- Metadata Strip -->
          <div class="card-meta-list">
            <div class="card-meta-item">
              <span class="meta-icon">🗓️</span>
              <span>${ev.dateTime}</span>
            </div>
            <div class="card-meta-item">
              <span class="meta-icon">📍</span>
              <span>${ev.venue}</span>
            </div>
          </div>

          <!-- Seats Left Indicator -->
          <div class="card-seats-wrapper">
            <div class="seats-status-row">
              <span class="seats-text">AVAILABILITY:</span>
              <span class="seats-count-highlight">${seatsLeft} / ${ev.totalSeats} seats left</span>
            </div>
            <div class="seats-progress-track">
              <div class="seats-progress-bar" style="width: ${capacityPercent}%"></div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="card-action-row">
            ${isRegistered ? `
              <div class="badge-registered" title="You are confirmed for this event">
                <span>✓ REGISTERED</span>
              </div>
            ` : isFull ? `
              <div class="badge-full" aria-disabled="true">
                <span>EVENT FULL</span>
              </div>
            ` : `
              <button 
                class="btn btn-lime btn-card-register" 
                data-event-id="${ev.id}"
                aria-label="Register for ${ev.name}"
              >
                <span>REGISTER NOW</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            `}
          </div>

        </article>
      `;
    }).join('');

    // Attach click events to register buttons
    grid.querySelectorAll('.btn-card-register').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const eventId = e.currentTarget.getAttribute('data-event-id');
        openRegistrationModal(eventId);
      });
    });
  }

  /* ==========================================================================
     8. REGISTRATION & VALIDATION ENGINE
     ========================================================================== */
  function initRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    const closeBtn = document.getElementById('closeRegModalBtn');
    const form = document.getElementById('registrationForm');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeRegistrationModal);
    }

    if (modal) {
      // Backdrop click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeRegistrationModal();
        }
      });
    }

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeRegistrationModal();
        closeSuccessModal();
        closeTrailerModal();
        closeCancelModal();
      }
    });

    // Form inputs blur validation
    const nameInput = document.getElementById('regFullName');
    const emailInput = document.getElementById('regEmail');
    const phoneInput = document.getElementById('regPhone');

    if (nameInput) {
      nameInput.addEventListener('blur', () => validateName(nameInput.value));
      nameInput.addEventListener('input', () => clearError('nameError', nameInput));
    }
    if (emailInput) {
      emailInput.addEventListener('blur', () => validateEmail(emailInput.value));
      emailInput.addEventListener('input', () => clearError('emailError', emailInput));
    }
    if (phoneInput) {
      phoneInput.addEventListener('blur', () => validatePhone(phoneInput.value));
      phoneInput.addEventListener('input', () => clearError('phoneError', phoneInput));
    }

    // Form Submission
    if (form) {
      form.addEventListener('submit', handleRegistrationSubmit);
    }
  }

  function openRegistrationModal(eventId) {
    const eventObj = state.events.find(ev => ev.id === eventId);
    if (!eventObj) return;

    state.selectedEventForReg = eventObj;

    // Check if event is full
    const seats = state.seats[eventObj.id] !== undefined ? state.seats[eventObj.id] : eventObj.initialSeats;
    if (seats <= 0) {
      showToast(`Sorry, ${eventObj.name} has reached full capacity!`, 'error');
      return;
    }

    // Check if already registered
    const alreadyRegistered = state.registrations.some(r => r.eventId === eventObj.id);
    if (alreadyRegistered) {
      showToast(`You have already registered for ${eventObj.name}! Check 'My Events'.`, 'error');
      return;
    }

    // Populate modal elements
    const modal = document.getElementById('registrationModal');
    const title = document.getElementById('modalEventTitle');
    const category = document.getElementById('modalEventCategory');
    const dateTime = document.getElementById('modalEventDateTime');
    const venue = document.getElementById('modalEventVenue');
    const seatsLeft = document.getElementById('modalEventSeatsLeft');
    const hiddenId = document.getElementById('formEventId');
    const alertBox = document.getElementById('formAlertBox');

    if (title) title.textContent = eventObj.name;
    if (category) category.textContent = eventObj.category;
    if (dateTime) dateTime.textContent = eventObj.dateTime;
    if (venue) venue.textContent = eventObj.venue;
    if (seatsLeft) seatsLeft.textContent = `${seats} seats remaining`;
    if (hiddenId) hiddenId.value = eventObj.id;
    if (alertBox) alertBox.style.display = 'none';

    // Clear previous inputs and errors
    clearAllFormErrors();
    const form = document.getElementById('registrationForm');
    if (form) form.reset();

    // Show modal
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      // Autofocus first input
      setTimeout(() => {
        const firstInput = document.getElementById('regFullName');
        if (firstInput) firstInput.focus();
      }, 100);
    }
  }

  function closeRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
    state.selectedEventForReg = null;
  }

  // Validation functions
  function validateName(val) {
    const trimmed = (val || '').trim();
    if (!trimmed) {
      showError('nameError', 'Full name is required.', document.getElementById('regFullName'));
      return false;
    }
    if (trimmed.length < 2) {
      showError('nameError', 'Please enter at least 2 characters.', document.getElementById('regFullName'));
      return false;
    }
    if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
      showError('nameError', 'Name can only contain letters, spaces, and hyphens.', document.getElementById('regFullName'));
      return false;
    }
    clearError('nameError', document.getElementById('regFullName'));
    return true;
  }

  function validateEmail(val) {
    const trimmed = (val || '').trim();
    if (!trimmed) {
      showError('emailError', 'Email address is required.', document.getElementById('regEmail'));
      return false;
    }
    // Standard RFC5322 regex approximation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      showError('emailError', 'Please enter a valid email address (e.g. name@example.com).', document.getElementById('regEmail'));
      return false;
    }
    clearError('emailError', document.getElementById('regEmail'));
    return true;
  }

  function validatePhone(val) {
    const trimmed = (val || '').trim();
    if (!trimmed) {
      showError('phoneError', 'Phone number is required.', document.getElementById('regPhone'));
      return false;
    }
    // Clean spaces and hyphens
    const cleanDigits = trimmed.replace(/[\s\-\+]/g, '');
    // Check 10-digit standard Indian phone format
    if (!/^\d{10}$/.test(cleanDigits)) {
      showError('phoneError', 'Please enter a valid 10-digit mobile number.', document.getElementById('regPhone'));
      return false;
    }
    clearError('phoneError', document.getElementById('regPhone'));
    return true;
  }

  function showError(elementId, message, inputEl) {
    const errEl = document.getElementById(elementId);
    if (errEl) errEl.textContent = message;
    if (inputEl) inputEl.classList.add('input-error');
  }

  function clearError(elementId, inputEl) {
    const errEl = document.getElementById(elementId);
    if (errEl) errEl.textContent = '';
    if (inputEl) inputEl.classList.remove('input-error');
  }

  function clearAllFormErrors() {
    clearError('nameError', document.getElementById('regFullName'));
    clearError('emailError', document.getElementById('regEmail'));
    clearError('phoneError', document.getElementById('regPhone'));
  }

  function handleRegistrationSubmit(e) {
    e.preventDefault();

    if (!state.selectedEventForReg) return;
    const eventObj = state.selectedEventForReg;

    const nameVal = document.getElementById('regFullName').value;
    const emailVal = document.getElementById('regEmail').value;
    const phoneVal = document.getElementById('regPhone').value;
    const alertBox = document.getElementById('formAlertBox');

    const isNameValid = validateName(nameVal);
    const isEmailValid = validateEmail(emailVal);
    const isPhoneValid = validatePhone(phoneVal);

    if (!isNameValid || !isEmailValid || !isPhoneValid) {
      return;
    }

    // Check for duplicate registration for this event with same email or phone
    const isDuplicate = state.registrations.some(
      r => r.eventId === eventObj.id && (r.email.toLowerCase() === emailVal.trim().toLowerCase() || r.phone === phoneVal.trim())
    );

    if (isDuplicate) {
      if (alertBox) {
        alertBox.className = 'form-alert-box alert-error';
        alertBox.textContent = `A registration for ${eventObj.name} with this email/phone already exists!`;
        alertBox.style.display = 'block';
      }
      return;
    }

    // Check remaining seats
    const currentSeats = state.seats[eventObj.id] !== undefined ? state.seats[eventObj.id] : eventObj.initialSeats;
    if (currentSeats <= 0) {
      if (alertBox) {
        alertBox.className = 'form-alert-box alert-error';
        alertBox.textContent = 'Sorry, all available seats have just run out for this event!';
        alertBox.style.display = 'block';
      }
      return;
    }

    // Generate unique Ticket ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const codePrefix = eventObj.name.substring(0, 2).toUpperCase();
    const ticketId = `RAW-2026-${codePrefix}-${randomSuffix}`;

    // Create registration record
    const newRegistration = {
      id: 'reg-' + Date.now(),
      eventId: eventObj.id,
      eventName: eventObj.name,
      category: eventObj.category,
      dateTime: eventObj.dateTime,
      venue: eventObj.venue,
      studentName: nameVal.trim(),
      email: emailVal.trim(),
      phone: phoneVal.trim(),
      ticketId: ticketId,
      timestamp: new Date().toISOString()
    };

    // Decrement seats
    state.seats[eventObj.id] = Math.max(0, currentSeats - 1);
    saveSeats();

    // Save registration
    state.registrations.unshift(newRegistration);
    saveRegistrations();

    // Close registration modal & open success modal
    closeRegistrationModal();
    openSuccessModal(newRegistration);

    // Refresh grids & counters
    renderEventsGrid();
    renderMyEvents();
    updateNavCounters();
  }

  /* ==========================================================================
     9. SUCCESS MODAL & CELEBRATION
     ========================================================================== */
  function initSuccessModal() {
    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('closeSuccessModalBtn');
    const viewMyEventsBtn = document.getElementById('viewMyEventsBtn');
    const exploreMoreBtn = document.getElementById('successExploreMoreBtn');

    if (closeBtn) closeBtn.addEventListener('click', closeSuccessModal);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeSuccessModal();
      });
    }

    if (viewMyEventsBtn) {
      viewMyEventsBtn.addEventListener('click', () => {
        closeSuccessModal();
        const myEventsSec = document.getElementById('my-events');
        if (myEventsSec) myEventsSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (exploreMoreBtn) {
      exploreMoreBtn.addEventListener('click', () => {
        closeSuccessModal();
        const eventsSec = document.getElementById('events');
        if (eventsSec) eventsSec.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  function openSuccessModal(reg) {
    const modal = document.getElementById('successModal');
    const studentNameEl = document.getElementById('successStudentName');
    const eventNameEl = document.getElementById('successEventName');
    const ticketEventEl = document.getElementById('ticketEventName');
    const ticketCodeEl = document.getElementById('ticketIdCode');

    if (studentNameEl) studentNameEl.textContent = reg.studentName;
    if (eventNameEl) eventNameEl.textContent = reg.eventName;
    if (ticketEventEl) ticketEventEl.textContent = reg.eventName;
    if (ticketCodeEl) ticketCodeEl.textContent = reg.ticketId;

    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }

    // Trigger confetti particles
    triggerConfetti();
  }

  function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  function triggerConfetti() {
    // Generate 40 cheerful confetti dots
    const sparklesContainer = document.getElementById('discoSparkles');
    if (!sparklesContainer) return;

    for (let i = 0; i < 35; i++) {
      const dot = document.createElement('div');
      dot.className = 'confetti-dot';
      dot.style.position = 'fixed';
      dot.style.left = Math.random() * 100 + 'vw';
      dot.style.top = '-10px';
      dot.style.width = Math.random() * 10 + 6 + 'px';
      dot.style.height = Math.random() * 10 + 6 + 'px';
      dot.style.backgroundColor = ['#D7FF64', '#7655F7', '#FF4D6D', '#FFFFFF', '#3A86FF'][Math.floor(Math.random() * 5)];
      dot.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      dot.style.zIndex = '1200';
      dot.style.pointerEvents = 'none';
      dot.style.transform = `rotate(${Math.random() * 360}deg)`;
      dot.style.transition = `all ${Math.random() * 2 + 1.5}s cubic-bezier(0.25, 1, 0.5, 1)`;

      sparklesContainer.appendChild(dot);

      setTimeout(() => {
        dot.style.top = Math.random() * 80 + 20 + 'vh';
        dot.style.opacity = '0';
      }, 50);

      setTimeout(() => {
        dot.remove();
      }, 3500);
    }
  }

  /* ==========================================================================
     10. MY EVENTS RENDERING & CANCELLATION ENGINE
     ========================================================================== */
  function initMyEventsSection() {
    renderMyEvents();
    initCancelModal();
  }

  function renderMyEvents() {
    const grid = document.getElementById('myEventsGrid');
    const emptyState = document.getElementById('myEventsEmpty');
    const countBadge = document.getElementById('registeredCountBadge');

    if (!grid) return;

    const count = state.registrations.length;
    if (countBadge) countBadge.textContent = count;

    if (count === 0) {
      grid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    } else {
      grid.style.display = 'grid';
      if (emptyState) emptyState.style.display = 'none';
    }

    grid.innerHTML = state.registrations.map(reg => {
      return `
        <article class="my-event-card" data-reg-id="${reg.id}">
          <div class="my-event-header">
            <div>
              <h3 class="my-event-name">${reg.eventName}</h3>
              <span class="card-cat-badge">${reg.category}</span>
            </div>
            <span class="my-event-ticket-id">${reg.ticketId}</span>
          </div>

          <div class="my-event-details-list">
            <div>🗓️ <strong>${reg.dateTime}</strong></div>
            <div>📍 ${reg.venue}</div>
          </div>

          <div class="my-event-attendee-strip">
            <div class="attendee-name">${reg.studentName}</div>
            <div class="attendee-meta">${reg.email} • +91 ${reg.phone}</div>
          </div>

          <div class="my-event-action-bar">
            <span class="badge-pass-confirmed">
              <span>✓ Confirmed Pass</span>
            </span>
            <button class="btn-cancel-pass" data-reg-id="${reg.id}" data-event-name="${reg.eventName}">
              Cancel Pass
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach cancel click handlers
    grid.querySelectorAll('.btn-cancel-pass').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const regId = e.currentTarget.getAttribute('data-reg-id');
        const eventName = e.currentTarget.getAttribute('data-event-name');
        openCancelModal(regId, eventName);
      });
    });
  }

  function initCancelModal() {
    const modal = document.getElementById('cancelModal');
    const closeBtn = document.getElementById('closeCancelModalBtn');
    const abortBtn = document.getElementById('abortCancelBtn');
    const confirmBtn = document.getElementById('confirmCancelBtn');

    if (closeBtn) closeBtn.addEventListener('click', closeCancelModal);
    if (abortBtn) abortBtn.addEventListener('click', closeCancelModal);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCancelModal();
      });
    }

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        if (state.pendingCancelRegId) {
          executeCancelRegistration(state.pendingCancelRegId);
        }
        closeCancelModal();
      });
    }
  }

  function openCancelModal(regId, eventName) {
    state.pendingCancelRegId = regId;
    const modal = document.getElementById('cancelModal');
    const nameText = document.getElementById('cancelEventNameText');

    if (nameText) nameText.textContent = eventName;
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeCancelModal() {
    const modal = document.getElementById('cancelModal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
    state.pendingCancelRegId = null;
  }

  function executeCancelRegistration(regId) {
    const index = state.registrations.findIndex(r => r.id === regId);
    if (index === -1) return;

    const removedReg = state.registrations[index];
    const eventId = removedReg.eventId;

    // Remove from array
    state.registrations.splice(index, 1);
    saveRegistrations();

    // Restore 1 seat to event
    const eventObj = state.events.find(ev => ev.id === eventId);
    const maxCapacity = eventObj ? eventObj.totalSeats : 100;
    const currentSeats = state.seats[eventId] !== undefined ? state.seats[eventId] : 0;
    state.seats[eventId] = Math.min(maxCapacity, currentSeats + 1);
    saveSeats();

    // Feedback
    showToast(`Cancelled registration for ${removedReg.eventName}. Seat restored.`);

    // Re-render
    renderMyEvents();
    renderEventsGrid();
    updateNavCounters();
  }

  function updateNavCounters() {
    const count = state.registrations.length;
    const navCount = document.getElementById('navMyEventsCount');
    const mobCount = document.getElementById('mobMyEventsCount');

    if (navCount) navCount.textContent = count;
    if (mobCount) mobCount.textContent = count;
  }

  /* ==========================================================================
     11. TRAILER MODAL VIDEO SIMULATOR
     ========================================================================== */
  function initTrailerModal() {
    const watchBtn = document.getElementById('watchTrailerBtn');
    const modal = document.getElementById('trailerModal');
    const closeBtn = document.getElementById('closeTrailerModalBtn');
    const playToggle = document.getElementById('trailerPlayToggle');
    const regCta = document.getElementById('trailerRegisterCta');

    if (watchBtn) {
      watchBtn.addEventListener('click', openTrailerModal);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', closeTrailerModal);
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeTrailerModal();
      });
    }
    if (regCta) {
      regCta.addEventListener('click', () => {
        closeTrailerModal();
      });
    }

    if (playToggle) {
      let isPlaying = true;
      playToggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playToggle.textContent = isPlaying ? '⏸ PAUSE' : '▶ PLAY';
        const progress = document.getElementById('trailerProgress');
        if (progress) {
          progress.style.animationPlayState = isPlaying ? 'running' : 'paused';
        }
      });
    }
  }

  function openTrailerModal() {
    const modal = document.getElementById('trailerModal');
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeTrailerModal() {
    const modal = document.getElementById('trailerModal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  /* ==========================================================================
     12. INTERACTIVE MASCOT COMPANION (MISO WIDGET)
     ========================================================================== */
  const MISO_QUOTES = [
    'Psst! March 15 is approaching fast. Have you secured your pass? 🐾',
    'Did you know? LBSITW is the first women\'s engineering college in Kerala! 🎓',
    'CodeStorm seats are filling fast! Don\'t sleep on it! ⚡',
    'Hit the BEAT button in the header for some disco energy! 🪩',
    'Switch between Disco Light and After Dark mode above! ✨',
    'Check out your passes under My Events tab! 🎟️',
    'RoboWar in the Mechanical Bay is going to be epic chaos! 🤖',
    'Art is the weapon! Check out CanvasClash! 🎨'
  ];

  let currentQuoteIdx = 0;

  function initMascotCompanion() {
    const widget = document.getElementById('floatingMisoWidget');
    const avatar = document.getElementById('floatingMisoAvatar');
    const bubble = document.getElementById('floatingBubble');
    const speechText = document.getElementById('floatingSpeechText');
    const dismissBtn = document.getElementById('dismissBubbleBtn');
    const hideBtn = document.getElementById('hideMascotBtn');

    // Check if dismissed before
    const isDismissed = localStorage.getItem(STORAGE_KEYS.MASCOT_DISMISSED);
    if (isDismissed === 'true' && widget) {
      widget.style.display = 'none';
      return;
    }

    if (avatar) {
      avatar.addEventListener('click', () => {
        // Spin Miso avatar
        avatar.style.transform = 'scale(1.25) rotate(360deg)';
        setTimeout(() => { avatar.style.transform = ''; }, 500);

        // Advance quote
        currentQuoteIdx = (currentQuoteIdx + 1) % MISO_QUOTES.length;
        if (speechText) {
          speechText.textContent = MISO_QUOTES[currentQuoteIdx];
        }
        if (bubble) {
          bubble.classList.remove('bubble-hidden');
        }
      });
    }

    if (dismissBtn && bubble) {
      dismissBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        bubble.classList.add('bubble-hidden');
      });
    }

    if (hideBtn && widget) {
      hideBtn.addEventListener('click', () => {
        widget.style.display = 'none';
        localStorage.setItem(STORAGE_KEYS.MASCOT_DISMISSED, 'true');
        showToast('Miso will chill quietly in the background 🐾');
      });
    }
  }

  /* ==========================================================================
     13. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  function showToast(message, type = 'normal') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : 'toast-success'}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'error' ? '⚠️' : '⚡'}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => { toast.remove(); }, 300);
    }, 3200);
  }

  /* ==========================================================================
     14. MOBILE NAVIGATION
     ========================================================================== */
  function initMobileNav() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const drawer = document.getElementById('mobileNavDrawer');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !drawer) return;

    menuBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      drawer.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', !isOpen);
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     15. DOM CONTENT LOADED ENTRY POINT
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initStorageAndState();
    initCountdown();
    initDiscoBallCanvas();
    initAudioSynth();
    initEventDiscovery();
    initRegistrationModal();
    initSuccessModal();
    initMyEventsSection();
    initTrailerModal();
    initMascotCompanion();
    initMobileNav();
    updateNavCounters();

    // Theme Toggle Button
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }
  });

})();
