/* ============================================================
   HOWL BLOG - main.js
   Theme switcher | Search | CTF Filters | Mobile menu
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. THEME MANAGER
  ---------------------------------------------------------- */
  const THEMES = ['dark', 'light', 'htb'];
  const STORAGE_KEY = 'howl-theme';

  function applyTheme(theme) {
    if (!THEMES.includes(theme)) theme = 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update active state on options
    document.querySelectorAll('.theme-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
    applyTheme(saved);
  }

  function initThemeSelector() {
    const btn      = document.getElementById('theme-btn');
    const dropdown = document.getElementById('theme-dropdown');

    if (!btn || !dropdown) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.querySelectorAll('.theme-option').forEach(opt => {
      opt.addEventListener('click', function () {
        applyTheme(this.dataset.theme);
        dropdown.classList.remove('open');
      });
    });

    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  /* ----------------------------------------------------------
     2. MOBILE MENU
  ---------------------------------------------------------- */
  function initMobileMenu() {
    const menuBtn   = document.getElementById('mobile-menu-btn');
    const navCenter = document.querySelector('.header-center');

    if (!menuBtn || !navCenter) return;

    menuBtn.addEventListener('click', function () {
      navCenter.classList.toggle('open');
      const spans = menuBtn.querySelectorAll('span');
      if (navCenter.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });

    document.addEventListener('click', function (e) {
      if (!menuBtn.contains(e.target) && !navCenter.contains(e.target)) {
        navCenter.classList.remove('open');
        const spans = menuBtn.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });
  }

  /* ----------------------------------------------------------
     3. ACTIVE NAV LINK
  ---------------------------------------------------------- */
  function setActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === '/' || href === '/index.html') {
        link.classList.toggle('active', path === '/' || path === '/index.html');
      } else if (href && path.startsWith(href) && href !== '/') {
        link.classList.add('active');
      }
    });
  }

  /* ----------------------------------------------------------
     4. SIDEBAR SEARCH (fetch search.json)
  ---------------------------------------------------------- */
  let searchIndex = null;

  async function loadSearchIndex() {
    try {
      const resp = await fetch('/search.json');
      if (resp.ok) {
        searchIndex = await resp.json();
      }
    } catch (e) {
      // Search index not available yet
    }
  }

  function searchPosts(query) {
    if (!searchIndex || !query || query.length < 2) return [];
    const q = query.toLowerCase();
    return searchIndex.filter(post => {
      return (
        (post.title   && post.title.toLowerCase().includes(q))   ||
        (post.tags    && post.tags.toLowerCase().includes(q))    ||
        (post.excerpt && post.excerpt.toLowerCase().includes(q))
      );
    }).slice(0, 8);
  }

  function renderSearchResults(results, container) {
    container.innerHTML = '';
    if (!results.length) {
      container.innerHTML = '<div class="search-no-results">Aucun résultat trouvé</div>';
    } else {
      results.forEach(post => {
        const a = document.createElement('a');
        a.href = post.url;
        a.className = 'search-result-item';
        a.innerHTML = `
          <span class="result-title">${escapeHtml(post.title)}</span>
          <span class="result-excerpt">${escapeHtml((post.excerpt || '').substring(0, 80))}...</span>
        `;
        container.appendChild(a);
      });
    }
    container.classList.add('open');
  }

  function initSidebarSearch() {
    const input     = document.getElementById('search-input');
    const container = document.getElementById('search-results');

    if (!input || !container) return;

    let debounceTimer;

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      const q = this.value.trim();

      if (q.length < 2) {
        container.classList.remove('open');
        container.innerHTML = '';
        return;
      }

      debounceTimer = setTimeout(() => {
        const results = searchPosts(q);
        renderSearchResults(results, container);
      }, 200);
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (!input.contains(e.target) && !container.contains(e.target)) {
        container.classList.remove('open');
      }
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        container.classList.remove('open');
        input.blur();
      }
    });
  }

  /* ----------------------------------------------------------
     5. HOMEPAGE LIVE SEARCH (filter post cards)
  ---------------------------------------------------------- */
  function initHomeSearch() {
    // Also wire up any search input on CTF page that live-filters cards
    const ctfSearch = document.getElementById('ctf-search');
    if (ctfSearch) return; // CTF page handles it separately

    // Live filter post cards on homepage via sidebar search
    const input = document.getElementById('search-input');
    if (!input) return;

    // We do NOT filter homepage cards with sidebar search (sidebar search
    // shows dropdown results instead). Homepage filtering is via data attrs
    // if we add a dedicated search above posts in future.
  }

  /* ----------------------------------------------------------
     6. CTF FILTERS
  ---------------------------------------------------------- */
  function initCTFFilters() {
    const list      = document.getElementById('ctf-list');
    const countEl   = document.getElementById('ctf-count-num');
    const searchEl  = document.getElementById('ctf-search');
    const sortEl    = document.getElementById('ctf-sort');

    if (!list) return;

    let activeFilters = {
      platform:   'all',
      difficulty: 'all',
      search:     '',
      sort:       'newest'
    };

    function applyFilters() {
      const cards = Array.from(list.querySelectorAll('.ctf-card'));
      let visible = 0;

      cards.forEach(card => {
        const platform   = card.dataset.platform   || '';
        const difficulty = card.dataset.difficulty || '';
        const title      = card.dataset.title      || '';
        const tags       = card.dataset.tags       || '';
        const date       = card.dataset.date       || '';

        const matchPlatform   = activeFilters.platform   === 'all' || platform   === activeFilters.platform;
        const matchDifficulty = activeFilters.difficulty === 'all' || difficulty === activeFilters.difficulty;
        const matchSearch     = activeFilters.search === '' ||
                                title.includes(activeFilters.search) ||
                                tags.includes(activeFilters.search);

        if (matchPlatform && matchDifficulty && matchSearch) {
          card.classList.remove('hidden');
          card.dataset._visible = '1';
          card.dataset._date    = date;
          card.dataset._title   = title;
          card.dataset._diff    = getDifficultyOrder(difficulty);
          visible++;
        } else {
          card.classList.add('hidden');
          card.dataset._visible = '0';
        }
      });

      if (countEl) countEl.textContent = visible;

      // Sort visible cards
      const visibleCards = cards.filter(c => c.dataset._visible === '1');
      sortCards(visibleCards, activeFilters.sort, list);
    }

    function getDifficultyOrder(diff) {
      return { easy: 1, medium: 2, hard: 3 }[diff] || 99;
    }

    function sortCards(cards, mode, container) {
      const sorted = [...cards];
      if (mode === 'newest') {
        sorted.sort((a, b) => (b.dataset._date || '').localeCompare(a.dataset._date || ''));
      } else if (mode === 'oldest') {
        sorted.sort((a, b) => (a.dataset._date || '').localeCompare(b.dataset._date || ''));
      } else if (mode === 'title') {
        sorted.sort((a, b) => (a.dataset._title || '').localeCompare(b.dataset._title || ''));
      } else if (mode === 'difficulty') {
        sorted.sort((a, b) => Number(a.dataset._diff) - Number(b.dataset._diff));
      }
      sorted.forEach(card => container.appendChild(card));
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const filter = this.dataset.filter;
        const value  = this.dataset.value;

        // Update active state in the same group
        document.querySelectorAll(`.filter-btn[data-filter="${filter}"]`).forEach(b => {
          b.classList.remove('active');
        });
        this.classList.add('active');

        activeFilters[filter] = value;
        applyFilters();
      });
    });

    // Search input
    if (searchEl) {
      let debounce;
      searchEl.addEventListener('input', function () {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          activeFilters.search = this.value.trim().toLowerCase();
          applyFilters();
        }, 200);
      });
    }

    // Sort select
    if (sortEl) {
      sortEl.addEventListener('change', function () {
        activeFilters.sort = this.value;
        applyFilters();
      });
    }

    // Initial count
    applyFilters();
  }

  /* ----------------------------------------------------------
     7. PROJECT FILTERS
  ---------------------------------------------------------- */
  function initProjectFilters() {
    const list     = document.getElementById('projet-list');
    const countEl  = document.getElementById('projet-count-num');
    const searchEl = document.getElementById('projet-search');
    const sortEl   = document.getElementById('projet-sort');

    if (!list) return;

    let activeFilters = { status: 'all', search: '', sort: 'newest' };

    function applyFilters() {
      const cards = Array.from(list.querySelectorAll('.ctf-card'));
      let visible = 0;

      cards.forEach(card => {
        const status = card.dataset.status || '';
        const title  = card.dataset.title  || '';
        const tags   = card.dataset.tags   || '';
        const date   = card.dataset.date   || '';

        const matchStatus = activeFilters.status === 'all' || status === activeFilters.status;
        const matchSearch = activeFilters.search === '' ||
                            title.includes(activeFilters.search) ||
                            tags.includes(activeFilters.search);

        if (matchStatus && matchSearch) {
          card.classList.remove('hidden');
          card.dataset._visible = '1';
          card.dataset._date  = date;
          card.dataset._title = title;
          visible++;
        } else {
          card.classList.add('hidden');
          card.dataset._visible = '0';
        }
      });

      if (countEl) countEl.textContent = visible;

      const visibleCards = cards.filter(c => c.dataset._visible === '1');
      const sorted = [...visibleCards];
      if (activeFilters.sort === 'newest') {
        sorted.sort((a, b) => (b.dataset._date || '').localeCompare(a.dataset._date || ''));
      } else if (activeFilters.sort === 'oldest') {
        sorted.sort((a, b) => (a.dataset._date || '').localeCompare(b.dataset._date || ''));
      } else if (activeFilters.sort === 'title') {
        sorted.sort((a, b) => (a.dataset._title || '').localeCompare(b.dataset._title || ''));
      }
      sorted.forEach(card => list.appendChild(card));
    }

    document.querySelectorAll('.projet-filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const filter = this.dataset.filter;
        const value  = this.dataset.value;
        document.querySelectorAll(`.projet-filter-btn[data-filter="${filter}"]`).forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        activeFilters[filter] = value;
        applyFilters();
      });
    });

    if (searchEl) {
      let debounce;
      searchEl.addEventListener('input', function () {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          activeFilters.search = this.value.trim().toLowerCase();
          applyFilters();
        }, 200);
      });
    }

    if (sortEl) {
      sortEl.addEventListener('change', function () {
        activeFilters.sort = this.value;
        applyFilters();
      });
    }

    applyFilters();
  }

  /* ----------------------------------------------------------
     8. STICKY HEADER SCROLL EFFECT
  ---------------------------------------------------------- */
  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function () {
      const current = window.scrollY;
      if (current > 200 && current > lastScroll) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      lastScroll = current;
    }, { passive: true });

    header.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
  }

  /* ----------------------------------------------------------
     8. SKILL BARS ANIMATION
  ---------------------------------------------------------- */
  function initSkillBars() {
    const fills = document.querySelectorAll('.skill-bar__fill');
    if (!fills.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.width = el.dataset.width || '0%';
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    fills.forEach(fill => {
      const width = fill.style.width;
      fill.dataset.width = width;
      fill.style.width = '0%';
      observer.observe(fill);
    });
  }

  /* ----------------------------------------------------------
     9. GLITCH NAV — définit --content sur chaque lien
  ---------------------------------------------------------- */
  function initGlitch() {
    document.querySelectorAll('.glitch-hover').forEach(function (el) {
      el.style.setProperty('--content', '"' + el.textContent.trim() + '"');
    });
  }

  /* ----------------------------------------------------------
     10. MOBILE SEARCH
  ---------------------------------------------------------- */
  function initMobileSearch() {
    const btn       = document.getElementById('mobile-search-btn');
    const bar       = document.getElementById('mobile-search-bar');
    const input     = document.getElementById('mobile-search-input');
    const container = document.getElementById('mobile-search-results');

    if (!btn || !bar || !input || !container) return;

    // Toggle bar on icon click
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      bar.classList.toggle('open');
      if (bar.classList.contains('open')) input.focus();
    });

    // Search logic (same engine as sidebar)
    let debounceTimer;
    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      const q = this.value.trim();
      if (q.length < 2) {
        container.classList.remove('open');
        container.innerHTML = '';
        return;
      }
      debounceTimer = setTimeout(() => {
        const results = searchPosts(q);
        renderSearchResults(results, container);
      }, 200);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        bar.classList.remove('open');
        container.classList.remove('open');
        input.blur();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!bar.contains(e.target) && !btn.contains(e.target)) {
        bar.classList.remove('open');
        container.classList.remove('open');
      }
    });
  }

  /* ----------------------------------------------------------
     10. HELPER
  ---------------------------------------------------------- */
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
  }

  /* ----------------------------------------------------------
     INIT
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initThemeSelector();
    initMobileMenu();
    setActiveNav();
    initGlitch();
    initSidebarSearch();
    initMobileSearch();
    initHomeSearch();
    initCTFFilters();
    initProjectFilters();
    initHeaderScroll();
    initSkillBars();
    loadSearchIndex();
  });

})();
