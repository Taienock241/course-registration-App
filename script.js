// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const codeSnippetLayer = document.getElementById('code-snippets');
const glowLayer = document.getElementById('tech-glows');

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
} else {
  updateThemeIcon('dark'); // Default to dark
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

function initParticles() {
  if (typeof particlesJS === 'undefined') return;

  // Clear previous particle instances if this script re-initializes.
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom.forEach((instance) => {
      if (instance && instance.pJS && instance.pJS.fn && instance.pJS.fn.vendors) {
        instance.pJS.fn.vendors.destroypJS();
      }
    });
    window.pJSDom = [];
  }

  particlesJS('particles-js', {
    particles: {
      number: {
        value: window.innerWidth < 768 ? 34 : 62,
        density: { enable: true, value_area: 900 },
      },
      color: { value: ['#22d3ee', '#64b5f6', '#81c784'] },
      shape: { type: 'circle' },
      opacity: { value: 0.35, random: true },
      size: { value: 2.8, random: true },
      line_linked: {
        enable: true,
        distance: 140,
        color: '#22d3ee',
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.3,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: false, mode: 'grab' },
        onclick: { enable: false },
        resize: true,
      },
      modes: {
        grab: {
          distance: 120,
          line_linked: { opacity: 0.35 },
        },
      },
    },
    retina_detect: true,
  });
}

function initGlowOrbs() {
  if (!glowLayer) return;
  glowLayer.innerHTML = '';

  const palette = ['rgba(34, 211, 238, 0.2)', 'rgba(100, 181, 246, 0.2)', 'rgba(129, 199, 132, 0.18)'];
  const count = window.innerWidth < 768 ? 3 : 5;

  for (let i = 0; i < count; i += 1) {
    const orb = document.createElement('span');
    orb.className = 'glow-orb';
    orb.style.left = `${Math.random() * 90}%`;
    orb.style.top = `${Math.random() * 85}%`;
    orb.style.animationDuration = `${20 + Math.random() * 16}s`;
    orb.style.animationDelay = `${Math.random() * -14}s`;
    orb.style.background = `radial-gradient(circle, ${palette[i % palette.length]}, rgba(34, 211, 238, 0))`;
    glowLayer.appendChild(orb);
  }
}

function initFloatingCodeSnippets() {
  if (!codeSnippetLayer) return;
  codeSnippetLayer.innerHTML = '';

  const snippets = [
    'const app = initTech();',
    'if (cloud.ready) deploy();',
    'SELECT * FROM systems;',
    'function secureNetwork() {}',
    '<api status="online" />',
    'git commit -m "innovation"',
    'while (learning) { build(); }',
    'neural.train(dataset)',
    'docker compose up -d',
    'const uptime = 99.99;',
    'for (const unit of courses) {}',
  ];

  const count = window.innerWidth < 768 ? 6 : 10;
  for (let i = 0; i < count; i += 1) {
    const el = document.createElement('span');
    el.className = 'code-snippet';
    el.textContent = snippets[Math.floor(Math.random() * snippets.length)];
    el.style.left = `${Math.random() * 92 + 2}%`;
    el.style.animationDuration = `${14 + Math.random() * 12}s`;
    el.style.animationDelay = `${Math.random() * -18}s`;
    codeSnippetLayer.appendChild(el);
  }
}

function initScrollReveal() {
  if (typeof gsap === 'undefined') return;

  const targets = document.querySelectorAll(
    '.section, .card, .info-card, .panel, .course-card, .media-card, .contact-card, .stat'
  );

  if (!targets.length || typeof ScrollTrigger === 'undefined') return;

  if (ScrollTrigger.getAll().length) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  gsap.registerPlugin(ScrollTrigger);

  targets.forEach((el, index) => {
    gsap.fromTo(
      el,
      { y: 24, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        ease: 'power2.out',
        delay: index % 3 === 0 ? 0 : 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });
}

function initTechAnimations() {
  initParticles();
  initGlowOrbs();
  initFloatingCodeSnippets();
  initScrollReveal();
}

function setMobileMenuState(isOpen) {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  mobileNav.setAttribute('aria-hidden', String(!isOpen));
  menuToggle.classList.toggle('active', isOpen);
  mobileNav.classList.toggle('is-open', isOpen);
}

function closeMobileMenuOnDesktop() {
  if (window.innerWidth > 480) {
    setMobileMenuState(false);
  }
}

if (menuToggle && mobileNav) {
  setMobileMenuState(false);

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMobileMenuState(!isOpen);
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setMobileMenuState(false);
    });
  });

  window.addEventListener('resize', closeMobileMenuOnDesktop);
}

// Live Search Filter for Units Table
const searchInput = document.getElementById('unit-search');
const tableBody = document.querySelector('#units table tbody');

if (searchInput && tableBody) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach((row) => {
      const cells = row.querySelectorAll('td');
      let match = false;

      cells.forEach((cell) => {
        if (cell.textContent.toLowerCase().includes(searchTerm)) {
          match = true;
        }
      });

      row.style.display = match ? '' : 'none';
    });
  });
}

// Toast Notification for Form Submission
const form = document.querySelector('#apply form');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show toast
    showToast('Form submitted successfully!');

    // Reset form
    form.reset();
  });
}

function showToast(message) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create new toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
 
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

let snippetResizeTimer;
window.addEventListener('resize', () => {
  if (!codeSnippetLayer && !glowLayer) return;
  clearTimeout(snippetResizeTimer);
  snippetResizeTimer = setTimeout(() => {
    initParticles();
    initGlowOrbs();
    initFloatingCodeSnippets();
  }, 250);
});

initTechAnimations();