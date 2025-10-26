// Theme management
const THEME_KEY = 'kittyhub-theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

// Get saved theme or default to light
function getSavedTheme() {
  try { return localStorage.getItem(THEME_KEY) || LIGHT_THEME; }
  catch { return LIGHT_THEME; }
}

function setMetaThemeColor(theme) {
  const light = '#F8FAFC';  // background light
  const dark = '#0F0F12';  // background dark
  let m = document.querySelector('meta[name="theme-color"]');
  if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'theme-color'); document.head.appendChild(m); }
  m.setAttribute('content', theme === DARK_THEME ? dark : light);
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
  try { localStorage.setItem(THEME_KEY, theme); } catch { }
  setMetaThemeColor(theme);
}

// Update toggle button icon
function updateThemeToggleButton(theme) {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  const hasFA = !!document.querySelector('link[href*="font-awesome"], link[href*="fontawesome"], script[src*="fontawesome"]');
  if (hasFA) {
    toggleBtn.innerHTML = theme === DARK_THEME ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  } else {
    toggleBtn.textContent = theme === DARK_THEME ? '☀️' : '🌙';
  }
  toggleBtn.title = theme === DARK_THEME ? 'Modo Claro' : 'Modo Escuro';
}

// Toggle theme
function toggleTheme() {
  const currentTheme = getSavedTheme();
  const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
  applyTheme(newTheme);
  updateThemeToggleButton(newTheme);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = getSavedTheme();
  applyTheme(savedTheme);
  updateThemeToggleButton(savedTheme);

  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);

  // sync com outras abas
  window.addEventListener('storage', (e) => {
    if (e.key === THEME_KEY && e.newValue) {
      applyTheme(e.newValue);
      updateThemeToggleButton(e.newValue);
    }
  });
});
