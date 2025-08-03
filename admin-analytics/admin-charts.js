/**
 * admin-charts.js
 * Script para inicializar y manejar los gráficos del dashboard administrativo
 */

function initAdminCharts() {
    console.log("Inicializando gráficos para el panel de administración...");
    
    // Verificar que los contenedores existan
    const chartContainers = {
        "orderDistributionChart": initializeOrderDistributionChart,
        "orderStatusChart": initializeOrderStatusChart,
        "rechargeCommissionChart": initializeRechargeCommissionChart,
        "activeUsersChart": initializeActiveUsersChart
    };
    
    // Inicializar solo los gráficos cuyos contenedores existen en la página
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

// Función para inicializar el gráfico de distribución de órdenes
function initializeOrderDistributionChart() {
    const container = document.querySelector("#orderDistributionChart");
    if (!container) {
        console.error("No se encontró el contenedor #orderDistributionChart");
        return;
    }
    // Limpiar el contenedor antes de renderizar un nuevo gráfico
    container.innerHTML = '';
    
    const options = {
        chart: {
            height: 320,
            type: 'pie',
            foreColor: 'var(--color-text-primary)',
            background: 'var(--color-background-card)',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            dropShadow: {
                enabled: true,
                top: 3,
                left: 2,
                blur: 4,
                opacity: 0.15
            }
        },
        colors: ['var(--color-accent-primary)', 'var(--color-accent-negative)'],
        series: [60, 40], // 60% compra, 40% venta
        labels: ['Compra', 'Venta'],
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            labels: {
                colors: 'var(--color-text-primary)'
            }
        },
        stroke: {
            width: 1, // Ligero borde para coincidir con el estilo dashboard
            colors: ['var(--color-background-card)']
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return opts.w.config.series[opts.seriesIndex] + '%';
            },
            style: {
                fontSize: '14px',
                colors: ['var(--color-text-primary)']
            },
            dropShadow: {
                enabled: true
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function (val) {
                    return val + '%';
                }
            }
        }
    };

    try {
        const chart = new ApexCharts(document.querySelector("#orderDistributionChart"), options);
        chart.render();
        console.log("Gráfico de distribución de órdenes renderizado correctamente");
    } catch (error) {
        console.error("Error al renderizar el gráfico de distribución de órdenes:", error);
    }
}

// Función para inicializar el gráfico de estado de órdenes
function initializeOrderStatusChart() {
    const container = document.querySelector("#orderStatusChart");
    if (!container) {
        console.error("No se encontró el contenedor #orderStatusChart");
        return;
    }
    // Limpiar el contenedor antes de renderizar un nuevo gráfico
    container.innerHTML = '';
    
    const options = {
        chart: {
            height: 320,
            type: 'bar',
            foreColor: 'var(--color-text-primary)',
            background: 'var(--color-background-card)',
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false
                }
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            dropShadow: {
                enabled: true,
                top: 2,
                left: 1,
                blur: 3,
                opacity: 0.2,
                color: 'var(--color-accent-primary)'
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 4,
                distributed: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        colors: ['var(--color-accent-primary)', 'var(--color-accent-warning)', 'var(--color-accent-negative)'],
        series: [
            {
                name: 'Completadas',
                data: [76, 85, 101, 98, 87, 105, 91]
            },
            {
                name: 'En Proceso',
                data: [44, 55, 57, 56, 61, 58, 63]
            },
            {
                name: 'Canceladas',
                data: [35, 41, 36, 26, 45, 48, 52]
            }
        ],
        title: {
            text: 'Estado de Órdenes por Día',
            align: 'left',
            style: {
                color: 'var(--color-accent-primary)'
            }
        },
        xaxis: {
            categories: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
            labels: {
                style: {
                    colors: 'var(--color-text-primary)'
                }
            },
            axisTicks: {
                color: 'var(--color-border-primary)'
            },
            axisBorder: {
                color: 'var(--color-border-primary)'
            }
        },
        yaxis: {
            title: {
                text: 'Número de Órdenes',
                style: {
                    color: 'var(--color-text-primary)'
                }
            },
            labels: {
                style: {
                    colors: 'var(--color-text-primary)'
                }
            }
        },
        fill: {
            opacity: 1
        },
        grid: {
            borderColor: 'var(--color-border-primary)',
            row: {
                colors: ['var(--color-background-card)', 'var(--color-background-card)']
            }
        },
        legend: {
            labels: {
                colors: 'var(--color-text-primary)'
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function (val) {
                    return val + " órdenes";
                }
            }
        }
    };

    try {
        const chart = new ApexCharts(document.querySelector("#orderStatusChart"), options);
        chart.render();
        console.log("Gráfico de estado de órdenes renderizado correctamente");
    } catch (error) {
        console.error("Error al renderizar el gráfico de estado de órdenes:", error);
    }
}

// Función para inicializar el gráfico de recargas y comisiones
function initializeRechargeCommissionChart() {
    const container = document.querySelector("#rechargeCommissionChart");
    if (!container) {
        console.error("No se encontró el contenedor #rechargeCommissionChart");
        return;
    }
    // Limpiar el contenedor antes de renderizar un nuevo gráfico
    container.innerHTML = '';
    
    const options = {
        chart: {
            height: 320,
            type: 'area',
            foreColor: 'var(--color-text-primary)',
            background: 'var(--color-background-card)',
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: false,
                    reset: true
                }
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            dropShadow: {
                enabled: true,
                top: 2,
                left: 2,
                blur: 4,
                opacity: 0.2,
                color: 'var(--color-accent-info)'
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        colors: ['var(--color-accent-primary)', 'var(--color-accent-info)'],
        series: [
            {
                name: 'Recargas',
                data: [31000, 40000, 28000, 51000, 42000, 82000, 56000]
            },
            {
                name: 'Comisiones',
                data: [3100, 4000, 2800, 5100, 4200, 8200, 5600]
            }
        ],
        title: {
            text: 'Recargas y Comisiones a lo largo del tiempo',
            align: 'left',
            style: {
                color: 'var(--color-accent-primary)'
            }
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2025-01-01', '2025-02-01', '2025-03-01',
                '2025-04-01', '2025-05-01', '2025-06-01',
                '2025-07-01'
            ],
            labels: {
                style: {
                    colors: 'var(--color-text-primary)'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Monto ($)',
                style: {
                    color: 'var(--color-text-primary)'
                }
            },
            labels: {
                style: {
                    colors: 'var(--color-text-primary)'
                },
                formatter: function (val) {
                    return '$' + val.toLocaleString();
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.2,
                stops: [0, 90, 100]
            }
        },
        grid: {
            borderColor: 'var(--color-border-primary)',
            row: {
                colors: ['transparent', 'rgba(59, 130, 246, 0.02)']
            }
        },
        states: {
            hover: {
                filter: {
                    type: 'lighten',
                    value: 0.05
                }
            }
        },
        legend: {
            labels: {
                colors: 'var(--color-text-primary)'
            },
            itemMargin: {
                horizontal: 12,
                vertical: 5
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return '$' + val.toLocaleString();
                }
            }
        }
    };

    try {
        const chart = new ApexCharts(document.querySelector("#rechargeCommissionChart"), options);
        chart.render();
        console.log("Gráfico de recargas y comisiones renderizado correctamente");
    } catch (error) {
        console.error("Error al renderizar el gráfico de recargas y comisiones:", error);
    }
}

// Función para inicializar el gráfico de usuarios activos
function initializeActiveUsersChart() {
    const container = document.querySelector("#activeUsersChart");
    if (!container) {
        console.error("No se encontró el contenedor #activeUsersChart");
        return;
    }
    // Limpiar el contenedor antes de renderizar un nuevo gráfico
    container.innerHTML = '';
    
    const options = {
        chart: {
            height: 350,
            type: 'line',
            foreColor: 'var(--color-text-primary)',
            background: 'transparent',
            toolbar: {
                show: false
            },
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 3,
                opacity: 0.2,
                color: 'var(--color-accent-primary)'
            }
        },
        colors: ['var(--color-accent-primary)'],
        series: [
            {
                name: 'Usuarios Activos',
                data: [450, 520, 550, 620, 700, 620, 700, 800, 820, 780, 900, 950]
            }
        ],
        stroke: {
            curve: 'smooth',
            width: 3,
            lineCap: 'round'
        },
        xaxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            labels: {
                style: {
                    colors: 'var(--color-text-primary)'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Número de Usuarios',
                style: {
                    color: 'var(--color-text-primary)'
                }
            },
            labels: {
                style: {
                    colors: 'var(--color-text-primary)'
                }
            }
        },
        grid: {
            borderColor: 'var(--color-border-primary)',
            row: {
                colors: ['transparent', 'rgba(16, 185, 129, 0.02)']
            },
            padding: {
                top: 10
            }
        },
        legend: {
            labels: {
                colors: 'var(--color-text-primary)'
            }
        },
        markers: {
            size: 5,
            colors: ['var(--color-accent-primary)'],
            strokeColors: 'var(--color-text-primary)',
            strokeWidth: 2,
            hover: {
                size: 7
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " usuarios";
                }
            }
        }
    };

    try {
        const chart = new ApexCharts(document.querySelector("#activeUsersChart"), options);
        chart.render();
        console.log("Gráfico de usuarios activos renderizado correctamente");
    } catch (error) {
        console.error("Error al renderizar el gráfico de usuarios activos:", error);
    }
}

// Función de debounce para controlar la frecuencia de redibujado
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Volver a dibujar los gráficos al cambiar el tamaño de la ventana
window.addEventListener('resize', debounce(function() {
    console.log("Redibujando gráficos por cambio de tamaño de la ventana...");
    document.dispatchEvent(new Event('analyticsContentLoaded'));
}, 250));
