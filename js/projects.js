/* ============================================================
   projects.js — Project filtering & interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== FILTER ===== */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach((card, i) => {
          const cats = (card.dataset.category || '').split(' ');
          const show = filter === 'all' || cats.includes(filter);

          if (show) {
            card.classList.remove('hidden');
            // Stagger animation
            card.style.animationDelay = `${i * 0.05}s`;
            card.style.animation = 'none';
            requestAnimationFrame(() => {
              card.style.animation = 'fade-up 0.5s var(--ease) both';
            });
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ===== KEYBOARD SHORTCUT for filter ===== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const all = document.querySelector('.filter-btn[data-filter="all"]');
      if (all) all.click();
    }
  });

});