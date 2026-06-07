// Custom cursor and scroll animations for industrial theme

(function() {
  // Mobile menu toggle
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if(hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const expanded = mobileMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', expanded);
    });
    
    document.querySelectorAll('.nav-mobile a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  // Custom cursor follow
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  
  if(dot && ring){
    document.addEventListener('mousemove', (e) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    // Enlarge cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .feat-card, .proj-card, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => { 
        ring.style.width = '48px'; 
        ring.style.height = '48px';
        ring.style.borderColor = '#FB923C';
      });
      el.addEventListener('mouseleave', () => { 
        ring.style.width = '34px'; 
        ring.style.height = '34px';
        ring.style.borderColor = 'rgba(249, 115, 22, 0.6)';
      });
    });
  }

  // Scroll reveal animations
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  
  reveals.forEach(r => observer.observe(r));
  
  // Trigger on load for any visible elements
  window.dispatchEvent(new Event('scroll'));
  
  // Optional: Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if(href !== '#' && href !== '' && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();