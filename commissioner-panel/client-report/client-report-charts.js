/**
 * Gráficos para el Reporte de Cliente
 * Implementados con ApexCharts siguiendo el estilo de Visenture
 */

/**
 * Inicializa los gráficos del reporte de cliente
 */
function initClientReportCharts() {
    console.log("Inicializando gráficos del reporte de cliente...");
    
    // Verificar que existan datos y contenedores
    if (!window.currentData) {
        console.error("No se encontraron datos para los gráficos");
        return;
    }
    
    // Contenedores de gráficos a verificar
    const chartContainers = {
        "commissionsTrendChart": initCommissionsTrendChart,
        "assetDistributionChart": initAssetDistributionChart,
        "roiTrendChart": initRoiTrendChart
    };
    
    // Inicializar cada gráfico solo si su contenedor existe
    Object.entries(chartContainers).forEach(([containerId, initFunction]) => {
        const container = document.getElementById(containerId);
        if (container) {
            try {
                console.log(`Inicializando gráfico: ${containerId}`);
                container.innerHTML = ''; // Limpiar el contenedor antes de renderizar
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
 * Inicializa el gráfico de tendencia de comisiones
 */
function initCommissionsTrendChart() {
    const container = document.querySelector("#commissionsTrendChart");
    if (!container) {
        console.error("No se encontró el contenedor #commissionsTrendChart");
        return;
    }
    
    // Datos de comisiones del cliente actual
    const data = window.currentData.commissions;
    
    // Generar etiquetas para el eje X (últimos 7 meses)
    const xLabels = generateMonthLabels(7);
    
    const options = {
        series: [{
            name: "Comisiones",
            data: data
        }],
        chart: {
            height: 350,
            type: 'line',
            background: 'transparent',
            foreColor: '#ffffff',
            fontFamily: 'Inter, Helvetica, Arial, sans-serif',
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                dynamicAnimation: {
                    speed: 350
                }
            },
            dropShadow: {
                enabled: true,
                top: 3,
                left: 2,
                blur: 4,
                opacity: 0.2
            }
        },
        stroke: {
            curve: 'smooth',
            width: 4,
            lineCap: 'round'
        },
        colors: ['#10B981'], // Verde (emerald-500)
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.5,
                opacityFrom: 0.7,
                opacityTo: 0.2,
                stops: [0, 90, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: "#10B981",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "#3B82F6",
                        opacity: 0.7
                    }
                ]
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            borderColor: '#4B5563',
            strokeDashArray: 0,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
            padding: {
                top: 0,
                right: 10,
                bottom: 0,
                left: 10
            }
        },
        xaxis: {
            categories: xLabels,
            labels: {
                style: {
                    colors: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '600',
                    fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)'
                }
            },
            axisBorder: {
                show: true,
                color: '#4B5563',
                width: 1.5
            },
            axisTicks: {
                show: true,
                color: '#4B5563'
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return '$' + val.toFixed(0);
                },
                style: {
                    colors: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '600',
                    fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)'
                }
            },
            tickAmount: 5
        },
        markers: {
            size: 6,
            strokeWidth: 0,
            fillOpacity: 1,
            strokeOpacity: 0,
            hover: {
                size: 8
            },
            colors: ["#10B981"],
            strokeColors: "#ffffff"
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '14px',
                fontFamily: 'Inter, Helvetica, Arial, sans-serif'
            },
            y: {
                formatter: function(val) {
                    return '$' + val.toFixed(2);
                },
                title: {
                    formatter: function (seriesName) {
                        return seriesName + ': ';
                    }
                }
            },
            marker: {
                show: true,
                size: 6
            },
            x: {
                show: true
            }
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'right',
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: 'Inter, Helvetica, Arial, sans-serif',
            labels: {
                colors: '#ffffff'
            },
            markers: {
                width: 16,
                height: 16,
                strokeWidth: 0,
                radius: 4
            },
            itemMargin: {
                horizontal: 10,
                vertical: 5
            }
        }
    };

    try {
        const chart = new ApexCharts(container, options);
        chart.render();
        console.log("Gráfico de tendencia de comisiones renderizado correctamente");
        
        // Guardar referencia para poder actualizar luego si es necesario
        if (!window.charts) window.charts = {};
        window.charts.commissionsTrendChart = chart;
    } catch (error) {
        console.error("Error al renderizar el gráfico de tendencia de comisiones:", error);
    }
}

/**
 * Inicializa el gráfico de distribución de activos (gráfico de dona)
 * Estilo basado en la gráfica de distribución de clientes del panel de comisionista
 */
function initAssetDistributionChart() {
    const container = document.querySelector("#assetDistributionChart");
    if (!container) {
        console.error("No se encontró el contenedor #assetDistributionChart");
        return;
    }

    // Datos de distribución de activos del cliente actual
    const data = window.currentData.assetDistribution;
    
    const options = {
        series: data,
        chart: {
            type: 'donut',
            width: '100%',
            height: 320,
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
        labels: ['Acciones', 'Bonos', 'ETFs', 'Otros'],
        colors: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'],
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                return val.toFixed(1) + "%"
            },
            style: {
                fontSize: '16px',
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
                customScale: 1,
                offsetX: 0,
                offsetY: -10,
                donut: {
                    size: '50%',
                    background: '#0F172A',
                    labels: {
                        show: true,
                        name: {
                            show: false
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total',
                            formatter: function (w) {
                                return '100%';
                            },
                            color: '#ffffff',
                            fontSize: '18px',
                            fontWeight: 600
                        },
                        value: {
                            show: true,
                            color: '#ffffff',
                            fontSize: '22px',
                            fontWeight: 700,
                            formatter: function(value) {
                                return value + '%';
                            },
                            offsetY: 8
                        }
                    }
                },
                dataLabels: {
                    offset: -12,
                    minAngleToShowLabel: 10
                }
            }
        },
        legend: {
            show: true,
            position: 'bottom',
            fontFamily: 'inherit',
            offsetY: 15,
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
            colors: ['#0F172A']
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function (val) {
                    return val + "%"
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
                            customScale: 0.85,
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
                            customScale: 0.78,
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
        const chart = new ApexCharts(container, options);
        chart.render().then(() => {
            // Optimización para asegurar que la leyenda esté correctamente posicionada
            setTimeout(() => {
                const legendElement = document.querySelector("#assetDistributionChart .apexcharts-legend");
                if (legendElement) {
                    legendElement.style.position = 'relative';
                    legendElement.style.transform = 'none';
                    legendElement.style.top = 'auto';
                    legendElement.style.left = 'auto';
                    legendElement.style.marginTop = '15px';
                    legendElement.style.padding = '5px 0';
                    legendElement.style.width = '100%';
                    legendElement.style.textAlign = 'center';
                    legendElement.style.display = 'flex';
                    legendElement.style.flexWrap = 'wrap';
                    legendElement.style.justifyContent = 'center';
                    
                    // Ajustar la posición del contenedor del gráfico si es necesario
                    const chartElement = document.querySelector("#assetDistributionChart");
                    if (chartElement) {
                        chartElement.style.height = 'auto';
                        chartElement.style.marginBottom = '0';
                        chartElement.style.overflow = 'visible';
                    }
                }
            }, 100);
        });
        
        console.log("Gráfico de distribución de activos renderizado correctamente");
        
        // Guardar referencia para poder actualizar luego si es necesario
        if (!window.charts) window.charts = {};
        window.charts.assetDistributionChart = chart;
    } catch (error) {
        console.error("Error al renderizar el gráfico de distribución de activos:", error);
    }
}

/**
 * Inicializa el gráfico de tendencia ROI vs Benchmark
 */
function initRoiTrendChart() {
    const container = document.querySelector("#roiTrendChart");
    if (!container) {
        console.error("No se encontró el contenedor #roiTrendChart");
        return;
    }
    
    // Datos de ROI del cliente actual
    const data = window.currentData.roiTrend;
    
    // Generar datos de promedio del mercado como referencia
    const averageData = generateAverageMarketData(data);
    
    // Generar etiquetas para el eje X (últimos 7 meses)
    const xLabels = generateMonthLabels(7);
    
    const options = {
        series: [
            {
                name: "ROI del Cliente",
                data: data
            },
            {
                name: "Promedio",
                data: averageData
            }
        ],
        chart: {
            height: 380,
            type: 'line',
            background: 'transparent',
            foreColor: '#ffffff',
            fontFamily: 'Inter, Helvetica, Arial, sans-serif',
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            },
            dropShadow: {
                enabled: true,
                top: 3,
                left: 2,
                blur: 4,
                opacity: 0.2
            },
            sparkline: {
                enabled: false
            },
            parentHeightOffset: 0
        },
        stroke: {
            width: [4, 2],
            curve: 'smooth',
            dashArray: [0, 5]
        },
        colors: ['#10B981', '#94A3B8'], // Verde para ROI, Gris para promedio
        dataLabels: {
            enabled: false
        },
        markers: {
            size: [6, 0],
            strokeWidth: 0,
            strokeColors: "#0F172A",
            hover: {
                size: 9,
                sizeOffset: 3
            },
            discrete: [
                {
                    seriesIndex: 0,
                    dataPointIndex: 6,
                    fillColor: '#10B981',
                    strokeColor: '#fff',
                    size: 7
                }
            ]
        },
        xaxis: {
            categories: xLabels,
            labels: {
                style: {
                    colors: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '600',
                    fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)'
                }
            },
            axisBorder: {
                show: true,
                color: '#4B5563',
                width: 1.5
            },
            axisTicks: {
                show: true,
                color: '#4B5563'
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '600',
                    fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)'
                },
                formatter: function(val) {
                    return val.toFixed(1) + '%';
                }
            }
        },
        grid: {
            borderColor: '#4B5563',
            strokeDashArray: 0,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
            padding: {
                top: 20,
                right: 10,
                bottom: 10,
                left: 10
            },
            row: {
                colors: undefined,
                opacity: 0.1
            }
        },
        tooltip: {
            theme: 'dark',
            shared: true,
            intersect: false,
            y: {
                formatter: function(val) {
                    return val.toFixed(2) + '%';
                }
            },
            style: {
                fontSize: '14px',
                fontFamily: 'Inter, Helvetica, Arial, sans-serif'
            },
            marker: {
                show: true,
                size: 6
            },
            x: {
                show: true
            }
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'center',
            floating: false,
            offsetY: 2,
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: 'Inter, Helvetica, Arial, sans-serif',
            labels: {
                colors: '#ffffff',
                useSeriesColors: false,
                formatter: function(seriesName, opts) {
                    // Añadir espacio adicional después del marcador
                    return '&nbsp;&nbsp;&nbsp;' + seriesName;
                }
            },
            markers: {
                width: 18,
                height: 18,
                strokeWidth: 0,
                radius: 4,
                offsetX: 0,
                offsetY: 0
            },
            itemMargin: {
                horizontal: 20,
                vertical: 5
            },
            containerMargin: {
                top: 10,
                bottom: 10
            },
            onItemClick: {
                toggleDataSeries: true
            },
            onItemHover: {
                highlightDataSeries: true
            }
        },
        fill: {
            type: ['gradient', 'solid'],
            gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.3,
                opacityFrom: 0.7,
                opacityTo: 0.2,
                stops: [0, 90, 100]
            }
        }
    };

    try {
        const chart = new ApexCharts(container, options);
        chart.render().then(() => {
            // Optimización para asegurar que la leyenda esté correctamente posicionada
            setTimeout(() => {
                const legendElement = document.querySelector("#roiTrendChart .apexcharts-legend");
                if (legendElement) {
                    legendElement.style.position = 'relative';
                    legendElement.style.transform = 'none';
                    legendElement.style.top = 'auto';
                    legendElement.style.left = 'auto';
                    legendElement.style.marginTop = '0';
                    legendElement.style.marginBottom = '20px';
                    legendElement.style.padding = '6px 15px';
                    legendElement.style.width = 'auto';
                    legendElement.style.textAlign = 'center';
                    legendElement.style.display = 'flex';
                    legendElement.style.flexWrap = 'wrap';
                    legendElement.style.justifyContent = 'center';
                    legendElement.style.backgroundColor = 'rgba(15, 23, 42, 0.7)';
                    legendElement.style.borderRadius = '6px';
                    legendElement.style.border = '1px solid rgba(71, 85, 105, 0.3)';
                    
                    // Ajustar la posición del contenedor del gráfico si es necesario
                    const chartElement = document.querySelector("#roiTrendChart");
                    if (chartElement) {
                        chartElement.style.height = 'auto';
                        chartElement.style.marginBottom = '0';
                        chartElement.style.overflow = 'visible';
                    }
                }
            }, 100);
        });
        
        console.log("Gráfico de tendencia ROI renderizado correctamente");
        
        // Guardar referencia para poder actualizar luego si es necesario
        if (!window.charts) window.charts = {};
        window.charts.roiTrendChart = chart;
    } catch (error) {
        console.error("Error al renderizar el gráfico de tendencia ROI:", error);
    }
}

/**
 * Genera etiquetas para los últimos n meses
 * @param {number} months - Número de meses a generar
 * @returns {Array} - Array de etiquetas de meses
 */
function generateMonthLabels(months) {
    const labels = [];
    const currentDate = new Date();
    
    for (let i = months - 1; i >= 0; i--) {
        const date = new Date();
        date.setMonth(currentDate.getMonth() - i);
        
        const month = date.toLocaleString('es', { month: 'short' });
        labels.push(month.charAt(0).toUpperCase() + month.slice(1));
    }
    
    return labels;
}

/**
 * Genera datos de promedio del mercado basados en los datos del cliente
 * @param {Array} clientData - Datos del cliente
 * @returns {Array} - Datos de promedio del mercado
 */
function generateAverageMarketData(clientData) {
    return clientData.map(value => {
        // Genera un valor promedio ligeramente diferente al valor del cliente
        const adjustment = (Math.random() * 2 - 1) * 1.5; // Entre -1.5% y 1.5% de diferencia
        return Math.max(0, (value - adjustment).toFixed(2));
    });
}
