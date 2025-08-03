/**
 * Gráficos para el Panel de Inversiones
 * Implementados con ApexCharts
 */

/**
 * Inicializa los gráficos del panel de inversiones
 */
function initInvestmentCharts() {
    console.log("Inicializando gráficos del panel de inversiones...");
    
    // Verificamos que los contenedores existan
    const assetChart = document.querySelector("#assetAllocationChart");
    const performanceChart = document.querySelector("#performanceChart");
    
    if (!assetChart || !performanceChart) {
        console.error("No se encontraron los contenedores para los gráficos");
        console.log("Esperando 500ms e intentando de nuevo...");
        
        setTimeout(() => {
            if (document.querySelector("#assetAllocationChart") && document.querySelector("#performanceChart")) {
                console.log("Contenedores encontrados en segundo intento");
                renderInvestmentCharts();
            } else {
                console.error("No se encontraron los contenedores después del segundo intento");
            }
        }, 500);
        return;
    }
    
    // Si tenemos los contenedores, continuamos con la inicialización
    renderInvestmentCharts();
}

/**
 * Renderiza todos los gráficos del panel de inversiones
 */
function renderInvestmentCharts() {
    try {
        initAssetAllocationChart();
        initPerformanceChart();
    } catch (error) {
        console.error("Error al renderizar los gráficos:", error);
    }
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
            foreColor: '#e2e8f0'
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
                colors: '#e2e8f0'
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
            foreColor: '#e2e8f0',
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
                    colors: '#e2e8f0'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#e2e8f0'
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
