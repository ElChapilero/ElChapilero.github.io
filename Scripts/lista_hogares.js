// Obtener elementos del DOM
const selectHogar = document.getElementById('tipo-hogar');
const tablaDatos = document.getElementById('tabla-datos');

// Cargar perfiles en el <select>
fetch(`http://localhost:3000/obtenerPerfiles`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los perfiles del backend');
    }
    return response.json(); // Convertir la respuesta en JSON
  })
  .then(perfiles => {
    console.log('Perfiles obtenidos:', perfiles);

    // Iterar sobre los perfiles y agregarlos al <select>
    perfiles.forEach(perfil => {
      const opcion = document.createElement('option');
      opcion.value = perfil.id_perfil_hogar; // El valor es el id_perfil_hogar
      opcion.textContent = perfil.nombre; // Texto visible en el <select>
      selectHogar.appendChild(opcion);
    });
  })
  .catch(error => {
    console.error('Error al cargar los perfiles:', error);
  });

// Detectar cambios en el <select> y cargar electrodomésticos
selectHogar.addEventListener('change', () => {
  const idPerfilHogar = selectHogar.value;

  if (!idPerfilHogar) {
    tablaDatos.innerHTML = '';
    return;
  }

  fetch(`http://localhost:3000/obtenerElectrodomesticos/${idPerfilHogar}`)
    .then(response => {
      if (!response.ok) throw new Error('Error al obtener los electrodomésticos');
      return response.json();
    })
    .then(electrodomesticos => {
      tablaDatos.innerHTML = '';
      electrodomesticos.forEach((dato, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${dato.categoria}</td>
          <td>${dato.electrodomestico}</td>
          <td>${dato.consumo}</td>
          <td><button class="delete-button">❌</button></td>
        `;
        tablaDatos.appendChild(fila);

        fila.querySelector('.delete-button').addEventListener('click', () => {
          fetch(`http://localhost:3000/eliminarElectrodomestico/${dato.id_electrodomestico}`, { method: 'DELETE' })
            .then(response => {
              if (!response.ok) throw new Error('Error al eliminar el electrodoméstico');
              fila.remove();
              console.log('Electrodoméstico eliminado correctamente');
              showNotification('Electrodoméstico eliminado correctamente');
            })
            .catch(error => {
              console.error('Error al eliminar el electrodoméstico del backend:', error);
            });
        });
      });
    })
    .catch(error => {
      console.error('Error al cargar los electrodomésticos:', error);
    });
});