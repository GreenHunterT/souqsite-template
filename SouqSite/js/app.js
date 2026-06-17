// =================================================================
//  SOUQSITE — App Runtime  v1.1
//  Reads globals: SHOP_SETTINGS, SHOP, PRODUCTS, TRANSLATIONS
//  V2 upgrade path: replace config file loads with fetch() calls
// =================================================================
(function () {
  'use strict';

  // ── LANGUAGE HELPERS ────────────────────────────────────────────
  function getLang() {
    return (
      localStorage.getItem('souqsite_language') ||
      (typeof SHOP_SETTINGS !== 'undefined' ? SHOP_SETTINGS.defaultLanguage : 'ar')
    );
  }

  function t(key) {
    if (typeof TRANSLATIONS === 'undefined') return null;
    const lang = getLang();
    const parts = key.split('.');
    let val = TRANSLATIONS[lang];
    for (const p of parts) val = val?.[p];
    return typeof val === 'string' ? val : null;
  }

  function shopName(lang) {
    if (typeof SHOP === 'undefined') return '';
    return lang === 'ar' ? SHOP.name : (SHOP.nameEn || SHOP.name);
  }

  function shopTagline(lang) {
    if (typeof SHOP === 'undefined') return '';
    return lang === 'ar' ? SHOP.tagline : (SHOP.taglineEn || SHOP.tagline);
  }

  function shopDesc(lang) {
    if (typeof SHOP === 'undefined') return '';
    return lang === 'ar' ? SHOP.description : (SHOP.descriptionEn || SHOP.description);
  }

  function shopAddr(lang) {
    if (typeof SHOP === 'undefined') return '';
    return lang === 'ar' ? SHOP.address.ar : SHOP.address.en;
  }

  // ── SET LANGUAGE ────────────────────────────────────────────────
  function setLanguage(lang) {
    localStorage.setItem('souqsite_language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    applyTranslations(lang);
    applyShopContent(lang);
    updateWaLinks();
    // Per-page refreshes
    const page = document.body.dataset.page;
    if (page === 'products') refreshFilterAll();
    if (page === 'location') setText('loc-address', shopAddr(lang));
  }

  function applyTranslations(lang) {
    if (typeof TRANSLATIONS === 'undefined') return;
    const tr = TRANSLATIONS[lang];
    document.querySelectorAll('[data-t]').forEach(el => {
      const parts = el.dataset.t.split('.');
      let val = tr;
      for (const p of parts) val = val?.[p];
      if (typeof val === 'string') el.textContent = val;
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function applyShopContent(lang) {
    if (typeof SHOP === 'undefined') return;
    const name = shopName(lang);
    setText('nav-logo',    name);
    setText('footer-logo', name);
    setText('footer-name', name);
    setText('footer-tag',  shopTagline(lang));
    setText('hero-name',   name);
    setText('hero-tagline', shopTagline(lang));
    setText('about-desc',  shopDesc(lang));
    // Page title
    document.title = `${name} — ${shopTagline(lang)}`;
    setMeta('description', shopDesc(lang));
  }

  // ── THEME ────────────────────────────────────────────────────────
  function getTheme() {
    return (
      localStorage.getItem('souqsite_theme') ||
      (typeof SHOP_SETTINGS !== 'undefined' ? SHOP_SETTINGS.defaultTheme : 'dark')
    );
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function toggleTheme() {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem('souqsite_theme', next);
    applyTheme(next);
  }

  // ── WHATSAPP LINKS ───────────────────────────────────────────────
  function waLink() {
    if (typeof SHOP === 'undefined') return '#';
    const msg = t('wa.message') || (SHOP.social && SHOP.social.whatsappMessage) || '';
    return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  function updateWaLinks() {
    const url = waLink();
    document.querySelectorAll('[data-wa-link]').forEach(el => { el.href = url; });
  }

  // ── NAVIGATION ───────────────────────────────────────────────────
  function initNav() {
    const header = document.getElementById('site-header');
    const toggle = document.getElementById('nav-toggle');
    const mobile = document.getElementById('nav-mobile');
    if (!header) return;

    const isHome = document.body.dataset.page === 'home';
    header.classList.add(isHome ? 'transparent' : 'scrolled');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.classList.remove('transparent');
        header.classList.add('scrolled');
      } else if (isHome) {
        header.classList.remove('scrolled');
        header.classList.add('transparent');
      }
    }, { passive: true });

    if (toggle && mobile) {
      toggle.addEventListener('click', () => {
        const open = mobile.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
      });
      mobile.querySelectorAll('.nav-link').forEach(l => {
        l.addEventListener('click', () => {
          mobile.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Active link
    const pageMap = { home: 'index.html', products: 'products.html', location: 'location.html', contact: 'contact.html' };
    const file = pageMap[document.body.dataset.page];
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === file);
    });

    // Theme toggle
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // Language toggle (event delegation — catches both desktop and mobile buttons)
    document.addEventListener('click', e => {
      const btn = e.target.closest('.lang-btn');
      if (btn && btn.dataset.lang) setLanguage(btn.dataset.lang);
    });
  }

  // ── HOME PAGE ────────────────────────────────────────────────────
  function initHome() {
    if (typeof SHOP === 'undefined') return;

    // Hero background — Ken Burns on load
    const heroBg = document.getElementById('hero-bg');
    if (heroBg && SHOP.hero && SHOP.hero.image) {
      heroBg.setAttribute('role', 'img');
      heroBg.setAttribute('aria-label', shopName(getLang()) + ' store');
      const probe = new Image();
      probe.onload = () => {
        heroBg.style.backgroundImage = `url('${SHOP.hero.image}')`;
        heroBg.classList.add('loaded');
      };
      probe.src = SHOP.hero.image;
    }

    // Highlights
    const hlGrid = document.getElementById('hl-grid');
    if (hlGrid && SHOP.highlights) {
      const lang = getLang();
      hlGrid.innerHTML = SHOP.highlights.map(h => `
        <div class="hl-card">
          <div class="hl-value">${h.value}</div>
          <div class="hl-label">${lang === 'ar' ? (h.labelAr || h.label) : (h.labelEn || h.label)}</div>
        </div>
      `).join('');
    }

    // Featured products (max 3)
    if (typeof PRODUCTS !== 'undefined') {
      renderProductGrid(PRODUCTS.filter(p => p.featured).slice(0, 3), 'featured-grid');
    }
  }

  // ── PRODUCTS PAGE ────────────────────────────────────────────────
  function initProducts() {
    if (typeof PRODUCTS === 'undefined') return;
    const filterBar = document.getElementById('filter-bar');
    const grid      = document.getElementById('products-grid');
    if (!grid) return;

    renderProductGrid(PRODUCTS, 'products-grid');

    if (filterBar) {
      const cats = ['all', ...new Set(PRODUCTS.map(p => p.category).filter(Boolean))];
      filterBar.innerHTML = cats.map(cat => `
        <button class="filter-btn${cat === 'all' ? ' active' : ''}" data-cat="${cat}">
          ${cat === 'all' ? (t('products.filterAll') || 'All') : capitalize(cat)}
        </button>
      `).join('');

      filterBar.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        grid.querySelectorAll('.product-card').forEach(card => {
          card.style.display = (btn.dataset.cat === 'all' || card.dataset.cat === btn.dataset.cat) ? '' : 'none';
        });
      });
    }
  }

  function refreshFilterAll() {
    const allBtn = document.querySelector('.filter-btn[data-cat="all"]');
    if (allBtn) allBtn.textContent = t('products.filterAll') || 'All';
  }

  // ── LOCATION PAGE ────────────────────────────────────────────────
  function initLocation() {
    if (typeof SHOP === 'undefined') return;
    const frame = document.getElementById('map-frame');
    if (frame && SHOP.mapEmbed) frame.src = SHOP.mapEmbed;

    setText('loc-address',  shopAddr(getLang()));
    setText('loc-weekdays', SHOP.hours.weekdays);
    setText('loc-weekends', SHOP.hours.weekends);

    const dirBtn = document.getElementById('directions-btn');
    if (dirBtn && SHOP.mapDirections) dirBtn.href = SHOP.mapDirections;
  }

  // ── CONTACT PAGE ─────────────────────────────────────────────────
  function initContact() {
    if (typeof SHOP === 'undefined') return;

    const phoneEl = document.getElementById('contact-phone');
    if (phoneEl) {
      phoneEl.href = `tel:${SHOP.phone.replace(/\s/g, '')}`;
      const p = phoneEl.querySelector('p');
      if (p) p.textContent = SHOP.phone;
    }

    const instaEl = document.getElementById('contact-insta');
    if (instaEl) {
      if (SHOP.instagram) {
        const p = instaEl.querySelector('p');
        if (p) p.textContent = SHOP.instagram;
        instaEl.href = `https://instagram.com/${SHOP.instagram.replace('@', '')}`;
      } else {
        instaEl.style.display = 'none';
      }
    }

    const emailEl = document.getElementById('contact-email');
    if (emailEl) {
      if (SHOP.email) {
        const p = emailEl.querySelector('p');
        if (p) p.textContent = SHOP.email;
        emailEl.href = `mailto:${SHOP.email}`;
      } else {
        emailEl.style.display = 'none';
      }
    }

    setText('contact-hours', `${SHOP.hours.weekdays}  ·  ${SHOP.hours.weekends}`);
  }

  // ── PRODUCT CARD RENDERER ────────────────────────────────────────
  function renderProductGrid(products, containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    if (!products.length) {
      grid.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:40px 0">No products to show.</p>`;
      return;
    }

    const lang = getLang();

    grid.innerHTML = products.map(p => {
      const name = lang === 'ar' ? p.name : (p.nameEn || p.name);
      const desc = lang === 'ar' ? p.description : (p.descriptionEn || p.description);
      return `
        <article class="product-card" data-cat="${p.category || ''}">
          <div class="product-img">
            <img
              src="${p.image}"
              alt="${name}"
              loading="lazy"
              onerror="this.parentElement.style.background='var(--bg-alt)';this.style.display='none'"
            />
            ${p.category ? `<span class="product-cat-badge" aria-hidden="true">${capitalize(p.category)}</span>` : ''}
          </div>
          <div class="product-body">
            <h3 class="product-name">${name}</h3>
            ${p.price ? `<div class="product-price">${p.price}</div>` : ''}
            ${desc ? `<p class="product-desc">${desc}</p>` : ''}
          </div>
        </article>
      `;
    }).join('');

    if (grid.classList.contains('reveal-grid')) grid.classList.add('visible');
  }

  // ── SCROLL REVEAL ────────────────────────────────────────────────
  function initReveal() {
    const targets = document.querySelectorAll('.reveal, .reveal-grid');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    targets.forEach(el => io.observe(el));
  }

  // ── HELPERS ──────────────────────────────────────────────────────
  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined && text !== null) el.textContent = text;
  }
  function setMeta(name, content) {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
    if (content) el.content = content;
  }
  function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

  // ── BOOT ─────────────────────────────────────────────────────────
  function boot() {
    const lang  = getLang();
    const theme = getTheme();

    applyTheme(theme);                  // ensure theme is applied (anti-FOUC handles first paint)
    initNav();
    applyTranslations(lang);
    applyShopContent(lang);
    updateWaLinks();
    initReveal();

    // Footer year
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    switch (document.body.dataset.page) {
      case 'home':     initHome();     break;
      case 'products': initProducts(); break;
      case 'location': initLocation(); break;
      case 'contact':  initContact();  break;
    }
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();
})();
