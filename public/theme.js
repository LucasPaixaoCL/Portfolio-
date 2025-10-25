// Theme management
const THEME_KEY = 'kittyhub-theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

// Get saved theme or default to light
function getSavedTheme() {
  return localStorage.getItem(THEME_KEY) || LIGHT_THEME;
}

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = getSavedTheme();
  applyTheme(savedTheme);
  updateThemeToggleButton(savedTheme);
}

// Apply theme to document
function applyTheme(theme) {
  const html = document.documentElement;
  
  if (theme === DARK_THEME) {
    html.classList.add('dark');
    html.classList.remove('light');
  } else {
    html.classList.add('light');
    html.classList.remove('dark');
  }
  
  localStorage.setItem(THEME_KEY, theme);
}

// Toggle theme
function toggleTheme() {
  const currentTheme = getSavedTheme();
  const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
  applyTheme(newTheme);
  updateThemeToggleButton(newTheme);
}

// Update toggle button icon
function updateThemeToggleButton(theme) {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;
  
  if (theme === DARK_THEME) {
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    toggleBtn.title = 'Modo Claro';
  } else {
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    toggleBtn.title = 'Modo Escuro';
  }
}

// Initialize on DOM ready
// document.addEventListener('DOMContentLoaded', initializeTheme); // Removido para ser chamado inline no HTML

