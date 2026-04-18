document.addEventListener('DOMContentLoaded', function() {
  // Slider
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Auto slide
  setInterval(nextSlide, 4000);

  // Manual dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  // Cart count
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    fetch('/cart-count/')
      .then(res => res.json())
      .then(data => cartCount.textContent = data.count);
  }

  // Toast
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Add to cart feedback
  document.querySelectorAll('form[action*="/add_to_cart"]').forEach(form => {
    form.addEventListener('submit', function() {
      showToast('Added to cart!');
    });
  });
});
