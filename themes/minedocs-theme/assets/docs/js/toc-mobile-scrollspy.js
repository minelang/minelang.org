const tocBtn = document.getElementById('toc-dropdown-btn');
const headings = document.querySelectorAll('.main-content h1, .main-content h2, .main-content h3, .main-content h4');
const tocLinks = document.querySelectorAll('.dropdown-menu li > a');

if (tocBtn && headings.length) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const id = entry.target.id || entry.target.getAttribute('id');
        if (!id) continue;
        const link = tocBtn.closest('.docs-toc-mobile')?.querySelector(`.dropdown-menu li > a[href="#${id}"]`);
        if (link) {
          tocBtn.innerHTML = link.innerHTML;
          tocLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
        break;
      }
    }
  }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });

  headings.forEach(h => observer.observe(h));
}

if(tocBtn) {
  tocBtn.addEventListener('shown.bs.dropdown', () => {
    tocBtn.style.borderBottom = 'none';
    tocBtn.style.borderRadius = '4px 4px 0 0';
  });
  tocBtn.addEventListener('hidden.bs.dropdown', () => {
    tocBtn.style.borderBottom = '1px solid var(--alert-border-color)';
    tocBtn.style.borderRadius = '4px';
  });
}