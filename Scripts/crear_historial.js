document.getElementById('btn-enviar-historial').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que se recargue la página

    const idPerfil = document.getElementById('tipo-hogar').value;

    if (idPerfil === 'Seleccionar') {
        alert('Por favor selecciona un perfil de hogar válido');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/crearOActualizarHistorial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_perfil_hogar: idPerfil }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.mensaje); // Muestra mensaje del servidor
        } else {
            alert('Error del servidor: ' + data.error);
        }
    } catch (error) {
        console.error('Error al crear historial:', error);
        alert('Ocurrió un error al crear el historial.');
    }
});