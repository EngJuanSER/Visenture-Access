/*--------------------------------------------------
  VISENTURE - SISTEMA DE GESTIÓN DE FONDOS
--------------------------------------------------*/

document.addEventListener('fundsContentLoaded', initFundsModule);
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (!window.fundsModuleInitialized) {
            initFundsModule();
        }
    }, 2000);
});

// Variable para controlar si el módulo ya fue inicializado
window.fundsModuleInitialized = false;

/*--------------------------------------------------
  INICIALIZACIÓN DEL MÓDULO
--------------------------------------------------*/
function initFundsModule() {
    if (window.fundsModuleInitialized) {
        return;
    }
    
    const addFundsTab = document.getElementById('addFundsTab');
    const transactionsTab = document.getElementById('transactionsTab');
    const tabContentContainer = document.getElementById('tab-content-container');
    
    if (!addFundsTab || !transactionsTab || !tabContentContainer) {
        setTimeout(initFundsModule, 1000);
        return;
    }

    // Marcar que el módulo ha sido inicializado
    window.fundsModuleInitialized = true;
    
    /*--------------------------------------------------
      CONTROL DE PESTAÑAS
    --------------------------------------------------*/
    function activateTab(tab, contentPath, contentId) {
        // Actualizar apariencia de las pestañas
        document.querySelectorAll('.tab-button').forEach(t => {
            t.classList.remove('active', 'text-emerald-400', 'border-b-2', 'border-emerald-500');
            t.classList.add('text-slate-400');
        });
        
        tab.classList.add('active', 'text-emerald-400', 'border-b-2', 'border-emerald-500');
        tab.classList.remove('text-slate-400');
        
        // Siempre cargar el contenido fresco (evita problemas de caché)
        const shouldReload = true;
        const existingContent = document.getElementById(contentId);
        
        if (existingContent && !shouldReload) {
            // Mostrar el contenido que ya está cargado
            document.querySelectorAll('#tab-content-container > div[id]').forEach(div => {
                div.style.display = 'none';
            });
            existingContent.style.display = 'block';
            return;
        }
        
        // Mostrar indicador de carga mientras se carga el contenido
        tabContentContainer.innerHTML = `
            <div class="flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                <span class="ml-3 text-slate-300">Cargando...</span>
            </div>
        `;
        
        // Cargar el contenido desde el servidor (con parámetro para prevenir caché)
        fetch(contentPath + '?nocache=' + new Date().getTime())
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                // Crear un contenedor para el nuevo contenido
                tabContentContainer.innerHTML = '';
                const contentDiv = document.createElement('div');
                contentDiv.id = contentId;
                contentDiv.innerHTML = data;
                tabContentContainer.appendChild(contentDiv);
                
                console.log(`Contenido de ${contentId} cargado correctamente`);
                
                // Inicializar interacciones específicas según la pestaña
                if (contentId === 'add-funds-content') {
                    initAddFundsInteractions();
                } else if (contentId === 'transactions-history-content') {
                    initTransactionsInteractions();
                }
            })
            .catch(error => {
                console.error(`Error cargando ${contentPath}:`, error);
                tabContentContainer.innerHTML = `
                    <div class="text-center py-12">
                        <div class="text-red-500 mb-3">
                            <i class="fa-solid fa-triangle-exclamation text-4xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-red-400 mb-2">Error al cargar el contenido</h3>
                        <p class="text-slate-400">No se pudo cargar el componente. Por favor, intente recargar la página.</p>
                        <button onClick="location.reload()" class="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors">
                            <i class="fa-solid fa-rotate mr-2"></i>Recargar
                        </button>
                    </div>
                `;
            });
    }
    
    /*--------------------------------------------------
      INTERACCIÓN - AÑADIR FONDOS
    --------------------------------------------------*/
    function initAddFundsInteractions() {
        const amountButtons = document.querySelectorAll('.quick-amount-btn');
        if (amountButtons.length > 0) {
            amountButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    amountButtons.forEach(b => {
                        b.classList.remove('bg-emerald-600', 'text-white');
                        b.classList.add('bg-slate-700/50');
                    });
                    
                    this.classList.remove('bg-slate-700/50');
                    this.classList.add('bg-emerald-600', 'text-white');
                    
                    // Si hay un campo de entrada, actualizarlo con el valor seleccionado
                    const amountInput = document.querySelector('input[placeholder="Ingrese la cantidad"]');
                    if (amountInput) {
                        amountInput.value = this.textContent.replace('$', '').trim();
                    }
                });
            });
        }
        
        // Inicializar selección de métodos de pago
        const paymentMethods = document.querySelectorAll('.payment-method');
        if (paymentMethods.length > 0) {
            paymentMethods.forEach(method => {
                method.addEventListener('click', function() {
                    paymentMethods.forEach(pm => {
                        pm.classList.remove('bg-slate-700/50', 'border-emerald-500');
                        pm.classList.add('bg-slate-700/30', 'border-slate-600/30');
                    });
                    
                    this.classList.remove('bg-slate-700/30', 'border-slate-600/30');
                    this.classList.add('bg-slate-700/50', 'border-emerald-500');
                });
            });
        }
        
        console.log('Interacciones del componente "Añadir Fondos" inicializadas');
    }
    
    /*--------------------------------------------------
      INTERACCIÓN - HISTORIAL DE TRANSACCIONES
    --------------------------------------------------*/
    function initTransactionsInteractions() {
        const filterButtons = document.querySelectorAll('.filter-button');
        if (filterButtons.length > 0) {
            filterButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterButtons.forEach(b => {
                        b.classList.remove('bg-emerald-600/20', 'text-emerald-400');
                        b.classList.add('hover:bg-slate-700/50');
                    });
                    
                    this.classList.add('bg-emerald-600/20', 'text-emerald-400');
                    this.classList.remove('hover:bg-slate-700/50');
                });
            });
        }
        
        console.log('Interacciones del componente "Historial de Transacciones" inicializadas');
    }
    
    // Asignar eventos a las pestañas
    addFundsTab.addEventListener('click', function() {
        activateTab(this, 'add-funds/add-funds.html', 'add-funds-content');
    });
    
    transactionsTab.addEventListener('click', function() {
        activateTab(this, 'transactions-history/transactions-history.html', 'transactions-history-content');
    });
    
    // Activar la pestaña "Añadir Fondos" por defecto
    addFundsTab.click();
    
    console.log('Módulo de gestión de fondos inicializado correctamente');
}
