document.addEventListener('DOMContentLoaded', function() {
  // SLIDER AUTO
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  
  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
  
  setInterval(nextSlide, 4000);
  
  // SIZE BUTTONS
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('selectedSize').value = btn.dataset.size;
    });
  });
  
  // MOBILE HAMBURGER MENU
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
  
  // TOAST
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }

  // Track add to cart events
  document.querySelectorAll('.add-btn, .btn-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Added to cart!');
    });
  });

  // Contact form submit prevention (handled server-side)
  const contactForm = document.querySelector('form[action=""]');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Let POST happen server-side
    });
  }
});
