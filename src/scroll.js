document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Previne o comportamento padrão do link
  
      const targetId = this.getAttribute('href').substring(1); // Remove o '#' do href
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        // Calcula a posição do elemento
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 2000; // Duração da animação em milissegundos
        let start = null;
  
        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const ease = easeInOutCubic(progress / duration); // Função de easing
          window.scrollTo(0, startPosition + distance * ease);
  
          if (progress < duration) {
            window.requestAnimationFrame(step); // Continua a animação
          }
        }
  
        window.requestAnimationFrame(step); // Inicia a animação
      }
    });
  });
  
  // Função de easing para suavizar o movimento
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  