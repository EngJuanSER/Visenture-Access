/**
 * dropdown-handler.js
 * Script específico para manejar los dropdowns del sidebar en la aplicación Visenture
 */

// Esta función se encargará específicamente de los menús desplegables
function initSidebarDropdowns() {
  console.log('Inicializando dropdowns del sidebar...');
  
  // Obtener todos los botones de dropdown
  const dropdownButtons = document.querySelectorAll('.sidebar-dropdown-toggle');
  console.log(`Encontrados ${dropdownButtons.length} botones de dropdown`);
  
  if (dropdownButtons.length === 0) {
    console.log('No se encontraron botones de dropdown, reintentando en 300ms...');
    setTimeout(initSidebarDropdowns, 300);
    return;
  }
  
  // Configurar cada botón de dropdown
  dropdownButtons.forEach(button => {
    // Remover eventos previos clonando el botón
    const newButton = button.cloneNode(true);
    if (button.parentNode) {
      button.parentNode.replaceChild(newButton, button);
    }
    
    // Añadir el evento click al botón clonado
    newButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Obtener el contenido desplegable (próximo hermano del botón)
      const dropdownContent = this.nextElementSibling;
      if (!dropdownContent || !dropdownContent.classList.contains('sidebar-dropdown-content')) {
        console.error('No se encontró el contenido del dropdown');
        return;
      }
      
      // Toggle de visibilidad
      const isHidden = dropdownContent.classList.contains('hidden');
      console.log(`Dropdown está oculto: ${isHidden}, toggling...`);
      
      // Mostrar/ocultar el contenido
      if (isHidden) {
        dropdownContent.classList.remove('hidden');
      } else {
        dropdownContent.classList.add('hidden');
      }
      
      // Cambiar el ícono de la flecha
      const arrow = this.querySelector('.fa-chevron-down, .fa-chevron-up');
      if (arrow) {
        if (isHidden) {
          // Mostrar, cambiar a flecha hacia arriba
          arrow.classList.remove('fa-chevron-down');
          arrow.classList.add('fa-chevron-up');
        } else {
          // Ocultar, cambiar a flecha hacia abajo
          arrow.classList.remove('fa-chevron-up');
          arrow.classList.add('fa-chevron-down');
        }
        console.log(`Icono cambiado a: ${arrow.className}`);
      } else {
        console.warn('No se encontró el icono de flecha');
      }
    });
    
    console.log('Evento click añadido al botón de dropdown');
  });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Esperar un momento para que el sidebar se haya inicializado
  setTimeout(initSidebarDropdowns, 500);
});

// Si el DOM ya está cargado, inicializar inmediatamente
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  // Esperar un poco para dar tiempo a que el sidebar se haya cargado
  setTimeout(initSidebarDropdowns, 500);
  
  // También volver a intentar un poco después para componentes cargados dinámicamente
  setTimeout(initSidebarDropdowns, 1500);
}

// Configurar una función global para reiniciar los dropdowns
window.resetSidebarDropdowns = function() {
  console.log('Reiniciando configuración de dropdowns...');
  initSidebarDropdowns();
};

// También configurar un observador para detectar cuando se carga el header
const headerObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'childList' && 
        (mutation.target.id === 'header-placeholder' || 
         (mutation.target.parentNode && mutation.target.parentNode.id === 'header-placeholder'))) {
      console.log('Cambios detectados en el header, reinicializando dropdowns...');
      setTimeout(initSidebarDropdowns, 100);
    }
  });
});

// Iniciar observación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  headerObserver.observe(document.body, { 
    childList: true,
    subtree: true
  });
  console.log('Observador de header configurado');
});
