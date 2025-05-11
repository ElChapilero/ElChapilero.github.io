// Obtener elementos del DOM
const selectHogar = document.getElementById('tipo-hogar');
const tablaDatos = document.getElementById('tabla-datos');

// Cargar perfiles en el <select>
fetch(`http://localhost:3000/obtenerPerfiles`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los perfiles del backend');
    }
    return response.json();
  })
  .then(perfiles => {
    console.log('Perfiles obtenidos:', perfiles);
    perfiles.forEach(perfil => {
      const opcion = document.createElement('option');
      opcion.value = perfil.id_perfil_hogar;
      opcion.textContent = perfil.nombre;
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
      electrodomesticos.forEach(dato => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${dato.categoria}</td>
          <td>${dato.electrodomestico}</td>
          <td>
            <div class="consumo-wrapper">
              <input type="number" class="input-consumo" value="${dato.consumo}" />
            </div>
          </td>
          <td>
            <div class="tiempo-wrapper">
              <input type="number" class="input-tiempo" value="${dato.tiempo}" />
            </div>
          </td>
          <td>
            <button class="save-button">🧩</button>
            <button class="delete-button">🗑️</button>
          </td>
        `;
        tablaDatos.appendChild(fila);

        // Eliminar
        fila.querySelector('.delete-button').addEventListener('click', () => {
          fetch(`http://localhost:3000/eliminarElectrodomestico/${dato.id_electrodomestico}`, { method: 'DELETE' })
            .then(response => {
              if (!response.ok) throw new Error('Error al eliminar el electrodoméstico');
              fila.remove();
              console.log('Electrodoméstico eliminado correctamente');
              showNotification('¡Electrodoméstico eliminado correctamente!');
            })
            .catch(error => {
              console.error('Error al eliminar el electrodoméstico del backend:', error);
            });
        });

        // Actualizar consumo y tiempo
        fila.querySelector('.save-button').addEventListener('click', () => {
          const nuevoConsumo = parseFloat(fila.querySelector('.input-consumo').value);
          const nuevoTiempo = parseFloat(fila.querySelector('.input-tiempo').value);

          if (isNaN(nuevoConsumo) || nuevoConsumo <= 0 || isNaN(nuevoTiempo) || nuevoTiempo <= 0) {
            showNotification('¡Por favor ingresa valores válidos!');
            return;
          }

          fetch(`http://localhost:3000/actualizarConsumo/${dato.id_electrodomestico}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nuevoConsumo, nuevoTiempo })
          })
            .then(response => {
              if (!response.ok) throw new Error('Error al actualizar datos');
              showNotification('¡Datos actualizados correctamente!');
            })
            .catch(error => {
              console.error('Error al actualizar los datos:', error);
            });
        });
      });
    })
    .catch(error => {
      console.error('Error al cargar los electrodomésticos:', error);
    });
});
