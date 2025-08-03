/**
 * Gráficos para el Panel del Comisionista
 * Implementados con ApexCharts
 */

/**
 * Inicializa los gráficos principales del panel de comisionista
 * Esta función puede ser llamada externamente desde index.html
 */
function initCommissionerCharts() {
    console.log("Inicializando gráficos del panel de comisionista...");
    
    // Comprobamos que los contenedores existan
    const clientChartContainer = document.querySelector("#clientDistributionChart");
    const marketChartContainer = document.querySelector("#commissionsByMarketChart");
    
    if (!clientChartContainer || !marketChartContainer) {
        console.error("No se encontraron los contenedores para los gráficos");
        console.log("Esperando 500ms e intentando de nuevo...");
        
        setTimeout(() => {
            if (document.querySelector("#clientDistributionChart") && document.querySelector("#commissionsByMarketChart")) {
                console.log("Contenedores encontrados en segundo intento");
                initChartsAfterCheck();
            } else {
                console.error("No se encontraron los contenedores después del segundo intento");
            }
        }, 500);
        return;
    }
    
    // Si tenemos los contenedores, continuamos con la inicialización
    initChartsAfterCheck();
}

/**
 * Función auxiliar que realiza la inicialización de las gráficas
 * después de confirmar que los contenedores existen
 */
function initChartsAfterCheck() {
    console.log("Renderizando gráficos de comisionista...");
    
    // Distribución de Clientes (gráfico de dona)
    var clientDistributionOptions = {
        series: [70, 30],
        chart: {
            type: 'donut',
            width: '100%',
            height: '100%',
            background: 'transparent',
            foreColor: '#ffffff',
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                dynamicAnimation: {
                    speed: 350
                }
            },
            redrawOnWindowResize: true,
            redrawOnParentResize: true,
            events: {
                mounted: function(chartContext, config) {
                    // Optimización para cuando el gráfico se monta
                    setTimeout(function() {
                        chartContext.updateOptions({
                            chart: {
                                height: 'auto'
                            }
                        }, false, false);
                    }, 300);
                },
                updated: function(chartContext, config) {
                    // Optimización cuando se actualiza el gráfico
                    setTimeout(function() {
                        chartContext.updateOptions({
                            chart: {
                                height: 'auto'
                            }
                        }, false, false);
                    }, 300);
                }
            }
        },
        labels: ['Activos', 'Inactivos'],
        colors: ['#10B981', '#6B7280'],
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                return val.toFixed(1) + "%"
            },
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                colors: ['#FFFFFF'],
                textShadow: '0px 1px 1px rgba(0, 0, 0, 0.9), 0px 0px 2px rgba(0, 0, 0, 0.7)',
                textStroke: '1px #000000',
                paintOrder: 'stroke fill'
            },
            textAnchor: 'middle',
            dropShadow: {
                enabled: true,
                color: '#000000',
                top: 1,
                left: 1,
                blur: 3,
                opacity: 0.5
            }
        },
        plotOptions: {
            pie: {
                customScale: 0.75,
                offsetX: 0,
                offsetY: -10,
                donut: {
                    size: '50%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                            },
                            color: '#ffffff',
                            fontSize: '18px',
                            fontWeight: 600,
                        },
                        value: {
                            color: '#ffffff',
                            fontSize: '22px',
                            fontWeight: 700,
                            formatter: function(value) {
                                return parseInt(value);
                            }
                        }
                    }
                },
                dataLabels: {
                    offset: -8,
                    minAngleToShowLabel: 10
                }
            }
        },
        legend: {
            show: true,
            position: 'bottom',
            fontFamily: 'inherit',
            offsetY: -5,
            horizontalAlign: 'center',
            verticalAlign: 'bottom',
            floating: false,
            fontSize: '14px',
            labels: {
                colors: '#ffffff',
                useSeriesColors: false,
                textShadow: '0px 1px 1px rgba(0, 0, 0, 0.9)'
            },
            formatter: function(seriesName, opts) {
                return seriesName + ' - ' + opts.w.globals.series[opts.seriesIndex] + '%';
            },
            fontWeight: 600,
            markers: {
                width: 14,
                height: 14,
                strokeWidth: 0,
                radius: 3
            },
            itemMargin: {
                horizontal: 6,
                vertical: 3
            }
        },
        stroke: {
            width: 3,
            colors: ['#000000']
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function (val) {
                    return val + " clientes"
                }
            },
            style: {
                fontSize: '14px',
                fontFamily: 'inherit'
            }
        },
        responsive: [
            {
                breakpoint: 1200,
                options: {
                    plotOptions: {
                        pie: {
                            customScale: 0.85,
                            dataLabels: {
                                offset: -10
                            }
                        }
                    },
                    dataLabels: {
                        style: {
                            fontSize: '16px'
                        }
                    }
                }
            },
            {
                breakpoint: 768,
                options: {
                    plotOptions: {
                        pie: {
                            customScale: 0.78,
                            dataLabels: {
                                offset: -6
                            }
                        }
                    },
                    dataLabels: {
                        style: {
                            fontSize: '14px'
                        }
                    }
                }
            },
            {
                breakpoint: 480,
                options: {
                    plotOptions: {
                        pie: {
                            customScale: 0.75,
                            dataLabels: {
                                offset: -5
                            }
                        }
                    },
                    dataLabels: {
                        style: {
                            fontSize: '12px'
                        }
                    },
                    legend: {
                        fontSize: '11px'
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
        
        // Renderizar el gráfico y ajustar la leyenda
        clientDistributionChart.render().then(() => {
            // Optimización para asegurar que la leyenda esté correctamente posicionada
            setTimeout(() => {
                const legendElement = document.querySelector("#clientDistributionChart .apexcharts-legend");
                if (legendElement) {
                    legendElement.style.position = 'relative';
                    legendElement.style.transform = 'none';
                    legendElement.style.top = 'auto';
                    legendElement.style.left = 'auto';
                    legendElement.style.marginTop = '-5px';
                    legendElement.style.padding = '0';
                    
                    // Ajustar la posición del contenedor del gráfico si es necesario
                    const chartElement = document.querySelector("#clientDistributionChart");
                    if (chartElement) {
                        chartElement.style.height = 'auto';
                        chartElement.style.marginBottom = '0';
                    }
                }
            }, 100);
        });
        
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
            width: '100%',
            background: 'transparent',
            foreColor: '#ffffff',
            fontFamily: 'Inter, Helvetica, Arial, sans-serif',
            borderRadius: 2,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                dynamicAnimation: {
                    speed: 350
                }
            },
            redrawOnWindowResize: true,
            redrawOnParentResize: true,
            events: {
                mounted: function(chartContext, config) {
                    setTimeout(function() {
                        chartContext.updateOptions({
                            chart: {
                                height: 'auto'
                            }
                        }, false, false);
                    }, 300);
                }
            }
        },
        xaxis: {
            categories: ['NASDAQ', 'NYSE'],
            labels: {
                style: {
                    colors: ['#ffffff', '#ffffff'],
                    fontSize: '16px',
                    fontWeight: 700,
                    textShadow: '0px 1px 2px rgba(0, 0, 0, 1), 0px 0px 4px rgba(0, 0, 0, 0.8)',
                    cssClass: 'apexcharts-xaxis-label'
                },
                offsetY: 2,
                dropShadow: {
                    enabled: true,
                    top: 1,
                    left: 1,
                    blur: 2,
                    opacity: 0.5
                }
            },
            axisBorder: {
                show: true,
                color: '#6B7280'
            },
            axisTicks: {
                show: true,
                color: '#6B7280'
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff',
                    fontSize: '16px',
                    fontWeight: 700,
                    textShadow: '0px 1px 2px rgba(0, 0, 0, 1), 0px 0px 4px rgba(0, 0, 0, 0.8)',
                    cssClass: 'apexcharts-yaxis-label'
                },
                formatter: function(val) {
                    return '$' + val.toFixed(0);
                },
                offsetX: -5,
                dropShadow: {
                    enabled: true,
                    top: 1,
                    left: 1,
                    blur: 2,
                    opacity: 0.5
                }
            }
        },
        colors: ['#10B981'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 6,
                distributed: false,
                dataLabels: {
                    position: 'top',
                },
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'last',
                colors: {
                    backgroundBarColors: [],
                    backgroundBarOpacity: 0.1,
                    backgroundBarRadius: 4,
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetY: -20,
            style: {
                fontSize: '18px',
                colors: ['#ffffff'],
                fontWeight: 'bold',
                textShadow: '0px 1px 2px rgba(0, 0, 0, 1), 0px 0px 4px rgba(0, 0, 0, 0.8)',
                textStroke: '1px #000000',
                paintOrder: 'stroke fill'
            },
            formatter: function(val) {
                return '$' + val.toFixed(0);
            },
            dropShadow: {
                enabled: true,
                color: '#000000',
                top: 1,
                left: 1,
                blur: 3,
                opacity: 0.5
            },
            background: {
                enabled: false
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function (val) {
                    return "$" + val.toFixed(2)
                }
            },
            style: {
                fontSize: '14px',
                fontFamily: 'inherit'
            }
        },
        grid: {
            borderColor: '#4B5563',
            strokeDashArray: 4,
            row: {
                colors: ['transparent', 'rgba(16, 185, 129, 0.08)']
            },
            padding: {
                top: 10,
                right: 0,
                bottom: 0,
                left: 10
            }
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            offsetY: 0,
            fontSize: '14px',
            fontWeight: 600,
            labels: {
                colors: '#ffffff'
            },
            markers: {
                width: 12,
                height: 12,
                radius: 3
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
        
        // Renderizar el gráfico y optimizar su visualización
        commissionsByMarketChart.render().then(() => {
            // Ajustar elementos para mejorar la accesibilidad visual
            setTimeout(() => {
                const gridLines = document.querySelectorAll("#commissionsByMarketChart .apexcharts-grid line");
                gridLines.forEach(line => {
                    line.setAttribute('stroke-opacity', '0.2');
                });
                
                const yAxisLabels = document.querySelectorAll("#commissionsByMarketChart .apexcharts-yaxis-label");
                yAxisLabels.forEach(label => {
                    const textElement = label.querySelector("text");
                    if (textElement) {
                        textElement.setAttribute('fill', '#ffffff');
                        textElement.style.textShadow = '0px 1px 2px rgba(0, 0, 0, 0.8)';
                    }
                });
            }, 100);
        });
        
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
