/* ============================================================
   animations.js — Advanced scroll animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== PARALLAX on hero blobs ===== */
  const blobs = document.querySelectorAll('.hero-bg-blob');
  if (blobs.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      blobs.forEach((blob, i) => {
        const speed = 0.08 + i * 0.04;
        blob.style.transform = `translateY(${y * speed}px)`;
      });
    }, { passive: true });
  }

  /* ===== STAGGER children of .stagger-parent ===== */
  document.querySelectorAll('.stagger-parent').forEach(parent => {
    const children = [...parent.children];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        children.forEach((child, i) => {
          child.style.opacity = '0';
          child.style.transform = 'translateY(20px)';
          setTimeout(() => {
            child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, i * 80);
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    observer.observe(parent)

  });

  /* ===== SKILL PILLS entrance ===== */
  document.querySelectorAll('.skill-pill').forEach((pill, i) => {
    pill.style.opacity = '0';
    pill.style.transform = 'scale(0.9)';
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        setTimeout(() => {
          pill.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          pill.style.opacity = '1';
          pill.style.transform = 'scale(1)';
        }, (i % 12) * 40);
        obs.unobserve(pill);
      });
    }, { threshold: 0.2 });
    obs.observe(pill);
  });

  /* ===== PROGRESS BARS (if any) ===== */
  document.querySelectorAll('[data-progress]').forEach(bar => {
    const fill = bar.querySelector('.progress-fill');
    if (!fill) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        fill.style.width = bar.dataset.progress + '%';
        observer.unobserve(bar);
      });
    }, { threshold: 0.4 });
    observer.observe(bar);
  });

  /* ===== NAV HIGHLIGHT on scroll (single page) ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navLinks.length) {
    const markActive = () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    };
    window.addEventListener('scroll', markActive, { passive: true });
  }

});