document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío tradicional del formulario
  
    const nombreInput = document.getElementById('nombre').value;
  
    fetch('http://localhost:3000/insertarPerfil', { // URL completa
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombreInput,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al insertar los datos');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del backend:', data);
      showNotification('¡Perfil de hogar creado correctamente!');
    })
    .catch(error => {
      console.error('Error al enviar los datos:', error);
      showNotification('¡Hubo un error al crear el perfil de hogar!');
    });
});
