
// Función para inicializar el sidebar
function initSidebar() {
  console.log('Inicializando sidebar desde archivo externo...');
  
  // Elementos del sidebar
  const sidebar = document.getElementById('sidebar');
  const toggleSidebar = document.getElementById('toggle-sidebar');
  const closeSidebar = document.getElementById('close-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarDropdownToggles = document.querySelectorAll('.sidebar-dropdown-toggle');
  
  // Verificar si se encontraron los elementos
  if (!sidebar || !toggleSidebar) {
    console.log('Elementos del sidebar no encontrados, intentando de nuevo en 200ms...');
    setTimeout(initSidebar, 200);
    return;
  }
  
  console.log('Elementos del sidebar encontrados:', {sidebar, toggleSidebar, closeSidebar, sidebarOverlay});
  
  // Función para abrir el sidebar
  function openSidebar() {
    console.log('Abriendo sidebar');
    sidebar.classList.remove('-translate-x-full');
    sidebarOverlay.classList.remove('hidden');
    setTimeout(() => {
      sidebarOverlay.classList.add('opacity-100');
      sidebarOverlay.classList.remove('opacity-0');
    }, 50);
  }
  
  // Función para cerrar el sidebar
  function closeSidebarFn() {
    console.log('Cerrando sidebar');
    sidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('opacity-0');
    sidebarOverlay.classList.remove('opacity-100');
    setTimeout(() => {
      sidebarOverlay.classList.add('hidden');
    }, 300);
  }
  
  // Event listeners para abrir/cerrar el sidebar
  console.log('Añadiendo evento click al botón de toggle');
  toggleSidebar.addEventListener('click', openSidebar);
  
  if (closeSidebar) {
    closeSidebar.addEventListener('click', closeSidebarFn);
  }
  
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebarFn);
  }
  
  // Manejar dropdowns dentro del sidebar - Reimplementación completa
  console.log(`Encontrados ${sidebarDropdownToggles.length} dropdowns para configurar`);
  
  // Primero eliminar cualquier evento previo para evitar duplicados
  sidebarDropdownToggles.forEach(toggle => {
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);
  });
  
  // Volver a seleccionar los elementos después de reemplazarlos
  const refreshedToggles = document.querySelectorAll('.sidebar-dropdown-toggle');
  
  // Añadir nuevos event listeners
  refreshedToggles.forEach(toggle => {
    toggle.addEventListener('click', function(event) {
      event.preventDefault();
      console.log('Click en dropdown toggle detectado');
      
      // Encontrar el contenido del dropdown (siguiente elemento hermano)
      const dropdownContent = this.nextElementSibling;
      console.log('Dropdown content:', dropdownContent);
      
      if (dropdownContent && dropdownContent.classList.contains('sidebar-dropdown-content')) {
        // Toggle del contenido
        const wasHidden = dropdownContent.classList.contains('hidden');
        console.log('El dropdown estaba oculto:', wasHidden);
        
        // Mostrar u ocultar
        if (wasHidden) {
          dropdownContent.classList.remove('hidden');
        } else {
          dropdownContent.classList.add('hidden');
        }
        
        // Cambiar el ícono
        const icon = this.querySelector('i.fa-chevron-down, i.fa-chevron-up');
        if (icon) {
          if (wasHidden) {
            // Si estaba oculto y ahora se muestra, cambiar a flecha arriba
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
          } else {
            // Si estaba visible y ahora se oculta, cambiar a flecha abajo
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
          }
          console.log('Icono actualizado:', icon.className);
        } else {
          console.warn('No se encontró el icono de flecha en el toggle');
        }
      } else {
        console.error('No se encontró el contenido del dropdown');
      }
    });
    
    console.log('Event listener añadido a dropdown toggle');
  });
  
  // Demo: Toggle entre botones de autenticación y perfil de usuario
  function setupAuthToggle() {
    const authButtons = document.querySelectorAll('.auth-buttons');
    const userProfiles = document.querySelectorAll('.user-profile');
    const userLogout = document.querySelector('.user-logout');
    
    console.log('Configurando toggle de autenticación');
    document.addEventListener('keydown', function(e) {
      if (e.key === 'l') { // Presionar 'l' para alternar
        console.log('Alternando estado de autenticación');
        authButtons.forEach(btn => btn.classList.toggle('hidden'));
        userProfiles.forEach(profile => profile.classList.toggle('hidden'));
        if (userLogout) userLogout.classList.toggle('hidden');
      }
    });
  }
  
  // Activamos el toggle de autenticación para pruebas
  setupAuthToggle();
}

// Esta función observa cambios en el DOM para reinicializar el sidebar cuando cambia el contenido
function setupSidebarObserver() {
  // Variables para controlar la frecuencia de inicialización
  let lastInitTime = 0;
  const MIN_INIT_INTERVAL = 500; // milisegundos mínimos entre inicializaciones
  
  // Función para reinicializar el sidebar con control de frecuencia
  function reinitSidebar() {
    const now = Date.now();
    if (now - lastInitTime > MIN_INIT_INTERVAL) {
      console.log('Reinicializando sidebar después de cambios en el DOM...');
      initSidebar();
      lastInitTime = now;
    }
  }
  
  // Crear un observador de mutaciones para detectar cambios en el DOM
  const observer = new MutationObserver(function(mutations) {
    let headerChanged = false;
    let sidebarElementsAdded = false;
    
    mutations.forEach(function(mutation) {
      // Verificar si la mutación afectó al header-placeholder
      if (mutation.target.id === 'header-placeholder' || 
          (mutation.target.parentNode && mutation.target.parentNode.id === 'header-placeholder')) {
        headerChanged = true;
      }
      
      // Verificar si se añadieron elementos relevantes al DOM
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Si es un elemento
            // Buscar elementos del sidebar
            if (node.id === 'sidebar' || 
                node.id === 'header-placeholder' ||
                node.querySelector && (
                  node.querySelector('#sidebar') ||
                  node.querySelector('#toggle-sidebar') ||
                  node.querySelector('.sidebar-dropdown-toggle') ||
                  node.querySelector('.sidebar-dropdown-content')
                )) {
              sidebarElementsAdded = true;
            }
          }
        });
      }
    });
    
    // Reinicializar si se detectaron cambios relevantes
    if (headerChanged || sidebarElementsAdded) {
      setTimeout(reinitSidebar, 100);
    }
  });

  // Observar todo el cuerpo del documento para detectar cambios
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });
  
  console.log('Observador de cambios DOM mejorado configurado con control de frecuencia');
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM completamente cargado, inicializando sidebar...');
  initSidebar();
  setupSidebarObserver();
});

// También ejecutar inmediatamente en caso de que el DOM ya esté cargado
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('DOM ya está cargado, inicializando sidebar inmediatamente...');
  setTimeout(function() {
    initSidebar();
    setupSidebarObserver();
  }, 100);
  
  // Asegurar una inicialización posterior para capturar elementos cargados dinámicamente
  setTimeout(function() {
    console.log('Inicialización secundaria del sidebar después de la carga de contenido...');
    initSidebar();
  }, 1000);
}
