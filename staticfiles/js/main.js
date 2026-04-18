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
      const sizeInput = document.getElementById('selectedSize');
      if (sizeInput) sizeInput.value = btn.dataset.size;
    });
  });
  
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

// Track add to cart events - only on product pages
  if (window.location.pathname.includes('products') || window.location.pathname.includes('product_detail')) {
    document.querySelectorAll('.add-btn, .btn-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Added to cart!');
      });
    });
  }

  // Contact form
  const contactForm = document.querySelector('form[action]');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Server-side handled
    });
  }

  // Cart quantity +/- 
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('qty-plus') || e.target.classList.contains('qty-minus')) {
      const input = e.target.parentNode.querySelector('input');
      let val = parseInt(input.value) || 0;
      if (e.target.classList.contains('qty-plus')) val++;
      else if (val > 1) val--;
      input.value = val;
    }
  });
});

