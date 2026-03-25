/* ================================================================
   MAOR TZEMACH — IT PORTFOLIO
   script.js

   ╔══════════════════════════════════════════════════════════════╗
   ║  SITE CONFIGURATION — EDIT THIS SECTION TO UPDATE THE SITE  ║
   ║  All personal details are centralized here. No need to       ║
   ║  touch index.html or style.css for content changes.         ║
   ╚══════════════════════════════════════════════════════════════╝
   ================================================================ */

const SITE_CONFIG = {

  /* Your full name — appears in nav, hero heading, footer */
  fullName: "Maor Zemach",

  /* Primary role title — shown below hero heading
     TODO: You can add alternative titles for a typewriter effect:
     alternativeTitles: ["System Administrator", "L2 Support Engineer", "IT Automation Specialist"]
     (uncomment alternativeTitles below and the typewriter code will use them) */
  primaryTitle: "IT SPECIALIST / SYSTEM ADMINISTRATOR",
  // alternativeTitles: ["System Administrator", "L2 Support Engineer", "IT Automation Specialist"],

  /* Contact email — populates the Contact section mailto link */
  contactEmail: "maorize1@gmail.com",

  /* LinkedIn profile URL — TODO: replace YOUR_PROFILE_ID with your actual LinkedIn handle */
  linkedinUrl: "https://www.linkedin.com/in/maor-zemach-7217172b8",

  /* GitHub profile URL — TODO: replace YOUR_USERNAME with your actual GitHub username */
  githubProfileUrl: "https://github.com/MaorZemach",

  /* Resume PDF filename — must be placed in the same folder as index.html */
  resumeFileName: "Maor Zemach Resume.pdf",

  /* GitHub URL for the AI Resume Generator project
     TODO: replace with your actual repository URL */
  projectGitHubUrl: "https://github.com/MaorZemach/ATS-Optimized-Resume-Generator",

};

/* ================================================================
   END OF CONFIGURATION — no need to edit below this line
   ================================================================ */

(function (cfg) {
  'use strict';

  /* ----------------------------------------------------------------
     DERIVED VALUES
     Computed from SITE_CONFIG so they're available for injection.
  ---------------------------------------------------------------- */
  const derived = {
    fullName:        cfg.fullName,
    primaryTitle:    cfg.primaryTitle,
    contactEmail:    cfg.contactEmail,
    resumeUrl:       cfg.resumeFileName,             // relative path, file in root dir
    linkedinUrl:     cfg.linkedinUrl,
    githubProfileUrl: cfg.githubProfileUrl,
    projectGitHubUrl: cfg.projectGitHubUrl,
    emailHref:       `mailto:${cfg.contactEmail}`,
  };


  /* ----------------------------------------------------------------
     UTILITY
  ---------------------------------------------------------------- */
  const qs  = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];


  /* ----------------------------------------------------------------
     1. DOM INJECTION FROM SITE_CONFIG
     Elements with data-cfg="key"      → textContent is set
     Elements with data-cfg-href="key" → href attribute is set
     This runs first so content is correct before any other JS.
  ---------------------------------------------------------------- */
  function injectConfig() {
    // Text content
    qsa('[data-cfg]').forEach(el => {
      const key = el.dataset.cfg;
      if (key && derived[key] !== undefined) {
        el.textContent = derived[key];
      }
    });

    // href attributes
    qsa('[data-cfg-href]').forEach(el => {
      const key = el.dataset.cfgHref;
      if (key && derived[key] !== undefined) {
        el.href = derived[key];
      }
    });
  }


  /* ----------------------------------------------------------------
     2. STICKY NAVIGATION
     Adds .scrolled to #site-header after scrolling 20px —
     triggers the frosted-glass backdrop effect in CSS.
  ---------------------------------------------------------------- */
  const header = qs('#site-header');

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();


  /* ----------------------------------------------------------------
     3. MOBILE HAMBURGER MENU
  ---------------------------------------------------------------- */
  const hamburger = qs('#nav-hamburger');
  const navLinks  = qs('#nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on nav link click
  qsa('.nav__link', navLinks).forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!header.contains(e.target)) closeMenu();
  });

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }


  /* ----------------------------------------------------------------
     4. ACTIVE NAV LINK HIGHLIGHTING
     Uses IntersectionObserver to mark the matching .nav__link
     as .active when its section is in the upper viewport region.
  ---------------------------------------------------------------- */
  const sections   = qsa('section[id]');
  const navLinkEls = qsa('.nav__link[data-nav]');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-38% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => navObserver.observe(s));


  /* ----------------------------------------------------------------
     5. TYPEWRITER EFFECT
     If SITE_CONFIG.alternativeTitles array is defined, cycles through
     them with a typing animation. Otherwise just shows primaryTitle.
  ---------------------------------------------------------------- */
  const titleEl = qs('[data-cfg="primaryTitle"]');

  if (cfg.alternativeTitles && cfg.alternativeTitles.length > 0 && titleEl) {
    const phrases = [cfg.primaryTitle, ...cfg.alternativeTitles];
    let pIdx = 0, cIdx = 0, deleting = false;

    const SPEED_TYPE = 60, SPEED_DEL = 30, PAUSE_END = 2400, PAUSE_START = 400;

    function tick() {
      const phrase = phrases[pIdx];
      titleEl.textContent = deleting
        ? phrase.slice(0, cIdx - 1)
        : phrase.slice(0, cIdx + 1);

      deleting ? cIdx-- : cIdx++;

      let delay = deleting ? SPEED_DEL : SPEED_TYPE;
      if (!deleting && cIdx === phrase.length) { delay = PAUSE_END; deleting = true; }
      if (deleting && cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        delay = PAUSE_START;
      }
      setTimeout(tick, delay);
    }

    // Add cursor span after the title element
    const cursor = document.createElement('span');
    cursor.className = 'hero__cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.textContent = '|';
    titleEl.insertAdjacentElement('afterend', cursor);

    setTimeout(tick, 1200);
  }


  /* ----------------------------------------------------------------
     6. SCROLL REVEAL ANIMATIONS
     Elements with [data-reveal] start invisible (via CSS) and
     become .visible when they enter the viewport.
  ---------------------------------------------------------------- */
  const revealEls = qsa('[data-reveal]');

  if (revealEls.length && 'IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });

    revealEls.forEach(el => revealObs.observe(el));
  } else {
    // Fallback: make everything visible immediately
    revealEls.forEach(el => el.classList.add('visible'));
  }


  /* ----------------------------------------------------------------
     7. SMOOTH SCROLL POLYFILL
     Native CSS scroll-behavior handles modern browsers;
     this covers older engines as a fallback.
  ---------------------------------------------------------------- */
  if (!CSS.supports('scroll-behavior', 'smooth')) {
    qsa('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = qs(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }


  /* ----------------------------------------------------------------
     8. NETLIFY CONTACT FORM — SUCCESS FEEDBACK
     Netlify redirects to /?submitted=true after a successful POST.
     We detect this, show the success message, and hide the form fields.
  ---------------------------------------------------------------- */
  const contactForm  = qs('#contact-form');
  const formSuccess  = qs('#form-success');

  if (contactForm && formSuccess) {
    // Show inline success on Netlify redirect (?submitted=true)
    if (window.location.search.includes('submitted=true')) {
      contactForm.querySelectorAll('.contact__form-row, .form-field, .contact__form-footer')
        .forEach(el => el.style.display = 'none');
      formSuccess.removeAttribute('hidden');
    }

    // Also handle AJAX-style submit for a smoother UX (no page reload)
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(contactForm);

      fetch('/', { method: 'POST', body: data })
        .then(() => {
          contactForm.querySelectorAll('.contact__form-row, .form-field, .contact__form-footer')
            .forEach(el => el.style.display = 'none');
          formSuccess.removeAttribute('hidden');
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(() => {
          // Network error: fall back to normal form submission
          contactForm.submit();
        });
    });
  }


  /* ----------------------------------------------------------------
     9. LIGHT / DARK MODE TOGGLE
     Reads saved preference from localStorage on load.
     Toggles data-theme="light" on <html>; default is dark.
  ---------------------------------------------------------------- */
  const themeToggle = qs('#theme-toggle');
  const htmlEl      = document.documentElement;

  // Apply saved theme immediately (before paint) to avoid flash
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') htmlEl.setAttribute('data-theme', 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = htmlEl.getAttribute('data-theme') === 'light';
      if (isLight) {
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        htmlEl.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }


  /* ----------------------------------------------------------------
     INIT — run injection first, then all other setup is already done
     via listeners registered above.
  ---------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', injectConfig);

  // Also run immediately if DOM is already parsed
  if (document.readyState !== 'loading') injectConfig();

}(SITE_CONFIG));
