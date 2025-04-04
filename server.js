const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); // Importa express-session
const { Client } = require('pg');

const app = express();
const port = 3000;

app.use(express.static(__dirname));

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de sesiones
app.use(session({
    secret: 'tu_secreto_unico', // Cambia por un valor único y seguro
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a `true` si estás usando HTTPS
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
        const query = 'SELECT * FROM usuarios WHERE nombre_usuario = $1 AND "contraseña" = $2';
        const result = await client.query(query, [usuario, contrasena]);

        if (result.rows.length > 0) {
            req.session.usuario = result.rows[0]; // Guarda los datos del usuario en la sesión
            console.log('Información de sesión:', req.session.usuario);
            res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: result.rows[0].nombre_usuario });
        } else {
            console.log('Usuario o contraseña incorrectos');
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

// electrodomesticos segun tp hogar
app.get('/obtenerElectrodomesticos/:idPerfilHogar', async (req, res) => {
    const { idPerfilHogar } = req.params;

    try {
        const query = `
            SELECT elec.nombre AS electrodomestico, elec.watt AS consumo, tip.nombre AS categoria
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
    const { idPerfilHogar, categoria, electrodomestico, watt } = req.body;

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
            INSERT INTO electrodomesticos (id_perfil_hogar, nombre, watt, id_tp_electrodomestico)
            VALUES (
                $1,
                $2,
                $3,
                (SELECT id_tp_electrodomestico FROM tipo_de_electrodomesticos WHERE nombre = $4)
            );
        `;
        await client.query(query, [idPerfilHogar, electrodomestico, watt, categoria]);
        console.log(`Electrodoméstico insertado: ${electrodomestico} en la categoría ${categoria}`);
        res.status(200).json({ message: 'Electrodoméstico agregado correctamente' });
    } catch (err) {
        console.error('Error al insertar electrodoméstico:', err);
        res.status(500).json({ error: 'Error al insertar electrodoméstico', detalle: err.message });
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
