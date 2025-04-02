// Obtener el <tbody> donde se añadirán las filas
const tablaDatos = document.getElementById('tabla-datos');
console.log("Elemento tbody encontrado:", tablaDatos); // Verifica que el tbody se obtiene correctamente

// Hacer una solicitud al servidor para obtener los datos
fetch('http://localhost:3000/datos')
  .then(response => {
    console.log("Respuesta del servidor recibida:", response); // Verifica la respuesta inicial
    if (!response.ok) {
      throw new Error('Error al obtener los datos del servidor');
    }
    return response.json(); // Convertir la respuesta en JSON
  })
  .then(datos => {
    console.log("Datos obtenidos del servidor:", datos); // Verifica que los datos se han recibido correctamente

    // Iterar sobre los datos y crear filas dinámicamente
    datos.forEach((dato, index) => {
      console.log(`Añadiendo fila ${index + 1}:`, dato); // Muestra el dato actual que se está procesando
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${dato.categoria}</td>
        <td>${dato.electrodomestico}</td>
        <td>${dato.consumo}</td>
      `;
      tablaDatos.appendChild(fila);
    });
    console.log("Todas las filas han sido añadidas a la tabla.");
  })
  .catch(error => {
    console.error("Error al cargar los datos:", error); // Muestra cualquier error en el proceso
  });
