document.getElementById('filtros-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Esto evitará que el formulario recargue la página
  const idPerfil = document.getElementById('tipo-hogar').value;
  const desde = document.getElementById('desde').value;
  const hasta = document.getElementById('hasta').value;

  const params = new URLSearchParams({ desde, hasta });

  fetch(`http://localhost:3000/historialConsumo/${idPerfil}?${params}`)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById('tabla-historial');
      tabla.innerHTML = ''; // Limpiar tabla antes de agregar datos

      data.forEach(fila => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${fila["mes y año"]}</td>
          <td>${fila["watts totales"]}</td>
          <td>${fila["consumo por mes $"]}</td>
          <td><!-- Aquí puedes poner cambios si los tienes --></td>
        `;
        tabla.appendChild(tr);
      });
    });
});
