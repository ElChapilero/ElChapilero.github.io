const ctx = document.getElementById('barChart2').getContext('2d');
const barChart2 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Consumo Estimado Mensuales ($)',
                data: [40000, 45000, 42000, 47000, 50000, 46000],
                backgroundColor: '#424242', // Color para el consumo estimado
                borderColor: '#424242',
                borderWidth: 1
            },
            {
                label: 'Factura Mensual ($)',
                data: [38000, 46000, 39000, 48000, 51000, 44000], // Datos de las facturas
                backgroundColor: '#FF6384', // Color para las facturas
                borderColor: '#FF6384',
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