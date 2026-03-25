// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
} else {
  updateThemeIcon('dark'); // Default to dark
}

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'light') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
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

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const rows = tableBody.querySelectorAll('tr');
  
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    let match = false;
    
    cells.forEach(cell => {
      if (cell.textContent.toLowerCase().includes(searchTerm)) {
        match = true;
      }
    });
    
    row.style.display = match ? '' : 'none';
  });
});

// Toast Notification for Form Submission
const form = document.querySelector('#apply form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Show toast
  showToast('Form submitted successfully!');
  
  // Reset form
  form.reset();
});

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