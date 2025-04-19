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
              <button class="save-button">Guardar</button>
            </div>
          </td>
          <td>
            <button class="delete-button">Borrar</button>
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

        // Actualizar consumo
        fila.querySelector('.save-button').addEventListener('click', () => {
          const nuevoConsumo = parseFloat(fila.querySelector('.input-consumo').value);
          if (isNaN(nuevoConsumo) || nuevoConsumo <= 0) {
            showNotification('¡Por favor ingresa un valor válido!');
            return;
          }

          fetch(`http://localhost:3000/actualizarConsumo/${dato.id_electrodomestico}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nuevoConsumo })
          })
            .then(response => {
              if (!response.ok) throw new Error('Error al actualizar el consumo');
              showNotification('¡Consumo actualizado correctamente!');
            })
            .catch(error => {
              console.error('Error al actualizar el consumo:', error);
            });
        });
      });
    })
    .catch(error => {
      console.error('Error al cargar los electrodomésticos:', error);
    });
});
