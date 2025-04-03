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

// Detectar cambios en el <select>
selectHogar.addEventListener('change', () => {
    const idPerfilHogar = selectHogar.value; // Obtener el id del perfil seleccionado
    console.log('Perfil de hogar seleccionado:', idPerfilHogar);

    if (idPerfilHogar === "Seleccionar") {
        console.log('No se seleccionó un perfil válido, limpiando la tabla.');
        tablaDatos.innerHTML = '';
        return;
    }

    // Solicitar los datos de electrodomésticos al backend
    fetch(`http://localhost:3000/obtenerElectrodomesticos/${idPerfilHogar}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los electrodomésticos');
            }
            return response.json();
        })
        .then(electrodomesticos => {
            console.log('Datos obtenidos del backend:', electrodomesticos);

            // Limpiar la tabla antes de llenarla
            tablaDatos.innerHTML = '';

            // Llenar la tabla con los datos obtenidos
            electrodomesticos.forEach((dato, index) => {
                console.log(`Procesando fila ${index + 1}:`, dato);
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${dato.categoria}</td>
                    <td>${dato.electrodomestico}</td>
                    <td>${dato.consumo}</td>
                `;
                tablaDatos.appendChild(fila); // Agregar la fila al tbody
            });

            console.log('Tabla actualizada con los datos del perfil seleccionado.');
        })
        .catch(error => {
            console.error('Error al cargar los electrodomésticos:', error);
        });
});