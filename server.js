const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Client } = require('pg');

const app = express();
const port = 3000;

app.use(express.static(__dirname));

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de sesiones
app.use(session({
    secret: 'tu_secreto_unico',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Configuración de PostgreSQL
const client = new Client({
    host: 'localhost',
    database: 'BD_ahorro_ de_energia',
    user: 'postgres',
    password: '5789',
    port: 5432,
});

// Conectar a la base de datos
client.connect()
    .then(() => console.log('¡Conexión exitosa a PostgreSQL!'))
    .catch(err => console.error('Error al conectar a PostgreSQL:', err));

// Registro de usuarios
app.post('/registrar', async (req, res) => {
    const { usuario, correo, contrasena } = req.body;

    try {
        const checkQuery = 'SELECT * FROM usuarios WHERE correo = $1';
        const checkResult = await client.query(checkQuery, [correo]);

        if (checkResult.rows.length > 0) {
            console.log('El correo ya está registrado:', correo);
            return res.status(400).json({ message: 'El correo ya está registrado' });
        } else {
            const query = 'INSERT INTO usuarios (nombre_usuario, correo, "contraseña") VALUES ($1, $2, $3)';
            await client.query(query, [usuario, correo, contrasena]);
            console.log(`¡Registro exitoso para el usuario: ${usuario}!`);
            res.status(200).json({ message: '¡Registro exitoso!' });
        }
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    try {
        const query = 'SELECT * FROM usuarios WHERE nombre_usuario = $1';
        const result = await client.query(query, [usuario]);

        if (result.rows.length > 0) {
            const isPasswordCorrect = contrasena === result.rows[0].contraseña;

            if (isPasswordCorrect) {
                req.session.usuario = result.rows[0];
                console.log('Información de sesión:', req.session.usuario);
                res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: result.rows[0].nombre_usuario });
            } else {
                console.log('Contraseña incorrecta');
                res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            }
        } else {
            console.log('Usuario no encontrado');
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});


// Ruta del perfil
app.get('/perfil', (req, res) => {
    if (req.session.usuario) {
        res.send(`Bienvenido, ${req.session.usuario.nombre_usuario}`);
    } else {
        res.status(401).send('No has iniciado sesión');
    }
});

// crear perfil de hogar
app.post('/insertarPerfil', async (req, res) => {
    // Obtenemos el ID del usuario desde la sesión
    const idUsuario = req.session.usuario?.id_usuario; // Accede al id_usuario desde la sesión
    const { nombre } = req.body; // El nombre del perfil viene del cliente

    if (!idUsuario) {
        // Si no hay usuario en sesión, devolvemos un error
        return res.status(401).json({ error: 'No has iniciado sesión' });
    }

    console.log('Datos recibidos en el backend:', { idUsuario, nombre });

    try {
        const query = `
            INSERT INTO perfil_hogar (id_usuario, nombre)
            VALUES ($1, $2);
        `;
        console.log('Ejecutando consulta:', query, [idUsuario, nombre]);
        await client.query(query, [idUsuario, nombre]);
        console.log(`Datos insertados correctamente: id_usuario=${idUsuario}, nombre=${nombre}`);
        res.status(200).json({ message: 'Datos insertados correctamente' });
    } catch (err) {
        console.error('Error al insertar datos:', err);
        res.status(500).json({ error: 'Error al insertar datos' });
    }
});

//Borrar perfil de hogar
app.delete('/eliminarPerfil/:idPerfilHogar', async (req, res) => {
    console.log(`Solicitud DELETE recibida para eliminar perfil con ID: ${req.params.idPerfilHogar}`);
    const { idPerfilHogar } = req.params;

    try {
        const query = `DELETE FROM perfil_hogar WHERE id_perfil_hogar = $1;`;
        await client.query(query, [idPerfilHogar]);
        console.log(`Perfil de hogar eliminado correctamente: id_perfil_hogar=${idPerfilHogar}`);
        res.status(200).json({ message: 'Perfil de hogar eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar el perfil:', err);
        res.status(500).json({ error: 'Error al eliminar el perfil' });
    }
});


// llamada de los perfiles de hogar
app.get('/obtenerPerfiles', async (req, res) => {
    // Obtenemos el ID del usuario desde la sesión
    const idUsuario = req.session.usuario?.id_usuario;

    if (!idUsuario) {
        // Si no hay usuario en sesión, devolvemos un error
        return res.status(401).json({ error: 'No has iniciado sesión' });
    }

    try {
        const query = `
            SELECT id_perfil_hogar, nombre
            FROM perfil_hogar
            WHERE id_usuario = $1;
        `;
        const result = await client.query(query, [idUsuario]);
        res.json(result.rows); // Enviar los perfiles como JSON
    } catch (err) {
        console.error('Error al obtener los perfiles:', err);
        res.status(500).json({ error: 'Error al obtener los perfiles' });
    }
});

// Ruta para obtener los datos del usuario autenticado: perfiles y electrodomésticos
app.get('/datos', async (req, res) => {
    const idUsuario = req.session.usuario?.id_usuario;

    if (!idUsuario) {
        return res.status(401).json({ error: 'No has iniciado sesión' });
    }

    try {
        const query = `
            SELECT 
                ph.nombre AS perfil,
                elec.id_electrodomesticos AS id_electrodomestico,
                elec.nombre AS electrodomestico,
                elec.watt AS consumo,
                elec.time AS tiempo,
                tip.nombre AS categoria
            FROM perfil_hogar ph
            LEFT JOIN electrodomesticos elec ON ph.id_perfil_hogar = elec.id_perfil_hogar
            LEFT JOIN tipo_de_electrodomesticos tip ON elec.id_tp_electrodomestico = tip.id_tp_electrodomestico
            WHERE ph.id_usuario = $1
            ORDER BY ph.nombre, elec.nombre;
        `;

        const result = await client.query(query, [idUsuario]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error al obtener los datos del usuario:', err);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

// electrodomesticos segun tp hogar
app.get('/obtenerElectrodomesticos/:idPerfilHogar', async (req, res) => {
    const { idPerfilHogar } = req.params;

    try {
        const query = `
            SELECT elec.id_electrodomesticos AS id_electrodomestico, elec.nombre AS electrodomestico, elec.watt AS consumo,elec.time AS tiempo, tip.nombre AS categoria
            FROM perfil_hogar ph
            INNER JOIN electrodomesticos elec ON ph.id_perfil_hogar = elec.id_perfil_hogar 
            INNER JOIN tipo_de_electrodomesticos tip ON tip.id_tp_electrodomestico = elec.id_tp_electrodomestico
            WHERE ph.id_perfil_hogar = $1;
        `;
        const result = await client.query(query, [idPerfilHogar]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error al obtener los electrodomésticos:', err);
        res.status(500).json({ error: 'Error al obtener los electrodomésticos' });
    }
});

// insertar datos de electrodomestico
app.post('/insertarElectrodomestico', async (req, res) => {
    const { idPerfilHogar, categoria, electrodomestico, watt, time } = req.body;

    // Validar que el usuario esté en sesión
    const idUsuario = req.session.usuario?.id_usuario;
    if (!idUsuario) {
        return res.status(401).json({ error: 'No has iniciado sesión' });
    }

    try {
        // Verificar que el perfil de hogar pertenece al usuario autenticado
        const checkQuery = `
            SELECT 1 
            FROM perfil_hogar 
            WHERE id_perfil_hogar = $1 AND id_usuario = $2;
        `;
        const checkResult = await client.query(checkQuery, [idPerfilHogar, idUsuario]);
        if (checkResult.rows.length === 0) {
            return res.status(403).json({ error: 'El perfil de hogar no pertenece al usuario autenticado' });
        }

        // Insertar el electrodoméstico en el perfil de hogar
        const query = `
            INSERT INTO electrodomesticos (id_perfil_hogar, nombre, watt, id_tp_electrodomestico, time)
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5
            );
        `;
        await client.query(query, [idPerfilHogar, electrodomestico, watt, categoria, time]);
        console.log(`Electrodoméstico insertado: ${electrodomestico} en la categoría ${categoria}`);
        res.status(200).json({ message: 'Electrodoméstico agregado correctamente' });
    } catch (err) {
        console.error('Error al insertar electrodoméstico:', err);
        res.status(500).json({ error: 'Error al insertar electrodoméstico', detalle: err.message });
    }
});

// Ruta para eliminar un electrodoméstico
app.delete('/eliminarElectrodomestico/:id', async (req, res) => {
    const idElectrodomestico = req.params.id;

    // Validar sesión del usuario
    const idUsuario = req.session.usuario?.id_usuario;
    if (!idUsuario) {
        return res.status(401).json({ error: 'No has iniciado sesión' });
    }

    try {
        // Verificar que el electrodoméstico pertenece al usuario
        const checkQuery = `
            SELECT 1
            FROM electrodomesticos e
            JOIN perfil_hogar ph ON e.id_perfil_hogar = ph.id_perfil_hogar
            WHERE e.id_electrodomesticos = $1 AND ph.id_usuario = $2;
        `;
        const checkResult = await client.query(checkQuery, [idElectrodomestico, idUsuario]);
        if (checkResult.rows.length === 0) {
            return res.status(403).json({ error: 'No tienes permiso para eliminar este electrodoméstico' });
        }

        // Eliminar el electrodoméstico
        const deleteQuery = `
            DELETE FROM electrodomesticos
            WHERE id_electrodomesticos = $1;
        `;
        await client.query(deleteQuery, [idElectrodomestico]);

        res.status(200).json({ message: 'Electrodoméstico eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar electrodoméstico:', err);
        res.status(500).json({ error: 'Error al eliminar electrodoméstico' });
    }
});

// Ruta para actualizar el consumo y tiempo de un electrodoméstico
app.put('/actualizarConsumo/:id', async (req, res) => {
    const idElectrodomestico = req.params.id;
    const { nuevoConsumo, nuevoTiempo } = req.body;

    const idUsuario = req.session.usuario?.id_usuario;
    if (!idUsuario) {
        return res.status(401).json({ error: 'No has iniciado sesión' });
    }

    try {
        // Verificar que el electrodoméstico pertenece al usuario
        const checkQuery = `
        SELECT 1 FROM electrodomesticos e
        JOIN perfil_hogar ph ON e.id_perfil_hogar = ph.id_perfil_hogar
        WHERE e.id_electrodomesticos = $1 AND ph.id_usuario = $2;
      `;
        const checkResult = await client.query(checkQuery, [idElectrodomestico, idUsuario]);
        if (checkResult.rows.length === 0) {
            return res.status(403).json({ error: 'No tienes permiso para actualizar este electrodoméstico' });
        }

        // Actualizar el consumo
        const updateQuery = `
        UPDATE electrodomesticos
        SET watt = $1, time = $2
        WHERE id_electrodomesticos = $3;
      `;
        await client.query(updateQuery, [nuevoConsumo, nuevoTiempo, idElectrodomestico]);

        res.status(200).json({ message: 'Consumo actualizado correctamente' });
    } catch (err) {
        console.error('Error al actualizar el consumo:', err);
        res.status(500).json({ error: 'Error al actualizar el consumo' });
    }
});

// HistorialConsumo y filtro
app.get('/historialConsumo/:id_perfil_hogar', async (req, res) => {
    console.log("Ruta /historialConsumo ejecutada");

    const idPerfil = req.params.id_perfil_hogar;
    const { desde, hasta } = req.query;

    let query = `
        SELECT 
            TO_CHAR(fecha, 'MM/YYYY') AS "mes y año",
            consumo_total AS "watts totales",
            costo AS "consumo por mes $"
        FROM public.historial_consumo
        WHERE id_perfil_hogar = $1
    `;

    const valores = [idPerfil];
    let i = 2;

    console.log("Filtros recibidos:", { desde, hasta });

    if (desde) {
        query += ` AND fecha >= $${i}`;
        valores.push(`${desde}-01`);
        i++;
    }

    if (hasta) {
        const [anio, mes] = hasta.split('-');
        const ultimoDia = new Date(parseInt(anio), parseInt(mes), 0).getDate();
        const hastaCompleta = `${hasta}-${String(ultimoDia).padStart(2, '0')}`;
        query += ` AND fecha <= $${i}`;
        valores.push(hastaCompleta);
        console.log("Fecha final utilizada:", hastaCompleta);
        i++;
    }

    query += ` ORDER BY fecha DESC`;

    console.log("Consulta SQL generada:", query);
    console.log("Valores de la consulta:", valores);

    try {
        const result = await client.query(query, valores);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al consultar historial:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
});

// Crear o actualizar Historial
app.post('/crearOActualizarHistorial', async (req, res) => {
  const { id_perfil_hogar } = req.body;

  try {
    const hoy = new Date();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();

    // Verificar si ya existe historial para este hogar en este mes
    const existe = await client.query(
      `SELECT id_historial FROM historial_consumo
       WHERE id_perfil_hogar = $1 
       AND EXTRACT(MONTH FROM fecha) = $2 
       AND EXTRACT(YEAR FROM fecha) = $3`,
      [id_perfil_hogar, mes, anio]
    );

    // Calcular consumo y costo
    const resultado = await client.query(
      `SELECT 
         SUM(watt) AS consumo_total, 
         ROUND(SUM(watt * time) * 0.6 / 1000, 3) AS costo
       FROM electrodomesticos
       WHERE id_perfil_hogar = $1`,
      [id_perfil_hogar]
    );

    const { consumo_total, costo } = resultado.rows[0];

    if (existe.rows.length > 0) {
      // Ya existe → hacer UPDATE
      const idHistorial = existe.rows[0].id_historial;
      await client.query(
        `UPDATE historial_consumo
         SET consumo_total = $1, costo = $2, fecha = CURRENT_DATE
         WHERE id_historial = $3`,
        [consumo_total, costo, idHistorial]
      );
      res.json({ mensaje: 'Historial actualizado correctamente' });
    } else {
      // No existe → hacer INSERT
      await client.query(
        `INSERT INTO historial_consumo (id_perfil_hogar, consumo_total, costo, fecha)
         VALUES ($1, $2, $3, CURRENT_DATE)`,
        [id_perfil_hogar, consumo_total, costo]
      );
      res.json({ mensaje: 'Historial creado correctamente' });
    }
  } catch (error) {
    console.error('Error al crear o actualizar historial:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});



// estado de sesión y nombre del usuario
app.get('/checkSession', (req, res) => {
    if (req.session.usuario) {
        res.json({ isLoggedIn: true, nombreUsuario: req.session.usuario.nombre_usuario });
    } else {
        res.json({ isLoggedIn: false });
    }
});

// cerrar sesion
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar la sesión:', err);
            return res.status(500).json({ error: 'Error al cerrar la sesión' });
        }
        res.json({ message: 'Sesión cerrada exitosamente' });
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
