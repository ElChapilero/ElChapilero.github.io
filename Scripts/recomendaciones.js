// Obtener elementos del DOM
const selectHogar = document.getElementById('tipo-hogar');
const selectElectrodomestico = document.getElementById('electrodomestico');
const tablaRecomendaciones = document.querySelector('tbody'); // Referencia a la tabla

// Objeto con electrodomésticos y sus recomendaciones
const electrodomesticosYRecomendaciones = {
    "Refrigerador": [
      "Mantén la puerta cerrada el mayor tiempo posible.",
      "Ajusta la temperatura entre 3°C y 5°C.",
      "Ubícalo lejos de fuentes de calor como la estufa o el sol.",
      "No introduzcas alimentos calientes.",
      "Limpia regularmente la parte trasera y el sello de la puerta."
    ],
    "Horno": [
      "Evita abrir la puerta durante la cocción.",
      "Cocina varios alimentos a la vez cuando sea posible.",
      "Usa recipientes de vidrio o cerámica (retienen mejor el calor).",
      "Apaga el horno un poco antes; el calor residual sigue cocinando.",
      "Realiza mantenimientos para asegurar un buen sellado."
    ],
    "Microondas": [
      "Usa recipientes adecuados para una cocción eficiente.",
      "Calienta solo lo necesario, no en exceso.",
      "Desconéctalo cuando no lo uses.",
      "Limpia regularmente para evitar que residuos afecten su rendimiento.",
      "Descongela alimentos en el refrigerador previamente."
    ],
    "Licuadora": [
      "Usa solo el tiempo necesario para procesar.",
      "Corta previamente los alimentos para evitar forzar el motor.",
      "Usa la velocidad adecuada según el tipo de alimento.",
      "Evita usarla vacía o con exceso de carga.",
      "Desconéctala después de cada uso."
    ],
    "Estufa": [
      "Usa ollas del tamaño adecuado a la hornilla.",
      "Tapa las ollas para conservar calor.",
      "Aprovecha el calor residual apagando un poco antes.",
      "Limpia quemadores para mejor eficiencia.",
      "Si es eléctrica, prefiere las de inducción (más eficientes)."
    ],
    "Lavadora": [
      "Lava con cargas completas.",
      "Usa ciclos de agua fría cuando sea posible.",
      "Evita el prelavado si la ropa no está muy sucia.",
      "Limpia los filtros regularmente.",
      "Utiliza el programa eco o de bajo consumo."
    ],
    "Secadora": [
      "Centrifuga bien la ropa en la lavadora antes.",
      "Limpia el filtro de pelusa después de cada uso.",
      "Usa sensores de humedad si están disponibles.",
      "Seca cargas completas pero sin sobrecargar.",
      "Siempre que puedas, seca al aire libre."
    ],
    "Aspiradora": [
      "Limpia o cambia los filtros regularmente.",
      "Vacía el depósito o la bolsa con frecuencia.",
      "Usa la potencia adecuada según la superficie.",
      "Aspira solo cuando sea necesario.",
      "Desconéctala tras su uso."
    ],
    "Plancha": [
      "Junta varias prendas y plánchalas en una sola sesión.",
      "Ajusta la temperatura según el tipo de tela.",
      "Apágala si no la estás usando.",
      "Aprovecha el calor residual para prendas ligeras.",
      "Plancha cuando haya menos humedad (requiere menos energía)."
    ],
    "Aire acondicionado": [
      "Mantén cerradas puertas y ventanas al usarlo.",
      "Limpia filtros regularmente.",
      "Usa temperaturas entre 24°C y 26°C.",
      "Usa modo eco o de bajo consumo si está disponible.",
      "Aísla térmicamente tu hogar para mayor eficiencia."
    ],
    "Ventilador": [
      "Úsalo en lugar del aire acondicionado cuando sea posible.",
      "Límpialo regularmente para mejor flujo de aire.",
      "Colócalo estratégicamente para mover el aire fresco.",
      "Apágalo cuando no estés en la habitación.",
      "Usa ventiladores de techo eficientes."
    ],
    "Calefactor": [
      "Usa ropa abrigada y mantas antes de encenderlo.",
      "Calienta solo las habitaciones que estés usando.",
      "Apaga cuando no estés presente.",
      "Aísla ventanas y puertas para conservar calor.",
      "Prefiere calefactores con termostato."
    ],
    "Deshumidificador": [
      "Úsalo solo cuando la humedad supere el 60%.",
      "Limpia el filtro periódicamente.",
      "Vacía el depósito regularmente.",
      "Apágalo en ambientes ventilados o fríos.",
      "Colócalo en zonas donde haya más humedad (baño, sótano)."
    ],
    "Televisor": [
      "Reduce el brillo y contraste.",
      "Usa el modo ahorro de energía.",
      "Apágalo completamente cuando no lo uses.",
      "Desactiva funciones como reproducción automática.",
      "No lo dejes en modo \"standby\" prolongadamente."
    ],
    "Consola de videojuegos": [
      "Apágala completamente cuando no se use.",
      "Usa temporizadores de apagado automático.",
      "Cierra juegos o apps en segundo plano.",
      "Evita dejarla encendida para descargas nocturnas.",
      "Juega en sesiones moderadas para evitar sobrecalentamiento."
    ],
    "Equipo de sonido": [
      "Apágalo cuando no lo uses.",
      "Usa sistemas compactos o con certificación energética.",
      "Evita subir el volumen innecesariamente.",
      "Conecta a regletas con interruptor para desconectar fácilmente.",
      "Limpia los componentes para mantener su eficiencia."
    ],
    "Lámpara de mesa": [
      "Usa focos LED en lugar de incandescentes.",
      "Apaga la lámpara si no la estás usando.",
      "Usa pantallas que enfoquen la luz y mejoren la visibilidad.",
      "Aprovecha la luz natural durante el día.",
      "Limpia las bombillas para maximizar la iluminación."
    ],
    "Foco LED": [
      "Usa focos de bajo consumo y alta eficiencia (certificación energética).",
      "Apágalos al salir de la habitación.",
      "Evita instalar más de los necesarios.",
      "Usa sensores de presencia o temporizadores.",
      "Prefiere luces cálidas para habitaciones y frías para trabajo."
    ],
    "Lámpara de pie": [
      "Usa bombillas LED o CFL.",
      "Colócala en esquinas para mejor dispersión de luz.",
      "Evita dejarla encendida todo el día.",
      "Úsala con reguladores de intensidad (dimmer).",
      "Asegura que no tenga fugas de corriente o mal contacto."
    ],
    "Panel solar": [
      "Instálalo en lugares con buena exposición solar.",
      "Limpia los paneles regularmente para máxima eficiencia.",
      "Usa controladores de carga para evitar desperdicio.",
      "Revisa la batería y el inversor periódicamente.",
      "Optimiza el ángulo de inclinación según la estación."
    ],
    "Cámara de seguridad": [
      "Usa cámaras con detección de movimiento para grabar solo cuando sea necesario.",
      "Configura horarios de grabación inteligente.",
      "Elige modelos con eficiencia energética.",
      "Apaga cámaras internas cuando no sean necesarias.",
      "Conecta a regletas inteligentes para gestionar su uso."
    ],
    "Sensor de movimiento": [
      "Ajusta la sensibilidad para evitar activaciones innecesarias.",
      "Usa sensores con temporizador ajustable.",
      "Instálalos estratégicamente para cubrir áreas clave.",
      "Asegúrate de que estén bien alineados para evitar falsos positivos.",
      "Usa baterías recargables si son inalámbricos."
    ],
    "Timbre inteligente": [
      "Configura notificaciones eficientes para evitar uso excesivo.",
      "Usa modelos con modo de bajo consumo.",
      "Reduce la cantidad de grabaciones continuas.",
      "Actualiza el firmware para mejorar el rendimiento.",
      "Cárgalo o aliméntalo solo cuando sea necesario."
    ]
};

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
          opcion.value = elec.electrodomestico; // Aquí guardamos el nombre del electrodoméstico
          opcion.textContent = elec.electrodomestico;
          selectElectrodomestico.appendChild(opcion);
        });
      })
      .catch(error => console.error('Error al cargar los electrodomésticos:', error));
  }
});

// Detectar selección de electrodoméstico y cargar recomendaciones
selectElectrodomestico.addEventListener('change', () => {
  tablaRecomendaciones.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas recomendaciones

  const electrodomesticoSeleccionado = selectElectrodomestico.value;

  if (electrodomesticoSeleccionado) {
    // Obtener las recomendaciones para el electrodoméstico seleccionado
    const recomendaciones = electrodomesticosYRecomendaciones[electrodomesticoSeleccionado];

    // Mostrar las recomendaciones en la tabla
    if (recomendaciones) {
      recomendaciones.forEach(recomendacion => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${recomendacion}</td>`;
        tablaRecomendaciones.appendChild(fila);
      });
    } else {
      // Si no hay recomendaciones para este electrodoméstico
      const fila = document.createElement('tr');
      fila.innerHTML = `<td>No hay recomendaciones disponibles para este electrodoméstico.</td>`;
      tablaRecomendaciones.appendChild(fila);
    }
  }
});
