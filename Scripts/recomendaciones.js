// Obtener elementos del DOM
const selectHogar = document.getElementById('tipo-hogar');
const selectElectrodomestico = document.getElementById('electrodomestico');
const tablaRecomendaciones = document.querySelector('tbody'); // Referencia a la tabla

// Cargar perfiles en el <select>
fetch(`http://localhost:3000/obtenerPerfiles`)
  .then(response => response.json())
  .then(perfiles => {
    perfiles.forEach(perfil => {
      const opcion = document.createElement('option');
      opcion.value = perfil.id_perfil_hogar;
      opcion.textContent = perfil.nombre;
      selectHogar.appendChild(opcion);
    });
  })
  .catch(error => console.error('Error al cargar los perfiles:', error));

// Detectar cambios en el <select> y cargar electrodomésticos
selectHogar.addEventListener('change', () => {
  const idPerfilHogar = selectHogar.value;
  selectElectrodomestico.innerHTML = '<option value="Seleccionar">Seleccionar</option>';

  if (idPerfilHogar) {
    fetch(`http://localhost:3000/obtenerElectrodomesticos/${idPerfilHogar}`)
      .then(response => response.json())
      .then(electrodomesticos => {
        electrodomesticos.forEach(elec => {
          const opcion = document.createElement('option');
          opcion.value = elec.id_electrodomestico;
          opcion.textContent = elec.electrodomestico;
          selectElectrodomestico.appendChild(opcion);
        });
      })
      .catch(error => console.error('Error al cargar los electrodomésticos:', error));
  }
});

// Detectar selección de electrodoméstico y agregar recomendaciones ficticias
selectElectrodomestico.addEventListener('change', () => {
  tablaRecomendaciones.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas recomendaciones

  // Generar recomendaciones ficticias
  const recomendaciones = [
    "Recomendación 1: " + generarTextoAleatorio(),
    "Recomendación 2: " + generarTextoAleatorio(),
    "Recomendación 3: " + generarTextoAleatorio(),
    "Recomendación 4: " + generarTextoAleatorio(),
    "Recomendación 5: " + generarTextoAleatorio()
  ];

  recomendaciones.forEach(recomendacion => {
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${recomendacion}</td>`;
    tablaRecomendaciones.appendChild(fila);
  });
});

// Función para generar texto aleatorio
function generarTextoAleatorio() {
  const letras = "abcdefghijklmnopqrstuvwxyz";
  let texto = "";
  for (let i = 0; i < 6; i++) {
    texto += letras.charAt(Math.floor(Math.random() * letras.length));
  }
  return texto;
}
