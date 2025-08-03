/**
 * Gráficos para el Dashboard
 * Implementados con ApexCharts con mejoras de accesibilidad
 */

/**
 * Inicializa los gráficos del dashboard
 * @param {boolean} accessibilityEnabled - Si se deben habilitar mejoras de accesibilidad
 */
function initDashboardCharts(accessibilityEnabled = true) {
    console.log("Inicializando gráficos del dashboard con accesibilidad...");
    
    // Comprobar que el contenedor para el gráfico existe
    const chartContainer = document.getElementById('stock-price-chart');
    const toggleViewBtn = document.getElementById('toggle-view-btn');
    const chartView = document.getElementById('chart-view');
    const tableView = document.getElementById('table-view');
    
    if (!chartContainer) {
        console.error("No se encontró el contenedor para el gráfico de precios");
        console.log("Esperando 500ms e intentando de nuevo...");
        
        setTimeout(() => {
            const retryContainer = document.getElementById('stock-price-chart');
            if (retryContainer) {
                console.log("Contenedor encontrado en segundo intento");
                renderStockPriceChart(retryContainer, accessibilityEnabled);
            } else {
                console.error("No se encontró el contenedor después del segundo intento");
            }
        }, 500);
        return;
    }
    
    // Configurar el botón para alternar entre gráfico y tabla si existe
    if (toggleViewBtn) {
        toggleViewBtn.addEventListener('click', function() {
            const isShowingTable = toggleViewBtn.getAttribute('aria-pressed') === 'true';
            
            if (isShowingTable) {
                // Cambiar a mostrar gráfico
                chartView.classList.remove('hidden');
                tableView.classList.add('hidden');
                toggleViewBtn.textContent = 'Mostrar tabla';
                toggleViewBtn.setAttribute('aria-pressed', 'false');
                announceToScreenReader('Mostrando gráfico visual');
            } else {
                // Cambiar a mostrar tabla
                chartView.classList.add('hidden');
                tableView.classList.remove('hidden');
                toggleViewBtn.textContent = 'Mostrar gráfico';
                toggleViewBtn.setAttribute('aria-pressed', 'true');
                announceToScreenReader('Mostrando tabla de datos accesible');
            }
        });
    }
    
    // Si tenemos el contenedor, renderizamos el gráfico
    renderStockPriceChart(chartContainer, accessibilityEnabled);
    
    // Llenar la tabla de datos accesible si existe
    populateDataTable();
}

/**
 * Anuncia un mensaje para lectores de pantalla
 * @param {string} message - El mensaje a anunciar
 */
function announceToScreenReader(message) {
    const announcement = document.getElementById('chart-accessibility-announcement');
    if (announcement) {
        announcement.textContent = message;
    }
}

/**
 * Función para crear un gráfico de línea básico usando ApexCharts con opciones de accesibilidad
 * @param {string} chartId - El ID del elemento contenedor del gráfico
 * @param {string} title - El título del gráfico
 * @param {boolean} accessibilityEnabled - Si se deben habilitar mejoras de accesibilidad
 * @returns {Object} - Configuración de opciones para ApexCharts
 */
function createBasicLineChart(chartId, title, accessibilityEnabled = true) {
  // Colores optimizados para accesibilidad con suficiente contraste
  const accessibleColors = {
    line: '#10b981',        // Verde brillante para la línea principal
    grid: '#6b7280',        // Gris medio para la cuadrícula
    text: '#ffffff',        // Blanco para el texto
    title: '#ffffff',       // Blanco para títulos
    background: 'transparent',
    tooltip: {
      background: '#1f2937', // Fondo del tooltip
      text: '#ffffff'       // Texto del tooltip
    }
  };

  // Usar colores estándar si la accesibilidad no está habilitada
  const colors = accessibilityEnabled ? accessibleColors : {
    line: '#10b981',
    grid: '#334155',
    text: '#ccc',
    title: '#34d399',
    background: 'transparent',
    tooltip: {
      background: 'dark',
      text: '#ccc'
    }
  };

  const options = {
    chart: {
      type: 'line',
      height: 320,
      foreColor: colors.text,
      toolbar: {
        show: true
      },
      background: colors.background,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    stroke: {
      width: accessibilityEnabled ? 4 : 3, // Línea más gruesa para mejor visibilidad
      curve: 'smooth'
    },
    colors: [colors.line],
    series: [{
      name: "Precio",
      data: generateRandomData(30)
    }],
    title: {
      text: title,
      align: 'left',
      style: {
        color: colors.title,
        fontSize: accessibilityEnabled ? '16px' : '14px',
        fontWeight: accessibilityEnabled ? 'bold' : 'normal'
      }
    },
    xaxis: {
      categories: generateDateRange(30),
      labels: {
        style: {
          colors: colors.text,
          fontSize: accessibilityEnabled ? '13px' : '12px'
        },
        rotate: 0, // Mantener etiquetas horizontales para mejor legibilidad
        formatter: function(value) {
          // Formato de fecha más legible
          const date = new Date(value);
          return date.toLocaleDateString();
        }
      },
      axisTicks: {
        color: colors.grid
      },
      axisBorder: {
        color: colors.grid,
        width: accessibilityEnabled ? 2 : 1
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: colors.text,
          fontSize: accessibilityEnabled ? '13px' : '12px'
        },
        formatter: function(value) {
          // Añadir símbolo de dólar para claridad
          return '$' + value;
        }
      },
      axisBorder: {
        show: accessibilityEnabled,
        color: colors.grid,
        width: accessibilityEnabled ? 2 : 1
      }
    },
    grid: {
      borderColor: colors.grid,
      strokeDashArray: accessibilityEnabled ? 0 : 1, // Líneas sólidas para mejor visibilidad
      row: {
        colors: [colors.background, colors.background]
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true
      },
      style: {
        fontSize: accessibilityEnabled ? '14px' : '12px',
        fontFamily: 'Arial, sans-serif'
      },
      marker: {
        size: accessibilityEnabled ? 6 : 4
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 4,
      colors: ["#10b981"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7
      }
    },
    legend: {
      labels: {
        colors: '#ccc'
      }
    }
  };

  const chart = new ApexCharts(document.querySelector(chartId), options);
  chart.render();
  return chart;
}

// Función para crear un gráfico de velas (candlestick) para datos de trading
function createCandlestickChart(chartId, title) {
  const candlestickData = generateCandlestickData(30);
  
  const options = {
    chart: {
      type: 'candlestick',
      height: 320,
      foreColor: '#ccc',
      toolbar: {
        show: true
      },
      background: '#1e293b' // slate-800
    },
    series: [{
      data: candlestickData
    }],
    title: {
      text: title,
      align: 'left',
      style: {
        color: '#34d399' // emerald-400
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#ccc'
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors: '#ccc'
        }
      }
    },
    grid: {
      borderColor: '#334155' // slate-700
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#10b981', // emerald-500
          downward: '#ef4444' // red-500
        },
        wick: {
          useFillColor: true
        }
      }
    }
  };

  const chart = new ApexCharts(document.querySelector(chartId), options);
  chart.render();
  return chart;
}

// Crear un gráfico de barras simple
function createBarChart(chartId, title, categories, data, colors) {
  const options = {
    chart: {
      type: 'bar',
      height: 320,
      foreColor: '#ccc',
      toolbar: {
        show: true
      },
      background: '#1e293b' // slate-800
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        distributed: true
      }
    },
    colors: colors || ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
    series: [{
      name: 'Valor',
      data: data
    }],
    title: {
      text: title,
      align: 'left',
      style: {
        color: '#34d399' // emerald-400
      }
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: '#ccc',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#ccc'
        }
      }
    },
    grid: {
      borderColor: '#334155' // slate-700
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    }
  };

  const chart = new ApexCharts(document.querySelector(chartId), options);
  chart.render();
  return chart;
}

// Crear un gráfico de áreas con degradado
function createAreaChart(chartId, title) {
  const options = {
    chart: {
      type: 'area',
      height: 320,
      foreColor: '#ccc',
      toolbar: {
        show: true
      },
      background: '#1e293b' // slate-800
    },
    colors: ['#10b981'], // emerald-500
    series: [{
      name: 'Valor',
      data: generateRandomData(30, 1000, 5000)
    }],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    title: {
      text: title,
      align: 'left',
      style: {
        color: '#34d399' // emerald-400
      }
    },
    xaxis: {
      categories: generateDateRange(30),
      labels: {
        style: {
          colors: '#ccc'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#ccc'
        },
        formatter: function(val) {
          return '$' + val.toFixed(2);
        }
      }
    },
    grid: {
      borderColor: '#334155' // slate-700
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    }
  };

  const chart = new ApexCharts(document.querySelector(chartId), options);
  chart.render();
  return chart;
}

// Función para crear un gráfico de pie/donut
function createDonutChart(chartId, title, labels, series) {
  const options = {
    chart: {
      type: 'donut',
      height: 320,
      foreColor: '#ccc',
      background: '#1e293b' // slate-800
    },
    series: series,
    labels: labels,
    colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
    title: {
      text: title,
      align: 'left',
      style: {
        color: '#34d399' // emerald-400
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '55%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: function(w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#111']
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        borderWidth: 0
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: '#ccc'
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const chart = new ApexCharts(document.querySelector(chartId), options);
  chart.render();
  return chart;
}

// Funciones de utilidad para generar datos aleatorios
function generateRandomData(count, min = 100, max = 400) {
  return Array.from({ length: count }, () => 
    parseFloat((Math.random() * (max - min) + min).toFixed(2))
  );
}

function generateCandlestickData(count) {
  const data = [];
  let baseValue = 200;
  let date = new Date(2025, 6, 1);
  
  for (let i = 0; i < count; i++) {
    const open = baseValue + Math.random() * 20 - 10;
    const close = open + Math.random() * 20 - 10;
    const low = Math.min(open, close) - Math.random() * 10;
    const high = Math.max(open, close) + Math.random() * 10;
    
    data.push({
      x: new Date(date.getTime()),
      y: [open, high, low, close].map(val => parseFloat(val.toFixed(2)))
    });
    
    date.setDate(date.getDate() + 1);
    baseValue = close;
  }
  
  return data;
}

function generateDateRange(count) {
  const dates = [];
  const today = new Date();
  
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    dates.push(date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }));
  }
  
  return dates;
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
  console.log("Inicializando gráficos del panel de trading...");
  
  // Define los gráficos a inicializar con sus funciones correspondientes
  const chartsToInitialize = [
    {
      id: '#stock-price-chart',
      title: 'AAPL - Evolución de Precios',
      init: createCandlestickChart
    },
    {
      id: '#portfolio-performance-chart',
      title: 'Rendimiento del Portafolio',
      init: createAreaChart
    },
    {
      id: '#market-distribution-chart',
      title: 'Distribución de Cartera',
      init: function(id, title) {
        createDonutChart(
          id, 
          title, 
          ['Tecnología', 'Finanzas', 'Salud', 'Consumo', 'Energía'], 
          [42, 23, 15, 12, 8]
        );
      }
    },
    {
      id: '#trading-volume-chart',
      title: 'Volumen de Trading',
      init: function(id, title) {
        createBarChart(
          id, 
          title, 
          ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], 
          [120, 92, 85, 104, 115, 45, 32]
        );
      }
    }
  ];
  
  // Inicializar cada gráfico si su contenedor existe
  chartsToInitialize.forEach(chart => {
    const container = document.querySelector(chart.id);
    if (container) {
      try {
        console.log(`Inicializando gráfico: ${chart.id}`);
        chart.init(chart.id, chart.title);
      } catch (error) {
        console.error(`Error al inicializar gráfico ${chart.id}:`, error);
      }
    } else {
      console.warn(`Contenedor ${chart.id} no encontrado`);
    }
  });
});

/**
 * Genera datos para la tabla accesible
 * @returns {Array} - Array de objetos con fecha, precio y cambio porcentual
 */
function generateTableData() {
  const tableData = [];
  const dates = generateDateRange(14);
  const prices = generateRandomData(14);
  
  for (let i = 0; i < prices.length; i++) {
    const previousPrice = i > 0 ? prices[i-1] : prices[i];
    const change = ((prices[i] - previousPrice) / previousPrice) * 100;
    
    tableData.push({
      date: dates[i],
      price: prices[i],
      change: i > 0 ? change.toFixed(2) : 'N/A'
    });
  }
  
  return tableData;
}

/**
 * Llena la tabla de datos accesible con los datos del gráfico
 */
function populateDataTable() {
  const tableBody = document.getElementById('stock-data-table-body');
  if (!tableBody) return;
  
  tableBody.innerHTML = '';
  const tableData = generateTableData();
  
  tableData.forEach(data => {
    const row = document.createElement('tr');
    
    // Columna de fecha
    const dateCell = document.createElement('td');
    dateCell.className = 'border border-slate-400 p-2 text-white';
    dateCell.textContent = data.date;
    row.appendChild(dateCell);
    
    // Columna de precio
    const priceCell = document.createElement('td');
    priceCell.className = 'border border-slate-400 p-2 text-white';
    priceCell.textContent = '$' + data.price.toFixed(2);
    row.appendChild(priceCell);
    
    // Columna de cambio porcentual
    const changeCell = document.createElement('td');
    changeCell.className = 'border border-slate-400 p-2';
    
    if (data.change !== 'N/A') {
      if (parseFloat(data.change) >= 0) {
        changeCell.textContent = '+' + data.change + '%';
        changeCell.className += ' text-green-300';
      } else {
        changeCell.textContent = data.change + '%';
        changeCell.className += ' text-red-300';
      }
    } else {
      changeCell.textContent = data.change;
      changeCell.className += ' text-white';
    }
    
    row.appendChild(changeCell);
    tableBody.appendChild(row);
  });
}
