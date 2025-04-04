// Gráfica 1: Consumo Estimado Mensuales
const ctx1 = document.getElementById('barChart1').getContext('2d');
const barChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Consumo Estimado Mensuales ($)',
                data: [40000, 45000, 42000, 47000, 50000, 46000],
                backgroundColor: '#424242',
                borderColor: '#424242',
                borderWidth: 1
            },
            {
                label: 'Factura Mensual ($)',
                data: [38000, 46000, 39000, 48000, 51000, 44000],
                backgroundColor: '#8C8787',
                borderColor: '#8C8787',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Consumo Estimado ($)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Meses'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return ' $' + tooltipItem.raw.toLocaleString();
                    }
                }
            }
        }
    }
});

// Gráfica 2: Consumo Promedio por Mes (ejemplo)
const ctx2 = document.getElementById('barChart2').getContext('2d');
const barChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Consumo Promedio Mensual ($)',
                data: [35000, 38000, 36000, 39000, 40000, 37000],
                backgroundColor: '#424242', // Color diferente para esta gráfica
                borderColor: '#424242',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Consumo Promedio ($)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Meses'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return ' $' + tooltipItem.raw.toLocaleString();
                    }
                }
            }
        }
    }
});
