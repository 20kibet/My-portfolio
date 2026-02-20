const ThemeManager = (() => {
  const KEY = 'portfolio-theme';
  let current = localStorage.getItem(KEY) || 'light';

  const apply = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    current = theme;
    localStorage.setItem(KEY, theme);
    // Update toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.querySelector('.icon').textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.querySelector('.label').textContent = theme === 'dark' ? 'Light' : 'Dark';
    });
  };
  

  const toggle = () => apply(current === 'light' ? 'dark' : 'light');
  const init   = () => apply(current);

  return { init, toggle, current: () => current };
})();

/* ===== NAV SCROLL ===== */
const NavManager = (() => {
  const nav = document.querySelector('.nav');
  if (!nav) return { init: () => {} };

  const update = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };

  const setActive = () => {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
      const href = a.getAttribute('href') || '';
      a.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
    });
  };

  const init = () => {
    window.addEventListener('scroll', update, { passive: true });
    update();
    setActive();
  };

  return { init };
})();

/* ===== MOBILE MENU ===== */
const MobileMenu = (() => {
  const btn   = document.querySelector('.nav-hamburger');
  const menu  = document.querySelector('.nav-mobile');
  if (!btn || !menu) return { init: () => {} };

  let open = false;

  const toggle = () => {
    open = !open;
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    // Animate spans
    const spans = btn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  };

  const init = () => {
    btn.addEventListener('click', toggle);
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (open) toggle();
    }));
    document.addEventListener('click', (e) => {
      if (open && !btn.contains(e.target) && !menu.contains(e.target)) toggle();
    });
  };

  return { init };
})();

/* ===== CUSTOM CURSOR ===== */
const Cursor = (() => {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return { init: () => {} };

  let mx = 0, my = 0, rx = 0, ry = 0;
  let rafId;

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = () => {
    rx = lerp(rx, mx, 0.15);
    ry = lerp(ry, my, 0.15);
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    rafId = requestAnimationFrame(animate);
  };

  const init = () => {
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    document.querySelectorAll('a, button, [role="button"], .filter-btn').forEach(el => {
      el.addEventListener('mouseenter', () => dot.classList.add('hovered'));
      el.addEventListener('mouseleave', () => dot.classList.remove('hovered'));
    });

    rafId = requestAnimationFrame(animate);
  };

  return { init };
})();

/* ===== SCROLL REVEAL ===== */
const ScrollReveal = (() => {
  const init = () => {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(t => observer.observe(t));
  };

  return { init };
})();

/* ===== TOAST ===== */
const Toast = (() => {
  let el;

  const create = () => {
    if (document.querySelector('.toast')) return;
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  };

  const show = (msg, type = 'success', duration = 3500) => {
    if (!el) create();
    el.textContent = msg;
    el.className = `toast ${type}`;
    setTimeout(() => el.classList.add('show'), 10);
    setTimeout(() => el.classList.remove('show'), duration);
  };

  return { show };
})();

/* ===== SMOOTH SCROLL for anchor links ===== */
const SmoothScroll = (() => {
  const init = () => {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  };
  return { init };
})();

/* ===== TYPEWRITER (hero) ===== */
const Typewriter = (() => {
  const init = (selector, words, speed = 100, pause = 2000) => {
    const el = document.querySelector(selector);
    if (!el) return;

    let wi = 0, ci = 0, deleting = false;

    const type = () => {
      const word = words[wi];
      el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

      if (!deleting && ci > word.length) {
        deleting = true;
        setTimeout(type, pause);
        return;
      }
      if (deleting && ci < 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        ci = 0;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, deleting ? speed / 2 : speed);
    };
    type();
  };
  return { init };
})();

/* ===== COUNT UP animation ===== */
const CountUp = (() => {
  const init = () => {
    const nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el  = entry.target;
        const end = parseInt(el.dataset.count);
        const dur = 1500;
        const step = end / (dur / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, end);
          el.textContent = Math.floor(current) + (el.dataset.suffix || '');
          if (current >= end) clearInterval(timer);
        }, 16);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    nums.forEach(n => observer.observe(n));
  };
  return { init };
})();

/* ===== COPY EMAIL ===== */
const CopyEmail = (() => {
  const init = () => {
    document.querySelectorAll('[data-copy-email]').forEach(btn => {
      btn.addEventListener('click', () => {
        const email = btn.dataset.copyEmail;
        navigator.clipboard.writeText(email).then(() => {
          Toast.show(`📋 ${email} copied!`, 'success');
        }).catch(() => {
          Toast.show('Could not copy email', 'error');
        });
      });
    });
  };
  return { init };
})();

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  NavManager.init();
  MobileMenu.init();
  Cursor.init();
  ScrollReveal.init();
  SmoothScroll.init();
  CountUp.init();
  CopyEmail.init();

  // Attach theme toggle
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', ThemeManager.toggle);
  });

  // Typewriter on homepage
  Typewriter.init('#typewriter', [
    'Full-Stack Developer',
    'Problem Solver',
    'UI Craftsman',
    'API Architect',
  ]);

  // Resume download tracking
  document.querySelectorAll('[data-resume]').forEach(btn => {
    btn.addEventListener('click', () => {
      Toast.show('📄 Resume download started!', 'success');
    });
  });
});