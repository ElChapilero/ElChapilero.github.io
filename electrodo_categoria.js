// Listas de electrodomésticos por categoría
const electrodomesticosPorCategoria = {
    Cocina: ["Refrigerador", "Horno", "Microondas", "Licuadora", "Estufa"],
    Limpieza: ["Lavadora", "Secadora", "Aspiradora", "Plancha"],
    Climatización: ["Aire acondicionado", "Ventilador", "Calefactor", "Deshumidificador"],
    Entretenimiento: ["Televisor", "Consola de videojuegos", "Equipo de sonido"],
    Iluminación: ["Lámpara de mesa", "Foco LED", "Lámpara de pie", "Panel solar"],
    Seguridad_y_automatización: ["Cámara de seguridad", "Sensor de movimiento", "Timbre inteligente"]
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
