const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── MOBILE MENU ── */
const hamburger = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    })
  );
  // Close on outside click
  document.addEventListener('click', e => {
    if (mobileMenu.classList.contains('open') && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

/* ── NAV SCROLL TINT ── */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 40 ? '0 2px 20px rgba(0,0,0,0.5)' : '';
  }, { passive: true });
}

/* ── CUSTOM CURSOR ── */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if (dot && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  const lerp = (a, b, t) => a + (b - a) * t;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
  });
  const animateRing = () => {
    rx = lerp(rx, mx, 0.14);
    ry = lerp(ry, my, 0.14);
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  };
  animateRing();
  document.querySelectorAll('a,button,.feat-card,.proj-card,.project-item,.blog-post,.pill').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.style.width = '28px'; dot.style.height = '28px'; dot.style.opacity = '0.15'; });
    el.addEventListener('mouseleave', () => { dot.style.width = ''; dot.style.height = ''; dot.style.opacity = ''; });
  });
}

/* ── SKILL PILL ENTRANCE ── */
document.querySelectorAll('.pill').forEach((pill, i) => {
  pill.style.opacity = '0';
  pill.style.transform = 'scale(0.9)';
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      setTimeout(() => {
        pill.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        pill.style.opacity = '1';
        pill.style.transform = 'scale(1)';
      }, i * 40);
      obs.unobserve(pill);
    });
  }, { threshold: 0.2 });
  obs.observe(pill);
});

/* ── FEAT CARD TILT ── */
document.querySelectorAll('.feat-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 7;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 7;
    card.style.transform = `translateY(-5px) rotateX(${-y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.08s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.22s ease';
  });
});
EOF