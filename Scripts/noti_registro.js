document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío tradicional del formulario

    const usuarioInput = document.getElementById('usuario').value;
    const correoInput = document.getElementById('correo').value;
    const contrasenaInput = document.getElementById('contrasena').value;

    fetch('http://localhost:3000/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario: usuarioInput,
            correo: correoInput,
            contrasena: contrasenaInput,
        }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || 'Error inesperado');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del backend:', data);
        // Mostrar notificación de éxito
        showNotification('¡Registro exitoso!');

        // Redirigir después de 3 segundos
        setTimeout(() => {
            window.location.href = 'sign_in.html';
        }, 3000);
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        // Mostrar notificación de error
        showNotification(error.message || 'Hubo un problema al registrarse');
    });
});