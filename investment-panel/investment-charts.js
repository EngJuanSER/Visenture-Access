/**
 * Gráficos para el Panel de Inversiones
 * Implementados     const options = {
        series: seriesData,
        chart: {
            type: 'pie',
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
            redrawOnParentResize: true
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
    
    // Limpiar el contenedor antes de renderizar
    document.querySelector("#assetAllocationChart").innerHTML = "";
    
    // Datos del gráfico - definiremos en una variable para reutilizar en la tabla
    const seriesData = [44, 55, 13, 43];
    const labelsData = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];
    
    const options = {
        series: seriesData,
        chart: {
            type: 'pie',
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
                    // Ajuste del tamaño después de montar
                    setTimeout(function() {
                        chartContext.updateOptions({
                            chart: {
                                height: 'auto'
                            }
                        }, false, false);
                    }, 300);
                },
                updated: function(chartContext, config) {
                    // Ajustar cuando se actualiza el gráfico
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
        labels: labelsData,
        colors: [
            '#10B981', // Verde más brillante
            '#F59E0B', // Naranja más brillante
            '#6366F1', // Azul más brillante
            '#EF4444'  // Rojo más brillante
        ],
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                return val.toFixed(1) + "%"
            },
            style: {
                fontSize: '22px', // Fuente más grande para mejor legibilidad
                fontWeight: 'bold',
                colors: ['#FFFFFF'], // Texto blanco para contraste con todos los fondos
                textShadow: '0px 1px 1px rgba(0, 0, 0, 0.9), 0px 0px 2px rgba(0, 0, 0, 0.7)', // Sombra más oscura
                textStroke: '1.5px #000000', // Borde adicional
                paintOrder: 'stroke fill' // Orden de pintado para asegurar que el borde sea visible
            },
            textAnchor: 'middle', // Centrar el texto
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
        legend: {
            show: true,
            position: 'bottom',
            fontFamily: 'inherit',
            offsetY: -5, // Valor negativo para moverlo hacia arriba
            horizontalAlign: 'center',
            verticalAlign: 'bottom',
            floating: false,
            fontSize: '12px', // Más pequeño para ahorrar espacio
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
                width: 12, // Más pequeños para ahorrar espacio
                height: 12,
                strokeWidth: 0,
                radius: 3
            },
            itemMargin: {
                horizontal: 6, // Reducido para ahorrar espacio
                vertical: 3 // Reducido para ahorrar espacio
            },
            containerMargin: {
                top: 0,
                bottom: 0
            }
        },
        stroke: {
            width: 3, // Borde más grueso para mejor separación visual
            colors: ['#000000'] // Negro puro para el borde para mejor definición
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
        plotOptions: {
            pie: {
                donut: {
                    size: '0%' // Gráfico circular completo
                },
                customScale: 0.75, // Escala reducida para que quede compacto
                offsetX: 0, // Sin desplazamiento horizontal
                offsetY: -10, // Ligero desplazamiento hacia arriba
                dataLabels: {
                    offset: -8, // Offset negativo para mover etiquetas hacia el centro
                    minAngleToShowLabel: 10 // Solo mostrar etiquetas en segmentos suficientemente grandes
                },
                expandOnClick: false,
                borderWidth: 2,
                startAngle: 0,
                endAngle: 360
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
                breakpoint: 992,
                options: {
                    plotOptions: {
                        pie: {
                            customScale: 0.82,
                            dataLabels: {
                                offset: -8
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
                            fontSize: '12px'
                        }
                    },
                    legend: {
                        itemMargin: {
                            horizontal: 6,
                            vertical: 3
                        },
                        fontSize: '12px'
                    }
                }
            },
            {
                breakpoint: 576,
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
                            fontSize: '11px'
                        }
                    },
                    legend: {
                        itemMargin: {
                            horizontal: 4,
                            vertical: 2
                        },
                        fontSize: '11px',
                        formatter: function(seriesName, opts) {
                            // Versión más compacta para pantallas pequeñas
                            return seriesName + ' (' + opts.w.globals.series[opts.seriesIndex] + '%)';
                        }
                    }
                }
            },
            {
                breakpoint: 375,
                options: {
                    plotOptions: {
                        pie: {
                            customScale: 0.7,
                            dataLabels: {
                                offset: -3,
                                minAngleToShowLabel: 15
                            }
                        }
                    },
                    dataLabels: {
                        style: {
                            fontSize: '10px'
                        }
                    },
                    legend: {
                        itemMargin: {
                            horizontal: 3,
                            vertical: 2
                        },
                        fontSize: '10px'
                    }
                }
            }
        ]
    };

        try {
        // Crear y renderizar el gráfico
        const assetAllocationChart = new ApexCharts(document.querySelector("#assetAllocationChart"), options);
        
        // Renderizar el gráfico y ajustar la leyenda
        assetAllocationChart.render().then(() => {
            // Optimización para asegurar que la leyenda esté correctamente posicionada
            setTimeout(() => {
                const legendElement = document.querySelector("#assetAllocationChart .apexcharts-legend");
                if (legendElement) {
                    legendElement.style.position = 'relative';
                    legendElement.style.transform = 'none';
                    legendElement.style.top = 'auto';
                    legendElement.style.left = 'auto';
                    legendElement.style.marginTop = '-5px';
                    legendElement.style.padding = '0';
                    
                    // Ajustar la posición del contenedor del gráfico si es necesario
                    const chartElement = document.querySelector("#assetAllocationChart");
                    if (chartElement) {
                        chartElement.style.height = 'auto';
                        chartElement.style.marginBottom = '0';
                    }
                }
            }, 100);
        });
        assetAllocationChart.render();
        console.log("Gráfico de distribución de activos renderizado correctamente");
        
        // Ajustes post-renderizado para asegurar visualización correcta
        setTimeout(() => {
            const chartContainer = document.querySelector("#assetAllocationChart");
            if (chartContainer) {
                // Asegurar que el SVG ocupa todo el espacio disponible
                const svg = chartContainer.querySelector('svg');
                if (svg) {
                    svg.setAttribute('width', '100%');
                    svg.setAttribute('height', '100%');
                    svg.style.overflow = 'visible';
                }
                
                // Asegurar que no hay transformaciones indeseadas
                const graphical = chartContainer.querySelector('.apexcharts-graphical');
                if (graphical) {
                    graphical.style.transform = 'none';
                }
                
                // Ajustar contenedor interno del pie
                const pieContainer = chartContainer.querySelector('.apexcharts-pie');
                if (pieContainer) {
                    pieContainer.style.transform = 'none';
                }
            }
        }, 100);        // Crear la tabla de datos accesible
        populateAssetAllocationTable(labelsData, seriesData);
        
        // Configurar el botón para alternar entre gráfico y tabla
        setupToggleButton('toggleAssetChartTable', 'assetAllocationChart', 'assetAllocationTable');
        
        // Eliminar líneas horizontales no deseadas y mejorar bordes de texto después de renderizar
        setTimeout(() => {
            // Buscar y eliminar cualquier línea horizontal no deseada
            const chartContainer = document.querySelector("#assetAllocationChart");
            if (chartContainer) {
                // Eliminar líneas horizontales no deseadas
                const horizontalLines = chartContainer.querySelectorAll('line:not(.apexcharts-radialbar-line)');
                horizontalLines.forEach(line => {
                    // Verificar si es una línea horizontal decorativa
                    if (!line.classList.contains('apexcharts-gridline') && !line.classList.contains('apexcharts-xaxis-tick')) {
                        line.style.display = 'none';
                        line.style.opacity = '0';
                        line.style.stroke = 'transparent';
                    }
                });
                
                // Eliminar elementos hr que pudieran estar causando líneas
                const hrElements = chartContainer.querySelectorAll('hr');
                hrElements.forEach(hr => hr.remove());
                
                // Mejorar bordes de texto - enfoque más agresivo para asegurar que se apliquen los bordes
                const allTextElements = chartContainer.querySelectorAll('text, tspan, .apexcharts-datalabel text, .apexcharts-datalabel-label, .apexcharts-datalabel-value, .apexcharts-pie-label');
                allTextElements.forEach(text => {
                    // Aplicar múltiples métodos para asegurar que el borde se vea
                    text.setAttribute('stroke', '#000000');
                    text.setAttribute('stroke-width', '1.5');
                    text.setAttribute('paint-order', 'stroke fill');
                    
                    // Aplicar estilos inline para reforzar
                    text.style.textShadow = '0px 1px 3px rgba(0, 0, 0, 1), 0px 0px 6px rgba(0, 0, 0, 0.8), 0px 0px 2px rgba(0, 0, 0, 0.9)';
                    text.style.webkitTextStroke = '1.5px #000000';
                    text.style.fill = '#FFFFFF';
                    text.style.stroke = '#000000';
                    text.style.strokeWidth = '1.5px';
                    
                    // Intentar mover las etiquetas más hacia el centro de cada segmento
                    const parentGroup = text.closest('.apexcharts-datalabel');
                    if (parentGroup) {
                        // Obtener la transformación actual
                        const transform = parentGroup.getAttribute('transform');
                        if (transform && transform.includes('translate')) {
                            // Modificar la transformación para mover más hacia el centro
                            const newTransform = transform.replace(/translate\(([^,]+),([^)]+)\)/, (match, x, y) => {
                                // Calcular nuevas coordenadas (más hacia el centro)
                                const newX = parseFloat(x) * 0.85; // Reduce la distancia del centro en un 15%
                                const newY = parseFloat(y) * 0.85; // Reduce la distancia del centro en un 15%
                                return `translate(${newX},${newY})`;
                            });
                            parentGroup.setAttribute('transform', newTransform);
                        }
                    }
                });
                
                // Mejorar la definición de los segmentos del gráfico circular
                const pieSegments = chartContainer.querySelectorAll('.apexcharts-pie-series path');
                pieSegments.forEach(segment => {
                    segment.setAttribute('stroke', '#000000');
                    segment.setAttribute('stroke-width', '2');
                    segment.style.strokeLinejoin = 'round';
                    segment.style.strokeLinecap = 'round';
                    segment.style.filter = 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3))';
                });
                
                // Aplicar el mismo estilo de borde a las leyendas
                const legendTexts = document.querySelectorAll('.apexcharts-legend-text');
                legendTexts.forEach(legendText => {
                    legendText.style.textShadow = '0px 1px 2px rgba(0, 0, 0, 0.9), 0px 0px 3px rgba(0, 0, 0, 0.7)';
                    legendText.style.webkitTextStroke = '0.7px #000000';
                    legendText.style.fontWeight = 'bold';
                });
            }
        }, 100);
        
    } catch (error) {
        console.error("Error al renderizar el gráfico de distribución de activos:", error);
    }
}

/**
 * Popula la tabla de distribución de activos con datos
 * @param {Array} labels - Etiquetas de las empresas
 * @param {Array} values - Valores porcentuales
 */
function populateAssetAllocationTable(labels, values) {
    const tableBody = document.getElementById('assetAllocationTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    labels.forEach((label, index) => {
        const row = document.createElement('tr');
        
        const companyCell = document.createElement('td');
        companyCell.textContent = label;
        row.appendChild(companyCell);
        
        const percentageCell = document.createElement('td');
        percentageCell.textContent = values[index] + '%';
        row.appendChild(percentageCell);
        
        tableBody.appendChild(row);
    });
}

/**
 * Inicializa el gráfico de rendimiento a lo largo del tiempo
 */
function initPerformanceChart() {
    if (!document.querySelector("#performanceChart")) {
        console.error("No se encontró el contenedor #performanceChart");
        return;
    }
    
    // Datos del gráfico para reutilizar en la tabla
    const performanceData = [10, 20, 15, 25, 22, 30, 28, 35];
    const monthsData = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'];
    
    const options = {
        series: [{
            name: 'Rendimiento',
            data: performanceData
        }],
        chart: {
            type: 'line',
            height: 300,
            background: 'transparent',
            foreColor: '#ffffff', // Mejor contraste: blanco puro
            offsetY: -10, // Desplazar hacia arriba para reducir margen superior
            toolbar: {
                show: true, // Mostrar la barra de herramientas para mejor usabilidad
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                },
                offsetY: -10 // Desplazar la barra de herramientas hacia arriba
            }
        },
        stroke: {
            curve: 'smooth',
            width: 4 // Línea más gruesa para mejor visibilidad
        },
        xaxis: {
            categories: monthsData,
            labels: {
                style: {
                    colors: '#ffffff', // Mejor contraste: blanco puro
                    fontWeight: '600'
                }
            },
            axisBorder: {
                show: true,
                color: '#6b7280' // Borde más visible
            },
            axisTicks: {
                show: true,
                color: '#6b7280' // Marcas más visibles
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff', // Mejor contraste: blanco puro
                    fontWeight: '600'
                },
                formatter: function(val) {
                    return val.toFixed(1) + '%';
                }
            },
            axisBorder: {
                show: true,
                color: '#6b7280' // Borde visible
            }
        },
        colors: ['#4ade80'], // Verde más brillante para mejor visibilidad
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
        grid: {
            borderColor: '#4b5563', // Gris más claro para mejor visibilidad
            strokeDashArray: 0, // Línea sólida para mejor visibilidad
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        markers: {
            size: 7, // Marcadores más grandes
            colors: ['#4ade80'], // Verde más brillante
            strokeColors: '#000000', // Cambiado a negro para mejor contraste
            strokeWidth: 3 // Borde más grueso
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.3,
                opacityFrom: 0.8, // Mayor opacidad para mejor visibilidad
                opacityTo: 0.3,
                stops: [0, 100]
            }
        },
        // Añadido título al gráfico para mejor identificación
        title: {
            text: 'Evolución del Rendimiento por Mes',
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#ffffff'
            }
        }
    };

    try {
        const performanceChart = new ApexCharts(document.querySelector("#performanceChart"), options);
        performanceChart.render();
        console.log("Gráfico de rendimiento renderizado correctamente");
        
        // Crear la tabla de datos accesible
        populatePerformanceTable(monthsData, performanceData);
        
        // Configurar el botón para alternar entre gráfico y tabla
        setupToggleButton('togglePerformanceChartTable', 'performanceChart', 'performanceTable');
        
        // Mejorar bordes de texto en el gráfico de línea después de renderizar
        setTimeout(() => {
            const chartContainer = document.querySelector("#performanceChart");
            if (chartContainer) {
                // Mejorar bordes de texto
                const textElements = chartContainer.querySelectorAll('.apexcharts-yaxis text, .apexcharts-xaxis text, .apexcharts-data-labels text');
                textElements.forEach(text => {
                    text.setAttribute('stroke', '#000000');
                    text.setAttribute('stroke-width', '0.5');
                    text.setAttribute('paint-order', 'stroke fill');
                    text.style.textShadow = '0px 1px 2px rgba(0, 0, 0, 1), 0px 0px 4px rgba(0, 0, 0, 0.8)';
                });
            }
        }, 100);
        
    } catch (error) {
        console.error("Error al renderizar el gráfico de rendimiento:", error);
    }
}

/**
 * Popula la tabla de rendimiento con datos
 * @param {Array} months - Etiquetas de los meses
 * @param {Array} values - Valores de rendimiento
 */
function populatePerformanceTable(months, values) {
    const tableBody = document.getElementById('performanceTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    months.forEach((month, index) => {
        const row = document.createElement('tr');
        
        const monthCell = document.createElement('td');
        monthCell.textContent = month;
        row.appendChild(monthCell);
        
        const valueCell = document.createElement('td');
        valueCell.textContent = values[index] + '%';
        row.appendChild(valueCell);
        
        tableBody.appendChild(row);
    });
}

/**
 * Configura un botón para alternar entre gráfico y tabla
 * @param {string} buttonId - ID del botón
 * @param {string} chartId - ID del contenedor del gráfico
 * @param {string} tableId - ID del contenedor de la tabla
 */
function setupToggleButton(buttonId, chartId, tableId) {
    const toggleBtn = document.getElementById(buttonId);
    const chartElement = document.getElementById(chartId);
    const tableElement = document.getElementById(tableId);
    
    if (!toggleBtn || !chartElement || !tableElement) return;
    
    toggleBtn.setAttribute('aria-pressed', 'false');
    toggleBtn.setAttribute('aria-controls', tableId);
    
    toggleBtn.addEventListener('click', function() {
        const isShowingTable = toggleBtn.getAttribute('aria-pressed') === 'true';
        
        if (isShowingTable) {
            // Cambiar a mostrar gráfico
            chartElement.classList.remove('hidden');
            tableElement.classList.add('hidden');
            toggleBtn.textContent = 'Mostrar datos en tabla';
            toggleBtn.setAttribute('aria-pressed', 'false');
            
            // Anunciar el cambio para lectores de pantalla
            announceScreenReaderMessage('Mostrando gráfico visual');
        } else {
            // Cambiar a mostrar tabla
            chartElement.classList.add('hidden');
            tableElement.classList.remove('hidden');
            toggleBtn.textContent = 'Mostrar gráfico';
            toggleBtn.setAttribute('aria-pressed', 'true');
            
            // Anunciar el cambio para lectores de pantalla
            announceScreenReaderMessage('Mostrando tabla de datos accesible');
        }
    });
}

/**
 * Anuncia un mensaje para lectores de pantalla
 * @param {string} message - El mensaje a anunciar
 */
function announceScreenReaderMessage(message) {
    // Crear o actualizar un elemento para anuncios ARIA
    let ariaAnnouncer = document.getElementById('aria-announcer');
    
    if (!ariaAnnouncer) {
        ariaAnnouncer = document.createElement('div');
        ariaAnnouncer.setAttribute('id', 'aria-announcer');
        ariaAnnouncer.setAttribute('aria-live', 'polite');
        ariaAnnouncer.setAttribute('class', 'sr-only');
        document.body.appendChild(ariaAnnouncer);
    }
    
    // Actualizar el mensaje
    ariaAnnouncer.textContent = message;
}
