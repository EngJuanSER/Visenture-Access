/**
 * Gráficos para el Reporte de Cliente
 * Implementados con ApexCharts
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando gráficos de reporte de cliente...");
    
    // Dar un pequeño tiempo para que el DOM se cargue completamente
    setTimeout(function() {
        initClientReportCharts();
    }, 100);

    // Por seguridad, intentar de nuevo en caso de que haya algún problema
    setTimeout(function() {
        // Verificar si alguna gráfica no se ha inicializado correctamente
        const chartContainers = ["commissionsTrendChart", "assetDistributionChart", "roiTrendChart"];
        const needsReinitialization = chartContainers.some(id => {
            const container = document.getElementById(id);
            return container && container.children.length === 0;
        });
        
        if (needsReinitialization) {
            console.log("Reintentando inicialización de gráficos...");
            initClientReportCharts();
        }
    }, 1000);
});

/**
 * Inicializa los gráficos para el reporte de cliente
 */
function initClientReportCharts() {
    console.log("Comprobando contenedores de gráficos...");
    
    // Lista de IDs de contenedores que debemos verificar
    const chartIds = ["commissionsTrendChart", "assetDistributionChart", "roiTrendChart"];
    
    // Verificar que los contenedores existan
    let missingContainers = chartIds.filter(id => !document.querySelector("#" + id));
    if (missingContainers.length > 0) {
        console.warn("Contenedores de gráficos no encontrados:", missingContainers.join(", "));
        return; // No continuamos si faltan contenedores
    }
    
    // Asegurarse de que cada contenedor tenga el tamaño adecuado antes de inicializar las gráficas
    chartIds.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            const parent = container.parentElement;
            if (parent) {
                // Asegurarse de que el contenedor sea visible
                parent.style.opacity = "1";
                parent.style.display = "flex";
            }
        }
    });
    
    // Gráfico de tendencia de comisiones
    if(document.querySelector("#commissionsTrendChart")) {
        var roiTimeChartOptions = {
            series: [{
                name: "ROI",
                data: [5, 8, 12, 10, 15, 20]
            }],
            chart: {
                type: 'line',
                height: 280,
                background: 'transparent',
                foreColor: '#9ca3af',
                toolbar: {
                    show: false
                },
                offsetX: 0,
                offsetY: 0,
                events: {
                    mounted: function(chartContext, config) {
                        setTimeout(function() {
                            chartContext.updateOptions({
                                chart: {
                                    offsetX: 0
                                }
                            });
                        }, 300);
                    }
                },
            },
            colors: ['#10B981'],
            stroke: {
                curve: 'smooth',
                width: 3
            },
            xaxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                labels: {
                    style: {
                        colors: '#d1d5db'
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#374151',
                },
                axisTicks: {
                    show: true,
                    color: '#374151',
                }
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        return val.toFixed(0) + '%';
                    },
                    style: {
                        colors: '#d1d5db'
                    }
                }
            },
            markers: {
                size: 5,
                colors: ['#10B981'],
                strokeColors: '#ffffff',
                strokeWidth: 2,
            },
            grid: {
                borderColor: '#374151',
                strokeDashArray: 4,
                xaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            tooltip: {
                theme: 'dark',
                y: {
                    formatter: function(val) {
                        return val + '%';
                    }
                }
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
            var commissionsTrendChart = new ApexCharts(document.querySelector("#commissionsTrendChart"), roiTimeChartOptions);
            commissionsTrendChart.render();
            console.log("Gráfico de tendencias de comisiones renderizado correctamente");
        } catch (error) {
            console.error("Error al renderizar el gráfico de comisiones:", error);
        }
    }

    // Distribución de activos
    if(document.querySelector("#assetDistributionChart")) {
        var portfolioDistOptions = {
            series: [25, 20, 18, 15, 12, 10],
            chart: {
                type: 'donut',
                height: 320,
                width: '100%',
                background: 'transparent',
                foreColor: '#9ca3af',
                offsetX: 0,
                offsetY: 0,
                sparkline: {
                    enabled: false
                },
                events: {
                    mounted: function(chartContext, config) {
                        setTimeout(function() {
                            chartContext.updateOptions({
                                chart: {
                                    offsetX: 0
                                }
                            });
                        }, 300);
                    }
                },
            },
            labels: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'Otros'],
            colors: ['#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F97316', '#6B7280'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%', // Aumentamos un poco el tamaño del agujero
                        labels: {
                            show: true,
                            name: {
                                show: false, // Ocultamos nombres
                            },
                            value: {
                                show: true,
                                fontSize: '22px',
                                color: '#fff',
                                offsetY: 5,
                                formatter: function(val) {
                                    return val + '%';
                                }
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#d1d5db',
                                fontSize: '16px',
                                formatter: function() {
                                    return '100%';
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: false // Desactivamos las etiquetas de datos
                    }
                }
            },
            legend: {
                show: false, // Ocultamos las leyendas como solicita el usuario
            },
            tooltip: {
                theme: 'dark',
                y: {
                    formatter: function(val) {
                        return val + '%';
                    }
                },
                style: {
                    fontSize: '14px'
                },
                marker: {
                    show: true,
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        height: 240
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };

        try {
            var assetDistributionChart = new ApexCharts(document.querySelector("#assetDistributionChart"), portfolioDistOptions);
            assetDistributionChart.render();
            console.log("Gráfico de distribución de activos renderizado correctamente");
        } catch (error) {
            console.error("Error al renderizar el gráfico de distribución de activos:", error);
        }
    }

    // ROI vs Benchmark
    if(document.querySelector("#roiTrendChart")) {
        var operationsByMonthOptions = {
            series: [{
                name: 'Operaciones',
                data: [8, 12, 5, 10, 7, 8]
            }],
            chart: {
                height: 280,
                type: 'bar',
                background: 'transparent',
                foreColor: '#9ca3af',
                toolbar: {
                    show: false
                },
                offsetX: 0,
                offsetY: 0,
                events: {
                    mounted: function(chartContext, config) {
                        setTimeout(function() {
                            chartContext.updateOptions({
                                chart: {
                                    offsetX: 0
                                }
                            });
                        }, 300);
                    }
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    dataLabels: {
                        position: 'top',
                    },
                    columnWidth: '60%',
                    colors: {
                        ranges: [{
                            from: 0,
                            to: 100,
                            color: '#8B5CF6'
                        }]
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ['#8B5CF6'],
            xaxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                labels: {
                    style: {
                        colors: '#d1d5db'
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#374151'
                },
                axisTicks: {
                    show: true,
                    color: '#374151'
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#d1d5db'
                    },
                    formatter: function(val) {
                        return Math.round(val);
                    }
                }
            },
            grid: {
                borderColor: '#374151',
                strokeDashArray: 4
            },
            tooltip: {
                theme: 'dark',
                y: {
                    formatter: function(val) {
                        return Math.round(val) + ' operaciones';
                    }
                }
            }
        };

        try {
            var roiTrendChart = new ApexCharts(document.querySelector("#roiTrendChart"), operationsByMonthOptions);
            roiTrendChart.render();
            console.log("Gráfico de tendencia ROI renderizado correctamente");
        } catch (error) {
            console.error("Error al renderizar el gráfico de tendencia ROI:", error);
        }
    }
}
