/**
 * Gráficos para el Panel del Comisionista
 * Implementados con ApexCharts
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando gráficos de comisionista...");
    initCommissionerCharts();
    initCommissionerCharts2(); // Cargamos gráficos adicionales cuando se requieran
});

/**
 * Inicializa los gráficos principales del panel de comisionista
 */
function initCommissionerCharts() {
    console.log("Renderizando gráficos...");
    
    // Comprobamos que los contenedores existan
    if (!document.querySelector("#clientDistributionChart")) {
        console.error("No se encontró el contenedor para el gráfico de distribución de clientes");
        return;
    }
    
    // Distribución de Clientes (gráfico de dona)
    var clientDistributionOptions = {
        series: [70, 30],
        chart: {
            type: 'donut',
            height: 300,
            background: 'transparent',
            foreColor: '#9ca3af'
        },
        labels: ['Activos', 'Inactivos'],
        colors: ['#10B981', '#6B7280'],
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                return val.toFixed(1) + "%"
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total Clientes',
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                            }
                        }
                    }
                }
            }
        },
        legend: {
            position: 'bottom',
            fontFamily: 'inherit',
            labels: {
                colors: '#d1d5db'
            },
            markers: {
                width: 12,
                height: 12
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function (val) {
                    return val + " clientes"
                }
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        height: 280
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    };

    try {
        var clientDistributionChart = new ApexCharts(
            document.querySelector("#clientDistributionChart"), 
            clientDistributionOptions
        );
        clientDistributionChart.render();
        console.log("Gráfico de distribución de clientes renderizado correctamente");
    } catch (error) {
        console.error("Error al renderizar el gráfico de distribución de clientes:", error);
    }

    // Comisiones por Mercado (gráfico de barras)
    var commissionsByMarketOptions = {
        series: [{
            name: 'Comisiones',
            data: [4000, 1000]
        }],
        chart: {
            type: 'bar',
            height: 300,
            background: 'transparent',
            foreColor: '#9ca3af',
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: ['NASDAQ', 'NYSE'],
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
                    return '$' + val.toFixed(0);
                }
            }
        },
        colors: ['#047857'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded',
                borderRadius: 4
            },
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function (val) {
                    return "$" + val.toFixed(2)
                }
            }
        },
        grid: {
            borderColor: '#374151',
            strokeDashArray: 4
        }
    };

    try {
        var commissionsByMarketChart = new ApexCharts(
            document.querySelector("#commissionsByMarketChart"), 
            commissionsByMarketOptions
        );
        commissionsByMarketChart.render();
        console.log("Gráfico de comisiones por mercado renderizado correctamente");
    } catch (error) {
        console.error("Error al renderizar el gráfico de comisiones por mercado:", error);
    }
}

/**
 * Inicializa gráficos adicionales para el panel de comisionista
 */
function initCommissionerCharts2() {
    // Tendencia de ROI (para implementación futura)
    if (document.querySelector("#roiTrendChart")) {
        var roiTrendOptions = {
            series: [{
                name: "ROI Promedio",
                data: [12.5, 13.2, 15.5, 14.8, 16.0, 15.25]
            }],
            chart: {
                height: 280,
                type: 'line',
                background: 'transparent',
                foreColor: '#9ca3af',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: ['#8B5CF6'],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            grid: {
                borderColor: '#374151',
                strokeDashArray: 4,
                row: {
                    colors: ['transparent', 'transparent'],
                    opacity: 0.1
                }
            },
            xaxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
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
            markers: {
                size: 5,
                colors: ['#8B5CF6'],
                strokeColors: '#ffffff',
                strokeWidth: 2
            },
            tooltip: {
                theme: 'dark',
                y: {
                    formatter: function(val) {
                        return val.toFixed(2) + '%';
                    }
                }
            }
        };

        var roiTrendChart = new ApexCharts(document.querySelector("#roiTrendChart"), roiTrendOptions);
        roiTrendChart.render();
    }
}
