const localMode = localStorage.getItem('theme');

// Default to dark theme
if (localMode === null) {
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-dark-mode', '');
} else if (localMode === 'dark') {
  document.documentElement.setAttribute('data-dark-mode', '');
}
// If localMode === 'light', do nothing (no dark-mode attribute)