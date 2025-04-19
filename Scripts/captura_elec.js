const formulario = document.getElementById('formulario1');
const perfilSelect = document.getElementById('tipo-hogar'); // Select para el perfil de hogar
const categoriaSelect = document.getElementById('categoria-electrodomestico');
const electrodomesticoSelect = document.getElementById('electrodomestico');
const consumoInput = document.querySelector('input[placeholder="Watts"]');

// Detectar el envío del formulario
formulario.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío por defecto

    // Obtener los valores seleccionados y el consumo
    const idPerfilHogar = perfilSelect.value; // ID dinámico del perfil seleccionado
    const categoria = categoriaSelect.value;
    const electrodomestico = electrodomesticoSelect.value;
    const watt = consumoInput.value;

    // Validar que los campos tengan datos válidos
    if (idPerfilHogar === "Seleccionar" || categoria === "Seleccionar" || electrodomestico === "Seleccionar" || !watt) {
        showNotification('¡Por favor, completa todos los campos antes de continuar!');
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
            showNotification('¡Electrodoméstico agregado correctamente!');
            setTimeout(() => {
                location.reload();
            }, 2000);
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            showNotification('¡Ocurrió un error al agregar el electrodoméstico!');
        });
});
