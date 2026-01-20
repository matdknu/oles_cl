// Hacer las imágenes de las cards clickeables
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.quarto-grid-item');
  
  cards.forEach(card => {
    const link = card.querySelector('.listing-title a, .card-title a');
    const image = card.querySelector('.card-img-top');
    
    if (link && image) {
      image.style.cursor = 'pointer';
      
      image.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = link.href;
      });
      
      // Mejorar accesibilidad
      image.setAttribute('role', 'button');
      image.setAttribute('tabindex', '0');
      image.setAttribute('aria-label', 'Ver noticia: ' + link.textContent.trim());
      
      // Permitir navegación con teclado
      image.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = link.href;
        }
      });
    }
  });
});
