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
      setTimeout(() => {
        location.reload();
      }, 2000);
    })
    .catch(error => {
      console.error('Error al enviar los datos:', error);
      showNotification('¡Hubo un error al crear el perfil de hogar!');
    });
});

// Eliminar perfil de hogar
document.getElementById('perfil-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevenir el envío tradicional del formulario

  const idPerfilHogar = document.getElementById('tipo-hogar').value;

  if (!idPerfilHogar || idPerfilHogar === "Seleccionar") {
    showNotification('¡Por favor selecciona un perfil válido para eliminar!');
    return;
  }

  fetch(`http://localhost:3000/eliminarPerfil/${idPerfilHogar}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) throw new Error('Error al eliminar el perfil');
      return response.json();
    })
    .then(data => {
      console.log('Perfil eliminado:', data);
      showNotification('¡Perfil de hogar eliminado correctamente!');
      setTimeout(() => {
        location.reload();
      }, 2000);
    })
    .catch(error => {
      console.error('Error al eliminar el perfil:', error);
      showNotification('¡Hubo un error al eliminar el perfil!');
    });
});

