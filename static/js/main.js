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
  
  // QTY
  let qty = 1;
  // Qty handler disabled - pages use page-specific JS
  // document.querySelectorAll('.qty-box button').forEach(btn => {
  //   btn.addEventListener('click', () => {
  //     const input = btn.parentElement.querySelector('input');
  //     if (btn.textContent === '+') {
  //       qty = parseInt(input.value) + 1;
  //     } else if (qty > 1) {
  //       qty = parseInt(input.value) - 1;
  //     }
  //     input.value = qty;
  //   });
  // });
  
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

  // Track add to cart events (analytics.js handles .add-btn, .btn-cart clicks)
  if (typeof trackEvent === 'function') {
    document.querySelectorAll('.add-btn, .btn-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const productName = btn.dataset.product || 'Unknown';
        const size = document.getElementById('selectedSize')?.value || 'N/A';
        const qty = document.querySelector('input[name="quantity"]')?.value || 1;
        trackEvent('Add to Cart', {product: productName, size, qty});
      });
    });
  }
});

