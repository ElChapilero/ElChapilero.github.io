document.getElementById('formulario-login').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const usuarioInput = document.getElementById('usuario').value;
    const contrasenaInput = document.getElementById('contrasena').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario: usuarioInput,
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
        showNotification(`¡Bienvenido, ${data.usuario}!`);

        // Redirigir después de 2 segundos
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 2000);
    })
    .catch(error => {
        console.error('Error al iniciar sesión:', error);
        // Mostrar notificación de error
        showNotification(error.message || 'Hubo un problema al iniciar sesión');
    });
});