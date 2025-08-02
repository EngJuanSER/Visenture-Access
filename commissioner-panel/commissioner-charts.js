/**
 * Gráficos para el Panel del Comisionista
 * Implementados con ApexCharts
 */

/**
 * Inicializa los gráficos principales del panel de comisionista
 * Esta función puede ser llamada externamente desde index.html
 */
function initCommissionerCharts() {
    console.log("Renderizando gráficos...");
    
    // Comprobamos que los contenedores existan
    if (!document.querySelector("#clientDistributionChart")) {
        console.error("No se encontró el contenedor para el gráfico de distribución de clientes");
        console.log("Esperando 500ms e intentando de nuevo...");
        setTimeout(() => {
            if (document.querySelector("#clientDistributionChart")) {
                console.log("Contenedor encontrado en segundo intento");
                initChartsAfterCheck();
            } else {
                console.error("No se encontró el contenedor después del segundo intento");
            }
        }, 500);
        return;
    }
    
    initChartsAfterCheck();
}

/**
 * Función auxiliar que realiza la inicialización de las gráficas
 * después de confirmar que los contenedores existen
 */
function initChartsAfterCheck() {
    
    console.log("Iniciando renderizado de gráficos de comisionista...");
    
    // Distribución de Clientes (gráfico de dona)
    var clientDistributionOptions = {
        series: [70, 30],
        chart: {
            type: 'donut',
            height: 300,
            background: 'transparent',
            foreColor: '#e2e8f0',
            dropShadow: {
                enabled: true,
                top: 3,
                left: 2,
                blur: 4,
                opacity: 0.2
            }
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
                colors: '#e2e8f0'
            },
            markers: {
                width: 12,
                height: 12,
                radius: 2
            },
            itemMargin: {
                horizontal: 10,
                vertical: 5
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
            foreColor: '#e2e8f0',
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: ['NASDAQ', 'NYSE'],
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
                    return '$' + val.toFixed(0);
                }
            }
        },
        colors: ['#10B981'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded',
                borderRadius: 4,
                distributed: false,
                dataLabels: {
                    position: 'top'
                }
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
            strokeDashArray: 4,
            row: {
                colors: ['transparent', 'rgba(16, 185, 129, 0.05)']
            }
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.9
                }
            }
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
                foreColor: '#e2e8f0',
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
