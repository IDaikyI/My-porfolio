
document.addEventListener('DOMContentLoaded', () => {

  // Seleccionar elementos del HTML
  const filterButtons = document.querySelectorAll('.filter-btn');
  const dishCards = document.querySelectorAll('.dish-card');
  const counterBadge = document.getElementById('counterBadge');
  const emptyState = document.getElementById('emptyState');
  const resetBtn = document.getElementById('resetBtn');

  // Categoría seleccionada actualmente
  let currentCategory = 'todas';

  // Función para filtrar los platos
  function applyCategoryFilter(category) {

    currentCategory = category;

    let visibleCount = 0;

    // Recorrer todas las tarjetas
    dishCards.forEach(card => {

      const cardCategory = card.getAttribute('data-category');

      if (category === 'todas' || cardCategory === category) {

        card.style.display = 'flex';

        visibleCount++;

      } else {

        card.style.display = 'none';

      }

    });

    // Actualizar el contador
    counterBadge.textContent =
      `Mostrando: ${visibleCount} ${visibleCount === 1 ? 'plato' : 'platos'}`;

    // Mostrar u ocultar el mensaje de categoría vacía
    if (visibleCount === 0) {

      emptyState.classList.add('visible');

    } else {

      emptyState.classList.remove('visible');

    }

    // Actualizar el botón activo
    filterButtons.forEach(btn => {

      const btnCategory = btn.getAttribute('data-category');

      if (btnCategory === category) {

        btn.classList.add('active');

        btn.setAttribute('aria-pressed', 'true');

      } else {

        btn.classList.remove('active');

        btn.setAttribute('aria-pressed', 'false');

      }

    });

  }

  // Detectar clics en los botones de categorías
  filterButtons.forEach(button => {

    button.addEventListener('click', (e) => {

      const selectedCategory =
        e.currentTarget.getAttribute('data-category');

      applyCategoryFilter(selectedCategory);

    });

  });

  // Botón para mostrar todas las opciones
  resetBtn.addEventListener('click', () => {

    applyCategoryFilter('todas');

  });

  // Mantener la categoría seleccionada al cambiar el tamaño
  window.addEventListener('resize', () => {

    applyCategoryFilter(currentCategory);

  });

});
