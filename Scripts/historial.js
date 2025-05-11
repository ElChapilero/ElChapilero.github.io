const selectHogar = document.getElementById('tipo-hogar');
const tablaHistorial = document.getElementById('tabla-historial');

// Función para cargar el historial
function cargarHistorial(idPerfil) {
  fetch(`http://localhost:3000/historialConsumo/${idPerfil}`)
    .then(response => {
      if (!response.ok) throw new Error('Error al obtener historial');
      return response.json();
    })
    .then(historial => {
      tablaHistorial.innerHTML = ''; // Limpiar tabla antes de agregar datos

      historial.forEach(entry => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${entry["mes y año"]}</td>
          <td>${entry["watts totales"]}</td>
          <td>${entry["consumo por mes $"]}</td>
          <td><!-- Aquí puedes insertar cambios de electrodomésticos si los tienes --></td>
        `;
        tablaHistorial.appendChild(fila);
      });
    })
    .catch(error => {
      console.error('Error al cargar historial:', error);
    });
}

// Cargar perfiles en el <select>
fetch(`http://localhost:3000/obtenerPerfiles`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los perfiles del backend');
    }
    return response.json();
  })
  .then(perfiles => {
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

// Detectar cambio de selección
selectHogar.addEventListener('change', () => {
  const idSeleccionado = selectHogar.value;
  if (!isNaN(parseInt(idSeleccionado))) {
    cargarHistorial(idSeleccionado);
  }
});
