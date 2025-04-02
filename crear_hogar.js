document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío tradicional del formulario
  
    const nombreInput = document.getElementById('nombre').value;
  
    fetch('http://localhost:3000/insertarPerfil', { // URL completa
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUsuario: 1, // Cambia por el ID real del usuario si aplica
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
      alert('Perfil de hogar creado correctamente');
    })
    .catch(error => {
      console.error('Error al enviar los datos:', error);
      alert('Hubo un error al crear el perfil de hogar');
    });
});
