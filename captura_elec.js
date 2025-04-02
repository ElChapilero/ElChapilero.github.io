// Capturar elementos del formulario y campos
const formulario = document.getElementById('formulario1');
const categoriaSelect = document.getElementById('categoria-electrodomestico');
const electrodomesticoSelect = document.getElementById('electrodomestico');
const consumoInput = document.querySelector('input[placeholder="Watts"]');

// ID del perfil de hogar (puede ser dinámico)
const idPerfilHogar = 1; // Para pruebas, este ID debe ser el perfil seleccionado por el usuario

// Detectar el envío del formulario
formulario.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener los valores seleccionados y el consumo
    const categoria = categoriaSelect.value;
    const electrodomestico = electrodomesticoSelect.value;
    const watt = consumoInput.value;

    // Validar que los campos tengan datos válidos
    if (categoria === "Seleccionar" || electrodomestico === "Seleccionar" || !watt) {
        alert('Por favor, completa todos los campos antes de continuar.');
        return;
    }

    // Enviar los datos al backend
    fetch('http://localhost:3000/insertarElectrodomestico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idPerfilHogar, categoria, electrodomestico, watt })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el electrodoméstico');
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            alert('Electrodoméstico agregado correctamente');
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            alert('Ocurrió un error al agregar el electrodoméstico.');
        });
});
