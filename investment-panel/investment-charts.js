/**
 * Gráficos para el Panel de Inversiones
 * Implementados con ApexCharts
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando gráficos del panel de inversiones...");
    initInvestmentCharts();
});

/**
 * Inicializa los gráficos del panel de inversiones
 */
function initInvestmentCharts() {
    // Verificamos que los contenedores existan
    const chartContainers = {
        "assetAllocationChart": initAssetAllocationChart,
        "performanceChart": initPerformanceChart
    };
    
    // Inicializar solo los gráficos cuyos contenedores existen
    Object.entries(chartContainers).forEach(([containerId, initFunction]) => {
        const container = document.querySelector("#" + containerId);
        if (container) {
            try {
                console.log(`Inicializando gráfico: ${containerId}`);
                initFunction();
            } catch (error) {
                console.error(`Error al inicializar gráfico ${containerId}:`, error);
            }
        } else {
            console.warn(`Contenedor #${containerId} no encontrado en el documento`);
        }
    });
}

/**
 * Inicializa el gráfico de distribución de activos
 */
function initAssetAllocationChart() {
    if (!document.querySelector("#assetAllocationChart")) {
        console.error("No se encontró el contenedor #assetAllocationChart");
        return;
    }
    
    const options = {
        series: [44, 55, 13, 43],
        chart: {
            type: 'pie',
            height: 300,
            background: 'transparent',
            foreColor: '#9ca3af'
        },
        labels: ['AAPL', 'GOOGL', 'MSFT', 'AMZN'],
        colors: ['#10B981', '#F59E0B', '#6366F1', '#EF4444'],
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                return val.toFixed(1) + "%"
            }
        },
        legend: {
            position: 'bottom',
            fontFamily: 'inherit',
            labels: {
                colors: '#d1d5db'
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function (val) {
                    return val + "%"
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 250
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    try {
        const assetAllocationChart = new ApexCharts(document.querySelector("#assetAllocationChart"), options);
        assetAllocationChart.render();
        console.log("Gráfico de distribución de activos renderizado correctamente");
    } catch (error) {
        console.error("Error al renderizar el gráfico de distribución de activos:", error);
    }
}

/**
 * Inicializa el gráfico de rendimiento a lo largo del tiempo
 */
function initPerformanceChart() {
    if (!document.querySelector("#performanceChart")) {
        console.error("No se encontró el contenedor #performanceChart");
        return;
    }
    
    const options = {
        series: [{
            name: 'Rendimiento',
            data: [10, 20, 15, 25, 22, 30, 28, 35]
        }],
        chart: {
            type: 'line',
            height: 300,
            background: 'transparent',
            foreColor: '#9ca3af',
            toolbar: {
                show: false
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        xaxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
            labels: {
                style: {
                    colors: '#d1d5db'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#d1d5db'
                },
                formatter: function(val) {
                    return val.toFixed(1) + '%';
                }
            }
        },
        colors: ['#047857'],
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function (val) {
                    return val + "%"
                }
            }
        },
        grid: {
            borderColor: '#334155',
            strokeDashArray: 4
        },
        markers: {
            size: 5,
            colors: ['#047857'],
            strokeColors: '#fff',
            strokeWidth: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.3,
                opacityFrom: 0.5,
                opacityTo: 0.1,
                stops: [0, 100]
            }
        }
    };

    try {
        const performanceChart = new ApexCharts(document.querySelector("#performanceChart"), options);
        performanceChart.render();
        console.log("Gráfico de rendimiento renderizado correctamente");
    } catch (error) {
        console.error("Error al renderizar el gráfico de rendimiento:", error);
    }
}
