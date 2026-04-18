// Sparkles animation for nepCREW
document.addEventListener('DOMContentLoaded', () => {
  const sparkleBg = document.querySelector('.sparkle-bg');
  if (!sparkleBg) return;

  function createSparkle() {
    const sparkle = document.createElement('span');
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    sparkleBg.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 7000);
  }

  // Create sparkles continuously
  setInterval(createSparkle, 300);

  // Initial sparkles
  for (let i = 0; i < 5; i++) {
    setTimeout(createSparkle, i * 200);
  }
});

