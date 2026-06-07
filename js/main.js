// Main initialization
document.addEventListener('DOMContentLoaded', () => {
  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if(linkPage === currentPage) {
      link.classList.add('active');
    } else if(currentPage === 'index.html' && linkPage === 'index.html') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  console.log('Industrial-tech portfolio ready');
});