// Función para inicializar el gráfico de distribución de órdenes
function initializeOrderDistributionChart() {
    if (!document.querySelector("#orderDistributionChart")) {
        console.error("No se encontró el contenedor #orderDistributionChart");
        return;
    }
    
    const options = {
        chart: {
            height: 350,
            type: 'pie',
            foreColor: '#ccc',
            background: 'transparent'
        },
        colors: ['#10b981', '#ef4444'], // Emerald y rojo
        series: [60, 40], // 60% compra, 40% venta
        labels: ['Compra', 'Venta'],
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            labels: {
                colors: '#ccc'
            }
        },
        stroke: {
            width: 0
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return opts.w.config.series[opts.seriesIndex] + '%';
            },
            style: {
                fontSize: '14px',
                colors: ['#fff']
            },
            dropShadow: {
                enabled: true
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
    if (!document.querySelector("#orderStatusChart")) {
        console.error("No se encontró el contenedor #orderStatusChart");
        return;
    }
    
    const options = {
        chart: {
            height: 350,
            type: 'bar',
            foreColor: '#ccc',
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 4
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
        colors: ['#10b981', '#f59e0b', '#ef4444'], // Emerald, Amber, Red
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
        xaxis: {
            categories: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
            labels: {
                style: {
                    colors: '#ccc'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Número de Órdenes',
                style: {
                    color: '#ccc'
                }
            },
            labels: {
                style: {
                    colors: '#ccc'
                }
            }
        },
        fill: {
            opacity: 1
        },
        grid: {
            borderColor: '#334155',
            row: {
                colors: ['transparent', 'transparent']
            }
        },
        legend: {
            labels: {
                colors: '#ccc'
            }
        },
        tooltip: {
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
    if (!document.querySelector("#rechargeCommissionChart")) {
        console.error("No se encontró el contenedor #rechargeCommissionChart");
        return;
    }
    
    const options = {
        chart: {
            height: 350,
            type: 'area',
            foreColor: '#ccc',
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        colors: ['#10b981', '#3b82f6'], // Emerald y azul
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
        xaxis: {
            type: 'datetime',
            categories: [
                '2025-01-01', '2025-02-01', '2025-03-01',
                '2025-04-01', '2025-05-01', '2025-06-01',
                '2025-07-01'
            ],
            labels: {
                style: {
                    colors: '#ccc'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Monto ($)',
                style: {
                    color: '#ccc'
                }
            },
            labels: {
                style: {
                    colors: '#ccc'
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
            borderColor: '#334155',
            row: {
                colors: ['transparent', 'transparent']
            }
        },
        legend: {
            labels: {
                colors: '#ccc'
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
    if (!document.querySelector("#activeUsersChart")) {
        console.error("No se encontró el contenedor #activeUsersChart");
        return;
    }
    
    const options = {
        chart: {
            height: 350,
            type: 'line',
            foreColor: '#ccc',
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        colors: ['#10b981'], // Emerald
        series: [
            {
                name: 'Usuarios Activos',
                data: [450, 520, 550, 620, 700, 620, 700, 800, 820, 780, 900, 950]
            }
        ],
        stroke: {
            curve: 'smooth',
            width: 3
        },
        xaxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            labels: {
                style: {
                    colors: '#ccc'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Número de Usuarios',
                style: {
                    color: '#ccc'
                }
            },
            labels: {
                style: {
                    colors: '#ccc'
                }
            }
        },
        grid: {
            borderColor: '#334155',
            row: {
                colors: ['transparent', 'transparent']
            }
        },
        legend: {
            labels: {
                colors: '#ccc'
            }
        },
        markers: {
            size: 5
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

// Inicializar gráficos cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
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
});
