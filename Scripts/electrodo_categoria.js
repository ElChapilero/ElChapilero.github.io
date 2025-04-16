// Listas de electrodomésticos por categoría
const electrodomesticosPorCategoria = {
    1: ["Refrigerador", "Horno", "Microondas", "Licuadora", "Estufa"],
    2: ["Lavadora", "Secadora", "Aspiradora", "Plancha"],
    3: ["Aire acondicionado", "Ventilador", "Calefactor", "Deshumidificador"],
    4: ["Televisor", "Consola de videojuegos", "Equipo de sonido"],
    5: ["Lámpara de mesa", "Foco LED", "Lámpara de pie", "Panel solar"],
    6: ["Cámara de seguridad", "Sensor de movimiento", "Timbre inteligente"]
};

// Detectar cambios en la categoría seleccionada y actualizar el `<select>` de electrodomésticos
categoriaSelect.addEventListener('change', () => {
    const categoriaSeleccionada = categoriaSelect.value;
    console.log("Categoría seleccionada:", categoriaSeleccionada);

    // Limpiar el `<select>` de electrodomésticos
    electrodomesticoSelect.innerHTML = '<option value="Seleccionar">Seleccionar</option>';

    // Si la categoría no es válida, no hacemos nada
    if (categoriaSeleccionada === "Seleccionar") {
        console.log("No se seleccionó una categoría válida.");
        return;
    }

    // Obtener la lista de electrodomésticos para la categoría seleccionada
    const electrodomesticos = electrodomesticosPorCategoria[categoriaSeleccionada] || [];

    // Crear opciones dinámicas para cada electrodoméstico
    electrodomesticos.forEach(electrodomestico => {
        const opcion = document.createElement('option');
        opcion.value = electrodomestico;
        opcion.textContent = electrodomestico;
        electrodomesticoSelect.appendChild(opcion);
    });

    console.log("Electrodomésticos actualizados:", electrodomesticos);
});
