// Sparkles animation for nepCREW - MORE INTENSE
document.addEventListener('DOMContentLoaded', () => {
  const sparkleBg = document.querySelector('.sparkle-bg');
  if (!sparkleBg) return;

  function createSparkle() {
    const sparkle = document.createElement('span');
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's'; // Faster
    sparkle.style.animationDelay = 0;
    sparkleBg.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 4000);
  }

  // Create MORE sparkles FASTER
  setInterval(createSparkle, 100); // Every 100ms

  // Initial burst
  for (let i = 0; i < 20; i++) {
    setTimeout(createSparkle, i * 50);
  }
});

