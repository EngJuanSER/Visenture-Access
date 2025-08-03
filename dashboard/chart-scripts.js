// Función para crear un gráfico de línea básico usando ApexCharts
function createBasicLineChart(chartId, title) {
  const options = {
    chart: {
      type: 'line',
      height: 320,
      foreColor: '#ccc',
      toolbar: {
        show: true
      },
      background: '#1e293b', // slate-800
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    colors: ['#6ee7b7'], // emerald-500
    series: [{
      name: "Precio",
      data: generateRandomData(30)
    }],
    title: {
      text: title,
      align: 'left',
      style: {
        color: '#6ee7b7' // emerald-400
      }
    },
    xaxis: {
      categories: generateDateRange(30),
      labels: {
        style: {
          colors: '#ccc'
        }
      },
      axisTicks: {
        color: '#333'
      },
      axisBorder: {
        color: '#333'
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
      borderColor: '#334155', // slate-700
      row: {
        colors: ['#1e293b', '#1e293b']
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 4,
      colors: ["#6ee7b7"],
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
        color: '#6ee7b7' // emerald-400
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
          upward: '#6ee7b7', // emerald-500
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
    colors: colors || ['#6ee7b7', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
    series: [{
      name: 'Valor',
      data: data
    }],
    title: {
      text: title,
      align: 'left',
      style: {
        color: '#6ee7b7' // emerald-400
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
    colors: ['#6ee7b7'], // emerald-500
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
        color: '#6ee7b7' // emerald-400
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
    colors: ['#6ee7b7', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
    title: {
      text: title,
      align: 'left',
      style: {
        color: '#6ee7b7' // emerald-400
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
